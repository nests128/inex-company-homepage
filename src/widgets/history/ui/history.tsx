import { cn } from "cn"

import { Carousel } from "@/shared/ui"

export interface HistoryYearMilestone {
  /** e.g. "04월". Rendered as a small label so each milestone reads as a distinct row, not a run-on paragraph. */
  month: string
  /** Milestone text for this month. */
  label: string
}

export interface HistoryYearEntry {
  /** e.g. "2022". Rendered as the large year numeral. */
  year: string
  /** Optional subheading under the year, e.g. "Workhorse is born". */
  heading?: string
  /** Month-by-month milestones for this year, each rendered as its own row. */
  items: HistoryYearMilestone[]
}

export interface HistorySectionProps {
  eyebrow?: string
  title: string
  /** Optional supporting copy under the title. Supports `\n` line breaks. */
  subtitle?: string
  years: HistoryYearEntry[]
  className?: string
}

/**
 * "Our History" section (`ref/company/image3.png` layout, adapted per
 * explicit request to drop the per-year thumbnail image and instead list
 * each month's milestone as its own distinct row): light full-bleed section
 * with a horizontally scrollable year timeline (dot on a continuous line,
 * year numeral + heading + a divided list of month/milestone rows below).
 * Originally built as a dark (`bg-[#111]`) section per the layout reference,
 * then switched to `bg-muted` (light gray, `docs/design-tokens.md`'s
 * "surface-muted") per explicit request — text/border colors below use the
 * project's default (light-mode) foreground/border tokens accordingly, not
 * the `text-white`/`white/*` overrides the dark version needed.
 *
 * Full-bleed section ownership: renders its own `<section>` (vertical
 * padding only) + `container-inex` (horizontal gutter), matching this
 * codebase's widget convention.
 *
 * The horizontal scroller reuses the shared `Carousel` primitive
 * (native scroll-snap + prev/next buttons) instead of a bespoke
 * implementation. `gap="0px"` is intentional: each item draws its own
 * half-width line segments so adjacent items' lines butt up into one
 * continuous horizontal rule across the whole track, which a nonzero
 * `Carousel` gap would visibly break.
 */
export function HistorySection({ eyebrow, title, subtitle, years, className }: HistorySectionProps) {
  return (
    <section className={cn("bg-muted py-14 lg:py-24", className)}>
      <div className="container-inex">
        <div className="max-w-[680px]">
          {eyebrow ? (
            <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
              <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
              {eyebrow}
            </div>
          ) : null}
          <h2 className="text-2xl leading-[1.2] font-bold tracking-[-.015em] whitespace-pre-line lg:text-[44px] lg:leading-[1.15] lg:tracking-[-.02em]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-4 text-[14.5px] leading-[1.6] whitespace-pre-line text-muted-foreground lg:text-[16.5px] lg:leading-[1.7]">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-10 lg:mt-14">
          {/* Item width is responsive (`className`, not the `itemWidth`
              prop — an inline style would fix it at every breakpoint, per
              `Carousel`'s own JSDoc): 360px was tuned for desktop's widened
              `pr-36` gap, but the same fixed width on a 390px mobile
              viewport left only a sliver of the next card peeking past a
              huge trailing gap. Mobile gets a narrower item that actually
              fits the viewport with a visible peek of the next one. */}
          <Carousel
            label={title}
            prevLabel="이전 연도"
            nextLabel="다음 연도"
            className="[--carousel-gap:0px] [--carousel-item-width:280px] [&_button]:cursor-pointer lg:[--carousel-item-width:360px]"
          >
            {years.map((entry, index) => (
              <HistoryYearCard
                key={entry.year}
                entry={entry}
                isFirst={index === 0}
                isLast={index === years.length - 1}
                isCurrent={entry.year === String(new Date().getFullYear())}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}

function HistoryYearCard({
  entry,
  isFirst,
  isLast,
  isCurrent,
}: {
  entry: HistoryYearEntry
  isFirst: boolean
  isLast: boolean
  /** Highlights the dot and year numeral in the brand accent (`bg-sky-500`, same as the section eyebrow marker) for the current calendar year. */
  isCurrent: boolean
}) {
  const { year, heading, items } = entry

  return (
    <div data-slot="history-year-card" className="flex flex-col pr-16 lg:pr-36">
      {/* Timeline rail: a horizontal line with a dot aligned to the year
          text's left edge below (not centered in the item) — the whole card
          reads flush-left against the year, per explicit request that the
          first year sit flush against the track's start with no leading
          gap. The line still runs full-width within this item's box so
          consecutive items' lines connect into one continuous rule; the
          first/last item mask their outer half so it doesn't overshoot.
          Inset matches this card's own `pr-*` (mobile's narrower gap needs a
          smaller overshoot than desktop's widened one). */}
      <div className="relative flex h-6 items-center">
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 -left-16 right-0 h-px -translate-y-1/2 bg-border lg:-left-36",
            // `hidden` (not `invisible`): an invisible span at the last item
            // would still be an absolutely-positioned box contributing its
            // `-right-36` overhang to the scroller's scrollable overflow,
            // which throws off `Carousel`'s canScrollNext end-of-track check.
            isFirst && "hidden"
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 left-0 -right-16 h-px -translate-y-1/2 bg-border lg:-right-36",
            isLast && "hidden"
          )}
        />
        <span
          aria-hidden="true"
          className={cn("relative size-2.5 rounded-full", isCurrent ? "bg-sky-500" : "bg-foreground")}
        />
      </div>

      <p
        className={cn(
          "mt-6 text-4xl font-bold tracking-[-.02em] lg:text-[44px]",
          isCurrent ? "text-sky-500" : "text-foreground"
        )}
      >
        {year}
      </p>
      {heading ? (
        <h3 className="mt-2 text-base font-bold text-foreground lg:text-lg">{heading}</h3>
      ) : null}

      {/* Each month/milestone is its own row (not a run-on paragraph),
          separated by a hairline divider so items read as distinct entries. */}
      <ul className="mt-4 flex flex-col">
        {items.map((item, index) => (
          <li
            key={`${item.month}-${index}`}
            className={cn("flex flex-col gap-1 py-2.5", index > 0 && "border-t border-border")}
          >
            <span className="text-[12.5px] font-semibold tracking-[.04em] text-muted-foreground uppercase">
              {item.month}
            </span>
            <span className="text-[14.5px] leading-[1.5] text-foreground/80">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
