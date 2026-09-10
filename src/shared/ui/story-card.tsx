import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

import { Button } from "./button"
import { PlaceholderMedia } from "./placeholder-media"

export interface StoryCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Media alt/caption, forwarded to `PlaceholderMedia`. */
  imageAlt: string
  /** Real image source; omit to show the striped placeholder. */
  imageSrc?: string
  /** Small uppercase sector label above the title, e.g. "HEALTHCARE". */
  sector: string
  /** Card headline (wraps to 2 lines in the reference). */
  title: string
  /** Large stat figure overlaid on the image, e.g. "40%". */
  statValue: string
  /** Stat caption overlaid on the image, e.g. "More time for direct patient care". */
  statLabel: string
  /** Partner/customer logo wordmark rendered in the footer bar. */
  logoLabel: string
  /** "Read story" link label. */
  readMoreLabel: string
  /** Optional link target for the "Read story" CTA. */
  href?: string
}

/**
 * Success-story card for use inside `Carousel` (`ref/image3.png` "Success
 * stories" slider). Distinct from `CaseCard`: the stat is overlaid on the
 * image (white text + scrim) rather than in a separate content block below
 * it, and the sector label is plain small-caps text above the title rather
 * than a pill badge over the image — different enough in structure that
 * reusing `CaseCard` via a variant would mean overriding layout direction,
 * badge-vs-text, and overlay-vs-stacked all at once, so this is a new
 * component instead.
 */
function StoryCard({
  imageAlt,
  imageSrc,
  sector,
  title,
  statValue,
  statLabel,
  logoLabel,
  readMoreLabel,
  href,
  className,
  ...props
}: StoryCardProps) {
  return (
    <div
      data-slot="story-card"
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl bg-background text-foreground",
        className
      )}
      {...props}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-[3/4]">
        <PlaceholderMedia
          alt={imageAlt}
          src={imageSrc}
          fill
          sizes="(min-width: 640px) 380px, 90vw"
          className="h-full w-full rounded-none border-0"
        />
        {/* Scrim ensures the overlaid stat stays legible on arbitrary photos. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
          <div className="text-[13px] font-medium sm:text-sm">{statLabel}</div>
          <div className="text-3xl font-bold tracking-[-.02em] sm:text-4xl">
            {statValue}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="text-[11px] font-semibold tracking-[.08em] text-muted-foreground uppercase">
          {sector}
        </div>
        <div className="mt-2 text-base leading-[1.35] font-bold sm:text-lg">
          {title}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border p-4 sm:p-5">
        <span className="text-sm font-bold tracking-[-.01em]">{logoLabel}</span>
        <Button
          variant="pill-solid"
          size="sm"
          render={href ? <a href={href} /> : undefined}
          nativeButton={!href}
        >
          {readMoreLabel}
        </Button>
      </div>
    </div>
  )
}

export { StoryCard }
