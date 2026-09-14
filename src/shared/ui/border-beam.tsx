"use client"

// Port of magicui's BorderBeam (https://magicui.design/docs/components/border-beam)
// — a small comet of light animated along the element's border via
// `offset-path`/`offset-distance`, using `motion/react` (already a project
// dependency) instead of adding `motion` as a new package. Adds a `shape`
// prop the original doesn't have: `"rect"` reproduces the upstream
// `offset-path: rect(...)` behavior, `"circle"` swaps in
// `offset-path: circle(50% at 50% 50%)` for a circular container (e.g. the
// custody vault dial) where a rect path wouldn't trace the visible edge.
import { motion, type Transition } from "motion/react"
import { cn } from "cn"

export interface BorderBeamProps {
  className?: string
  /** Beam length as a percentage of the total path. */
  size?: number
  delay?: number
  duration?: number
  colorFrom?: string
  colorTo?: string
  transition?: Transition
  style?: React.CSSProperties
  reverse?: boolean
  initialOffset?: number
  borderWidth?: number
  /** Path the beam travels along — `"rect"` (default, matches upstream) or `"circle"` for round containers. */
  shape?: "rect" | "circle"
}

export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#0ea5e9",
  colorTo = "#38bdf8",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
  shape = "rect",
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        // 마스크가 이 wrapper의 border-radius를 기준으로 링 모양을 잘라내므로,
        // 부모가 rounded-full이 아니어도(예: 커스터디 히어로의 바깥 다이얼
        // 링처럼 각진 정사각형 컨테이너) shape="circle"이면 여기서 직접
        // 원형으로 강제해야 빔이 사각형이 아닌 원을 따라 보인다.
        shape === "circle" ? "rounded-full" : "rounded-[inherit]",
      )}
      style={{ borderWidth, ...style }}
    >
      <motion.div
        className={cn(
          "absolute aspect-square",
          "bg-gradient-to-l from-(--color-from) via-(--color-to) to-transparent",
          className,
        )}
        style={
          {
            width: `${size}px`,
            offsetPath:
              shape === "circle"
                ? "circle(50% at 50% 50%)"
                : `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
          } as React.CSSProperties
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  )
}
