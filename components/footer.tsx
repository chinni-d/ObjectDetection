export function Footer() {
  return (
    <footer className="border-t bg-background mt-auto dark:border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
          {/* Copyright - Left side */}
          <div>
            <p className="text-sm text-muted-foreground">
              © 2025 AI Chatbot. All rights reserved.
            </p>
          </div>
          
          {/* Built with - Right side */}
          <div>
            <p className="text-sm text-muted-foreground">
              Built with 💛 using Next.js and AI technologies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
