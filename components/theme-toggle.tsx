"use client"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  return (
    <div className="flex items-center bg-muted/50 dark:bg-gray-100/10 rounded-full p-0.5 border border-border/50">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("light")}
        className={`h-7 w-7 rounded-full p-0 transition-all duration-200 cursor-pointer hover:scale-105 hover:!bg-transparent hover:!text-inherit focus:!bg-transparent focus:!text-inherit active:!bg-transparent active:!text-inherit ${
          theme === "light" 
            ? "bg-background dark:bg-white shadow-md text-foreground dark:text-black border border-border/20" 
            : "text-muted-foreground/70"
        }`}
        style={{
          '--tw-ring-color': 'transparent'
        } as React.CSSProperties}
      >
        <Sun className="h-3.5 w-3.5" />
        <span className="sr-only">Light mode</span>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("dark")}
        className={`h-7 w-7 rounded-full p-0 mx-0.5 transition-all duration-200 cursor-pointer hover:scale-105 hover:!bg-transparent hover:!text-inherit focus:!bg-transparent focus:!text-inherit active:!bg-transparent active:!text-inherit ${
          theme === "dark" 
            ? "bg-background dark:bg-white shadow-md text-foreground dark:text-black border border-border/20" 
            : "text-muted-foreground/70"
        }`}
        style={{
          '--tw-ring-color': 'transparent'
        } as React.CSSProperties}
      >
        <Moon className="h-3.5 w-3.5" />
        <span className="sr-only">Dark mode</span>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("system")}
        className={`h-6 w-6 rounded-full p-0 transition-all duration-200 cursor-pointer hover:scale-105 hover:!bg-transparent hover:!text-inherit focus:!bg-transparent focus:!text-inherit active:!bg-transparent active:!text-inherit ${
          theme === "system" 
            ? "bg-background dark:bg-white shadow-md text-foreground dark:text-black border border-border/20" 
            : "text-muted-foreground/70"
        }`}
        style={{
          '--tw-ring-color': 'transparent'
        } as React.CSSProperties}
      >
        <Monitor className="h-3 w-3" />
        <span className="sr-only">System mode</span>
      </Button>
    </div>
  )
}