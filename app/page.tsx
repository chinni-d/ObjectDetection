import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Zap, Shield, Cpu, ArrowRight, CheckCircle } from "lucide-react"
import { MorphingText } from "@/components/text-morphing"
import { AnimatedCard, AnimatedStepCard, AnimatedNumber } from "@/components/animated-card"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 min-h-[80vh] flex items-center justify-center py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center items-center min-h-[120px] mb-8">
              <MorphingText 
                texts={["Welcome", "to", "VisionAI"]} 
                className=""
              />
            </div>
            <p className="text-xl leading-8 text-muted-foreground text-balance max-w-3xl mx-auto mb-12">
              Experience cutting-edge AI technology that identifies and tracks objects in real-time video streams with
              unprecedented accuracy and speed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button asChild size="lg" className="gap-2 min-w-[160px]">
                <Link href="/detection">
                  <Play className="h-4 w-4" />
                  Start Detection
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="min-w-[160px] text-foreground border-border hover:bg-muted hover:text-foreground dark:hover:text-foreground hover:dark:bg-primary/80" asChild>
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
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
              <AnimatedCard delay={0.1}>
                <Card className="p-6 h-full hover:shadow-2xl transition-shadow duration-300 border-2 border-border/50 dark:border-white/10 dark:bg-card/50 hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-x-3 text-base font-semibold leading-7">
                      <Zap className="h-5 w-5 flex-none text-primary" />
                      Real-time Processing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-7">
                      Process video streams in real-time with minimal latency. Our optimized algorithms ensure smooth
                      performance even with high-resolution content.
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedCard>
              
              <AnimatedCard delay={0.2}>
                <Card className="p-6 h-full hover:shadow-2xl transition-shadow duration-300 border-2 border-border/50 dark:border-white/10 dark:bg-card/50 hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-x-3 text-base font-semibold leading-7">
                      <Shield className="h-5 w-5 flex-none text-primary" />
                      High Accuracy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-7">
                      Achieve industry-leading detection accuracy with our advanced neural networks trained on millions of
                      diverse videos and scenarios.
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedCard>
              
              <AnimatedCard delay={0.3}>
                <Card className="p-6 h-full hover:shadow-2xl transition-shadow duration-300 border-2 border-border/50 dark:border-white/10 dark:bg-card/50 hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-x-3 text-base font-semibold leading-7">
                      <Cpu className="h-5 w-5 flex-none text-primary" />
                      Multiple Models
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-7">
                      Choose from various pre-trained models optimized for different use cases, from general object
                      detection to specialized applications.
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>
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
          <div className="mx-auto mt-16 max-w-3xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
            <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-0">
              <AnimatedStepCard delay={0.1}>
                <Card className="relative h-full border-2 border-border/50 dark:border-white/10 dark:bg-card/50 hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <AnimatedNumber className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg">
                        1
                      </AnimatedNumber>
                      <CardTitle className="text-xl">Start Live Stream</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Connect your camera or webcam to begin live streaming. Our platform captures real-time video feeds
                      with optimized performance for continuous detection.
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedStepCard>

              <AnimatedStepCard delay={0.2}>
                <Card className="relative h-full border-2 border-border/50 dark:border-white/10 dark:bg-card/50 hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <AnimatedNumber className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg">
                        2
                      </AnimatedNumber>
                      <CardTitle className="text-xl">Real-Time Detection</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Advanced AI models process your live stream instantly, detecting and tracking objects frame-by-frame
                      with sub-second latency and high precision.
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedStepCard>

              <AnimatedStepCard delay={0.3}>
                <Card className="relative h-full border-2 border-border/50 dark:border-white/10 dark:bg-card/50 hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <AnimatedNumber className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg">
                        3
                      </AnimatedNumber>
                      <CardTitle className="text-xl">Live Results</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Watch live detection overlays on your stream with real-time alerts, object tracking, and instant
                      notifications when specific objects are detected.
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedStepCard>
            </div>
          </div>
        </div>
      </section>
    
    </div>
  )
}
