"use client"

import { useEffect, useState } from "react"
import { Info, X, Camera, Wifi, CheckCircle, AlertCircle } from "lucide-react"

interface FullscreenWrapperProps {
  children: React.ReactNode
}

export function FullscreenWrapper({ children }: FullscreenWrapperProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error)
    }
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if 'F' key is pressed (case insensitive)
      if (event.key.toLowerCase() === 'f' && !event.ctrlKey && !event.altKey && !event.metaKey) {
        // Prevent default browser behavior
        event.preventDefault()
        toggleFullscreen()
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    // Add event listeners
    document.addEventListener('keydown', handleKeyPress)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div className={`transition-all duration-300 ${isFullscreen ? 'fullscreen-active' : ''}`}>
      {children}
      
      {/* Fullscreen info icon */}
      {!isFullscreen && (
        <div className="fixed bottom-4 right-4 z-40 group">
          <div className="relative">
            <button
              onClick={() => setShowInstructions(true)}
              className="p-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-full cursor-pointer transition-all duration-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <Info className="h-4 w-4 text-primary" />
            </button>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
              <div className="bg-black/90 dark:bg-white/95 text-white dark:text-black text-xs px-3 py-2 rounded-lg whitespace-nowrap backdrop-blur-sm border border-white/10 dark:border-black/10">
                Click for instructions
                <div className="absolute top-full right-3 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-black/90 dark:border-t-white/95"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Dialog */}
      {showInstructions && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowInstructions(false)}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300 rounded-xl shadow-2xl border">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use VisionAI</h2>
                </div>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="p-2 hover:bg-muted/50 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                      1
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Camera className="h-4 w-4 text-primary" />
                      Start Camera Detection
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Click the "Start Camera Detection" button to begin. On mobile devices, you'll be able to choose between front and back camera.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                      2
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-primary" />
                      Backend Connection
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      When you click start, the system connects to our AI backend. If successfully connected, you'll see:
                    </p>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-foreground/70">"Connected" status indicator</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-foreground/70">"LIVE DETECTION" badge appears</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                      3
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      Connection Issues
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      If you see "Disconnected" status, please wait a moment for the backend connection. The system will automatically retry connecting. Make sure you have a stable internet connection.
                    </p>
                  </div>
                </div>

                {/* Additional Tips */}
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Additional Tips
                  </h4>
                  <ul className="space-y-1 text-sm text-foreground/70">
                    <li>• Press <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs font-mono text-foreground">F</kbd> key to toggle fullscreen mode</li>
                    <li>• Ensure good lighting for better detection accuracy</li>
                    <li>• The AI can detect multiple objects simultaneously</li>
                    <li>• Detection works in real-time with live video feed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}