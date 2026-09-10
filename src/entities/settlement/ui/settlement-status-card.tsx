import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

import { Button } from "@/shared/ui/button"
import { ProgressBar } from "@/shared/ui/progress-bar"

export interface SettlementStatusBar {
  id: string
  /** Row label, e.g. "수납 정산". */
  label: string
  /** Percentage 0-100. */
  pct: number
}

export interface SettlementStatusCardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Card title, e.g. "당일 정산 현황". */
  title: string
  bars: SettlementStatusBar[]
  /** Footer summary line, e.g. "₩100억 중 ₩82억 정산 완료". */
  summary: string
  /** Bottom CTA, e.g. "정산 관리 →". Omit to hide the button. */
  cta?: {
    label: string
    onClick?: () => void
    href?: string
  }
}

/**
 * "당일 정산 현황" card — title + stacked `ProgressBar`s + summary line +
 * CTA (wireframe operations split section ~L198-217). Composes the shared
 * `ProgressBar` primitive; this wrapper owns the settlement-specific layout.
 */
function SettlementStatusCard({
  title,
  bars,
  summary,
  cta,
  className,
  ...props
}: SettlementStatusCardProps) {
  return (
    <div
      data-slot="settlement-status-card"
      className={cn(
        "rounded-2xl border border-border p-7 shadow-[0_20px_50px_rgba(0,0,0,0.06)]",
        className
      )}
      {...props}
    >
      <div className="mb-5 text-base font-bold">{title}</div>

      <div className="flex flex-col gap-4">
        {bars.map((bar) => (
          <ProgressBar key={bar.id} label={bar.label} percent={bar.pct} />
        ))}
      </div>

      <div className="mt-1 border-t border-border pt-4 text-[13px] text-muted-foreground">
        {summary}
      </div>

      {cta ? (
        <Button
          variant="pill-solid"
          onClick={cta.onClick}
          render={cta.href ? <a href={cta.href} /> : undefined}
          nativeButton={!cta.href}
          className="mt-4 h-auto w-full justify-center rounded-xl py-3.5 text-sm font-semibold"
        >
          {cta.label}
        </Button>
      ) : null}
    </div>
  )
}

export { SettlementStatusCard }
