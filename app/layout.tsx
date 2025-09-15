import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Tiles } from "@/components/tiles"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "VisionAI",
  description: "Professional video-based object detection powered by AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col relative">
            {/* Tiles Background - Higher z-index to appear above hero backgrounds */}
            <div className="fixed inset-0 z-10 pointer-events-none">
              <Tiles />
            </div>
            
            {/* Main Content */}
            <div className="relative z-20 min-h-screen flex flex-col">
              <Suspense fallback={<div>Loading...</div>}>
                <Navigation />
                <main className="flex-1 relative">{children}</main>
                <Footer />
              </Suspense>
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
