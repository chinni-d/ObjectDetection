"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedCard({ children, delay = 0, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true }}
      className={className}
    >
      <motion.div
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          transition: { duration: 0.3 }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function AnimatedStepCard({ children, delay = 0, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.7, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.03, 
        y: -12,
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true }}
      className={className}
    >
      <motion.div
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          borderColor: "hsl(var(--primary) / 0.4)",
          transition: { duration: 0.3 }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface AnimatedNumberProps {
  children: ReactNode
  className?: string
}

export function AnimatedNumber({ children, className = "" }: AnimatedNumberProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.6, 
        type: "spring", 
        stiffness: 200, 
        damping: 15
      }}
      whileHover={{ 
        rotate: [0, -5, 5, -5, 0], 
        scale: 1.15,
        transition: { duration: 0.4 }
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}