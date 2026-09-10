import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

export interface ModuleCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Icon/glyph slot for the icon tile. Falls back to a plain filled square. */
  icon?: ReactNode
  /** Module name, e.g. "거래 · 커스터디". */
  name: string
  /** Short tag/meta line, e.g. "trading, custody". */
  tag: string
}

/**
 * Icon + name + tag card used inside the module `Marquee` (wireframe
 * ~L219-237, `.mods2`). Fixed min-width so cards read consistently inside a
 * horizontally-scrolling track.
 */
function ModuleCard({ icon, name, tag, className, ...props }: ModuleCardProps) {
  return (
    <div
      data-slot="module-card"
      className={cn(
        "min-w-[220px] shrink-0 rounded-[14px] border border-border bg-background px-6 py-5",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="mb-3.5 flex size-8 items-center justify-center rounded-lg bg-foreground text-background"
      >
        {icon}
      </span>
      <div className="text-[15.5px] font-bold">{name}</div>
      <div className="mt-1 font-mono text-[11px] text-muted-foreground">{tag}</div>
    </div>
  )
}

export { ModuleCard }
