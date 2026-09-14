import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export type CandlestickChartProps = Omit<ComponentPropsWithoutRef<"svg">, "viewBox">

interface Candle {
  open: number
  close: number
  high: number
  low: number
}

/**
 * Hardcoded decorative price series — dips through the first third, then
 * recovers and trends up, so the chart reads as a plausible "V-shaped
 * recovery" rather than random noise (stand-in for the trading screenshot
 * this replaces, `ref/hero3.png`).
 */
const CANDLES: Candle[] = [
  { open: 108, close: 101, high: 110, low: 98 },
  { open: 101, close: 94, high: 103, low: 90 },
  { open: 94, close: 96, high: 99, low: 88 },
  { open: 96, close: 84, high: 97, low: 80 },
  { open: 84, close: 76, high: 86, low: 72 },
  { open: 76, close: 79, high: 82, low: 70 },
  { open: 79, close: 68, high: 80, low: 64 },
  { open: 68, close: 72, high: 75, low: 63 },
  { open: 72, close: 86, high: 88, low: 70 },
  { open: 86, close: 94, high: 97, low: 84 },
  { open: 94, close: 91, high: 98, low: 88 },
  { open: 91, close: 106, high: 108, low: 90 },
  { open: 106, close: 113, high: 116, low: 103 },
  { open: 113, close: 122, high: 125, low: 110 },
  { open: 122, close: 134, high: 137, low: 119 },
]

const VIEWPORT_WIDTH = 200
const VIEWPORT_HEIGHT = 320
const PADDING_X = 10
const PADDING_Y = 18

const PRICE_MIN = Math.min(...CANDLES.map((c) => c.low))
const PRICE_MAX = Math.max(...CANDLES.map((c) => c.high))

const PLOT_HEIGHT = VIEWPORT_HEIGHT - PADDING_Y * 2
const PLOT_WIDTH = VIEWPORT_WIDTH - PADDING_X * 2

function priceToY(price: number) {
  return (
    PADDING_Y +
    PLOT_HEIGHT -
    ((price - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * PLOT_HEIGHT
  )
}

const CANDLE_SLOT = PLOT_WIDTH / CANDLES.length
const CANDLE_BODY_WIDTH = CANDLE_SLOT * 0.56

const BULLISH_COLOR = "#22c55e"
const BEARISH_COLOR = "#ef4444"

const GRIDLINE_COUNT = 4

/**
 * Purely decorative, hardcoded synthetic candlestick chart — no real data,
 * no charting library. Stands in for the trading-app screenshot previously
 * used in the hero (`ref/hero3.png`). Designed against a narrow, tall slot
 * (~200:320 aspect) matching that spot in the hero visual composite.
 */
function CandlestickChart({ className, ...props }: CandlestickChartProps) {
  return (
    <svg
      data-slot="candlestick-chart"
      viewBox={`0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={cn("block h-full w-full", className)}
      {...props}
    >
      <rect
        x={0}
        y={0}
        width={VIEWPORT_WIDTH}
        height={VIEWPORT_HEIGHT}
        fill="#0a0e1a"
      />

      {Array.from({ length: GRIDLINE_COUNT }).map((_, index) => {
        const y =
          PADDING_Y + (PLOT_HEIGHT / (GRIDLINE_COUNT - 1)) * index
        return (
          <line
            key={index}
            x1={PADDING_X}
            y1={y}
            x2={VIEWPORT_WIDTH - PADDING_X}
            y2={y}
            stroke="#ffffff"
            strokeOpacity={0.06}
            strokeWidth={1}
          />
        )
      })}

      {CANDLES.map((candle, index) => {
        const isBullish = candle.close >= candle.open
        const color = isBullish ? BULLISH_COLOR : BEARISH_COLOR
        const centerX = PADDING_X + CANDLE_SLOT * (index + 0.5)

        const bodyTopPrice = Math.max(candle.open, candle.close)
        const bodyBottomPrice = Math.min(candle.open, candle.close)
        const bodyTop = priceToY(bodyTopPrice)
        const bodyBottom = priceToY(bodyBottomPrice)
        const bodyHeight = Math.max(bodyBottom - bodyTop, 1.5)

        const wickTop = priceToY(candle.high)
        const wickBottom = priceToY(candle.low)

        return (
          <g key={index}>
            <line
              x1={centerX}
              y1={wickTop}
              x2={centerX}
              y2={wickBottom}
              stroke={color}
              strokeWidth={1.5}
            />
            <rect
              x={centerX - CANDLE_BODY_WIDTH / 2}
              y={bodyTop}
              width={CANDLE_BODY_WIDTH}
              height={bodyHeight}
              fill={color}
              rx={1}
            />
          </g>
        )
      })}
    </svg>
  )
}

export { CandlestickChart }
