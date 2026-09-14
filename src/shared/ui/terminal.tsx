"use client"

import * as React from "react"
import { motion, useReducedMotion, type Transition } from "motion/react"
import { cn } from "cn"

/**
 * macOS-style terminal window + per-line entrance / typing animation, ported
 * from Magic UI's Terminal component
 * (https://magicui.design/docs/components/terminal) into this project's own
 * primitives rather than installed as a dependency: `motion/react` (already
 * used across `shared/ui`, see `reveal.tsx`) instead of `framer-motion`
 * directly, `useReducedMotion` respected (this project's motion contract,
 * `docs/design-tokens.md` "인터랙션 · 애니메이션"), and no external
 * `AnimatedSpan`/`TypingAnimation` package — just this one file.
 */

/**
 * Native DOM event props whose signatures conflict with `motion/react`'s own
 * (drag/pan/animation) props of the same name — same seam as `reveal.tsx`.
 */
type MotionConflictingProps =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"

export interface TerminalProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  /**
   * `"dark"` (default) is the standard dark terminal shell shared with
   * `EmbeddedChartPreview`/`OrderbookPreview` (`bg-[#0B101C]`). `"light"` is
   * a white/light-grey variant for placing a code preview next to a light
   * card (e.g. `OrderbookPreview` in a 2-up split) without a jarring
   * dark-next-to-dark or dark-next-to-light mismatch.
   */
  tone?: "dark" | "light"
  /**
   * Shows the macOS red/yellow/green traffic-light dots in the header bar.
   * Defaults to `true` (all existing call sites keep the window-chrome
   * look). Set `false` for a plainer code-panel header — e.g. the
   * stablecoin payments demo section, where the header instead shows an
   * HTTP method/path/status row and the traffic lights read as decorative
   * noise (사용자 명시적 요청, 2026-09-14).
   */
  showTrafficLights?: boolean
}

/** macOS window chrome (red/yellow/green traffic-light dots, optional) + body. */
function Terminal({
  children,
  tone = "dark",
  showTrafficLights = true,
  className,
  ...props
}: TerminalProps) {
  return (
    <div
      data-slot="terminal"
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-xl border",
        tone === "dark" ? "border-white/8 bg-[#0B101C]" : "border-border bg-background",
        className
      )}
      {...props}
    >
      {showTrafficLights ? (
        <div
          className={cn(
            "flex items-center gap-1.5 border-b px-3.5 py-2.5",
            tone === "dark" ? "border-white/8" : "border-border"
          )}
        >
          <span aria-hidden="true" className="size-2.5 rounded-full bg-[#FF5F56]" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-[#FFBD2E]" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-[#27C93F]" />
        </div>
      ) : null}
      <div
        className={cn(
          "flex flex-1 flex-col gap-1 px-4 py-3.5 font-mono text-[11px] leading-[1.7]",
          tone === "light" && "text-foreground"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export interface AnimatedSpanProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, MotionConflictingProps> {
  children: React.ReactNode
  /** Entrance delay in ms (Magic UI's unit — kept as-is for drop-in familiarity). */
  delay?: number
}

/** One terminal line that fades + slides up into place, staggered by `delay`. */
function AnimatedSpan({ children, delay = 0, className, ...props }: AnimatedSpanProps) {
  const prefersReducedMotion = useReducedMotion()
  const transition: Transition = prefersReducedMotion
    ? { type: "tween", duration: 0, delay: 0 }
    : { type: "tween", duration: 0.3, delay: delay / 1000 }

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      className={cn("block whitespace-pre-wrap text-[11px]", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface TypingAnimationProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, MotionConflictingProps> {
  children: string
  /** Per-character delay in ms. Defaults to Magic UI's 60ms. */
  duration?: number
  /** Entrance delay before typing starts, in ms. */
  delay?: number
  as?: "div" | "span" | "p"
}

/** Types `children` out one character at a time (skips straight to full text under reduced motion). */
function TypingAnimation({
  children,
  duration = 60,
  delay = 0,
  as = "div",
  className,
  ...props
}: TypingAnimationProps) {
  const prefersReducedMotion = useReducedMotion()
  const [displayed, setDisplayed] = React.useState(prefersReducedMotion ? children : "")
  const MotionTag = motion[as]

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(children)
      return
    }

    setDisplayed("")
    let index = 0
    let intervalId: ReturnType<typeof setInterval>
    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1
        setDisplayed(children.slice(0, index))
        if (index >= children.length) clearInterval(intervalId)
      }, duration)
    }, delay)

    return () => {
      clearTimeout(startId)
      clearInterval(intervalId)
    }
  }, [children, duration, delay, prefersReducedMotion])

  return (
    <MotionTag className={cn("text-[11px]", className)} {...props}>
      {displayed}
    </MotionTag>
  )
}

export { Terminal, AnimatedSpan, TypingAnimation }
