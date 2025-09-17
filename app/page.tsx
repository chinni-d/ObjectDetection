"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Zap, Shield, Cpu, ArrowRight, CheckCircle } from "lucide-react"
import { MorphingText } from "@/components/text-morphing"
import { AnimatedCard, AnimatedStepCard, AnimatedNumber } from "@/components/animated-card"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background/60 to-muted/5 min-h-[80vh] flex items-center justify-center py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex justify-center items-center min-h-[120px] mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <MorphingText 
                texts={["Welcome", "to", "VisionAI"]} 
                className=""
              />
            </motion.div>
            <motion.p 
              className="text-xl leading-8 text-muted-foreground text-balance max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience cutting-edge AI technology that identifies and tracks objects in real-time video streams with
              unprecedented accuracy and speed.
            </motion.p>
            <motion.div 
              className="flex flex-row items-center justify-center gap-3 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-none"
              >
                <Button asChild size="lg" className="gap-2 w-full sm:min-w-[160px]">
                  <Link href="/detection">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Play className="h-4 w-4" />
                    </motion.div>
                    Start Detection
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-none"
              >
                <Button variant="outline" size="lg" className="w-full sm:min-w-[160px] text-foreground border-border hover:bg-muted hover:text-foreground dark:hover:text-foreground hover:dark:bg-primary/80" asChild>
                  <Link href="/about">
                    Learn More
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tight sm:text-4xl text-balance"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Why Choose VisionAI?
            </motion.h2>
            <motion.p 
              className="mt-6 text-lg leading-8 text-muted-foreground text-pretty"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our platform combines state-of-the-art machine learning with an intuitive interface to deliver
              professional-grade object detection capabilities.
            </motion.p>
          </motion.div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
              <AnimatedCard delay={0.1}>
                <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div 
                        className="p-2 rounded-lg bg-primary/10"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Zap className="h-5 w-5 text-primary" />
                      </motion.div>
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        Real-time Processing
                      </motion.span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        Process video streams in real-time with minimal latency. Our optimized algorithms ensure smooth
                        performance even with high-resolution content.
                      </CardDescription>
                    </motion.div>
                  </CardContent>
                </Card>
              </AnimatedCard>
              
              <AnimatedCard delay={0.2}>
                <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div 
                        className="p-2 rounded-lg bg-primary/10"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Shield className="h-5 w-5 text-primary" />
                      </motion.div>
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        High Accuracy
                      </motion.span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        Achieve industry-leading detection accuracy with our advanced neural networks trained on millions of
                        diverse videos and scenarios.
                      </CardDescription>
                    </motion.div>
                  </CardContent>
                </Card>
              </AnimatedCard>
              
              <AnimatedCard delay={0.3}>
                <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div 
                        className="p-2 rounded-lg bg-primary/10"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Cpu className="h-5 w-5 text-primary" />
                      </motion.div>
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        Multiple Models
                      </motion.span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        Choose from various pre-trained models optimized for different use cases, from general object
                        detection to specialized applications.
                      </CardDescription>
                    </motion.div>
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
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tight sm:text-4xl text-balance"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              How It Works
            </motion.h2>
            <motion.p 
              className="mt-6 text-lg leading-8 text-muted-foreground text-pretty"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Get started with object detection in three simple steps
            </motion.p>
          </motion.div>
          <div className="mx-auto mt-16 max-w-3xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
            <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-0">
              <AnimatedStepCard delay={0.1}>
                <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <AnimatedNumber className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg">
                        1
                      </AnimatedNumber>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <CardTitle className="text-xl">Start Live Stream</CardTitle>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        Connect your camera or webcam to begin live streaming. Our platform captures real-time video feeds
                        with optimized performance for continuous detection.
                      </CardDescription>
                    </motion.div>
                  </CardContent>
                </Card>
              </AnimatedStepCard>

              <AnimatedStepCard delay={0.2}>
                <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <AnimatedNumber className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg">
                        2
                      </AnimatedNumber>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <CardTitle className="text-xl">Real-Time Detection</CardTitle>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        Advanced AI models process your live stream instantly, detecting and tracking objects frame-by-frame
                        with sub-second latency and high precision.
                      </CardDescription>
                    </motion.div>
                  </CardContent>
                </Card>
              </AnimatedStepCard>

              <AnimatedStepCard delay={0.3}>
                <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <AnimatedNumber className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg">
                        3
                      </AnimatedNumber>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <CardTitle className="text-xl">Live Results</CardTitle>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        Watch live detection overlays on your stream with real-time alerts, object tracking, and instant
                        notifications when specific objects are detected.
                      </CardDescription>
                    </motion.div>
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
