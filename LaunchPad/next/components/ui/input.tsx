import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-expanova-border bg-expanova-surface/50 px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition-all duration-200",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-expanova-primary focus-visible:ring-offset-2 focus-visible:ring-offset-expanova-bg",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-expanova-surface",
          "hover:border-expanova-border-focus",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

