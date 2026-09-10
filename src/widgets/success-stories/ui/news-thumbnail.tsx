"use client"

import { useState } from "react"
import { cn } from "cn"

export interface NewsThumbnailProps {
  src: string | null
  alt: string
  className?: string
}

// Confluence 첨부파일 다운로드 URL은 인증이 필요해 브라우저에서 바로 로드되지
// 않을 수 있다 — next/image 최적화 대상 호스트로도 등록돼 있지 않으므로 plain
// <img>를 쓰고, 로드 실패(onError)는 카드 전체가 아니라 이 썸네일 슬롯만
// 플레이스홀더 블록으로 대체한다.
export function NewsThumbnail({ src, alt, className }: NewsThumbnailProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-white/5 text-[11px] font-medium tracking-[.02em] text-white/40 uppercase",
          className
        )}
      >
        INEX
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- external/auth-walled Confluence URL, not eligible for next/image optimization
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  )
}
