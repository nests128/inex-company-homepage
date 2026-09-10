import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface PartnerLogoCardProps
  extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  /** Partner/brand name — used as the image `alt` text. Placeholder content, supplied by caller. */
  name: string
  /** Logo image URL, e.g. `/cdn/image/partners/fireblocks.svg`. */
  src: string
  /** Optional link target. Renders a plain (non-interactive) wrapper `<span>` when omitted. */
  href?: string
}

/**
 * Single image-logo item for the partner-logo `Marquee` (wireframe
 * ~L136-145). Renders a real `<img>` (not `next/image`) because partner
 * logos are `.svg` and `next/image`'s `/_next/image` pipeline rejects SVGs
 * without `dangerouslyAllowSVG`. Logos are forced to a flat black monotone
 * via `brightness-0` (no `invert` — this app renders on a light background,
 * unlike the dark-background reference this pattern was ported from).
 *
 * The card is a fixed-size slot (not sized to its logo's intrinsic aspect
 * ratio): partner SVGs vary wildly in visible-content width even when their
 * `viewBox` canvas is uniform, so `h-auto w-auto` produced a 3.5x width
 * spread across logos. `h-full w-full object-contain` on the `<img>` makes
 * the image box exactly match the slot and lets `object-contain` letterbox
 * each logo inside it, so every card is sized from the same slot regardless
 * of the source SVG's proportions (reference: company-homepage `LogoCard`,
 * `sm:h-18 sm:w-50 h-7` slot + `px-2 sm:px-6`).
 *
 * Slot aspect ratio is tuned, not arbitrary: measured rendered ink height
 * (SVG `getBBox()` composed through `getScreenCTM()`, i.e. the actual
 * visible glyph height after `object-contain` fit — not just the `<img>`
 * box) across the real partner set showed each source SVG carries a very
 * different amount of internal viewBox padding (ink fills 40%-100% of the
 * viewBox height depending on the logo). A slot ratio (width/height) of 4.0
 * minimizes the resulting max/min rendered-ink-height spread across this
 * asset set: once the slot ratio is wide enough (~3.6+) that every logo
 * becomes height-bound under `object-contain`, the spread floors out at
 * ~2.0x (driven by the widest-vs-narrowest `inkHFrac`, e.g. AWS ~0.80 vs.
 * 인터리젠 ~0.40) and no wider ratio reduces it further. Narrower slots
 * (e.g. the old 2.75 ratio) leave wide/shallow wordmarks width-bound, which
 * shrinks them well below tall/dense marks and produced the ~3.3x spread
 * that read as "일부는 크고 일부는 작다". The residual ~2.0x spread at
 * ratio 4.0 is a property of the source SVGs' internal padding, not
 * something `object-contain`/slot sizing can fully erase — per-logo scale
 * correction would close it further but is explicitly out of scope for
 * maintainability, so ratio 4.0 is the general-rule optimum. Desktop and
 * mobile slots share the same 4:1 ratio (`lg:h-11 lg:w-44` = 44/176,
 * `h-8 w-32` = 32/128).
 */
function PartnerLogoCard({ name, src, href, className, ...props }: PartnerLogoCardProps) {
  const content = (
    // eslint-disable-next-line @next/next/no-img-element -- SVG partner logos must bypass next/image's optimizer (see docs/design-tokens.md CDN section).
    <img
      src={src}
      alt={name}
      className="h-full w-full object-contain brightness-0"
    />
  )

  const sharedClassName = cn(
    "flex h-9 w-36 shrink-0 items-center justify-center px-2 lg:h-13 lg:w-52 lg:px-2.5",
    className
  )

  if (href) {
    return (
      <a
        data-slot="partner-logo-card"
        href={href}
        className={sharedClassName}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <span data-slot="partner-logo-card" className={sharedClassName}>
      {content}
    </span>
  )
}

export { PartnerLogoCard }
