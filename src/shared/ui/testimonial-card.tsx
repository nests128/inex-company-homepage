import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

export interface TestimonialCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Quote copy. Supports `\n` for a manual line break. */
  quote: string
  /** Avatar slot. Omit to keep the striped placeholder circle. */
  avatar?: ReactNode
  attributionName: string
  attributionRole: string
}

/**
 * Small, left-aligned quote card for the 2x2 "Customers love ..." grid
 * (`ref/image3.png`). Distinct from `QuoteBlock`: left-aligned (not
 * centered), avatar sits above the quote (not beside the attribution below
 * it), no baked-in mobile/desktop attribution swap, and a light muted-card
 * background rather than being a bare typographic block — different enough
 * in structure/DOM order that a `variant` on `QuoteBlock` would amount to a
 * rewrite, so this is a new component.
 */
function TestimonialCard({
  quote,
  avatar,
  attributionName,
  attributionRole,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <div
      data-slot="testimonial-card"
      className={cn(
        "flex flex-col gap-4 rounded-2xl bg-muted p-5 sm:gap-5 sm:p-6",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="size-9 shrink-0 overflow-hidden rounded-full bg-[repeating-linear-gradient(45deg,#eee_0_6px,#ddd_6px_12px)]"
      >
        {avatar}
      </span>

      <blockquote className="text-[14.5px] leading-[1.55] font-medium text-balance sm:text-base">
        {quote.split("\n").map((line, index) => (
          <span key={index}>
            {index > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </blockquote>

      <div className="mt-auto">
        <div className="text-[13.5px] font-bold">{attributionName}</div>
        <div className="text-[12.5px] text-muted-foreground">{attributionRole}</div>
      </div>
    </div>
  )
}

export { TestimonialCard }
