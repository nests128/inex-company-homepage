import { fetchNewsPosts } from "@/shared/lib/confluence"
import { newsListContent } from "@/entities/company"
import { NewsListClient } from "./news-list-client"

export interface NewsListSectionProps {
  /** Current `?page=` value from the `/news` route's `searchParams`. Defaults to 1. */
  page?: number
}

/**
 * `/news` list section (`ref/news/image.png`): big title, category filter,
 * a large featured card for the newest post, then a "Latest news" grid.
 * Server component — fetches once, hands the (serializable) result to the
 * `"use client"` `NewsListClient` for filtering/pagination interactivity
 * (`NewsCategoryFilter` requires a client event-handler prop).
 */
export async function NewsListSection({ page = 1 }: NewsListSectionProps) {
  const posts = await fetchNewsPosts()

  const categories = [
    newsListContent.allCategoryLabel,
    ...Array.from(
      new Set(posts.map((post) => post.category).filter((c): c is string => Boolean(c)))
    ),
  ]

  return (
    <section aria-label="INEX 소식 목록" className="py-10 lg:py-14">
      <div className="container-inex flex flex-col gap-8 lg:gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[13px] font-medium text-foreground/80">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {newsListContent.eyebrow}
          </div>
          <h1 className="text-2xl leading-[1.2] font-bold tracking-[-.015em] lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {newsListContent.title}
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="py-16 text-center text-[14.5px] text-muted-foreground">
            {newsListContent.emptyMessage}
          </p>
        ) : (
          <NewsListClient posts={posts} categories={categories} page={page} />
        )}
      </div>
    </section>
  )
}
