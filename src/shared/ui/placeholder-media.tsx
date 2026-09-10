import Image from "next/image"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface PlaceholderMediaProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /**
   * Required, meaningful description of what will occupy this slot once
   * real media is provided. Rendered verbatim as the placeholder's visible
   * caption (no prefix is added), and forwarded as `alt` to `next/image`
   * when `src` is supplied — so callers should bake in any needed label,
   * e.g. "이미지: 트레이딩 화면 스크린샷" or "Video: platform introduction".
   */
  alt: string
  /**
   * Real media source. When omitted, a striped placeholder box with a
   * mono-font caption is rendered instead (wireframe convention:
   * `repeating-linear-gradient` fill + caption from `alt`).
   */
  src?: string
  /** Semantic media kind, exposed as `data-kind` on the placeholder box (no effect on the caption text — include any label directly in `alt`). */
  kind?: "image" | "video"
  /** Forwarded to `next/image` when `src` is set. Ignored for the placeholder box. */
  width?: number
  /** Forwarded to `next/image` when `src` is set. Ignored for the placeholder box. */
  height?: number
  /** Forwarded to `next/image` when `src` is set (use with a `fill`-sized container). */
  fill?: boolean
  /** Forwarded to `next/image`. */
  sizes?: string
  /** Forwarded to `next/image`. */
  priority?: boolean
  /** Forwarded to `next/image` (default 75). Raise for photos with fine detail/text that look soft at the default JPEG re-encode quality. */
  quality?: number
  /**
   * Hides the visible caption chip (still keeps `role="img"`/`aria-label`
   * for accessibility). Use for small placements — e.g. small square photo
   * slots (`ref/image.png` headshot pair) — where the default caption
   * `<span>` would overflow the box. Only affects the no-`src` placeholder
   * branch.
   */
  compact?: boolean
}

/**
 * Image/video placeholder slot. Renders `next/image` once a real `src` is
 * supplied by page-agent; until then, shows a clearly-labelled striped
 * placeholder box so the layout and intent are visible without real assets.
 */
function PlaceholderMedia({
  alt,
  src,
  kind = "image",
  width,
  height,
  fill,
  sizes,
  priority,
  quality,
  compact = false,
  className,
  ...props
}: PlaceholderMediaProps) {
  if (src) {
    return (
      <div
        data-slot="placeholder-media"
        className={cn(fill ? "relative overflow-hidden" : undefined, className)}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={cn(fill ? "object-cover" : undefined)}
        />
      </div>
    )
  }

  return (
    <div
      data-slot="placeholder-media"
      data-kind={kind}
      role="img"
      aria-label={alt}
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-2xl border border-border",
        "bg-[repeating-linear-gradient(45deg,#f6f6f6_0_12px,#ececec_12px_24px)]",
        className
      )}
      {...props}
    >
      {compact ? null : (
        <span className="border border-dashed border-border bg-background px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
          {alt}
        </span>
      )}
    </div>
  )
}

export { PlaceholderMedia }
