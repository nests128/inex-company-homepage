"use client"

import * as React from "react"
import { motion, useReducedMotion, type Transition } from "motion/react"
import { cn } from "cn"

import {
  REVEAL_OFFSET,
  REVEAL_TRANSITION,
  REVEAL_IN_VIEW_AMOUNT,
  REVEAL_ONCE,
} from "@/shared/lib/motion"

/**
 * Blur amount (px) applied when `blur` is true. No wireframe/token source —
 * the wireframe's `data-reveal`/`data-hero` transitions never blur, only
 * fade+translate (`docs/design-tokens.md` L170-184, `motion.ts` has no blur
 * constant). `docs/design-tokens.md` L158/188 mention blur as a
 * Magic-UI-`BlurFade`-inspired option to *consider*, so it's offered here as
 * an explicit opt-in (default off) rather than baked into the default
 * reveal. If this value should be a shared token, add it to
 * `src/shared/lib/motion.ts` (out of scope for this component).
 */
const REVEAL_BLUR_PX = 6

/**
 * Scale-in amount applied when `scale` is true. Source: wireframe `data-hero`
 * visual/floating-card column, `transform: translateY(40px) scale(.97)`
 * (see `HERO_OFFSET_VISUAL` in `src/shared/lib/motion.ts`). Not promoted to
 * a shared constant since it's only ever paired with the `scale` opt-in.
 */
const REVEAL_SCALE_FROM = 0.97

const AXIS_BY_DIRECTION = {
  up: "y",
  down: "y",
  left: "x",
  right: "x",
} as const

/** Sign applied to `offset` so the element travels *from* this side. */
const SIGN_BY_DIRECTION = {
  up: 1,
  down: -1,
  left: 1,
  right: -1,
} as const

export type RevealDirection = "up" | "down" | "left" | "right"

/**
 * Native DOM event props whose signatures conflict with `motion/react`'s own
 * (drag/pan/animation) props of the same name — must be omitted from our
 * prop type rather than passed through untyped. Standard seam when wrapping
 * `motion.*` components with a native-element-shaped prop type.
 */
type MotionConflictingProps =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"

export interface RevealProps
  extends Omit<
    React.ComponentPropsWithoutRef<"div">,
    "children" | "dir" | MotionConflictingProps
  > {
  children: React.ReactNode
  /**
   * Element (or component) to render as. Limited to a safe intrinsic-tag
   * whitelist rather than full polymorphism — pass e.g. `"span"`, `"li"`,
   * `"section"`. Defaults to `"div"`.
   */
  as?: "div" | "span" | "li" | "section" | "article" | "header" | "figure"
  /** Animation start delay in seconds. Defaults to 0. */
  delay?: number
  /**
   * Direction the element enters from — `"up"` starts below its final
   * position and moves up, `"left"` starts to the right and moves left, etc.
   * Defaults to `"up"` (matches both `data-reveal` and `data-hero` in the
   * wireframe, which only ever move along Y). `"down" | "left" | "right"`
   * are offered for cases page-agent may need (e.g. a visual entering from
   * the side) but have no wireframe precedent.
   */
  direction?: RevealDirection
  /**
   * Distance travelled, in px. Defaults to `REVEAL_OFFSET` (24px, scroll
   * reveal). Pass `HERO_OFFSET` (28) or `HERO_OFFSET_VISUAL` (40) from
   * `@/shared/lib/motion` for hero-style entrances.
   */
  offset?: number
  /**
   * Transition duration/easing override. Defaults to `REVEAL_TRANSITION`
   * (0.8s, `REVEAL_EASE`). Pass `HERO_TRANSITION` / `HERO_TRANSITION_VISUAL`
   * from `@/shared/lib/motion` for hero-style entrances. `delay` (above) is
   * merged in on top of whatever is passed here.
   */
  transition?: Transition
  /**
   * When true (default), animates in on scroll (`whileInView`), matching the
   * wireframe's `data-reveal` (IntersectionObserver) pattern. Set to `false`
   * to animate in on mount (`animate`) instead — use for above-the-fold hero
   * content. `HeroReveal` sets this to `false` for its children.
   */
  inView?: boolean
  /**
   * Also scale in from `REVEAL_SCALE_FROM` (0.97) → 1. Source: wireframe
   * `data-hero` visual/floating-card column (`scale(.97)`). Defaults to
   * false.
   */
  scale?: boolean
  /**
   * Also blur in from `REVEAL_BLUR_PX` (6px) → 0, Magic UI `BlurFade`-style.
   * No wireframe precedent (see `REVEAL_BLUR_PX` doc comment) — defaults to
   * false.
   */
  blur?: boolean
}

