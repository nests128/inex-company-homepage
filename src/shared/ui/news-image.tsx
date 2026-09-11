"use client"

import { useState } from "react"
import { cn } from "cn"

export interface NewsImageProps {
  src: string | null
  alt: string
  className?: string
}

/**
 * Light-mode counterpart to `src/widgets/success-stories/ui/news-thumbnail.tsx`
 * (that one is dark-carousel only — do not reuse it here). Confluence
 * thumbnail URLs are either an arbitrary external `ri:url` host or our own
 * `/api/confluence-image` proxy; neither is registered in
 * `next.config.ts` `images.remotePatterns`, so this intentionally uses a
 * plain `<img>` instead of `next/image` (which would throw at runtime for
 * the external-host case). Load failures swap in a bordered placeholder
 * block matching this project's light card tone instead of leaving a
 * broken image icon.
 */
export function NewsImage({ src, alt, className }: NewsImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-[repeating-linear-gradient(45deg,#f6f6f6_0_12px,#ececec_12px_24px)] text-[11px] font-medium tracking-[.02em] text-muted-foreground uppercase",
          className
        )}
      >
        INEX
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- external/auth-walled Confluence URL, not eligible for next/image optimization (see next.config.ts remotePatterns)
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  )
}
