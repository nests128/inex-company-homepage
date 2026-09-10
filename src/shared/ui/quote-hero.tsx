import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

import { Button } from "./button"
import { QuoteBlock } from "./quote-block"

export interface QuoteHeroProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /**
   * Rating/trust badge slot rendered above the quote (e.g. a `Badge` with
   * "⭐ Rated 4.9/5 from over 100+ verified reviews"). Renders nothing when
   * omitted.
   */
  badge?: ReactNode
  /** Forwarded to `QuoteBlock`. Supports `\n` for a manual line break. */
  quote: string
  /** Forwarded to `QuoteBlock`'s avatar slot. */
  avatar?: ReactNode
  /** Forwarded to `QuoteBlock`. */
  attributionName: string
  /** Forwarded to `QuoteBlock`. */
  attributionRole: string
  /**
   * Optional pill CTA rendered below the attribution (e.g. "Customer
   * Stories"). Omit to hide it entirely.
   */
  cta?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

/**
 * Large gradient-panel quote hero (`ref/image3.png`): rating badge + big
 * quote (via `QuoteBlock` with `size="hero"`) + attribution + pill CTA, on a
 * soft diagonal gradient backdrop.
 *
 * This component only renders the gradient panel + content — it is NOT
 * full-bleed itself. Per `docs/design-tokens.md`'s "풀블리드 배경 + 컨테이너
 * 콘텐츠" convention, page-agent is expected to own the outer `<section>`
 * (full-bleed, vertical padding) and decide whether this panel sits directly
 * in that section or is wrapped in `container-inex` — pass `className` to
 * control width/radius/padding for either case (e.g. `rounded-none` for an
 * edge-to-edge panel, or a `max-w-*` + `rounded-2xl` for an inset card).
 *
 * Gradient tone is a neutral pale blue-to-lavender diagonal wash (not the
 * saturated blue of the raw reference sketch) to stay consistent with this
 * project's black & white minimal tone — see `GradientBackdrop`'s existing
 * "neutral over saturated" precedent for the same call.
 */
function QuoteHero({
  badge,
  quote,
  avatar,
  attributionName,
  attributionRole,
  cta,
  className,
  ...props
}: QuoteHeroProps) {
  return (
    <div
      data-slot="quote-hero"
      className={cn(
        "relative flex flex-col items-center gap-5 overflow-hidden px-6 py-16 text-center sm:gap-6 sm:py-24",
        "bg-[linear-gradient(135deg,#eef1f8_0%,#e4e9f6_35%,#dbe3f4_65%,#c9d6f0_100%)]",
        className
      )}
      {...props}
    >
      {badge ? <div>{badge}</div> : null}

      <QuoteBlock
        size="hero"
        quote={quote}
        avatar={avatar}
        attributionName={attributionName}
        attributionRole={attributionRole}
        className="max-w-3xl"
      />

      {cta ? (
        <Button
          variant="pill-solid"
          size="pill"
          className="mt-1"
          render={cta.href ? <a href={cta.href} /> : undefined}
          nativeButton={!cta.href}
          onClick={cta.onClick}
        >
          {cta.label}
        </Button>
      ) : null}
    </div>
  )
}

export { QuoteHero }
