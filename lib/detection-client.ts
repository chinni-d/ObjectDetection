export interface DetectionResult {
  id: number
  label: string
  confidence: number
  bbox: {
    x: number
    y: number
    width: number
    height: number
  }
}

export interface DetectionResponse {
  success: boolean
  detections: DetectionResult[]
  processedAt: string
}

export class DetectionClient {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  async detectFromVideo(videoFile: File): Promise<DetectionResponse> {
    const formData = new FormData()
    formData.append("video", videoFile)

    const response = await fetch(`${this.baseUrl}/detect`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Detection failed: ${response.statusText}`)
    }

    return response.json()
  }

  async getAvailableModels() {
    const response = await fetch(`${this.baseUrl}/models`)

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.statusText}`)
    }

    return response.json()
  }
}

export const detectionClient = new DetectionClient()
