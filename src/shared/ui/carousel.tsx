"use client"

import { useReducedMotion } from "motion/react"
import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react"
import { cn } from "cn"

import { Button } from "./button"
import styles from "./carousel.module.css"

export interface CarouselProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Card elements. Each child is wrapped in a snap-aligned `<li>` — do not pre-wrap children yourselves. */
  children: ReactNode
  /**
   * Width of one item, e.g. `"380px"` or `"85vw"`. Emitted as the
   * `--carousel-item-width` CSS custom property on the scroller (same
   * pattern as `Marquee`'s `--marquee-gap`: an inline style always wins over
   * a class-based custom-property declaration on the same element, so
   * passing this prop fixes the width at every breakpoint and silently
   * defeats a responsive className override like
   * `sm:[--carousel-item-width:380px]`). Omit this prop to set the width
   * responsively via `className` instead; falls back to `85%` when both are
   * omitted.
   */
  itemWidth?: string
  /**
   * Gap between items, e.g. `"20px"`. Same override rule as `itemWidth` —
   * omit to control responsively via `className` (`[--carousel-gap:...]`).
   * Falls back to `20px` when both are omitted.
   */
  gap?: string
  /** Accessible label for the scrollable region (e.g. "Success stories"). */
  label: string
  /** Accessible label for the "scroll left" button. */
  prevLabel?: string
  /** Accessible label for the "scroll right" button. */
  nextLabel?: string
  /**
   * Hides the built-in prev/next arrow buttons when `false` — use if
   * page-agent wants to render its own controls elsewhere and drive the
   * scroller via its own ref instead. Defaults to `true`.
   */
  showArrows?: boolean
  /** Extra classes for the scroll container (the element carrying the snap/overflow behavior). */
  scrollerClassName?: string
}

/**
 * Reusable horizontal card slider (`ref/image3.png` "Success stories").
 *
 * Implementation: native CSS scroll-snap (`overflow-x: auto` +
 * `scroll-snap-type: x mandatory`) rather than a JS carousel library —
 * no extra dependency, cheap to keep in sync with responsive card widths,
 * and scroll position/momentum/touch gestures come for free from the
 * browser. The prev/next buttons call `scrollBy` on the scroller ref;
 * they measure the *first rendered item's* actual box (`getBoundingClientRect`)
 * plus the resolved `column-gap` at click time rather than parsing the
 * `itemWidth`/`gap` prop strings, so the buttons stay correct even when the
 * item width is set responsively via className instead of the props.
 *
 * Bleed contract: this component is not full-bleed and does not cap its own
 * width — it renders exactly the scroll track. Whether the track sits inside
 * `container-inex` (clipped) or is allowed to bleed past it with the last
 * card partially visible (as in the reference sketch, the marquee-style
 * exception in `docs/design-tokens.md`) is page-agent's layout decision via
 * the wrapping element and `className`/`scrollerClassName`.
 *
 * Respects `prefers-reduced-motion`: programmatic scroll (arrow clicks) uses
 * `behavior: "auto"` instead of `"smooth"` when reduced motion is requested.
 */
function Carousel({
  children,
  itemWidth,
  gap,
  label,
  prevLabel = "Previous",
  nextLabel = "Next",
  showArrows = true,
  className,
  scrollerClassName,
  style,
  ...props
}: CarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const maxScrollLeft = el.scrollWidth - el.clientWidth
    setCanScrollPrev(el.scrollLeft > 1)
    setCanScrollNext(el.scrollLeft < maxScrollLeft - 1)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    updateScrollState()

    const onScroll = () => updateScrollState()
    el.addEventListener("scroll", onScroll, { passive: true })

    const onResize = () => updateScrollState()
    window.addEventListener("resize", onResize)

    let resizeObserver: ResizeObserver | undefined
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => updateScrollState())
      resizeObserver.observe(el)
    }

    return () => {
      el.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      resizeObserver?.disconnect()
    }
  }, [updateScrollState])

  const scrollByStep = useCallback(
    (direction: 1 | -1) => {
      const el = scrollerRef.current
      if (!el) return

      const firstItem = el.firstElementChild as HTMLElement | null
      const itemBoxWidth = firstItem?.getBoundingClientRect().width ?? el.clientWidth * 0.85
      const gapPx = firstItem ? parseFloat(getComputedStyle(el).columnGap || "0") || 0 : 0
      const step = itemBoxWidth + gapPx

      el.scrollBy({
        left: direction * step,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      })
    },
    [prefersReducedMotion]
  )

  const items = Children.toArray(children)

  return (
    <div data-slot="carousel" className={cn("relative", className)} {...props}>
      <ul
        ref={scrollerRef}
        role="list"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "flex snap-x snap-mandatory overflow-x-auto scroll-smooth",
          styles.scroller,
          scrollerClassName
        )}
        style={{
          gap: "var(--carousel-gap, 20px)",
          ...(gap !== undefined ? { ["--carousel-gap" as string]: gap } : null),
          ...style,
        }}
      >
        {items.map((child, index) => (
          <li
            key={index}
            className="w-(--carousel-item-width,85%) shrink-0 snap-start"
            style={
              itemWidth !== undefined
                ? { ["--carousel-item-width" as string]: itemWidth }
                : undefined
            }
          >
            {child}
          </li>
        ))}
      </ul>

      {showArrows ? (
        <div className="mt-4 flex items-center gap-2">
          <Button
            type="button"
            variant="pill-outline-inverse"
            size="icon"
            className="size-10 rounded-full border-foreground/15 bg-foreground text-background hover:bg-foreground/85"
            aria-label={prevLabel}
            disabled={!canScrollPrev}
            onClick={() => scrollByStep(-1)}
          >
            <ArrowLeftIcon aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="pill-outline-inverse"
            size="icon"
            className="size-10 rounded-full border-foreground/15 bg-foreground text-background hover:bg-foreground/85"
            aria-label={nextLabel}
            disabled={!canScrollNext}
            onClick={() => scrollByStep(1)}
          >
            <ArrowRightIcon aria-hidden="true" />
          </Button>
        </div>
      ) : null}
    </div>
  )
}

function ArrowLeftIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  )
}

function ArrowRightIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  )
}

export { Carousel }
