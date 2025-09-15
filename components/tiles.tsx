"use client"

import React from "react"
import { motion } from "framer-motion"

export function Tiles() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="w-full h-full opacity-25 dark:opacity-35">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="tile-pattern"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <rect
                width="50"
                height="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/40 dark:text-red-500/50"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#tile-pattern)"
          />
        </svg>
        
        {/* Additional grid lines for better visibility in dark mode */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(59 130 246 / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(59 130 246 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} 
        />
        
        {/* Dark mode specific grid */}
        <div 
          className="absolute inset-0 dark:block hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(239 68 68 / 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(239 68 68 / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} 
        />
      </div>
    </div>
  )
}