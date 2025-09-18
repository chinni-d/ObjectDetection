"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Detection", href: "/detection" },
  { name: "About", href: "/about" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  })
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateUnderline = () => {
      if (!navRef.current || !headerRef.current) return

      const activeLink = navRef.current.querySelector(`[data-path="${pathname}"]`) as HTMLElement
      if (activeLink) {
        const headerRect = headerRef.current.getBoundingClientRect()
        const linkRect = activeLink.getBoundingClientRect()
        
        setUnderlineStyle({
          width: linkRect.width,
          left: linkRect.left - headerRect.left,
          opacity: 1,
        })
      } else {
        setUnderlineStyle(prev => ({ ...prev, opacity: 0 }))
      }
    }

    updateUnderline()
    
    // Add a small delay to ensure the DOM has updated
    const timeoutId = setTimeout(updateUnderline, 100)
    
    // Update on window resize
    window.addEventListener('resize', updateUnderline)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updateUnderline)
    }
  }, [pathname])

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-40 w-full border-b border-border/80 dark:border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Eye className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">VisionAI</span>
            </Link>
          </div>
          <div className="flex lg:hidden items-center gap-6">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 mr-2"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <div className="hidden lg:flex lg:gap-x-6" ref={navRef}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                data-path={item.href}
                className={cn(
                  "text-sm font-semibold leading-4 transition-all duration-300 hover:text-primary relative py-2 px-3 hover:scale-105",
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
            <ThemeToggle />
            <Button asChild>
              <Link href="/detection">Start Detection</Link>
            </Button>
          </div>
        </nav>
        
        {/* Enhanced animated underline on header border */}
        <div
          className="absolute bottom-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80 transition-all duration-500 ease-out rounded-full shadow-lg shadow-primary/30 z-10"
          style={{
            width: `${underlineStyle.width}px`,
            left: `${underlineStyle.left}px`,
            opacity: underlineStyle.opacity,
            transform: 'translateY(1px)',
            filter: 'blur(0.5px)',
          }}
        />
        {/* Glow effect */}
        <div
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-500 ease-out rounded-full opacity-60 z-10"
          style={{
            width: `${underlineStyle.width + 8}px`,
            left: `${underlineStyle.left - 4}px`,
            opacity: underlineStyle.opacity * 0.4,
            transform: 'translateY(1px)',
            filter: 'blur(2px)',
          }}
        />
      </header>

      {/* Mobile menu overlay */}
      <div className={`lg:hidden fixed inset-0 z-50 ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} role="dialog" aria-modal="true">
        {/* Background overlay with smooth fade */}
        <div 
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        
        {/* Sliding panel from right with 60% width */}
        <div className={`fixed inset-y-0 right-0 w-3/5 transform transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex h-full flex-col overflow-y-auto bg-background/95 backdrop-blur-md shadow-2xl border-l border-border/50">
            {/* Header */}
            <div className="px-6 py-6 border-b border-border/30">
              <div className="flex items-center justify-between">
                <Link 
                  href="/" 
                  className="-m-1.5 p-1.5 flex items-center gap-3" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Eye className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold">VisionAI</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 hover:bg-muted/50"
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
            </div>
            
            {/* Navigation links */}
            <div className="flex-1 px-6 py-6">
              <nav className="space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
                      pathname === item.href 
                        ? "text-primary bg-primary/10 border border-primary/20 shadow-sm" 
                        : "text-foreground hover:text-primary hover:bg-muted/50 hover:translate-x-1",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={cn(
                      "w-2 h-2 rounded-full mr-3 transition-all duration-200",
                      pathname === item.href 
                        ? "bg-primary" 
                        : "bg-muted-foreground/30 group-hover:bg-primary/60"
                    )} />
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              {/* Separator */}
              <div className="my-6 border-t border-border/30"></div>
              
              {/* Theme toggle section */}
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm font-medium text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
