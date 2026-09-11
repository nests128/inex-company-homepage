import Link from "next/link"

import { Badge, NewsCard } from "@/shared/ui"
import type { NewsPost } from "@/shared/lib/confluence"
import { newsDetailContent } from "@/entities/company"

export interface NewsDetailSectionProps {
  post: NewsPost
  /** Recent posts excluding the current one, for the "다른 소식 더 보기" section (up to 3). */
  relatedPosts: NewsPost[]
}

/**
 * `/news/[slug]` detail section (`ref/news/image2.png`): category label,
 * title, body HTML, related posts. No author/date — both removed per
 * explicit request.
 *
 * No standalone cover image — removed per explicit request. `thumbnailUrl`
 * (from `extractFirstImage`) is often the same image that already appears
 * inline as the body's first `<img>` (both derive from the same raw
 * Confluence storage HTML independently), so keeping a separate cover slot
 * risked showing that image twice on the same page.
 *
 * No `@tailwindcss/typography` plugin is installed in this repo (checked
 * `package.json`/`app/globals.css`), so the body uses hand-written
 * descendant-selector styling on the `dangerouslySetInnerHTML` wrapper
 * instead of a `prose` class.
 */
export function NewsDetailSection({ post, relatedPosts }: NewsDetailSectionProps) {
  return (
    <section aria-label="INEX 소식 상세" className="py-14 lg:py-20">
      <div className="container-inex flex flex-col gap-10 lg:gap-14">
        <div className="mx-auto flex w-full max-w-[960px] flex-col gap-5">
          <Link
            href="/news"
            className="w-fit text-[13.5px] font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {newsDetailContent.backToListLabel}
          </Link>

          {post.category ? (
            <Badge variant="default" size="lg" className="w-fit">
              {post.category}
            </Badge>
          ) : null}

          <h1 className="text-3xl leading-[1.2] font-bold tracking-[-.02em] sm:text-[42px]">
            {post.title}
          </h1>
        </div>

        <div
          className="mx-auto w-full max-w-[960px] text-[15.5px] leading-[1.75] text-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_img]:my-6 [&_img]:w-full [&_img]:rounded-xl [&_li]:mb-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_strong]:font-bold [&_table]:w-full [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
          // TODO(real-data): htmlContent는 Confluence storage format 원문(매크로
          // 잔여 태그가 남아있을 수 있음)을 그대로 렌더링 — 별도 sanitize/파서
          // 개선은 src/shared/lib/confluence 담당 범위(이 위젯에서 수정 금지).
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        {relatedPosts.length > 0 ? (
          <div className="flex flex-col gap-6 border-t border-border pt-10 lg:pt-14">
            <h2 className="text-xl font-bold tracking-[-.01em] sm:text-2xl">
              {newsDetailContent.relatedSectionTitle}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <NewsCard
                  key={related.id}
                  title={related.title}
                  excerpt={related.excerpt}
                  category={related.category}
                  thumbnailUrl={related.thumbnailUrl}
                  href={`/news/${related.slug}`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
