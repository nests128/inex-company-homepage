import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "cn"

import { Button } from "./button"

export interface CaseStudyBannerProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Small label above the title, e.g. "Case study". Sentence case per the reference (`ref/image4.png`), not the uppercase eyebrow scale. */
  tag?: string
  /** Big title. Supports `\n` for manual line breaks, same convention as `QuoteBlock`. */
  title: string
  /** Description paragraph below the title. */
  description: string
  /** Optional outline CTA, e.g. "Read case study". Omit to hide it. Mutually exclusive with `bodySlot` in practice (both can render, but callers needing an inline form in place of a link/button should use `bodySlot` instead). */
  cta?: {
    label: string
    href?: string
    onClick?: () => void
  }
  /**
   * Arbitrary content rendered below the description, in place of (or
   * alongside) `cta` — e.g. an inline subscribe form (`NewsletterSubscribeForm`)
   * where a single link/button isn't enough. Named `bodySlot` (not
   * `content`) to avoid colliding with the DOM `content` attribute already
   * declared on `ComponentPropsWithoutRef<"div">`.
   */
  bodySlot?: ReactNode
  /**
   * Content rendered centered inside the right-hand decorative panel (e.g. a
   * brand wordmark/logo). Omitting it drops the whole panel, which also
   * degrades cleanly to a single column on mobile.
   */
  visual?: ReactNode
  /**
   * Small print rendered below the right-hand visual panel (e.g. the
   * newsletter consent-withdrawal notice). Only rendered when `visual` is
   * also present, and shares its column width/alignment.
   */
  visualFootnote?: ReactNode
  className?: string
}

/**
 * Two-column gradient banner card (`ref/image4.png`): tag + big title +
 * description + outline CTA on the left, a decorative pale panel with the
 * caller's `visual` centered on top on the right.
 *
 * The blue-to-mint diagonal gradient reproduces the reference's actual tone
 * rather than the project's usual neutral-grayscale default (`GradientBackdrop`,
 * `QuoteHero`) — the same exception `QuoteHero` already makes for its
 * blue-lavender wash.
 *
 * Not full-bleed itself — per `docs/design-tokens.md`'s "풀블리드 배경 + 컨테이너
 * 콘텐츠" convention, page-agent owns the outer `<section>` and decides
 * whether this panel sits directly in it or inside `container-inex`.
 */
function CaseStudyBanner({
  tag,
  title,
  description,
  cta,
  bodySlot,
  visual,
  visualFootnote,
  className,
  ...props
}: CaseStudyBannerProps) {
  return (
    <div
      data-slot="case-study-banner"
      className={cn(
        "relative overflow-hidden rounded-3xl p-8 sm:p-10 lg:p-14",
        "bg-[linear-gradient(115deg,#bfe6fb_0%,#bdeee0_55%,#c9f2df_100%)]",
        className
      )}
      {...props}
    >
      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-1 flex-col items-start gap-5">
          {tag ? (
            <div className="flex items-center gap-2 text-[13px] font-medium text-foreground/80">
              <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
              {tag}
            </div>
          ) : null}

          <h2 className="text-[30px] leading-[1.15] font-bold tracking-[-.025em] text-balance sm:text-[54px]">
            {title.split("\n").map((line, index) => (
              <span key={index}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h2>

          <p className="max-w-xl text-[16.5px] leading-[1.6] text-foreground/70 sm:text-[18px] sm:leading-[1.7]">
            {description}
          </p>

          {cta ? (
            <Button
              variant="outline"
              size="pill"
              className="mt-2 gap-2 rounded-lg border-foreground bg-transparent text-foreground hover:bg-background/40"
              render={cta.href ? <a href={cta.href} /> : undefined}
              nativeButton={!cta.href}
              onClick={cta.onClick}
            >
              {cta.label}
              <ArrowUpRight className="size-4" />
            </Button>
          ) : null}

          {bodySlot ? <div className="mt-2 w-full max-w-md">{bodySlot}</div> : null}
        </div>

        {visual ? (
          <div className="hidden w-full max-w-[320px] shrink-0 flex-col gap-2 sm:flex lg:w-[300px]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/50 bg-white/25">
              <svg
                aria-hidden="true"
                viewBox="0 0 300 375"
                className="pointer-events-none absolute inset-0 h-full w-full text-foreground/15"
                fill="none"
              >
                <g stroke="currentColor" strokeWidth="1.25">
                  <path d="M40 150 L100 120 L160 150 L100 180 Z" />
                  <path d="M40 150 L40 210 L100 240 L100 180 Z" />
                  <path d="M160 150 L160 210 L100 240 L100 180 Z" />
                  <path d="M110 220 L165 195 L220 220 L165 245 Z" />
                  <path d="M110 220 L110 275 L165 300 L165 245 Z" />
                  <path d="M220 220 L220 275 L165 300 L165 245 Z" />
                  <path d="M20 60 Q150 20 280 70" />
                  <path d="M20 90 Q150 55 280 105" />
                </g>
              </svg>

              <div className="relative z-10 flex h-full items-center justify-center px-6">
                {visual}
              </div>
            </div>

            {visualFootnote ? (
              <p className="text-right text-[11px] leading-snug text-foreground/50">
                {visualFootnote}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { CaseStudyBanner }
