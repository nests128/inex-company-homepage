import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

export interface ComplianceCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Icon slot (shield/check, etc). Purely decorative — caller applies `aria-hidden`. */
  icon?: ReactNode
  /** Item title, e.g. "VASP 신고". */
  title: string
  /** Optional emphasized value/badge, e.g. "제2024-3호" or "5년". */
  highlight?: string
  /** Supporting description, e.g. "2024년 10월 수리". */
  description: string
}

/**
 * Single regulatory/compliance fact card (icon + title + optional highlight +
 * description). Distinct from `TrustCard`, which stacks multiple
 * title/sub `items` under a shared "no · category" label — this renders one
 * fact per card, so a `variant` on `TrustCard` would change its item-list
 * shape entirely. Also distinct from `TestimonialCard`: no quote/avatar,
 * plain `<h3>` instead of `<blockquote>`.
 */
function ComplianceCard({
  icon,
  title,
  highlight,
  description,
  className,
  ...props
}: ComplianceCardProps) {
  return (
    <div
      data-slot="compliance-card"
      className={cn("flex flex-col gap-4 rounded-2xl bg-muted p-5 sm:gap-5 sm:p-6", className)}
      {...props}
    >
      {icon ? <div className="text-foreground">{icon}</div> : null}

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[15.5px] font-bold sm:text-base">{title}</h3>
          {highlight ? (
            <span className="font-mono text-[12.5px] text-muted-foreground">{highlight}</span>
          ) : null}
        </div>
        <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export { ComplianceCard }
