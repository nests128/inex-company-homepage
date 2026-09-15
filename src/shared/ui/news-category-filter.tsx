"use client"

import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface NewsCategoryFilterProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children" | "onSelect"> {
  categories: string[]
  active: string
  onSelect: (category: string) => void
  /** Accessible group label. Defaults to Korean for backward compatibility. */
  groupLabel?: string
}

/**
 * Category filter pill group for the news list. Client component (holds no
 * state itself, but requires an event-handler prop — the caller supplying
 * `onSelect` must be a client component/boundary too).
 *
 * Note: this is the one place in the news UI set that intentionally uses
 * the project's sky-500 accent for the active pill, per explicit
 * instruction — `docs/design-tokens.md` otherwise specifies a
 * colorless black & white tone; flag this deviation to anyone reconciling
 * the two.
 */
function NewsCategoryFilter({
  categories,
  active,
  onSelect,
  groupLabel = "카테고리 필터",
  className,
  ...props
}: NewsCategoryFilterProps) {
  return (
    <div
      data-slot="news-category-filter"
      role="group"
      aria-label={groupLabel}
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {categories.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(category)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-[13.5px] font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              isActive
                ? "border-sky-500 bg-sky-500 text-white hover:bg-sky-600"
                : "border-border bg-background text-foreground hover:bg-muted"
            )}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

export { NewsCategoryFilter }
