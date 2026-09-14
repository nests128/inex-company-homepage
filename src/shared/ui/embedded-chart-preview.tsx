import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface EmbeddedChartPreviewCandle {
  /** Body top/bottom as 0-100 positions within the plot area (0 = top). */
  bodyTop: number
  bodyBottom: number
  /** Wick top/bottom as 0-100 positions within the plot area (0 = top). */
  wickTop: number
  wickBottom: number
  /** Bullish (green) vs bearish (red) body color. */
  bullish: boolean
}

export interface EmbeddedChartPreviewProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Trading pair, e.g. "BTC/KRW". */
  symbol: string
  /** Formatted current price, e.g. "142,850,000". */
  price: string
  /** Decorative candle series. */
  candles: EmbeddedChartPreviewCandle[]
  className?: string
}

/**
 * Miniature, chart-only stand-in for `TradingTerminalCard` (no order book) —
 * sized as a small thumbnail preview under an `IconFeatureCard`'s "임베디드
 * 차트" copy, not as a standalone widget. Keeps the same dark terminal shell
 * (`docs/design-tokens.md`'s one dark-theme exception for trading UI) but
 * drops everything except a symbol/price header and a compact candle row.
 */
function EmbeddedChartPreview({
  symbol,
  price,
  candles,
  className,
  ...props
}: EmbeddedChartPreviewProps) {
  return (
    <div
      data-slot="embedded-chart-preview"
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-xl border border-white/8 bg-[#0B101C]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 px-3 pt-3">
        <span className="text-[11px] font-bold text-white">{symbol}</span>
        <span className="text-[11px] font-semibold tabular-nums text-emerald-400">
          {price}
        </span>
      </div>

      <div className="relative flex h-20 flex-1 items-stretch justify-between gap-[2px] px-3 pb-3 pt-2">
        {/* ref/exchange/chart.png: faint horizontal gridlines behind the
            candles, TradingView-style. Decorative only. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-2 bottom-3 flex flex-col justify-between">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-px bg-white/[0.06]" />
          ))}
        </div>

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
                "absolute left-1/2 w-[70%] -translate-x-1/2 rounded-[1px]",
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
  )
}

export { EmbeddedChartPreview }
