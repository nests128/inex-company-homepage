"use client"

import { useEffect, useRef, useState } from "react"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface StatItemProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /**
   * Final display value, e.g. "VASP·ISMS", "T+0", "3개 레일", "9개 모듈".
   * Always rendered as-is once animation completes (or immediately if
   * `countTo`/motion is unavailable) — this is the source of truth for SSR
   * and no-JS output, never `0`.
   */
  value: string
  /** Caption under the value, e.g. "규제 라이선스 완비". */
  caption: string
  /**
   * Optional numeric target to count up from 0 on scroll-into-view (wireframe
   * `data-count`, e.g. `3` for "3개 레일"). Only meaningful when `value`'s
   * numeric portion matches; `prefix`/`suffix` wrap the animated number so it
   * re-composes into the same string as `value` (e.g. suffix="개 레일").
   */
  countTo?: number
  prefix?: string
  suffix?: string
  /**
   * Caption color tone. `"dark"` (default) is the original hardcoded
   * `text-white/65`, for a dark (#111) background. `"light"` uses
   * `text-muted-foreground` for a white/light background (added for
   * `solutions/crypto-trading`'s `ProvenSection`, which moved off the dark
   * band per explicit request).
   */
  tone?: "dark" | "light"
}

/**
 * Single stat cell for the dark stats band (wireframe ~L190-196). Renders
 * the final `value` immediately (SSR-safe, no flash of "0"); if `countTo` is
 * given and the user hasn't requested reduced motion, animates the number
 * up from 0 once scrolled into view, client-side only.
 *
 * NOTE: if a `StatItem` is rendered above the fold (already in the viewport
 * on load), the intersection observer fires immediately and the display
 * will flash from the final `value` down to 0 before counting back up. This
 * is fine for the stats band (it sits well below the fold), but avoid
 * `countTo` on any future above-the-fold usage.
 */
function StatItem({
  value,
  caption,
  countTo,
  prefix = "",
  suffix = "",
  tone = "dark",
  className,
  ...props
}: StatItemProps) {
  const [display, setDisplay] = useState(value)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    if (countTo === undefined) return
    if (typeof window === "undefined") return
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || animated.current) continue
          animated.current = true
          setDisplay(`${prefix}0${suffix}`)
          const start = performance.now()
          const duration = 900
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(countTo * eased)
            setDisplay(`${prefix}${current}${suffix}`)
            if (progress < 1) requestAnimationFrame(tick)
            else setDisplay(value)
          }
          requestAnimationFrame(tick)
          observer.unobserve(node)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [countTo, prefix, suffix, value])

  return (
    <div data-slot="stat-item" ref={ref} className={cn(className)} {...props}>
      <div className="font-sans text-[26px] font-bold sm:text-[28px] lg:text-[38px]">{display}</div>
      <div
        className={cn(
          "mt-1.5 text-[11.5px] sm:text-[13.5px]",
          tone === "dark" ? "text-white/65" : "text-muted-foreground"
        )}
      >
        {caption}
      </div>
    </div>
  )
}

export { StatItem }
