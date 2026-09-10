import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

export interface IntegrationLogoCardProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Partner/tool name, e.g. "Tallywave". */
  name: string
  /** Category label under the name, e.g. "DATABASE" or "CRM, PAYMENTS". */
  category: string
  /** Icon slot rendered inside the circular badge (e.g. an svg glyph or letter mark). */
  icon?: ReactNode
  /**
   * Circular badge background class, e.g. "bg-blue-600". Defaults to a
   * neutral grayscale fill (`bg-white/10`) so it reads correctly on the dark
   * marquee frame this card is designed for; callers may pass a subtle
   * accent color per logo if desired (the sketch uses distinct colors per
   * icon), but the default keeps the project's black/white tone.
   */
  iconBgClass?: string
}

/**
 * Single circular-icon + name + category item for the dark integrations
 * marquee (`ref/image2.png`, section 2). Meant to be used as `Marquee`
 * children — sized as a fixed-width shrink-0 column so it reads consistently
 * inside a horizontally-scrolling track. Text colors are hardcoded to
 * white/dark-muted (not `foreground`/`muted-foreground`) because this card
 * is only designed to sit on a dark background (e.g. inside
 * `IntegrationsMarqueeCard`), same rationale as the wireframe's dark-section
 * tokens in docs/design-tokens.md.
 */
function IntegrationLogoCard({
  name,
  category,
  icon,
  iconBgClass = "bg-white/10",
  className,
  ...props
}: IntegrationLogoCardProps) {
  return (
    <div
      data-slot="integration-logo-card"
      className={cn(
        "flex w-[140px] shrink-0 flex-col items-center gap-3 px-4 text-center lg:w-[176px]",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-16 shrink-0 items-center justify-center rounded-full text-white lg:size-[88px]",
          iconBgClass
        )}
      >
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <div className="text-base font-bold text-white lg:text-lg">{name}</div>
        <div className="font-mono text-[10px] tracking-[0.08em] text-white/50 uppercase lg:text-[11px]">
          {category}
        </div>
      </div>
    </div>
  )
}

export { IntegrationLogoCard }
