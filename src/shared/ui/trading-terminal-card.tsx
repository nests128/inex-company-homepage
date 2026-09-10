"use client"

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "cn"

export interface TradingTerminalOrderRow {
  /** Formatted price, e.g. "142,930,000". */
  price: string
  /** Formatted amount, e.g. "0.842". */
  amount: string
}

export interface TradingTerminalCandle {
  /** Body top/bottom as 0-100 positions within the plot area (0 = top). */
  bodyTop: number
  bodyBottom: number
  /** Wick top/bottom as 0-100 positions within the plot area (0 = top). */
  wickTop: number
  wickBottom: number
  /** Bullish (green) vs bearish (red) body color. */
  bullish: boolean
}

export interface TradingTerminalCardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Trading pair, e.g. "BTC/KRW". */
  symbol: string
  /** Formatted current price, e.g. "142,850,000". */
  price: string
  /** Formatted signed change, e.g. "+2.4%" — sign determines green/red. */
  changePercent: string
  /** Decorative candle series. Defaults to a hardcoded placeholder shape. */
  candles?: TradingTerminalCandle[]
  /** Sell-side order rows, rendered top to bottom (highest price first). */
  asks?: TradingTerminalOrderRow[]
  /** Buy-side order rows, rendered top to bottom (highest price first). */
  bids?: TradingTerminalOrderRow[]
  className?: string
}

// TODO(real-data): placeholder candle shapes only — no real price series.
const DEFAULT_CANDLES: TradingTerminalCandle[] = [
  { wickTop: 38, wickBottom: 66, bodyTop: 44, bodyBottom: 58, bullish: false },
  { wickTop: 30, wickBottom: 60, bodyTop: 34, bodyBottom: 52, bullish: true },
  { wickTop: 20, wickBottom: 48, bodyTop: 24, bodyBottom: 40, bullish: true },
  { wickTop: 26, wickBottom: 54, bodyTop: 30, bodyBottom: 46, bullish: false },
  { wickTop: 34, wickBottom: 62, bodyTop: 40, bodyBottom: 54, bullish: false },
  { wickTop: 24, wickBottom: 50, bodyTop: 28, bodyBottom: 42, bullish: true },
  { wickTop: 12, wickBottom: 38, bodyTop: 16, bodyBottom: 30, bullish: true },
  { wickTop: 18, wickBottom: 44, bodyTop: 22, bodyBottom: 36, bullish: false },
  { wickTop: 8, wickBottom: 32, bodyTop: 12, bodyBottom: 24, bullish: true },
  { wickTop: 4, wickBottom: 26, bodyTop: 6, bodyBottom: 18, bullish: true },
]

// TODO(real-data): placeholder order book rows — top (asks) to bottom (bids)
// prices decrease monotonically around the current price above.
const DEFAULT_ASKS: TradingTerminalOrderRow[] = [
  { price: "142,910,000", amount: "0.184" },
  { price: "142,890,000", amount: "0.412" },
  { price: "142,870,000", amount: "0.097" },
  { price: "142,860,000", amount: "0.256" },
]

const DEFAULT_BIDS: TradingTerminalOrderRow[] = [
  { price: "142,840,000", amount: "0.331" },
  { price: "142,820,000", amount: "0.508" },
  { price: "142,800,000", amount: "0.129" },
  { price: "142,780,000", amount: "0.274" },
]

const GRIDLINE_POSITIONS = [25, 50, 75]

/** How often a random row's amount ticks (ms). */
const TICK_INTERVAL_MS = 1800

/** How long a ticked row stays flashed before fading out (ms). Kept below `TICK_INTERVAL_MS` so flashes don't overlap/queue. */
const FLASH_DURATION_MS = 600

type Side = "ask" | "bid"

/** Nudges a formatted "0.123" amount string by a small random delta, clamped above 0. Purely decorative — no real order-book semantics. */
function jitterAmount(amount: string) {
  const value = Number.parseFloat(amount)
  if (Number.isNaN(value)) return amount
  const next = Math.max(0.001, value + (Math.random() - 0.5) * 0.06)
  return next.toFixed(3)
}

/**
 * Dark trading-terminal widget card (reference: `ref/exchange/Solutions.dc.html`
 * L54-110, "크립토 트레이딩" tab) — intentionally the one dark-themed exception
 * to this project's black-on-white minimal tone (see `docs/design-tokens.md`),
 * since a trading UI reads as more credible with a terminal-style dark
 * background. Ships its own opaque `bg-[#0B101C]` shell so it can sit on
 * `GradientBackdrop`.
 *
 * Mostly decorative — candles and the order book's prices are hardcoded
 * placeholders (no live data, no charting library) — but the order book's
 * `amount` column ticks on an interval (small random jitter + a brief
 * background flash on whichever row changed) to read as a live feed rather
 * than a static screenshot, per explicit request. This is a client
 * component for that reason; the small green pulse dot next to the
 * mid-price still uses plain CSS `animate-pulse`.
 *
 * `"use client"` state is seeded directly from the `asks`/`bids` props (not
 * randomized at mount) so the first client render matches SSR output — no
 * hydration mismatch. Ticking only starts inside `useEffect` and is skipped
 * entirely under `prefers-reduced-motion`. The interval is cleared on
 * unmount, which matters here because `operations-split` remounts this
 * component via a changing `key` on every feature-list click — without
 * cleanup, intervals would accumulate across clicks.
 */
