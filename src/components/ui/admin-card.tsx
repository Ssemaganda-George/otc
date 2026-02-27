import * as React from "react"

import { cn } from "@/lib/utils"
import {
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

const AdminCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Flat edges, subtle border, restrained shadow for a professional admin look
      "bg-white shadow-sm hover:shadow-md border border-gray-200 p-6 transition-all duration-200",
      className
    )}
    {...props}
  />
))
AdminCard.displayName = "AdminCard"

// Re-export the existing subcomponents from the main Card module so admin code can
// keep using familiar names while opting into the admin card wrapper.
export {
  AdminCard as Card,
  CardHeader as CardHeader,
  CardFooter as CardFooter,
  CardTitle as CardTitle,
  CardDescription as CardDescription,
  CardContent as CardContent,
}

export default AdminCard
