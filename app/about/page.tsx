"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Brain, Zap, Shield, Code, Cpu, Globe, ArrowRight, Target, User, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { SparklesText } from "@/components/sparkles-text"
import { motion } from "framer-motion"

const techStack = [
  {
    category: "Frontend",
    technologies: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "ShadCN UI" },
    ],
  },
  {
    category: "AI & ML",
    technologies: [
      { name: "YOLOv5" },
      { name: "OpenCV" },
      { name: "TensorFlow" },
      { name: "PyTorch" },
    ],
  },
  {
    category: "Backend",
    technologies: [
      { name: "Python" },
      { name: "API Routes" },
      { name: "WebRTC" },
    ],
  },
  {
    category: "Infrastructure",
    technologies: [
      { name: "Docker" },
      { name: "Vercel" },
      { name: "Edge Functions" },
      { name: "Azure" },
    ],
  },
]

const features = [
  {
    icon: Brain,
    title: "Advanced AI Models",
    description: "Powered by state-of-the-art neural networks trained on millions of videos for superior accuracy.",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Process video streams with minimal latency using optimized algorithms and edge computing.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "All processing happens locally or on secure servers. Your data never leaves our protected environment.",
  },
  {
    icon: Globe,
    title: "Cross-platform",
    description: "Works seamlessly across all devices and browsers with responsive design and progressive enhancement.",
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-5xl text-balance"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SparklesText text="About VisionAI" className="inline-block" sparklesCount={15} />
          </motion.h1>
          <motion.p 
            className="text-base text-muted-foreground text-pretty max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Democratizing advanced computer vision technology through accessible, high-performance video object
            detection solutions.
          </motion.p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Target className="h-5 w-5 text-primary" />
                </motion.div>
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.p 
                className="text-muted-foreground leading-relaxed text-base"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We believe that advanced AI capabilities should be accessible to everyone. VisionAI was created to bridge
                the gap between cutting-edge computer vision research and practical, real-world video analysis
                applications. Our platform empowers developers, researchers, and businesses to integrate sophisticated
                object detection into their workflows without requiring deep machine learning expertise.
              </motion.p>
              <motion.p 
                className="text-muted-foreground leading-relaxed text-base"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                By combining state-of-the-art neural networks with an intuitive user interface, we're making it possible
                for anyone to harness the power of AI-driven video analysis.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-6">
          <motion.h2 
            className="text-3xl font-bold text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div 
                        className="p-2 rounded-lg bg-primary/10"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <feature.icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {feature.title}
                      </motion.span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.p 
                      className="text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: (index * 0.1) + 0.3 }}
                    >
                      {feature.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="space-y-6 ">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Technology Stack</h2>
            <p className="text-muted-foreground">
              Built with modern technologies for performance, scalability, and reliability
            </p>
          </div>

          <div className="relative bg-primary/5 dark:bg-black/90 border border-primary/30 dark:border-red-500/30 rounded-xl p-8 overflow-hidden dark:backdrop-blur-sm">
            {/* Grid background for dark mode only */}
            <div className="absolute inset-0 dark:block hidden">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgb(239 68 68 / 0.2) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(239 68 68 / 0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }} 
              />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/20 dark:bg-red-500/20">
                  <Code className="h-6 w-6 text-primary dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Technology Stack</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {techStack.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    className="space-y-4 p-4 rounded-lg bg-primary/5 dark:bg-red-500/5 border border-primary/20 dark:border-red-500/20 backdrop-blur-sm hover:bg-primary/10 dark:hover:bg-red-500/10 hover:border-primary/40 dark:hover:border-red-500/40 transition-all duration-300"
                  >
                    <motion.div 
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="p-2 rounded-lg bg-primary/20 dark:bg-red-500/20"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {category.category === 'Frontend' && <Globe className="h-5 w-5 text-primary dark:text-red-400" />}
                        {category.category === 'AI & ML' && <Brain className="h-5 w-5 text-primary dark:text-red-400" />}
                        {category.category === 'Backend' && <Cpu className="h-5 w-5 text-primary dark:text-red-400" />}
                        {category.category === 'Infrastructure' && <Zap className="h-5 w-5 text-primary dark:text-red-400" />}
                      </motion.div>
                      <h4 className="text-base font-semibold text-foreground">{category.category}</h4>
                    </motion.div>
                    <div className="space-y-3">
                      {category.technologies.map((tech, techIndex) => (
                        <motion.div 
                          key={techIndex} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: (index * 0.1) + (techIndex * 0.05) }}
                          whileHover={{ 
                            x: 10,
                            transition: { duration: 0.2 }
                          }}
                          className="text-muted-foreground text-sm cursor-pointer hover:text-primary dark:hover:text-red-400"
                        >
                          {tech.name}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Cpu className="h-5 w-5 text-primary" />
                </motion.div>
                System Architecture
              </CardTitle>
              <CardDescription>How our platform processes and analyzes video content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: Globe,
                    title: "Input Processing",
                    description: "Video streams are captured and preprocessed using WebRTC and canvas APIs"
                  },
                  {
                    icon: Brain,
                    title: "AI Analysis",
                    description: "Videos are analyzed using optimized YOLO models running on edge servers"
                  },
                  {
                    icon: Zap,
                    title: "Real-time Results",
                    description: "Detection results are streamed back with bounding boxes and confidence scores"
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    className="text-center space-y-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="p-3 rounded-lg bg-primary/10 w-fit mx-auto"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <motion.h3 
                      className="font-semibold text-foreground"
                      whileHover={{ color: 'hsl(var(--primary))' }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: (index * 0.2) + 0.3 }}
                    >
                      {step.description}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <motion.div 
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold">Developer</h2>
            <p className="text-muted-foreground">Passionate expert working to advance computer vision technology</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-6 md:flex-row md:items-center md:text-left md:space-y-0 md:space-x-6">
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/20">
                      <Image
                        src="/img1.png"
                        alt="Manikanta Darapureddy"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-semibold mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      Manikanta Darapureddy
                    </motion.h3>
                    <motion.p 
                      className="text-muted-foreground mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      Full-Stack AI Engineer
                    </motion.p>
                    <motion.p 
                      className="text-sm text-muted-foreground leading-relaxed mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      Specialist in computer vision, deep learning, and full-stack development. Passionate about making AI
                      technology accessible through intuitive user interfaces and robust backend systems.
                    </motion.p>
                    
                    {/* Social Links */}
                    <motion.div 
                      className="flex flex-wrap gap-3 justify-center md:justify-start"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <motion.a
                        href="https://dmanikanta.site"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary border border-primary/20 hover:border-primary/40 text-sm font-medium transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Globe className="h-4 w-4" />
                        Portfolio
                      </motion.a>
                      
                      <motion.a
                        href="https://github.com/chinni-d"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary border border-primary/20 hover:border-primary/40 text-sm font-medium transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </motion.a>
                      
                      <motion.a
                        href="https://www.linkedin.com/in/manikanta-darapureddy-6a1125314/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary border border-primary/20 hover:border-primary/40 text-sm font-medium transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </motion.a>
                      
                      <motion.a
                        href="mailto:darapureddymanikanta8@gmail.com"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary border border-primary/20 hover:border-primary/40 text-sm font-medium transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="bg-primary/5 border-primary/50 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <motion.h3 
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Ready to Get Started?
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Experience the power of advanced video object detection technology today.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/detection">
                      Try Detection Now
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
