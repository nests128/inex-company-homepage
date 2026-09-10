import { ArrowUpIcon } from "lucide-react"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

import { Button } from "./button"
import { Badge } from "./badge"

export interface PaymentCardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Card title, e.g. "Payment". */
  title: string
  /** Small circular avatar slot rendered top-right of the title, e.g. a `PlaceholderMedia` (compact, `rounded-full`) or a real `next/image`. */
  avatar?: ReactNode
  /** Row 1 label, e.g. "Amount". */
  amountLabel: string
  /** Row 1 value, e.g. "$5,549.00 USD". */
  amountValue: string
  /** Row 2 label, e.g. "Status". */
  statusLabel: string
  /** Row 2 badge text, e.g. "Scheduled". */
  status: string
  /**
   * Badge tone for the status pill. Defaults to `neutral` (this project's
   * black & white tone, `docs/design-tokens.md`). `accent` opts into the
   * sketch's blue fill (`ref/image.png`) as a one-off accent — use only if
   * page-agent explicitly wants to match the reference color exactly.
   */
  statusTone?: "neutral" | "accent"
  /** Bottom CTA row: black circular icon button (up-arrow) + label, rendered together inside a light-grey surface spanning the card width. */
  cta: {
    label: string
    onClick?: () => void
    href?: string
  }
}

/**
 * White "Payment" widget card (reference: `ref/image.png`, floating on the
 * gradient panel in the "Workhorse delivers insight, fast" section) —
 * title + avatar, a divider, amount/status rows, and a full-width CTA
 * surface (circular up-arrow icon button + text). Ships its own opaque
 * `bg-background` so it reads correctly when placed on `GradientBackdrop`
 * (whose doc comment warns transparent children blend into the gradient).
 */
function PaymentCard({
  title,
  avatar,
  amountLabel,
  amountValue,
  statusLabel,
  status,
  statusTone = "neutral",
  cta,
  className,
  ...props
}: PaymentCardProps) {
  return (
    <div
      data-slot="payment-card"
      className={cn(
        "rounded-2xl border border-border bg-background p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-lg font-bold">{title}</div>
        {avatar ? (
          <span className="size-9 shrink-0 overflow-hidden rounded-full">
            {avatar}
          </span>
        ) : null}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <div className="flex items-center justify-between text-[13.5px]">
          <span className="text-muted-foreground">{amountLabel}</span>
          <span className="font-semibold">{amountValue}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[13.5px]">
          <span className="text-muted-foreground">{statusLabel}</span>
          <Badge
            variant="secondary"
            size="lg"
            className={cn(
              "px-3 py-1 text-[12px] font-medium",
              statusTone === "accent" && "bg-[#3b6ef6] text-white"
            )}
          >
            {status}
          </Badge>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={cta.onClick}
        render={cta.href ? <a href={cta.href} /> : undefined}
        nativeButton={!cta.href}
        className="mt-4 h-auto w-full justify-start gap-3 rounded-xl bg-muted p-2 text-[13.5px] font-medium hover:bg-muted/70"
      >
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background"
        >
          <ArrowUpIcon className="size-4" />
        </span>
        {cta.label}
      </Button>
    </div>
  )
}

export { PaymentCard }
