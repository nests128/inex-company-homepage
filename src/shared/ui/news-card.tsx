import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

import { Badge } from "./badge"
import { NewsImage } from "./news-image"

export interface NewsCardProps extends Omit<ComponentPropsWithoutRef<"a">, "href" | "children"> {
  title: string
  excerpt: string
  category?: string | null
  thumbnailUrl?: string | null
  /** Internal link, e.g. `/news/[slug]`. */
  href: string
  /** Alt text prefix for the thumbnail image, e.g. "이미지" / "Image". Defaults to Korean for backward compatibility. */
  imageAltPrefix?: string
}

/**
 * Grid card for the "Latest news" list (`ref/news/image.png` 3-column
 * section) — image + category badge + title + excerpt. Distinct from
 * `src/widgets/success-stories/ui/news-thumbnail.tsx`, which is a
 * dark-carousel-only thumbnail leaf; this is the light, standalone card
 * used by the news list widget. No date — removed per explicit request
 * ("의미없음", not meaningful here).
 */
function NewsCard({
  title,
  excerpt,
  category,
  thumbnailUrl,
  href,
  imageAltPrefix = "이미지",
  className,
  ...props
}: NewsCardProps) {
  return (
    <Link
      href={href}
      data-slot="news-card"
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl bg-background outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      <div className="relative overflow-hidden">
        <NewsImage
          src={thumbnailUrl ?? null}
          alt={`${imageAltPrefix}: ${title}`}
          className="aspect-[16/11] w-full scale-100 transition-transform duration-300 ease-out group-hover:scale-110"
        />
        {category ? (
          <Badge variant="default" size="lg" className="absolute top-3 left-3">
            {category}
          </Badge>
        ) : null}
      </div>

      {/* bg color sampled directly from ref/news/image.png's card text panel
          (#f5f4f1) per explicit request to match it exactly, same as
          NewsFeaturedCard's panel. */}
      <div className="flex flex-1 flex-col bg-[#f5f4f1] p-5">
        <h3 className="text-[15.5px] leading-[1.4] font-bold sm:text-[17px]">{title}</h3>
        <p className="mt-2 line-clamp-2 text-[13.5px] leading-[1.55] text-muted-foreground">
          {excerpt}
        </p>
      </div>
    </Link>
  )
}

export { NewsCard }
