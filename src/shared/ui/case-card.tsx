import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

import { Badge } from "./badge"
import { PlaceholderMedia } from "./placeholder-media"

export interface CaseCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Media alt/caption. Forwarded verbatim to `PlaceholderMedia` as `alt` — include any label prefix directly, e.g. "이미지: 가맹점 정산". */
  imageAlt: string
  /** Real image source; omit to show the striped placeholder. */
  imageSrc?: string
  /** Sector tag rendered as a pill badge over the image, e.g. "카드사 · PG · VAN". */
  sector: string
  /** Large stat figure, e.g. "T+0". */
  stat: string
  /** Stat caption, e.g. "정산 주기 단축". */
  statLabel: string
  /** Card title/headline copy. */
  title: string
  /**
   * "자세히 보기" link config. Omit to hide the link entirely — the mobile
   * artboard (~L397-412) drops it while desktop (~L247-270) shows it.
   */
  detailLink?: {
    label: string
    href?: string
    onClick?: () => void
  }
  icon?: ReactNode
}

/**
 * Industry case card: image + sector badge + stat + title + optional
 * "자세히 보기" link (wireframe ~L247-270 desktop, ~L397-412 mobile).
 */
function CaseCard({
  imageAlt,
  imageSrc,
  sector,
  stat,
  statLabel,
  title,
  detailLink,
  className,
  ...props
}: CaseCardProps) {
  return (
    <div
      data-slot="case-card"
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-[0_18px_44px_rgba(0,0,0,0.08)]",
        className
      )}
      {...props}
    >
      <div className="relative">
        <PlaceholderMedia
          alt={imageAlt}
          src={imageSrc}
          className="h-[140px] w-full rounded-none sm:h-[230px]"
        />
        <Badge
          variant="default"
          size="lg"
          className="absolute top-3 left-3 sm:top-4 sm:left-4"
        >
          {sector}
        </Badge>
      </div>

      <div className="p-[18px_20px_20px] sm:p-[24px_26px_26px]">
        <div className="text-2xl font-bold sm:text-[30px]">{stat}</div>
        <div className="mt-0.5 mb-2 text-[11.5px] text-muted-foreground sm:mb-3 sm:text-[13px]">
          {statLabel}
        </div>
        <div className="text-[14.5px] leading-[1.45] font-semibold sm:text-[17px]">
          {title}
        </div>

        {detailLink ? (
          <a
            href={detailLink.href ?? "#"}
            onClick={detailLink.onClick}
            className="mt-4 hidden items-center gap-2 border-b-[1.5px] border-foreground pb-0.5 text-[13.5px] font-semibold outline-none sm:inline-flex focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:rounded-xs"
          >
            {detailLink.label}
          </a>
        ) : null}
      </div>
    </div>
  )
}

export { CaseCard }
