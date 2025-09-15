"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Upload, Play, Square, Download, AlertCircle, Loader2, Eye } from "lucide-react"
import { detectionClient, type DetectionResult } from "@/lib/detection-client"

interface DetectionState {
  isProcessing: boolean
  results: DetectionResult[]
  error: string | null
  progress: number
}

export function DetectionInterface() {
  const [activeTab, setActiveTab] = useState("upload")
  const [detectionState, setDetectionState] = useState<DetectionState>({
    isProcessing: false,
    results: [],
    error: null,
    progress: 0,
  })
  const [isRecording, setIsRecording] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Start camera stream
  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      setDetectionState((prev) => ({
        ...prev,
        error: "Failed to access camera. Please check permissions.",
      }))
    }
  }, [])

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsRecording(false)
  }, [stream])

  // Handle video file upload
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setDetectionState((prev) => ({ ...prev, isProcessing: true, error: null, progress: 0 }))

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setDetectionState((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }))
      }, 200)

      const response = await detectionClient.detectFromVideo(file)

      clearInterval(progressInterval)
      setDetectionState((prev) => ({
        ...prev,
        isProcessing: false,
        results: response.detections,
        progress: 100,
      }))

      // Load video for preview
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(file)
      }
    } catch (error) {
      setDetectionState((prev) => ({
        ...prev,
        isProcessing: false,
        error: error instanceof Error ? error.message : "Upload failed",
      }))
    }
  }, [])

  // Start/stop real-time detection
  const toggleRealTimeDetection = useCallback(() => {
    if (isRecording) {
      setIsRecording(false)
    } else {
      setIsRecording(true)
      // For real-time video detection, you would typically:
      // 1. Stream video data to your backend
      // 2. Process the video stream with your ML model
      // 3. Receive detection results via WebSocket or streaming API
      // This is a simplified version that shows recording state
      setDetectionState((prev) => ({
        ...prev,
        results: [
          {
            id: 1,
            label: "person",
            confidence: 0.92,
            bbox: { x: 150, y: 75, width: 180, height: 250 },
          },
        ],
      }))
    }
  }, [isRecording])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Video
          </TabsTrigger>
          <TabsTrigger value="camera" className="gap-2">
            <Camera className="h-4 w-4" />
            Live Camera
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Video Upload
              </CardTitle>
              <CardDescription>Upload a video file to analyze objects throughout the video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">MP4, AVI, MOV (MAX. 100MB)</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {detectionState.isProcessing && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Processing video...</span>
                  </div>
                  <Progress value={detectionState.progress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="camera" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Live Camera Detection
              </CardTitle>
              <CardDescription>Use your camera for real-time object detection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                {!stream ? (
                  <Button onClick={startCamera} className="gap-2">
                    <Camera className="h-4 w-4" />
                    Start Camera
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={toggleRealTimeDetection}
                      variant={isRecording ? "destructive" : "default"}
                      className="gap-2"
                    >
                      {isRecording ? (
                        <>
                          <Square className="h-4 w-4" />
                          Stop Detection
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Start Detection
                        </>
                      )}
                    </Button>
                    <Button onClick={stopCamera} variant="outline" className="gap-2 bg-transparent">
                      <Square className="h-4 w-4" />
                      Stop Camera
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Video Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Video Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-contain" />
              {detectionState.isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Processing...</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detection Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Detection Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {detectionState.error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{detectionState.error}</AlertDescription>
              </Alert>
            )}

            {detectionState.results.length > 0 ? (
              <div className="space-y-3">
                {detectionState.results.map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{result.label}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Confidence: {(result.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {result.bbox.width}×{result.bbox.height}
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export Results
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No objects detected yet</p>
                <p className="text-sm">Upload a video or start camera detection</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
