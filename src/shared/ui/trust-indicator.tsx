import type { ComponentPropsWithoutRef } from "react"
import { ShieldCheck } from "lucide-react"
import { cn } from "cn"

export interface TrustIndicatorProps extends ComponentPropsWithoutRef<"div"> {
  /** Label text, e.g. "VASP 신고 수리 (FIU 2024-3) · ISMS 인증 완료". Content is a page-agent concern. */
  label: string
}

/**
 * Shadowed white pill badge used under hero CTAs to signal regulatory trust
 * (`ref/temp6.png`: white rounded-full chip, soft drop shadow, small dark
 * icon square on the left, label text on the right — not a flat dot+label
 * row like the previous version).
 */
function TrustIndicator({ label, className, ...props }: TrustIndicatorProps) {
  return (
    <div
      data-slot="trust-indicator"
      className={cn(
        "inline-flex w-fit items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-[13.5px] text-foreground/80 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)]",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-white"
      >
        <ShieldCheck className="size-3.5" />
      </span>
      <span>{label}</span>
    </div>
  )
}

export { TrustIndicator }
