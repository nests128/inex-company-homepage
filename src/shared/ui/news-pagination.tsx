import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface NewsPaginationProps extends Omit<ComponentPropsWithoutRef<"nav">, "children"> {
  currentPage: number
  totalPages: number
  /** Builds the URL for a given page number, e.g. `(page) => \`/news?page=${page}\`` */
  hrefForPage: (page: number) => string
}

const pillBase =
  "inline-flex size-9 items-center justify-center rounded-full border text-[13.5px] font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50"

/**
 * Page-number navigation for the news list. Pure/stateless — safe to render
 * from a server component. Renders nothing when there's nothing to paginate
 * (`totalPages <= 1`).
 */
function NewsPagination({
  currentPage,
  totalPages,
  hrefForPage,
  className,
  ...props
}: NewsPaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav
      data-slot="news-pagination"
      aria-label="뉴스 페이지 네비게이션"
      className={cn("flex items-center justify-center gap-1.5", className)}
      {...props}
    >
      {hasPrev ? (
        <Link
          href={hrefForPage(currentPage - 1)}
          aria-label="이전 페이지"
          className={cn(pillBase, "border-border bg-background text-foreground hover:bg-muted")}
        >
          ‹
        </Link>
      ) : (
        <span
          aria-hidden="true"
          className={cn(pillBase, "border-border text-muted-foreground/40")}
        >
          ‹
        </span>
      )}

      {pages.map((page) => {
        const isCurrent = page === currentPage
        return isCurrent ? (
          <span
            key={page}
            aria-current="page"
            className={cn(pillBase, "border-foreground bg-foreground text-background")}
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={hrefForPage(page)}
            className={cn(pillBase, "border-border bg-background text-foreground hover:bg-muted")}
          >
            {page}
          </Link>
        )
      })}

      {hasNext ? (
        <Link
          href={hrefForPage(currentPage + 1)}
          aria-label="다음 페이지"
          className={cn(pillBase, "border-border bg-background text-foreground hover:bg-muted")}
        >
          ›
        </Link>
      ) : (
        <span
          aria-hidden="true"
          className={cn(pillBase, "border-border text-muted-foreground/40")}
        >
          ›
        </span>
      )}
    </nav>
  )
}

export { NewsPagination }
