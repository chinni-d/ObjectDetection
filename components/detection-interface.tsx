"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Play, Square, AlertCircle, Wifi, WifiOff } from "lucide-react"

export function DetectionInterface() {
  const [isStreamActive, setIsStreamActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState<'starting' | 'stopping' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [fps, setFps] = useState(0)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const processedCanvasRef = useRef<HTMLCanvasElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const fpsCounterRef = useRef(0)
  const fpsTimeRef = useRef(Date.now())

  // WebSocket URL - Production deployment
  const WS_URL = "wss://objectdetection-cyafhnf8fehpdzb2.centralindia-01.azurewebsites.net/ws/detection"

  const connectWebSocket = useCallback(() => {
    try {
      const ws = new WebSocket(WS_URL)
      
      ws.onopen = () => {
        console.log("✅ WebSocket connected")
        setIsConnected(true)
        setError(null)
      }
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          
          if (data.type === "processed_frame" && processedCanvasRef.current) {
            const canvas = processedCanvasRef.current
            const ctx = canvas.getContext('2d')
            
            if (ctx && data.data) {
              const img = new Image()
              img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
                
                // Update FPS counter
                fpsCounterRef.current++
                const now = Date.now()
                if (now - fpsTimeRef.current >= 1000) {
                  setFps(fpsCounterRef.current)
                  fpsCounterRef.current = 0
                  fpsTimeRef.current = now
                }
              }
              img.src = data.data
            }
          }
        } catch (err) {
          console.error("Error processing WebSocket message:", err)
        }
      }
      
      ws.onclose = () => {
        console.log("❌ WebSocket disconnected")
        setIsConnected(false)
      }
      
      ws.onerror = (error) => {
        console.error("❌ WebSocket error:", error)
        setIsConnected(false)
        setError("WebSocket connection failed")
      }
      
      wsRef.current = ws
      
    } catch (err) {
      console.error("Failed to create WebSocket connection:", err)
      setError("Failed to connect to detection server")
    }
  }, [WS_URL])

  const sendFrameToBackend = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !wsRef.current || 
        wsRef.current.readyState !== WebSocket.OPEN) {
      return
    }

    try {
      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
        // Set canvas size to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        
        // Draw current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        // Convert to base64
        const dataURL = canvas.toDataURL('image/jpeg', 0.8)
        
        // Send to backend
        const message = {
          type: "frame",
          data: dataURL,
          timestamp: Date.now()
        }
        
        wsRef.current.send(JSON.stringify(message))
      }
    } catch (err) {
      console.error("Error sending frame:", err)
    }
  }, [])

  const startCamera = async () => {
    console.log("🚀 Starting camera...")
    setError(null)
    setIsLoading(true)
    setLoadingAction('starting')
    
    try {
      // Get camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 15 }
        },
        audio: false
      })
      
      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play()
            setIsStreamActive(true)
            setIsLoading(false)
            setLoadingAction(null)
            
            // Connect WebSocket if not connected
            if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
              connectWebSocket()
            }
            
            // Start sending frames to backend
            intervalRef.current = setInterval(sendFrameToBackend, 100) // 10 FPS
            
            console.log("✅ Camera started successfully")
          }
        }
      }
      
    } catch (err) {
      console.error("❌ Failed to start camera:", err)
      setError(err instanceof Error ? err.message : "Failed to access camera")
      setIsLoading(false)
      setLoadingAction(null)
    }
  }

  const stopCamera = async () => {
    console.log("🛑 Stopping camera...")
    setIsLoading(true)
    setLoadingAction('stopping')
    
    // Stop frame sending
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    // Stop camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    // Clear video
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    
    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    
    setIsStreamActive(false)
    setIsConnected(false)
    setIsLoading(false)
    setLoadingAction(null)
    setFps(0)
    
    console.log("✅ Camera stopped")
  }

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            YOLO Live Camera Detection
            <div className="flex items-center gap-2 ml-auto">
              {isConnected ? (
                <div className="flex items-center gap-1 text-green-600">
                  <Wifi className="h-4 w-4" />
                  <span className="text-sm">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <WifiOff className="h-4 w-4" />
                  <span className="text-sm">Disconnected</span>
                </div>
              )}
            </div>
          </CardTitle>
          <CardDescription>
            Live object detection with client-side camera and YOLOv5 backend processing
            {fps > 0 && <span className="ml-2 text-blue-600">• {fps} FPS</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-start gap-4">
            <Button
              onClick={isStreamActive ? stopCamera : startCamera}
              variant={isStreamActive ? "destructive" : "default"}
              size="lg"
              className="gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Square className="h-4 w-4 animate-spin" />
                  {loadingAction === 'starting' ? 'Starting...' : 'Stopping...'}
                </>
              ) : isStreamActive ? (
                <>
                  <Square className="h-4 w-4" />
                  Stop Camera
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start Camera Detection
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Camera Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Camera Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-black rounded-lg overflow-hidden" style={{aspectRatio: "4/3"}}>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                style={{ display: isStreamActive ? "block" : "none" }}
                muted
                playsInline
              />
              
              {!isStreamActive && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl mb-2">Camera Ready</p>
                    <p className="text-sm opacity-75">Click "Start Camera Detection" to begin</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Processed Feed with Detections */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">YOLO Detections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-black rounded-lg overflow-hidden" style={{aspectRatio: "4/3"}}>
              <canvas
                ref={processedCanvasRef}
                className="w-full h-full object-cover"
                style={{ display: isStreamActive && isConnected ? "block" : "none" }}
              />
              
              {isStreamActive && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  LIVE DETECTION
                </div>
              )}
              
              {!isStreamActive && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <AlertCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl mb-2">Detection Feed</p>
                    <p className="text-sm opacity-75">Start camera to see YOLO detections</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Hidden canvases for processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}