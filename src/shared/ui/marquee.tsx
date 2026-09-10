import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

import styles from "./marquee.module.css"

export interface MarqueeProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /**
   * Items to render once. The component internally duplicates this list to
   * create a seamless CSS-only loop — callers should NOT pre-duplicate their
   * data (unlike the wireframe's raw markup, which repeats the list by hand).
   */
  children: ReactNode
  /**
   * Gap between items, e.g. "64px" (logo row) or "20px" (module cards).
   * When passed, emitted as an inline `--marquee-gap` custom property
   * (single static value — wins at every breakpoint). Omit this prop
   * entirely for a *responsive* gap: the underlying CSS
   * (`marquee.module.css`) reads `var(--marquee-gap, 1.5rem)`, so a
   * className-based override (e.g.
   * `className="[--marquee-gap:36px] lg:[--marquee-gap:64px]"`) is only
   * honored when this prop is not provided — an inline style always beats a
   * class-based custom-property declaration on the same element, so mixing
   * the prop with a responsive className override would silently collapse
   * to the prop's single value at every breakpoint. Falls back to 1.5rem
   * when both are omitted.
   */
  gap?: string
  /**
   * Full loop duration, e.g. "28s". Same rule as `gap`: passing this prop
   * fixes the duration at every breakpoint via inline style. Omit it and use
   * `className="[--marquee-duration:22s] lg:[--marquee-duration:28s]"` for a
   * responsive duration. Falls back to 28s when both are omitted.
   */
  duration?: string
  /** Edge fade mask width as a percentage (0-50). Defaults to 8 (matches wireframe logo row). Set to 0 to disable. */
  maskWidth?: number
  /** Pause the animation while the viewport is hovered. Defaults to false. */
  pauseOnHover?: boolean
}

/**
 * Generic infinite horizontal marquee track. CSS-animation only (see
 * `marquee.module.css`), respects `prefers-reduced-motion` by disabling the
 * animation, hiding the duplicated half, and making the viewport
 * horizontally scrollable so every item stays reachable.
 *
 * Used for both the partner-logo row and the module-card row (wireframe
 * ~L136-145 and ~L219-237) — pass `LogoTrackItem`s or `ModuleCard`s as
 * `children`.
 */
function Marquee({
  children,
  gap,
  duration,
  maskWidth = 8,
  pauseOnHover = false,
  className,
  style,
  ...props
}: MarqueeProps) {
  const maskImage =
    maskWidth > 0
      ? `linear-gradient(90deg, transparent, #000 ${maskWidth}%, #000 ${100 - maskWidth}%, transparent)`
      : undefined

  return (
    <div
      data-slot="marquee"
      data-pause-on-hover={pauseOnHover}
      className={cn("overflow-hidden", styles.viewport, className)}
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
        ...(gap !== undefined ? { ["--marquee-gap" as string]: gap } : null),
        ...style,
      }}
      {...props}
    >
      <div
        className={cn("flex w-max items-stretch", styles.track)}
        style={
          duration !== undefined
            ? { ["--marquee-duration" as string]: duration }
            : undefined
        }
      >
        {/*
         * `gap` lives on each half as trailing padding (not on the outer
         * track) so each half's rendered width is `contentWidth + gap`. That
         * makes `translateX(-50%)` land exactly on the second half's left
         * edge — i.e. the seam between the end of half 1 (including its own
         * trailing gap) and the start of half 2. Putting `gap` on the outer
         * track instead would only shift the loop by `gap / 2` per cycle,
         * producing a visible jump every loop that a static screenshot can't
         * reveal. Both halves read the gap from the `--marquee-gap` custom
         * property (set above, only when the `gap` prop is passed) rather
         * than an inline `gap`/`paddingInlineEnd` value, so callers can
         * override it per-breakpoint via className when the prop is omitted
         * (e.g. `[--marquee-gap:36px] lg:[--marquee-gap:64px]`).
         */}
        <div className={cn("flex items-stretch", styles.half)}>{children}</div>
        <div
          className={cn("flex items-stretch", styles.half, styles.trackDuplicate)}
          aria-hidden="true"
          inert
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export { Marquee }
