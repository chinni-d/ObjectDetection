import { NextResponse } from "next/server"

export async function GET() {
  // Mock available models
  const availableModels = [
    {
      id: "yolov8n",
      name: "YOLOv8 Nano",
      description: "Fast and lightweight object detection",
      classes: ["person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck"],
      accuracy: 0.85,
      speed: "fast",
    },
    {
      id: "yolov8s",
      name: "YOLOv8 Small",
      description: "Balanced speed and accuracy",
      classes: ["person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck"],
      accuracy: 0.89,
      speed: "medium",
    },
    {
      id: "yolov8m",
      name: "YOLOv8 Medium",
      description: "High accuracy object detection",
      classes: ["person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck"],
      accuracy: 0.92,
      speed: "slow",
    },
  ]

  return NextResponse.json({
    models: availableModels,
    default: "yolov8n",
  })
}
