"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Play, Square, AlertCircle } from "lucide-react"

export function DetectionInterface() {
  const [isStreamActive, setIsStreamActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState<'starting' | 'stopping' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const streamImgRef = useRef<HTMLImageElement>(null)

  // Check camera status from backend
  const checkCameraStatus = async () => {
    try {
      const response = await fetch("http://localhost:8000/camera-status")
      if (response.ok) {
        const data = await response.json()
        console.log("📹 Camera status:", data)
        return data.camera_active || false
      }
    } catch (error) {
      console.error("❌ Failed to check camera status:", error)
    }
    return false
  }

  // Start detection stream
  const startDetection = async () => {
    console.log("🚀 Starting camera...")
    setError(null)
    setIsLoading(true)
    setLoadingAction('starting')
    
    try {
      // First activate the camera on backend
      const startResponse = await fetch("http://localhost:8000/start-camera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      if (!startResponse.ok) {
        throw new Error(`Failed to start camera: ${startResponse.status}`)
      }
      
      const startData = await startResponse.json()
      console.log("✅ Backend camera started:", startData)
      
      // Now start the frontend stream
      setIsStreamActive(true)
      setIsLoading(false)
      setLoadingAction(null)
      
      if (streamImgRef.current) {
        const img = streamImgRef.current
        
        img.onload = () => {
          console.log("✅ Stream working!")
          setError(null)
        }
        
        img.onerror = () => {
          console.log("❌ Stream failed!")
          setError("Camera stream failed! Make sure your FastAPI server is running and camera is available.")
          setIsStreamActive(false)
        }
        
        // Direct URL to the live stream
        img.src = "http://localhost:8000/live-camera-stream"
      }
      
    } catch (error) {
      console.error("❌ Failed to start camera:", error)
      setError(error instanceof Error ? error.message : "Failed to start camera")
      setIsStreamActive(false)
      setIsLoading(false)
      setLoadingAction(null)
    }
  }

  // Stop detection stream
  const stopDetection = async () => {
    console.log("🛑 Stopping camera...")
    setIsLoading(true)
    setLoadingAction('stopping')
    
    // Immediately hide the stream in UI
    setIsStreamActive(false)
    setError(null)
    
    // Clear the image source to stop frontend stream
    if (streamImgRef.current) {
      streamImgRef.current.src = ""
      streamImgRef.current.onload = null
      streamImgRef.current.onerror = null
    }
    
    try {
      // Call backend to stop camera and release resources
      const stopResponse = await fetch("http://localhost:8000/stop-camera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      if (stopResponse.ok) {
        const stopData = await stopResponse.json()
        console.log("✅ Backend camera stopped:", stopData)
      } else {
        console.warn("⚠️ Backend stop request failed:", stopResponse.status)
      }
    } catch (error) {
      console.error("❌ Failed to stop camera:", error)
      // Continue with frontend stop even if backend call fails
    }
    
    setIsLoading(false)
    setLoadingAction(null)
    console.log("🏁 Camera stopped and resources released")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            YOLO Live Camera Detection
          </CardTitle>
          <CardDescription>Live object detection with YOLOv5</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-start gap-4">
            <Button
              onClick={isStreamActive ? stopDetection : startDetection}
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
                  Start Live Camera
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live Detection Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-black rounded-lg overflow-hidden" style={{aspectRatio: "16/9"}}>
            <img
              ref={streamImgRef}
              alt="Live Camera Feed"
              className="w-full h-full object-cover"
              style={{ display: isStreamActive ? "block" : "none" }}
            />
            
            {!isStreamActive && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-xl mb-2">Ready for Detection</p>
                  <p className="text-sm opacity-75">Click "Start Live Camera" to begin</p>
                </div>
              </div>
            )}

            {isStreamActive && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                LIVE
              </div>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
