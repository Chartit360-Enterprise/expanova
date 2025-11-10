import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-lg border border-expanova-border bg-expanova-surface/50 px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-expanova-primary focus-visible:ring-offset-2 focus-visible:ring-offset-expanova-bg",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-expanova-surface",
          "hover:border-expanova-border-focus",
          "resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

