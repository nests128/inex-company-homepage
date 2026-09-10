import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

export interface IconFeatureCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Icon rendered inside the small badge tile, e.g. a lucide-react icon. */
  icon: ReactNode
  /** Card title, shown inline next to the icon badge. */
  title: string
  /** Supporting description copy (2-3 lines). */
  description: string
  /**
   * Optional visual rendered inside the card, below the description (e.g. a
   * `PlaceholderMedia` with a real photo). Omit for the plain text-only
   * card.
   */
  image?: ReactNode
}

/**
 * Muted card with an inline icon badge + title row followed by a description
 * paragraph, and an optional image below that. Simpler than `ComplianceCard`
 * (no highlight/stacked icon) and `TrustCard` (no no/category label or
 * nested item list) — icon and title share one row, matching a flat 3-up
 * feature grid.
 */
function IconFeatureCard({
  icon,
  title,
  description,
  image,
  className,
  ...props
}: IconFeatureCardProps) {
  return (
    <div
      data-slot="icon-feature-card"
      className={cn("flex flex-col rounded-2xl bg-muted p-6", className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-foreground [&_svg]:size-4.5"
        >
          {icon}
        </span>
        <h3 className="text-[15.5px] font-bold">{title}</h3>
      </div>
      <p className="mt-4 text-[13.5px] leading-[1.6] text-muted-foreground">{description}</p>
      {image ? <div className="mt-5">{image}</div> : null}
    </div>
  )
}

export { IconFeatureCard }
