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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedStepCard({ children, delay = 0, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.03, y: -8 }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
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
      whileHover={{ rotate: 5, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  )
}