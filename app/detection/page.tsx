import { DetectionInterface } from "@/components/detection-interface"

export default function DetectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Object Detection</h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
           Use your camera for real-time object detection
          </p>
        </div>
        <DetectionInterface />
      </div>
    </div>
  )
}
