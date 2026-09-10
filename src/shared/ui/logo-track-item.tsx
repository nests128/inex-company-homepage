import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface LogoTrackItemProps extends ComponentPropsWithoutRef<"span"> {
  /** Partner/brand name text, e.g. "FIREBLOCKS". Placeholder content — supplied by caller. */
  label: string
}

/**
 * Single text-wordmark item for the partner-logo `Marquee` (wireframe
 * ~L136-145). Plain text styling — swap for a real logo image later by
 * passing children instead of `label` if needed.
 */
function LogoTrackItem({ label, className, ...props }: LogoTrackItemProps) {
  return (
    <span
      data-slot="logo-track-item"
      className={cn(
        "flex shrink-0 items-center text-[17px] font-medium whitespace-nowrap text-muted-foreground sm:text-base",
        className
      )}
      {...props}
    >
      {label}
    </span>
  )
}

export { LogoTrackItem }
