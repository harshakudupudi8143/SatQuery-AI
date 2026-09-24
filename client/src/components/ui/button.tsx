import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface ButtonProps extends React.ComponentProps<typeof motion.button> {
  variant?: "default" | "secondary" | "danger" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-semibold tracking-wide transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 backdrop-blur-md shadow-lg border border-white/20",
          {
            "bg-primary/40 hover:bg-primary/60 text-white shadow-primary/20": variant === "default",
            "bg-secondary/40 hover:bg-secondary/60 text-white shadow-secondary/20": variant === "secondary",
            "bg-danger/40 hover:bg-danger/60 text-white shadow-danger/20": variant === "danger",
            "bg-white/5 hover:bg-white/10 text-textMuted hover:text-white": variant === "outline" || variant === "ghost",
            "h-12 px-6 py-2 text-sm": size === "default",
            "h-10 px-4 text-xs": size === "sm",
            "h-14 px-8 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
