import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface OrderbookPreviewRow {
  /** Formatted price, e.g. "142,910,000". */
  price: string
  /** Formatted amount, e.g. "0.184". */
  amount: string
}

export interface OrderbookPreviewProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Sell-side rows, top to bottom (highest price first). Expected: 2-3 rows to fit the preview's compact height. */
  asks: OrderbookPreviewRow[]
  /** Buy-side rows, top to bottom (highest price first). Expected: 2-3 rows to fit the preview's compact height. */
  bids: OrderbookPreviewRow[]
  className?: string
}

/**
 * Miniature order-book stand-in for `TradingTerminalCard`'s order book panel
 * — a small dark thumbnail meant to sit under an `IconFeatureCard`'s
 * "오더북 & 마켓 데이터 API" copy, not a functional order book. No live
 * ticking (unlike `TradingTerminalCard`) — a static `animate-pulse` dot
 * next to the spread row is enough to read as "live" at this size, and
 * pure CSS keeps this a server component.
 */
function OrderbookPreview({ asks, bids, className, ...props }: OrderbookPreviewProps) {
  return (
    <div
      data-slot="orderbook-preview"
      className={cn(
        "w-full overflow-hidden rounded-xl border border-white/8 bg-[#0B101C] px-3 py-2.5 tabular-nums",
        className
      )}
      {...props}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[9.5px] font-bold tracking-[.08em] text-[#5B6779]">호가</span>
        <span
          aria-hidden="true"
          className="size-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_6px_1.5px_rgba(52,211,153,0.7)] motion-reduce:animate-none motion-reduce:shadow-none"
        />
      </div>

      {asks.map((row, index) => (
        <div key={`ask-${index}`} className="flex justify-between py-[1.5px] text-[10.5px]">
          <span className="text-red-400">{row.price}</span>
          <span className="text-[#93A0B8]">{row.amount}</span>
        </div>
      ))}

      <div className="my-1 h-px bg-white/8" aria-hidden="true" />

      {bids.map((row, index) => (
        <div key={`bid-${index}`} className="flex justify-between py-[1.5px] text-[10.5px]">
          <span className="text-emerald-400">{row.price}</span>
          <span className="text-[#93A0B8]">{row.amount}</span>
        </div>
      ))}
    </div>
  )
}

export { OrderbookPreview }
