import * as React from "react"
import { cn } from "../../lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Card.displayName = "Card"

export { Card }
