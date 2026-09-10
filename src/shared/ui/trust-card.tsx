import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface TrustCardItem {
  /** Item title, e.g. "VASP 신고 수리". */
  title: string
  /** Item sub-line, e.g. "2024.10 · FIU". */
  sub: string
}

export interface TrustCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Certificate/index number, e.g. "01". */
  no: string
  /** Category label, e.g. "규제". */
  category: string
  /**
   * List of title+sub entries stacked in the card. Wireframe always shows
   * two, but this is generalized to any count so page-agent isn't locked in.
   */
  items: TrustCardItem[]
}

/**
 * Trust/compliance card: "01 · 규제" label followed by stacked
 * title+sub entries (wireframe trust grid ~L271-289).
 */
function TrustCard({ no, category, items, className, ...props }: TrustCardProps) {
  return (
    <div
      data-slot="trust-card"
      className={cn(
        "rounded-2xl border border-border bg-background p-6",
        className
      )}
      {...props}
    >
      <div className="mb-3.5 text-xs font-semibold text-muted-foreground">
        {no} · {category}
      </div>
      <div className="flex flex-col">
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`} className={index > 0 ? "mt-3.5" : undefined}>
            <div className="text-[15.5px] font-bold">{item.title}</div>
            <div className="mt-[3px] font-mono text-[12.5px] text-muted-foreground">
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { TrustCard }
