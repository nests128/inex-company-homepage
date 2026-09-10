import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

export interface StatGridProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** `StatItem` elements (2 on mobile grid columns, 4 on desktop per wireframe). */
  children: ReactNode
}

/**
 * Layout-only 2/4-column grid for `StatItem`s (wireframe stats band
 * ~L190-196 desktop, ~L374-379 mobile: `grid-template-columns:repeat(4,1fr)`
 * desktop, `repeat(2,1fr)` mobile). Renders content only — no background
 * color or section padding; the dark (#111) fill and vertical padding are
 * the widget's responsibility per the container-inex convention.
 */
function StatGrid({ children, className, ...props }: StatGridProps) {
  return (
    <div
      data-slot="stat-grid"
      className={cn("grid grid-cols-2 gap-x-[22px] gap-y-6 sm:grid-cols-4 sm:gap-6", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { StatGrid }
