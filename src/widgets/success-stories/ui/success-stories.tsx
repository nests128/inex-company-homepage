import Link from "next/link"
import { locale as getLocale } from "next/root-params"

import { Badge, Carousel, Reveal } from "@/shared/ui"
import { successStoriesContentByLocale } from "@/entities/company"
import { fetchNewsPosts, type NewsPost } from "@/shared/lib/confluence"
import { isLocale, defaultLocale, publicPath, type Locale } from "@/shared/lib/i18n"
import { NewsThumbnail } from "./news-thumbnail"

const MAX_POSTS = 6

export async function SuccessStories() {
  const rawLocale = await getLocale()
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale
  const successStoriesContent = successStoriesContentByLocale[locale]
  const posts = (await fetchNewsPosts()).slice(0, MAX_POSTS)

  return (
    <section className="bg-[#111] py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div" className="mb-8 lg:mb-12">
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] text-white lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
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
                <NewsCard key={post.id} post={post} locale={locale} />
              ))}
            </Carousel>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function NewsCard({ post, locale }: { post: NewsPost; locale: Locale }) {
  return (
    <Link
      href={publicPath(locale, `/news/${post.slug}`)}
      data-slot="news-card"
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/[.04] text-white outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:aspect-[3/4]">
        <NewsThumbnail
          src={post.thumbnailUrl}
          alt={post.title}
          className="absolute inset-0 scale-100 transition-transform duration-300 ease-out group-hover:scale-110"
        />
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
    </Link>
  )
}
