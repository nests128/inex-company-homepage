"use client"

import type { ComponentPropsWithoutRef } from "react"
import { motion, useReducedMotion, type Transition } from "motion/react"
import { cn } from "cn"

export interface BalanceBarChartCardBar {
  /** Label rendered under the bar, e.g. "Bills". */
  label: string
  /**
   * Bar fill height as a raw percentage (0-100) of the track. NOT normalized
   * against the other bars in the array (matches `AccountCard`'s documented
   * `segments[].percent` behavior) — if the caller wants the tallest bar to
   * reach the top of the track, they must pass 100 for it themselves.
   */
  percent: number
  /**
   * Renders this bar in the `bg-sky-500` accent color instead of the default
   * neutral gray. When no bar in the array sets this, the last bar is
   * accented by default (matches the Workhorse reference, where the
   * right-most "Play" bar is the highlighted one).
   */
  accent?: boolean
}

/**
 * Native DOM event props whose signatures conflict with `motion/react`'s own
 * (drag/pan/animation) props of the same name — same seam as `Reveal`
 * (`src/shared/ui/reveal.tsx`).
 */
type MotionConflictingProps =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"

export interface BalanceBarChartCardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children" | MotionConflictingProps> {
  /** Card title, e.g. "Balances". */
  title: string
  /** Bar data, rendered left to right in array order. */
  bars: BalanceBarChartCardBar[]
  className?: string
}

/** Track height (px). Bars grow from 0 to `percent`% of this. */
const TRACK_HEIGHT_PX = 140

/** Frame (card shell + title + empty tracks) fade-in duration (s). Short and simple — this component is expected to be wrapped in its own `Reveal`, so it shouldn't duplicate a heavy entrance. */
const FRAME_TRANSITION: Transition = { type: "tween", duration: 0.3 }

/** Delay (s) before the first bar starts growing, after the frame appears. */
const BARS_START_DELAY = 0.25

/** Per-bar stagger step (s). */
const BAR_STAGGER_STEP = 0.08

/** Bar grow duration (s). */
const BAR_GROW_DURATION = 0.6

const BAR_GROW_EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1]

/**
 * "Balances" style vertical bar chart card (Workhorse SaaS template
 * reference: https://workhorse-saas-software-template.webflow.io/home-3,
 * "Admin that looks after itself" section) — white card, title top-left,
 * N vertical bars bottom-aligned in fixed-height tracks with labels
 * underneath, one bar (by default the last) highlighted in the `sky-500`
 * accent color.
 *
 * Animation always plays on mount (`initial`/`animate`, not `whileInView`):
 * the frame (card + title + empty tracks) fades in first, then each bar
 * grows from 0 to its target height with a small stagger. This is
 * deliberate — callers (e.g. `operations-split`) are expected to remount
 * this component via a changing `key` on an outer `Reveal
 * inView={false}`, and `whileInView` would not (re)trigger reliably when
 * the component mounts already inside the viewport.
 *
 * Respects `prefers-reduced-motion`: bars render directly at their final
 * height with a zero-duration transition instead of growing.
 */
function BalanceBarChartCard({
  title,
  bars,
  className,
  ...props
}: BalanceBarChartCardProps) {
  const prefersReducedMotion = useReducedMotion()

  const accentIndex = bars.some((bar) => bar.accent)
    ? bars.findIndex((bar) => bar.accent)
    : bars.length - 1

  return (
    <motion.div
      data-slot="balance-bar-chart-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={prefersReducedMotion ? { type: "tween", duration: 0, delay: 0 } : FRAME_TRANSITION}
      className={cn(
        "w-full max-w-[394px] rounded-2xl bg-white px-6 pt-6 pb-6 shadow-[0_1px_3px_rgba(0,0,0,.06)]",
        className
      )}
      {...props}
    >
      <div className="mb-6 text-lg font-bold">{title}</div>

      <div className="flex items-end justify-center gap-2">
        {bars.map((bar, index) => {
          const clampedPercent = Math.min(100, Math.max(0, bar.percent))
          const isAccent = index === accentIndex

          return (
            <div key={bar.label} className="flex w-[56px] shrink-0 flex-col items-center gap-2.5">
              <div
                aria-hidden="true"
                className="flex w-full items-end overflow-hidden rounded-xl bg-muted"
                style={{ height: TRACK_HEIGHT_PX }}
              >
                <motion.div
                  className={cn("w-full rounded-xl", isAccent ? "bg-sky-500" : "bg-foreground/20")}
                  initial={{ height: "0%" }}
                  animate={{ height: `${clampedPercent}%` }}
                  transition={
                    prefersReducedMotion
                      ? { type: "tween", duration: 0, delay: 0 }
                      : {
                          type: "tween",
                          duration: BAR_GROW_DURATION,
                          ease: BAR_GROW_EASE,
                          delay: BARS_START_DELAY + index * BAR_STAGGER_STEP,
                        }
                  }
                />
              </div>
              <span className="text-[13px] font-medium text-muted-foreground">{bar.label}</span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export { BalanceBarChartCard }
