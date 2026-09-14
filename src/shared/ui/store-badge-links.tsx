import Image from "next/image"
import { cn } from "cn"

export interface StoreBadgeLinksProps {
  appStoreHref: string
  googlePlayHref: string
  className?: string
}

/**
 * App Store / Google Play 배지 쌍. 이미지는 운영 CDN 프록시 경로(`/cdn/...`,
 * `next.config.ts`의 rewrite 참고)를 통해 로드되며, `company-homepage`
 * 프로젝트 푸터(`components/layout/footer/store-button.tsx`)의 동일 배지
 * 자산을 재사용한다 — 별도 로고 자산을 새로 만들지 않는다.
 */
function StoreBadgeLinks({ appStoreHref, googlePlayHref, className }: StoreBadgeLinksProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <a href={appStoreHref} target="_blank" rel="noopener noreferrer" className="shrink-0">
        <Image
          src="/cdn/image/icon/appStore.png"
          alt="App Store에서 다운로드"
          width={120}
          height={40}
          className="h-9 w-auto"
        />
      </a>
      <a href={googlePlayHref} target="_blank" rel="noopener noreferrer" className="shrink-0">
        <Image
          src="/cdn/image/icon/googleStore.png"
          alt="Google Play에서 다운로드"
          width={128}
          height={40}
          className="h-9 w-auto"
        />
      </a>
    </div>
  )
}

export { StoreBadgeLinks }
