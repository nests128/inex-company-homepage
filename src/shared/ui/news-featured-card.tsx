import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

import { NewsImage } from "./news-image"

export interface NewsFeaturedCardProps extends Omit<ComponentPropsWithoutRef<"a">, "href" | "children"> {
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
 * Large hero card at the top of the news list (`ref/news/image.png` "Our
 * Blog" featured post). Desktop: image left, text right, side-by-side.
 * Mobile: stacked (image on top, text below). No author/date — removed per
 * explicit request.
 */
function NewsFeaturedCard({
  title,
  excerpt,
  category,
  thumbnailUrl,
  href,
  imageAltPrefix = "이미지",
  className,
  ...props
}: NewsFeaturedCardProps) {
  return (
    <Link
      href={href}
      data-slot="news-featured-card"
      className={cn(
        "group grid overflow-hidden rounded-2xl bg-background outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:grid-cols-2",
        className
      )}
      {...props}
    >
      <NewsImage
        src={thumbnailUrl ?? null}
        alt={`${imageAltPrefix}: ${title}`}
        className="aspect-[16/10] w-full scale-100 transition-transform duration-300 ease-out group-hover:scale-110 sm:aspect-auto sm:h-[380px]"
      />

      {/* bg color sampled directly from ref/news/image.png's featured-card
          text panel (#f5f4f1) per explicit request to match it exactly. */}
      <div className="flex flex-col justify-center gap-3 bg-[#f5f4f1] p-6 sm:p-10">
        {category ? (
          <span className="text-[12px] font-semibold tracking-[.08em] text-muted-foreground uppercase">
            {category}
          </span>
        ) : null}
        <h2 className="text-2xl leading-[1.25] font-bold tracking-[-.01em] sm:text-[34px]">
          {title}
        </h2>
        <p className="hidden text-[15px] leading-[1.6] text-muted-foreground sm:block">
          {excerpt}
        </p>
      </div>
    </Link>
  )
}

export { NewsFeaturedCard }
