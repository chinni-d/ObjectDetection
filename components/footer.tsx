import Link from "next/link"
import { Eye } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            Home
          </Link>
          <Link href="/detection" className="text-muted-foreground hover:text-primary">
            Detection
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-primary">
            About
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold">VisionAI</span>
          </div>
          <p className="text-center text-xs leading-5 text-muted-foreground md:text-left mt-2">
            &copy; 2024 VisionAI. Advanced video object detection technology.
          </p>
        </div>
      </div>
    </footer>
  )
}
