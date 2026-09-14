import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface OrderbookPreviewRow {
  /** Formatted price, e.g. "142,910,000". */
  price: string
  /** Formatted amount, e.g. "0.184". */
  amount: string
  /**
   * Depth bar fill, 0-1 (share of this side's max amount). Renders a
   * background bar growing from the price/amount edge, matching the
   * reference INEX orderbook screenshot (사용자 제공 이미지, 매도=파랑 바가
   * 오른쪽에서 채워짐 / 매수=빨강 바). Omit to render no bar (plain rows).
   */
  depth?: number
  /** Formatted change percent vs. previous close, e.g. "+3.02%". Optional — omit to hide. */
  changePercent?: string
}

export interface OrderbookPreviewProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Sell-side rows, top to bottom (highest price first). Expected: 2-3 rows to fit the preview's compact height. */
  asks: OrderbookPreviewRow[]
  /** Buy-side rows, top to bottom (highest price first). Expected: 2-3 rows to fit the preview's compact height. */
  bids: OrderbookPreviewRow[]
  className?: string
}

/** One price/amount row with an optional depth-bar background and change-percent column. */
function OrderbookRow({
  row,
  side,
}: {
  row: OrderbookPreviewRow
  side: "ask" | "bid"
}) {
  const barColor = side === "ask" ? "bg-sky-400/15" : "bg-red-400/15"
  const priceColor = side === "ask" ? "text-sky-400" : "text-red-400"

  return (
    <div className="relative flex items-center justify-between py-[1.5px] text-[10.5px]">
      {row.depth !== undefined ? (
        <span
          aria-hidden="true"
          className={cn("absolute inset-y-0 right-0", barColor)}
          style={{ width: `${Math.min(1, Math.max(0, row.depth)) * 100}%` }}
        />
      ) : null}
      <span className={cn("relative", priceColor)}>{row.price}</span>
      <span className="relative flex items-center gap-1.5">
        <span className="text-[#93A0B8]">{row.amount}</span>
        {row.changePercent ? (
          <span className={cn("text-[9.5px]", priceColor)}>{row.changePercent}</span>
        ) : null}
      </span>
    </div>
  )
}

/**
 * Miniature order-book stand-in for `TradingTerminalCard`'s order book panel
 * — a small dark thumbnail meant to sit under an `IconFeatureCard`'s
 * "오더북 & 마켓 데이터 API" copy, not a functional order book. Ref: 사용자
 * 제공 INEX 거래소 호가창 스크린샷 — 매도(파랑)/매수(빨강) depth bar +
 * 등락률 컬럼을 핵심만 옮겼다(통계 헤더/체결강도 바는 이 미리보기 크기에는
 * 담지 않음). No live ticking (unlike `TradingTerminalCard`) — a static
 * `animate-pulse` dot next to the spread row is enough to read as "live" at
 * this size, and pure CSS keeps this a server component.
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
        <OrderbookRow key={`ask-${index}`} row={row} side="ask" />
      ))}

      <div className="my-1 h-px bg-white/8" aria-hidden="true" />

      {bids.map((row, index) => (
        <OrderbookRow key={`bid-${index}`} row={row} side="bid" />
      ))}
    </div>
  )
}

export { OrderbookPreview }
