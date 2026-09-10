import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

import { Marquee, type MarqueeProps } from "./marquee"

export interface IntegrationsMarqueeCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /**
   * `IntegrationLogoCard` items (or any marquee-compatible content) to
   * scroll inside the dark frame. Passed straight through to `Marquee` —
   * do NOT pre-duplicate the list, `Marquee` already duplicates its children
   * internally for a seamless loop (and marks the duplicate `aria-hidden` +
   * `inert`).
   */
  children: ReactNode
  /** Forwarded to `Marquee` (gap/duration/maskWidth/pauseOnHover). */
  marqueeProps?: Omit<MarqueeProps, "children" | "className">
}

/**
 * Dark, fixed "frame" card (`ref/image2.png`, section 2 — "Works with tools
 * you love") that stays static while an infinite `Marquee` track scrolls
 * *inside* it. Deliberately built as two separate elements rather than
 * putting the dark background directly on `Marquee`:
 *
 * `Marquee` applies its edge-fade `mask-image` to the SAME element that
 * receives `className`. If the dark background were set via
 * `<Marquee className="bg-[#111]">`, the mask would fade the background
 * itself at both edges, producing transparent corners with the page
 * showing through instead of a solid dark card. Here, the outer `div` owns
 * the solid `bg-[#111]` fill + rounded corners + padding, and `Marquee`
 * (with its default `maskWidth={8}` edge fade) sits inside it — the fade
 * blends logos in/out against the dark fill correctly.
 *
 * No noise/grain texture is applied (sketch shows a subtle grain) — kept to
 * a solid dark fill per project time constraints; a texture can be layered
 * in later via a background-image on the outer frame without touching this
 * component's structure.
 */
function IntegrationsMarqueeCard({
  children,
  marqueeProps,
  className,
  ...props
}: IntegrationsMarqueeCardProps) {
  return (
    <div
      data-slot="integrations-marquee-card"
      className={cn(
        "flex min-h-[280px] w-full items-center overflow-hidden rounded-[18px] bg-[#111] py-10 lg:min-h-[340px]",
        className
      )}
      {...props}
    >
      <Marquee className="w-full" {...marqueeProps}>
        {children}
      </Marquee>
    </div>
  )
}

export { IntegrationsMarqueeCard }
