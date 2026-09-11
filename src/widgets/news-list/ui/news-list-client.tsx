"use client"

import { useMemo, useState } from "react"

import {
  NewsCard,
  NewsCategoryFilter,
  NewsFeaturedCard,
  NewsPagination,
} from "@/shared/ui"
import type { NewsPost } from "@/shared/lib/confluence"
import { newsListContent } from "@/entities/company"

const PAGE_SIZE = 9

export interface NewsListClientProps {
  posts: NewsPost[]
  categories: string[]
  /** Current page number, sourced from the `?page=` URL search param (server page prop). */
  page: number
}

/**
 * Client boundary for the news list's interactive bits. `NewsListSection`
 * (server) fetches `posts` once and reads `?page=` from the page's
 * `searchParams` prop, handing both down here.
 *
 * Category filtering is plain client state (`NewsCategoryFilter` requires a
 * client event handler, and the task treats full URL sync as
 * nice-to-have/optional). Pagination stays URL-driven via
 * `NewsPagination`'s `hrefForPage` (real `next/link`s to `/news?page=N`) so
 * no `useSearchParams()` + Suspense boundary is needed on this route.
 *
 * Known seam: filtering to a category with fewer pages than the current
 * `?page=` doesn't reset the URL — handled by clamping `page` against the
 * filtered result's `totalPages` below, rather than adding router-based URL
 * sync for a corner case the task explicitly deprioritizes.
 */
export function NewsListClient({ posts, categories, page }: NewsListClientProps) {
  const [activeCategory, setActiveCategory] = useState(newsListContent.allCategoryLabel)

  const filtered = useMemo(() => {
    if (activeCategory === newsListContent.allCategoryLabel) return posts
    return posts.filter((post) => post.category === activeCategory)
  }, [posts, activeCategory])

  const featured = filtered[0] ?? null
  const rest = filtered.slice(1)

  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE))
  const currentPage = Math.min(Math.max(page, 1), totalPages)
  const pageItems = rest.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      {/* 실제 카테고리가 하나도 없으면(현재 실데이터 상태) "전체" 뱃지 하나만
          덩그러니 남아 아무 기능도 하지 않으므로 필터 자체를 숨김. */}
      {categories.length > 1 ? (
        <NewsCategoryFilter
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
      ) : null}

      {featured ? (
        <NewsFeaturedCard
          title={featured.title}
          excerpt={featured.excerpt}
          category={featured.category}
          thumbnailUrl={featured.thumbnailUrl}
          href={`/news/${featured.slug}`}
        />
      ) : (
        <p className="text-center text-[14.5px] text-muted-foreground">
          {newsListContent.emptyMessage}
        </p>
      )}

      {pageItems.length > 0 ? (
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold tracking-[-.01em] sm:text-2xl">
            {newsListContent.latestSectionTitle}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((post) => (
              <NewsCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                thumbnailUrl={post.thumbnailUrl}
                href={`/news/${post.slug}`}
              />
            ))}
          </div>
        </div>
      ) : null}

      <NewsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hrefForPage={(target) => `/news?page=${target}`}
      />
    </div>
  )
}
