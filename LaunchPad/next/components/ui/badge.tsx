import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-expanova-primary focus:ring-offset-2 focus:ring-offset-expanova-bg shadow-sm",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-button text-white shadow-expanova-glow",
        secondary:
          "border border-expanova-border/40 bg-expanova-surface/80 text-white/80 backdrop-blur-sm",
        destructive:
          "border-transparent bg-expanova-error/90 text-white",
        outline: "border-expanova-border/60 bg-transparent text-white/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
