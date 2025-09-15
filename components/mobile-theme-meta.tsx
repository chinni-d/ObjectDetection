"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function MobileThemeMeta() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    // Function to update theme-color meta tag
    const updateThemeColor = (isDark: boolean) => {
      // Remove existing theme-color meta tags
      const existingMetas = document.querySelectorAll('meta[name="theme-color"]')
      existingMetas.forEach(meta => meta.remove())

      // Add new theme-color meta tag
      const meta = document.createElement('meta')
      meta.name = 'theme-color'
      meta.content = isDark ? '#000000ff' : '#ffffff'
      document.head.appendChild(meta)

      // Update apple status bar style
      const appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
      if (appleStatusBar) {
        appleStatusBar.setAttribute('content', isDark ? 'black-translucent' : 'default')
      } else {
        const appleMeta = document.createElement('meta')
        appleMeta.name = 'apple-mobile-web-app-status-bar-style'
        appleMeta.content = isDark ? 'black-translucent' : 'default'
        document.head.appendChild(appleMeta)
      }
    }

    // Determine if we're in dark mode
    const isDark = resolvedTheme === 'dark' || 
                   (resolvedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    updateThemeColor(isDark)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (resolvedTheme === 'system') {
        updateThemeColor(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, resolvedTheme])

  return null
}