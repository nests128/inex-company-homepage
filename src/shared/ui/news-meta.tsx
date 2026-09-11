import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

import { formatNewsDate } from "@/shared/lib/format-date"

export interface NewsMetaProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Author display name. Omit/`null` to render the date only. */
  authorName?: string | null
  /** ISO (or `Date`-parseable) publish timestamp. Empty/invalid values render nothing. */
  publishedAt: string
}

/**
 * Small author + date line for the news detail header (`ref/news/image2.png`
 * "by Marcus Bell" / date rows). Renders "이름 · 날짜" when an author is
 * present, otherwise just the date. Wrapped in `<time>` for the date part so
 * it stays machine-readable.
 */
function NewsMeta({ authorName, publishedAt, className, ...props }: NewsMetaProps) {
  const formatted = formatNewsDate(publishedAt)

  if (!authorName && !formatted) return null

  return (
    <div
      data-slot="news-meta"
      className={cn("flex flex-wrap items-center gap-2 text-[13.5px] text-muted-foreground", className)}
      {...props}
    >
      {authorName ? <span className="font-medium text-foreground">{authorName}</span> : null}
      {authorName && formatted ? <span aria-hidden="true">·</span> : null}
      {formatted ? <time dateTime={publishedAt}>{formatted}</time> : null}
    </div>
  )
}

export { NewsMeta }
