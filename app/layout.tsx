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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Allison&family=Calligraffitti&family=Caveat:wght@400..700&family=Cedarville+Cursive&family=Cinzel:wght@400..900&family=Courgette&family=Edu+AU+VIC+WA+NT+Arrows:wght@400..700&family=Edu+AU+VIC+WA+NT+Dots:wght@400..700&family=Homemade+Apple&family=Island+Moments&family=Knewave&family=Merienda:wght@300..900&family=Monoton&family=Nosifer&family=Playwrite+DK+Loopet:wght@100..400&family=Playwrite+IS:wght@100..400&family=Qwitcher+Grypen:wght@400;700&family=Slabo+27px&family=Story+Script&family=Tomorrow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Turret+Road:wght@200;300;400;500;700;800&family=Vast+Shadow&display=swap" rel="stylesheet" />
      </head>
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
