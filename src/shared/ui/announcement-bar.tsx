"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "cn"

export interface AnnouncementBarProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  /** Announcement copy, e.g. "INEX Digital Asset Rail이 공개되었습니다." */
  message: string
  /** Optional trailing link, e.g. { label: "자세히 보기", href: "#" }. */
  link?: {
    label: string
    href: string
  }
  /** Called when the user dismisses the bar. Omit to render without a close button. */
  onDismiss?: () => void
  /** Accessible label for the dismiss button. Defaults to "공지 닫기". */
  dismissLabel?: string
}

/**
 * Top announcement bar (wireframe ~L40-44 desktop / ~L324 mobile).
 * Dismissal state (visibility) is owned by the caller via `onDismiss` so it
 * can be persisted (e.g. localStorage) by page-agent if desired; this
 * component is a stateless presentational bar.
 */
function AnnouncementBar({
  message,
  link,
  onDismiss,
  dismissLabel = "공지 닫기",
  className,
  ...props
}: AnnouncementBarProps) {
  return (
    <div
      data-slot="announcement-bar"
      className={cn(
        "relative flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-primary py-2.5 pr-11 pl-4 text-center text-[11.5px] text-primary-foreground sm:gap-3.5 sm:px-10 sm:text-[13px]",
        className
      )}
      {...props}
    >
      <span>{message}</span>
      {link ? (
        <a
          href={link.href}
          className="font-semibold underline underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {link.label}
        </a>
      ) : null}
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className="absolute top-1/2 right-2.5 flex size-11 shrink-0 -translate-y-1/2 items-center justify-center rounded-full text-primary-foreground/60 outline-none transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring/50 sm:right-4 sm:size-6"
        >
          <XIcon className="size-3.5" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}

export { AnnouncementBar }
