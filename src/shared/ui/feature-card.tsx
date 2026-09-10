import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

export interface FeatureCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Icon/glyph slot for the icon tile. Falls back to a plain filled tile. */
  icon?: ReactNode
  /** Icon tile shape — wireframe uses square/circle/diamond across the 3 feature cards. */
  iconShape?: "square" | "circle" | "diamond"
  /** Card title, e.g. "Trading — KRCX". */
  title: string
  /** Short description copy. */
  description: string
}

/**
 * Icon + title + description feature card (wireframe big-feature section
 * ~L176-187 desktop / ~L365-372 mobile). Desktop renders borderless with a
 * larger 40px icon tile; below `sm` it becomes a bordered card with a
 * smaller 30px icon tile, matching the two artboards.
 */
function FeatureCard({
  icon,
  iconShape = "square",
  title,
  description,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <div
      data-slot="feature-card"
      className={cn(
        "rounded-[14px] border border-border p-[18px] sm:border-0 sm:p-0",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "mb-3 block size-[30px] bg-foreground sm:mb-4 sm:size-10",
          iconShape === "circle" && "rounded-full",
          iconShape === "square" && "rounded-lg sm:rounded-[10px]",
          iconShape === "diamond" && "rotate-45 scale-[.85]"
        )}
      >
        {icon}
      </span>
      <div className="text-[15.5px] font-bold sm:mb-2 sm:text-lg">{title}</div>
      <div className="mt-[5px] text-[13px] leading-[1.6] text-muted-foreground sm:mt-0 sm:text-[14.5px] sm:leading-[1.65]">
        {description}
      </div>
    </div>
  )
}

export { FeatureCard }
