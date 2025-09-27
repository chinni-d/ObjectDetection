"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Play, Square, AlertCircle, Wifi, WifiOff, RotateCcw } from "lucide-react"

export function DetectionInterface() {
  const [isStreamActive, setIsStreamActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState<'starting' | 'stopping' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [fps, setFps] = useState(0)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
  const [isMobile, setIsMobile] = useState(false)
  const [showCameraSelection, setShowCameraSelection] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const processedCanvasRef = useRef<HTMLCanvasElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const fpsCounterRef = useRef(0)
  const fpsTimeRef = useRef(Date.now())

  // WebSocket URL from environment variables
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL

  const connectWebSocket = useCallback(() => {
    if (!WS_URL) {
      console.error("❌ WebSocket URL not configured")
      setError("WebSocket URL not configured in environment variables")
      return
    }
    
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

  const startCamera = async (selectedFacingMode?: 'user' | 'environment') => {
    console.log("🚀 Starting camera...")
    setError(null)
    setIsLoading(true)
    setLoadingAction('starting')
    
    // Use the selected facing mode or the current state
    const cameraMode = selectedFacingMode || facingMode
    
    try {
      // Get camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 15 },
          facingMode: cameraMode
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
            setShowCameraSelection(false)
            
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
      setShowCameraSelection(false)
    }
  }

  const handleStartDetection = () => {
    if (isMobile && !isStreamActive) {
      setShowCameraSelection(true)
    } else if (isStreamActive) {
      stopCamera()
    } else {
      startCamera()
    }
  }

  const selectCameraAndStart = (selectedFacingMode: 'user' | 'environment') => {
    setFacingMode(selectedFacingMode)
    startCamera(selectedFacingMode)
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

  const flipCamera = async () => {
    // Toggle facing mode first
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user'
    setFacingMode(newFacingMode)
    
    if (isStreamActive) {
      // Stop current stream
      await stopCamera()
      // Restart with new facing mode immediately
      setTimeout(() => {
        startCamera()
      }, 100)
    }
  }

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Smart Cam Detection
            <div className="flex items-center gap-2 ml-auto">
              {isConnected ? (
                <div className="flex items-center gap-1 text-green-600">
                  <Wifi className="h-4 w-4" />
                  <span className="text-sm">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <WifiOff className="h-4 w-4" />
                    <span className="text-xs sm:text-sm">Disconnected</span>
                </div>
              )}
            </div>
          </CardTitle>
          <CardDescription>
            Live object detection with client-side camera and AI backend processing
            {fps > 0 && <span className="ml-2 text-blue-600">• {fps} FPS</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isMobile && showCameraSelection && !isStreamActive ? (
            <div className="space-y-4 w-full">
              <p className="text-center text-sm text-muted-foreground mb-4">
                Choose your preferred camera for detection:
              </p>
              <div className="flex flex-col gap-3 w-full overflow-hidden">
                <div className="flex gap-1 w-full">
                  <Button
                    onClick={() => selectCameraAndStart('user')}
                    variant="outline"
                    size="sm"
                    className="flex-1 cursor-pointer px-1 py-2 text-xs min-w-0 max-w-[48%]"
                    disabled={isLoading}
                  >
                    <Camera className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">Front</span>
                  </Button>
                  <Button
                    onClick={() => selectCameraAndStart('environment')}
                    variant="outline"
                    size="sm"
                    className="flex-1 cursor-pointer px-1 py-2 text-xs min-w-0 max-w-[48%]"
                    disabled={isLoading}
                  >
                    <Camera className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">Back</span>
                  </Button>
                </div>
                <Button
                  onClick={() => setShowCameraSelection(false)}
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:justify-start gap-3 sm:gap-4">
              <div className="sm:inline-flex">
                <Button
                  onClick={handleStartDetection}
                  variant={isStreamActive ? "destructive" : "default"}
                  size="lg"
                  className="gap-2 w-full sm:w-auto cursor-pointer"
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
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Original Camera Feed */}
        <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300 h-full">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Camera Feed</CardTitle>
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
                <div className="absolute inset-0 flex items-center justify-center text-foreground">
                  <div className="text-center px-4">
                    <Camera className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 opacity-50" />
                    <p className="text-lg sm:text-xl mb-2">Camera Ready</p>
                    <p className="text-xs sm:text-sm opacity-75">Click "Start Camera Detection" to begin</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Processed Feed with Detections */}
        <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300 h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg">AI Detections</CardTitle>
              {isStreamActive && (
                <div className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                  LIVE DETECTION
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative bg-black rounded-lg overflow-hidden" style={{aspectRatio: "4/3"}}>
              <canvas
                ref={processedCanvasRef}
                className="w-full h-full object-cover"
                style={{ display: isStreamActive && isConnected ? "block" : "none" }}
              />
              
              {!isStreamActive && (
                <div className="absolute inset-0 flex items-center justify-center text-foreground">
                  <div className="text-center px-4">
                    <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 opacity-50" />
                    <p className="text-lg sm:text-xl mb-2">Detection Feed</p>
                    <p className="text-xs sm:text-sm opacity-75">Start camera to see AI detections</p>
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
    </div>
  )
}