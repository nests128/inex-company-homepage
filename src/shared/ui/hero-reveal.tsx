"use client"

import * as React from "react"
import { cn } from "cn"

import {
  HERO_OFFSET,
  HERO_STAGGER_DELAYS,
  HERO_STAGGER_STEP,
  HERO_TRANSITION,
} from "@/shared/lib/motion"
import { Reveal, type RevealDirection } from "./reveal"

export interface HeroRevealProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  /**
   * Direct children are each wrapped in a `Reveal` and staggered in order
   * using `HERO_STAGGER_DELAYS` (eyebrow → heading → description → CTA →
   * trust badge, per the wireframe). Non-element children (`false`, `null`,
   * `undefined`, strings/numbers from `{cond && <X/>}` conditionals) are
   * skipped and do not consume a delay slot.
   */
  children: React.ReactNode
  /** Direction each child travels in from. Defaults to `"up"` (wireframe default). */
  direction?: RevealDirection
}

/**
 * Sequentially staggers its direct children in on mount, matching the
 * wireframe's `data-hero` pattern (78~131줄 부근): eyebrow → heading →
 * description → CTA → trust badge, each fading/translating up with an
 * increasing delay (`HERO_STAGGER_DELAYS`, sourced from the wireframe's
 * literal `0 / .1 / .22 / .34 / .46` delay sequence).
 *
 * Each direct child is wrapped in one `Reveal` (`inView={false}`, i.e.
 * animates on mount rather than on scroll; `offset={HERO_OFFSET}`,
 * `transition={HERO_TRANSITION}`) — this adds one wrapper element per child.
 * Put layout (flex/gap/etc.) on `HeroReveal`'s own `className`; it is
 * applied to the outer container, not the per-child wrappers.
 *
 * `HERO_STAGGER_DELAYS` only has 5 entries (matching the wireframe's 5-part
 * hero column). A 6th+ child falls back to
 * `HERO_STAGGER_STEP * index` instead of reusing/overflowing the array.
 *
 * Respects `prefers-reduced-motion` transitively via `Reveal`. Client
 * component (`"use client"`) — a server component widget (e.g. `Hero`) can
 * render this as a child without itself becoming a client component.
 *
 * @example
 * <HeroReveal className="flex flex-col gap-4">
 *   <p className="eyebrow">VASP 신고 수리 FIU 2024-3</p>
 *   <h1>...</h1>
 *   <p>...</p>
 *   <div className="flex gap-3">
 *     <Button>CTA</Button>
 *   </div>
 * </HeroReveal>
 *
 * // Right-column visual card, entering separately with scale + a longer
 * // duration — use `Reveal` directly (not `HeroReveal`) for this, since it
 * // isn't part of the staggered text column:
 * <Reveal
 *   inView={false}
 *   delay={HERO_STAGGER_DELAYS[2]}
 *   offset={HERO_OFFSET_VISUAL}
 *   scale
 *   transition={HERO_TRANSITION_VISUAL}
 * >
 *   <HeroVisualCard />
 * </Reveal>
 */
function HeroReveal({
  children,
  direction = "up",
  className,
  ...props
}: HeroRevealProps) {
  const items = React.Children.toArray(children).filter(React.isValidElement)

  return (
    <div data-slot="hero-reveal" className={cn(className)} {...props}>
      {items.map((child, index) => {
        const delay =
          index < HERO_STAGGER_DELAYS.length
            ? HERO_STAGGER_DELAYS[index]
            : HERO_STAGGER_STEP * index

        return (
          <Reveal
            key={child.key ?? index}
            inView={false}
            delay={delay}
            direction={direction}
            offset={HERO_OFFSET}
            transition={HERO_TRANSITION}
          >
            {child}
          </Reveal>
        )
      })}
    </div>
  )
}

export { HeroReveal }