function TradingTerminalCard({
  symbol,
  price,
  changePercent,
  candles = DEFAULT_CANDLES,
  asks: asksProp = DEFAULT_ASKS,
  bids: bidsProp = DEFAULT_BIDS,
  className,
  ...props
}: TradingTerminalCardProps) {
  const isPositive = !changePercent.trim().startsWith("-")
  const prefersReducedMotion = useReducedMotion()

  const [asks, setAsks] = useState(asksProp)
  const [bids, setBids] = useState(bidsProp)
  const [flashed, setFlashed] = useState<{ side: Side; index: number } | null>(null)
  const flashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      const side: Side = Math.random() < 0.5 ? "ask" : "bid"
      const rows = side === "ask" ? asksProp : bidsProp
      const index = Math.floor(Math.random() * rows.length)

      const setRows = side === "ask" ? setAsks : setBids
      setRows((current) =>
        current.map((row, i) => (i === index ? { ...row, amount: jitterAmount(row.amount) } : row))
      )

      setFlashed({ side, index })
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
      flashTimeoutRef.current = setTimeout(() => setFlashed(null), FLASH_DURATION_MS)
    }, TICK_INTERVAL_MS)

    return () => {
      clearInterval(interval)
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- asksProp/bidsProp are only read to seed the tick, not to resync on every render
  }, [prefersReducedMotion])

  return (
    <div
      data-slot="trading-terminal-card"
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-white/8 bg-[#0B101C] shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/7 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="text-[15px] font-extrabold text-white">{symbol}</span>
          <span className="rounded-full bg-sky-500/12 px-2 py-[3px] text-[11px] font-bold text-sky-400">
            INEX
          </span>
        </div>
        <div className="text-right">
          <div className="text-[16px] font-extrabold text-white tabular-nums">
            {price}
          </div>
          <div
            className={cn(
              "text-[13px] font-semibold tabular-nums",
              isPositive ? "text-emerald-400" : "text-red-400"
            )}
          >
            {changePercent}
          </div>
        </div>
      </div>

      <div className="grid min-h-[260px] grid-cols-[1.5fr_1fr]">
        <div className="relative border-r border-white/7 p-4">
          {GRIDLINE_POSITIONS.map((position) => (
            <div
              key={position}
              aria-hidden="true"
              className="absolute right-4 left-4 border-t border-dashed border-white/6"
              style={{ top: `${position}%` }}
            />
          ))}
          <div className="relative flex h-[228px] items-stretch justify-between">
            {candles.map((candle, index) => (
              <div key={index} aria-hidden="true" className="relative flex-1">
                <div
                  className={cn(
                    "absolute left-1/2 w-px -translate-x-1/2",
                    candle.bullish ? "bg-emerald-400" : "bg-red-400"
                  )}
                  style={{
                    top: `${candle.wickTop}%`,
                    bottom: `${100 - candle.wickBottom}%`,
                  }}
                />
                <div
                  className={cn(
                    "absolute left-1/2 w-[56%] -translate-x-1/2 rounded-[1px]",
                    candle.bullish ? "bg-emerald-400" : "bg-red-400"
                  )}
                  style={{
                    top: `${candle.bodyTop}%`,
                    bottom: `${100 - candle.bodyBottom}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 tabular-nums">
          <div className="mb-2 flex justify-between text-[10px] font-bold tracking-[.1em] text-[#5B6779]">
            <span>호가(KRW)</span>
            <span>수량(BTC)</span>
          </div>

          {asks.map((row, index) => (
            <div
              key={`ask-${index}`}
              className={cn(
                "relative mb-px flex justify-between px-1 py-[3px] text-[12px] transition-colors duration-500",
                flashed?.side === "ask" && flashed.index === index && "bg-red-400/25"
              )}
            >
              {/* Decorative depth bar: widths derived positionally (no data field for it) so the row list further from the mid-price reads as thinner. */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 right-0 bg-red-400/8"
                style={{ width: `${((index + 1) / asks.length) * 60}%` }}
              />
              <span className="relative text-red-400">{row.price}</span>
              <span className="relative text-[#93A0B8]">{row.amount}</span>
            </div>
          ))}

          <div className="my-1 flex items-center gap-2 px-1 py-1.5">
            <span className="text-[14px] font-extrabold text-white">{price}</span>
            <span
              aria-hidden="true"
              className="size-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.7)] motion-reduce:animate-none motion-reduce:shadow-none"
            />
          </div>

          {bids.map((row, index) => (
            <div
              key={`bid-${index}`}
              className={cn(
                "relative mb-px flex justify-between px-1 py-[3px] text-[12px] transition-colors duration-500",
                flashed?.side === "bid" && flashed.index === index && "bg-emerald-400/25"
              )}
            >
              <div
                aria-hidden="true"
                className="absolute inset-y-0 right-0 bg-emerald-400/8"
                style={{ width: `${(1 - index / bids.length) * 60}%` }}
              />
              <span className="relative text-emerald-400">{row.price}</span>
              <span className="relative text-[#93A0B8]">{row.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { TradingTerminalCard }
