'use client';
import React, { useMemo, type JSX } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextShimmerProps {
  children?: string;
  text?: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
  shimmerType?: 'default' | 'gold' | 'primary' | 'rainbow';
}

export function TextShimmer({
  children,
  text,
  as: Component = 'span',
  className,
  duration = 2,
  spread = 2,
  shimmerType = 'default',
}: TextShimmerProps) {
  const MotionComponent = motion(Component as keyof JSX.IntrinsicElements);
  const displayText = text || children || '';

  const dynamicSpread = useMemo(() => {
    return displayText.length * spread;
  }, [displayText, spread]);

  const shimmerClasses = {
    default: 'relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent [--base-color:#4a5568] [--base-gradient-color:#1a202c] [--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box] dark:[--base-color:#a0aec0] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]',
    gold: 'text-shimmer-gold',
    primary: 'text-shimmer-primary',
    rainbow: 'relative inline-block bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse',
  };

  const baseClasses = shimmerClasses[shimmerType];

  if (shimmerType === 'gold' || shimmerType === 'primary') {
    return (
      <span className={cn(baseClasses, className)}>
        {displayText}
      </span>
    );
  }

  if (shimmerType === 'rainbow') {
    return (
      <span className={cn(baseClasses, className)}>
        {displayText}
      </span>
    );
  }

  return (
    <MotionComponent
      className={cn(baseClasses, className)}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
    >
      {displayText}
    </MotionComponent>
  );
}
