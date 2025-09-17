import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileThemeMeta } from "@/components/mobile-theme-meta"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Tiles } from "@/components/tiles"
import { FullscreenWrapper } from "@/components/fullscreen-wrapper"
import { Suspense } from "react"
import "./globals.css"


export const metadata: Metadata = {
  title: "VisionAI",
  description: "Professional video-based object detection powered by AI",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' }
    ]
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VisionAI"
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes"
  }
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
          <MobileThemeMeta />
          <FullscreenWrapper>
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
          </FullscreenWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
