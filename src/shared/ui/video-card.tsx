import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

import { PlaceholderMedia } from "./placeholder-media"

export interface VideoCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Video alt/caption. Forwarded verbatim to `PlaceholderMedia` as `alt` — include any label prefix directly, e.g. "영상: 플랫폼 소개" or "Video: platform introduction". */
  videoAlt: string
  /** Real poster/video source; omit to show the striped placeholder. */
  posterSrc?: string
  /**
   * Real video source. When set, the video autoplays muted and loops as soon
   * as it mounts. Omit to keep the poster-only placeholder behavior.
   */
  videoSrc?: string
}

/**
 * Video card (wireframe big-feature section ~L168-175). Wraps `PlaceholderMedia`
 * with `kind="video"` when no `videoSrc` is available. When `videoSrc` is set,
 * renders a muted, looping, autoplaying `<video>` with native controls so
 * users can pause or unmute.
 */
function VideoCard({ videoAlt, posterSrc, videoSrc, className, ...props }: VideoCardProps) {
  return (
    <div
      data-slot="video-card"
      className={cn("relative min-h-[380px] w-full overflow-hidden rounded-2xl", className)}
      {...props}
    >
      {videoSrc ? (
        <video
          src={videoSrc}
          poster={posterSrc}
          aria-label={videoAlt}
          controls
          autoPlay
          muted
          loop
          playsInline
          className="size-full min-h-[380px] rounded-2xl object-cover"
        />
      ) : (
        <PlaceholderMedia
          alt={videoAlt}
          src={posterSrc}
          kind="video"
          fill={Boolean(posterSrc)}
          className={cn(
            "min-h-[380px] w-full rounded-2xl",
            !posterSrc && "items-start justify-start p-4"
          )}
        />
      )}
    </div>
  )
}

export { VideoCard }
