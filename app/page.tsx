import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Zap, Shield, Cpu, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              Powered by Advanced AI
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Advanced Video Object Detection
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
              Experience cutting-edge AI technology that identifies and tracks objects in real-time video streams with
              unprecedented accuracy and speed.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="gap-2">
                <Link href="/detection">
                  <Play className="h-4 w-4" />
                  Start Detection
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Why Choose VisionAI?</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
              Our platform combines state-of-the-art machine learning with an intuitive interface to deliver
              professional-grade object detection capabilities.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Zap className="h-5 w-5 flex-none text-primary" />
                  Real-time Processing
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Process video streams in real-time with minimal latency. Our optimized algorithms ensure smooth
                    performance even with high-resolution content.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Shield className="h-5 w-5 flex-none text-primary" />
                  High Accuracy
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Achieve industry-leading detection accuracy with our advanced neural networks trained on millions of
                    diverse videos and scenarios.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Cpu className="h-5 w-5 flex-none text-primary" />
                  Multiple Models
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Choose from various pre-trained models optimized for different use cases, from general object
                    detection to specialized applications.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">How It Works</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
              Get started with object detection in three simple steps
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8">
              <Card className="relative">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                      1
                    </div>
                    <CardTitle>Upload or Stream</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Upload a video file or connect your camera to start live streaming. Our platform supports all major
                    video formats.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="relative">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                      2
                    </div>
                    <CardTitle>AI Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our advanced AI models analyze video content, identifying and classifying objects with precise bounding
                    boxes and confidence scores.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="relative">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                      3
                    </div>
                    <CardTitle>View Results</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    See real-time detection results with interactive overlays, detailed analytics, and exportable data
                    for further analysis.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Ready to Get Started?</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
              Experience the power of AI-driven object detection today. No setup required.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="gap-2">
                <Link href="/detection">
                  <Play className="h-4 w-4" />
                  Try Detection Now
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-x-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                No registration required
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Free to use
              </div>
              <div className="flex items-center gap-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Instant results
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
