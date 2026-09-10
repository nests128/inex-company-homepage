"use client"

import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

import { buttonVariants } from "./button"

export interface AccountCardSegment {
  /** Legend label, e.g. "Spent". */
  label: string
  /** Percentage value (0-100). Segments are rendered in array order, left to right. */
  percent: number
  /**
   * Tailwind color class applied to BOTH the legend dot and the matching bar
   * segment (single source of truth — do not style the dot and bar
   * separately). Defaults by index when omitted: 1st segment `bg-foreground`,
   * 2nd `bg-foreground/30`, 3rd+ `bg-foreground/12`.
   */
  colorClass?: string
}

export interface AccountCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Card title, e.g. "Account". */
  title: string
  /**
   * Optional badge slot rendered top-right of the header row (e.g. an emoji
   * in a circular chip). In the source sketch this badge floats *outside*
   * the card, overlapping the muted panel behind it — that overlap/position
   * is NOT reproduced here; this component only reserves an inline slot
   * next to the title. If the floating-badge look is wanted, the caller
   * (widget/page-agent) should render it as an absolutely-positioned sibling
   * around this card instead of relying on this slot.
   */
  badge?: ReactNode
  /**
   * 3 (or more) segment legend + bar data, e.g.
   * `[{ label: "Spent", percent: 74 }, { label: "Available", percent: 8 }, { label: "Unallocated", percent: 18 }]`.
   * Each segment's bar width is `percent%` of the track directly (NOT
   * normalized against the sum of all percents) — if percents sum to less
   * than 100, the remainder is simply left as visible empty track, which
   * reads fine for an "unallocated" style remainder. Segments with
   * `percent <= 0` are skipped entirely (no zero-width slivers).
   */
  segments: AccountCardSegment[]
  /** Summary line under the bar, e.g. "$8,000 available of $100,000". */
  summary: string
  /**
   * CTA button config. Renders a full-width, slightly-rounded rectangular
   * button (NOT a pill, matching the sketch) — pass `href` for a plain link
   * (server-safe) or `onClick` for a click handler (requires this
   * component's `"use client"` boundary, already applied here; the *caller*
   * rendering this component must also be within a client boundary to pass
   * a working `onClick`).
   */
  cta: {
    label: string
    href?: string
    onClick?: () => void
    icon?: ReactNode
  }
}

const DEFAULT_SEGMENT_COLORS = ["bg-foreground", "bg-foreground/30", "bg-foreground/12"]

/**
 * White "Account" sub-card from the sketch (`ref/image2.png`, section 1):
 * title + optional badge slot, a multi-segment legend, a stacked progress
 * bar (segments laid out by raw percent width, see `segments` doc), a
 * summary line, and a full-width CTA button. This is a NEW component (not
 * `ProgressBar`, which is single-value) because the bar here has N
 * differently-colored segments driven by one `segments` array.
 *
 * Accessibility: the bar itself is `aria-hidden` — Base UI's `Progress.Root`
 * is single-value and has no valid ARIA representation for a stacked
 * multi-segment bar, so the real semantics live in the legend's visible text
 * (e.g. "Spent 74%"), which is already accessible as plain content.
 *
 * This component does NOT own the muted outer panel or the floating badge
 * overlap seen in the sketch — callers compose those around it (see `badge`
 * doc above).
 */
function AccountCard({
  title,
  badge,
  segments,
  summary,
  cta,
  className,
  ...props
}: AccountCardProps) {
  const visibleSegments = segments.filter((segment) => segment.percent > 0)

  const ctaClassName = cn(
    buttonVariants({ variant: "default" }),
    "h-[52px] w-full justify-between rounded-lg px-5 text-[15px] font-semibold"
  )

  return (
    <div
      data-slot="account-card"
      className={cn(
        "w-full max-w-[394px] rounded-2xl bg-white px-6 pt-6 pb-6 shadow-[0_1px_3px_rgba(0,0,0,.06)]",
        className
      )}
      {...props}
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="text-lg font-bold">{title}</div>
        {badge ? <div className="shrink-0">{badge}</div> : null}
      </div>

      <div className="mb-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px]">
        {visibleSegments.map((segment, index) => (
          <span
            key={segment.label}
            className="inline-flex items-center gap-1.5 text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className={cn(
                "inline-block size-2 shrink-0 rounded-full",
                segment.colorClass ?? DEFAULT_SEGMENT_COLORS[index] ?? DEFAULT_SEGMENT_COLORS[2]
              )}
            />
            <span className="font-medium text-foreground">{segment.label}</span>{" "}
            {segment.percent}%
          </span>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="mb-4 flex h-2.5 w-full items-stretch overflow-hidden rounded-full bg-muted"
      >
        {visibleSegments.map((segment, index) => (
          <div
            key={segment.label}
            className={cn(
              "h-full shrink-0",
              segment.colorClass ?? DEFAULT_SEGMENT_COLORS[index] ?? DEFAULT_SEGMENT_COLORS[2]
            )}
            style={{ width: `${Math.min(100, Math.max(0, segment.percent))}%` }}
          />
        ))}
      </div>

      <p className="mb-6 text-[13.5px] font-medium text-foreground">{summary}</p>

      {cta.href ? (
        <a href={cta.href} className={ctaClassName}>
          {cta.label}
          {cta.icon ?? <span aria-hidden="true">&rarr;</span>}
        </a>
      ) : (
        <button type="button" onClick={cta.onClick} className={ctaClassName}>
          {cta.label}
          {cta.icon ?? <span aria-hidden="true">&rarr;</span>}
        </button>
      )}
    </div>
  )
}

export { AccountCard }