/**
 * Fade/translate-in wrapper, in view (scroll-triggered) or on-mount. Mirrors
 * the wireframe's `data-reveal` (`inView` true, default) and `data-hero`
 * (`inView` false, used by `HeroReveal`) transition patterns using
 * `motion/react` instead of the wireframe's IntersectionObserver + inline
 * style toggling. See `docs/design-tokens.md` "인터랙션 · 애니메이션" and
 * `src/shared/lib/motion.ts` for the constants this is built on.
 *
 * Respects `prefers-reduced-motion`: when the user prefers reduced motion,
 * still renders a `motion.*` element (so the DOM shape and the `initial`
 * inline style are identical between SSR and client, avoiding a hydration
 * mismatch), but resolves to the final (visible) state immediately via
 * `animate` (not `whileInView`, so below-the-fold content isn't stuck at
 * `opacity: 0` waiting on an IntersectionObserver) with a zero-duration,
 * zero-delay transition.
 *
 * This is a client component (`"use client"`) — a server component widget
 * (e.g. `Hero`, `FeatureShowcase`) can still use it by importing it and
 * rendering it as a child; the widget itself does not need `"use client"`.
 *
 * @example
 * <Reveal><SectionHeading ... /></Reveal>
 * <Reveal delay={0.1} direction="left"><Card /></Reveal>
 * <Reveal
 *   inView={false}
 *   offset={HERO_OFFSET_VISUAL}
 *   scale
 *   transition={HERO_TRANSITION_VISUAL}
 * >
 *   <HeroVisualCard />
 * </Reveal>
 */
function Reveal({
  children,
  as = "div",
  delay = 0,
  direction = "up",
  offset = REVEAL_OFFSET,
  transition,
  inView = true,
  scale = false,
  blur = false,
  className,
  ...props
}: RevealProps) {
  // `useReducedMotion()` returns `null` during SSR and on the client's first
  // render before the media query is evaluated, then settles to a boolean.
  // Crucially, we must NOT branch on this to change which element type or
  // which `initial` value is rendered: `initial` is the only motion prop
  // that shows up in the DOM as an inline `style` attribute, and SSR always
  // evaluates this hook as falsy (no `window`). If the client's first paint
  // used a different `initial` (e.g. the visible state) than what the
  // server sent, or a plain intrinsic tag instead of `motion.*`, React
  // would hydrate a mismatched tree — and since the client element would
  // have no `style` prop at all in the old "no motion wrapper" branch, the
  // server's `opacity: 0` inline style would never be cleared, permanently
  // hiding the content. So `initial` (and the element type) stay identical
  // in every render pass; only the *behavior* props (`animate`/
  // `whileInView`/`viewport`/`transition`), which never reach the DOM,
  // branch on `prefersReducedMotion`.
  const prefersReducedMotion = useReducedMotion()

  const axis = AXIS_BY_DIRECTION[direction]
  const sign = SIGN_BY_DIRECTION[direction]
  const MotionTag = motion[as as "div"]

  const hiddenState = {
    opacity: 0,
    [axis]: offset * sign,
    ...(scale ? { scale: REVEAL_SCALE_FROM } : null),
    ...(blur ? { filter: `blur(${REVEAL_BLUR_PX}px)` } : null),
  }
  const visibleState = {
    opacity: 1,
    [axis]: 0,
    ...(scale ? { scale: 1 } : null),
    ...(blur ? { filter: "blur(0px)" } : null),
  }

  // `type: "tween"` is explicit (not left to motion's per-value default,
  // which is a spring for physical values like `x`/`y`/`scale`) so that
  // `duration: 0` is honored as truly instant for every animated value here
  // (`opacity`, `x`/`y`, `scale`, `filter`) — a spring can ignore `duration`
  // and animate transform/scale over time even when `duration: 0` is set,
  // which would defeat the point of the reduced-motion branch.
  const resolvedTransition: Transition = prefersReducedMotion
    ? { type: "tween", duration: 0, delay: 0 }
    : {
        ...REVEAL_TRANSITION,
        ...transition,
        delay,
      }

  // Reduced motion always resolves via `animate` (not `whileInView`): with
  // `whileInView`, below-the-fold content would stay stuck at `opacity: 0`
  // until it scrolls into view and its IntersectionObserver fires, which is
  // itself an accessibility trap for a user who opted out of motion, not
  // out of ever seeing the content.
  const motionProps = prefersReducedMotion
    ? { initial: hiddenState, animate: visibleState }
    : inView
      ? {
          initial: hiddenState,
          whileInView: visibleState,
          viewport: { once: REVEAL_ONCE, amount: REVEAL_IN_VIEW_AMOUNT },
        }
      : {
          initial: hiddenState,
          animate: visibleState,
        }

  return (
    <MotionTag
      data-slot="reveal"
      className={cn(className)}
      transition={resolvedTransition}
      {...motionProps}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

export { Reveal }
