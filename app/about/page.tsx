import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, Zap, Shield, Code, Cpu, Globe, ArrowRight, Target, User } from "lucide-react"

const techStack = [
  {
    category: "Frontend",
    technologies: [
      { name: "Next.js 15", description: "React framework with App Router" },
      { name: "TypeScript", description: "Type-safe JavaScript development" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "Radix UI", description: "Accessible component primitives" },
    ],
  },
  {
    category: "AI & ML",
    technologies: [
      { name: "YOLOv8", description: "State-of-the-art object detection" },
      { name: "OpenCV", description: "Computer vision processing" },
      { name: "TensorFlow", description: "Machine learning framework" },
      { name: "PyTorch", description: "Deep learning platform" },
    ],
  },
  {
    category: "Backend",
    technologies: [
      { name: "Node.js", description: "JavaScript runtime environment" },
      { name: "API Routes", description: "Serverless API endpoints" },
      { name: "WebRTC", description: "Real-time video streaming" },
      { name: "FFmpeg", description: "Video processing pipeline" },
    ],
  },
  {
    category: "Infrastructure",
    technologies: [
      { name: "Vercel", description: "Deployment and hosting platform" },
      { name: "Edge Functions", description: "Global serverless compute" },
      { name: "CDN", description: "Content delivery network" },
      { name: "WebAssembly", description: "High-performance web execution" },
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
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">About VisionAI</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Democratizing advanced computer vision technology through accessible, high-performance video object
            detection solutions.
          </p>
        </div>

        {/* Mission Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              We believe that advanced AI capabilities should be accessible to everyone. VisionAI was created to bridge
              the gap between cutting-edge computer vision research and practical, real-world video analysis
              applications. Our platform empowers developers, researchers, and businesses to integrate sophisticated
              object detection into their workflows without requiring deep machine learning expertise.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By combining state-of-the-art neural networks with an intuitive user interface, we're making it possible
              for anyone to harness the power of AI-driven video analysis.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Technology Stack</h2>
            <p className="text-muted-foreground">
              Built with modern technologies for performance, scalability, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {techStack.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Badge variant="secondary" className="font-medium">
                          {tech.name}
                        </Badge>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Architecture Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              System Architecture
            </CardTitle>
            <CardDescription>How our platform processes and analyzes video content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mx-auto">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Input Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Video streams are captured and preprocessed using WebRTC and canvas APIs
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mx-auto">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Videos are analyzed using optimized YOLO models running on edge servers
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mx-auto">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Real-time Results</h3>
                <p className="text-sm text-muted-foreground">
                  Detection results are streamed back with bounding boxes and confidence scores
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Developer</h2>
            <p className="text-muted-foreground">Passionate expert working to advance computer vision technology</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Lead Developer</h3>
                  <p className="text-muted-foreground mb-2">Full-Stack AI Engineer</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Specialist in computer vision, deep learning, and full-stack development. Passionate about making AI
                    technology accessible through intuitive user interfaces and robust backend systems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
              <p className="text-muted-foreground">
                Experience the power of advanced video object detection technology today.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link href="/detection">
                  Try Detection Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
