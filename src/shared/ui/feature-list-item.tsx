import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

type FeatureListItemBaseProps = {
  /** Icon/glyph slot, rendered inline immediately to the left of `title`. */
  icon?: ReactNode
  /** Item title, rendered on the same row as `icon`, e.g. "Invoicing". */
  title: string
  /** Two-line description copy, wraps full-width below the icon+title row. */
  description: string
  /**
   * Highlights this item with a light-grey rounded surface wrapping the
   * whole item (icon + title + description) — matches the "active" first
   * item in the reference sketch (`ref/image.png`, "Invoicing"). Only one
   * item in a list is typically `active` at a time; the containing list
   * decides which. When `onClick` is provided, `active` instead represents
   * the currently-selected item in an interactive list.
   */
  active?: boolean
  /**
   * When provided, the item renders as a real `<button>` (full keyboard
   * accessibility, `aria-pressed` reflects `active`) instead of a static
   * `<div>`. Omit to keep the previous non-interactive display-only usage.
   */
  onClick?: () => void
}

export type FeatureListItemProps = FeatureListItemBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof FeatureListItemBaseProps | "children">

/**
 * Borderless icon+title+description list item for a vertically-stacked
 * feature list (reference: `ref/image.png`, "Workhorse delivers insight,
 * fast" left column — "Invoicing" / "Dashboard Editor" / "Automation").
 *
 * Unlike `FeatureCard` (bordered card, stacked icon-above-title, solid
 * icon tile), this renders icon + title inline on one row with the
 * description wrapping below, no border, and no icon background box by
 * default — matching the sketch precisely (confirmed via zoomed crop: the
 * icon is a bare glyph, not a filled tile; only the `active` item gets a
 * background, and that background wraps the entire item, not just the
 * icon).
 */
function FeatureListItem({
  icon,
  title,
  description,
  active = false,
  onClick,
  className,
  ...props
}: FeatureListItemProps) {
  const content = (
    <>
      <div className="flex items-center gap-2">
        {icon ? (
          <span
            aria-hidden="true"
            className="flex size-4 shrink-0 items-center justify-center text-foreground [&_svg]:size-4"
          >
            {icon}
          </span>
        ) : null}
        <div className="text-[15.5px] font-semibold">{title}</div>
      </div>
      <div className="mt-1.5 text-[14.5px] leading-[1.6] text-muted-foreground">
        {description}
      </div>
    </>
  )

  const sharedClassName = cn(
    "rounded-[14px] p-4 transition-colors",
    active && "bg-muted",
    className
  )

  if (onClick) {
    return (
      <button
        type="button"
        data-slot="feature-list-item"
        data-active={active}
        aria-pressed={active}
        onClick={onClick}
        className={cn(
          "w-full cursor-pointer appearance-none border-0 bg-transparent text-left outline-none",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          !active && "hover:bg-muted/50",
          sharedClassName
        )}
        {...props}
      >
        {content}
      </button>
    )
  }

  return (
    <div
      data-slot="feature-list-item"
      data-active={active}
      className={sharedClassName}
      {...(props as ComponentPropsWithoutRef<"div">)}
    >
      {content}
    </div>
  )
}

export { FeatureListItem }
