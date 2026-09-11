import { Badge, Carousel, Reveal } from "@/shared/ui"
import { successStoriesContent } from "@/entities/company"
import { fetchNewsPosts, type NewsPost } from "@/shared/lib/confluence"
import { NewsThumbnail } from "./news-thumbnail"

const MAX_POSTS = 6

export async function SuccessStories() {
  const posts = (await fetchNewsPosts()).slice(0, MAX_POSTS)

  return (
    <section className="bg-[#111] py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div" className="mb-8 lg:mb-12">
          <h2 className="text-2xl leading-[1.2] font-bold tracking-[-.015em] text-white lg:text-[44px] lg:leading-[1.15] lg:tracking-[-.02em]">
            {successStoriesContent.heading}
          </h2>
        </Reveal>

        {posts.length === 0 ? (
          <Reveal as="div" delay={0.1} className="text-sm text-white/60">
            {successStoriesContent.emptyMessage}
          </Reveal>
        ) : (
          <Reveal as="div" delay={0.1}>
            <Carousel
              label={successStoriesContent.heading}
              className="[--carousel-item-width:85%] sm:[--carousel-item-width:380px] [&_button]:cursor-pointer [&_button]:border-white/20 [&_button]:bg-white [&_button]:text-[#111] [&_button]:hover:bg-white/85"
            >
              {posts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </Carousel>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <div
      data-slot="news-card"
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/[.04] text-white"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-[3/4]">
        <NewsThumbnail src={post.thumbnailUrl} alt={post.title} className="absolute inset-0" />
        {post.category ? (
          <Badge
            variant="inverse"
            size="lg"
            className="absolute top-4 left-4 uppercase"
          >
            {post.category}
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <h3 className="text-base leading-[1.35] font-bold sm:text-lg">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-[1.5] text-white/60">
          {post.excerpt}
        </p>
      </div>

      {/* TODO: INEX 소식 전용 상세 목록 페이지가 생기면 그쪽으로 연결하며
          다시 노출 — 그 전까지는 Confluence 원문 링크를 그대로 새 탭으로
          띄우는 임시 동작이라 숨김 처리(hidden, 삭제 아님). */}
      {post.href ? (
        <div className="hidden items-center justify-end border-t border-white/10 p-4 sm:p-5">
          <a
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold tracking-[-.01em] text-white underline decoration-white underline-offset-4 visited:text-white hover:text-[#cccccc] hover:decoration-[#cccccc]"
          >
            더 보기
          </a>
        </div>
      ) : null}
    </div>
  )
}
