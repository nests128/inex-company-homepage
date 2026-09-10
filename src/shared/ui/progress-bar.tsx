import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

import { ProgressIndicator, ProgressTrack } from "./progress"

export interface ProgressBarProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Row label, e.g. "수납 정산". */
  label: string
  /** Percentage value 0-100. */
  percent: number
}

/**
 * Label + percent + bar row, used for the "당일 정산 현황" widget (wireframe
 * ~L198-217). Composes the Base UI `Progress.Root` directly (not the
 * shadcn-generated `Progress` wrapper in `progress.tsx`, which hardcodes its
 * own Track+Indicator and would render a duplicate bar if given children)
 * together with the already-exported `ProgressTrack`/`ProgressIndicator`
 * parts. `role="progressbar"` + `aria-valuenow/min/max` come from the
 * underlying Base UI primitive.
 */
function ProgressBar({ label, percent, className, ...props }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent))

  return (
    <div data-slot="progress-bar" className={cn("w-full", className)} {...props}>
      <div className="mb-[7px] flex items-center justify-between text-[13.5px]">
        <span className="font-semibold">{label}</span>
        <span className="text-muted-foreground tabular-nums">{clamped}%</span>
      </div>
      <ProgressPrimitive.Root value={clamped} data-slot="progress">
        <ProgressTrack className="h-2.5 bg-muted">
          <ProgressIndicator className="rounded-full bg-foreground transition-[width] duration-[1.2s] ease-[cubic-bezier(.2,.7,.2,1)]" />
        </ProgressTrack>
      </ProgressPrimitive.Root>
    </div>
  )
}

export { ProgressBar }
