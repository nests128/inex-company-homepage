import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

export interface QuoteBlockProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Quote copy. Supports `\n` for the wireframe's manual line break. */
  quote: string
  /** Attribution name, e.g. "파트너사 CTO". */
  attributionName: string
  /** Attribution role/org, e.g. "증권사 · 트레이딩". */
  attributionRole: string
  /** Avatar slot. Wireframe omits the avatar on mobile — pass nothing to hide it. */
  avatar?: ReactNode
  /**
   * Blockquote type scale. `"default"` (the original wireframe size,
   * `text-xl sm:text-4xl`) is unchanged for existing callers. `"hero"` steps
   * up to `text-3xl sm:text-5xl` for use in a large standalone hero panel
   * (e.g. `QuoteHero`) where the quote is the dominant element on the page
   * rather than one block among several.
   */
  size?: "default" | "hero"
}

/**
 * Large centered quote + attribution (wireframe ~L238-246 desktop /
 * ~L387-390 mobile). Both attribution layouts render from the same props at
 * all times and are toggled purely by breakpoint (`sm:hidden` / `sm:flex`),
 * matching how `FeatureCard`/`CaseCard` handle their desktop/mobile
 * differences — this way a single instance is correct on both artboards
 * without page-agent having to render two `QuoteBlock`s. `avatar` is only
 * the avatar-circle slot content (fills the striped placeholder), not a
 * layout switch; omit it to keep the striped placeholder fallback.
 */
function QuoteBlock({
  quote,
  attributionName,
  attributionRole,
  avatar,
  size = "default",
  className,
  ...props
}: QuoteBlockProps) {
  return (
    <div
      data-slot="quote-block"
      data-size={size}
      className={cn("text-center", className)}
      {...props}
    >
      <blockquote
        className={cn(
          "leading-[1.4] font-bold tracking-[-.015em] text-balance sm:leading-[1.35]",
          size === "hero" ? "text-3xl sm:text-5xl" : "text-xl sm:text-4xl"
        )}
      >
        {quote.split("\n").map((line, index) => (
          <span key={index}>
            {index > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </blockquote>

      {/* Mobile (390): single collapsed attribution line, no avatar. */}
      <div className="mt-3.5 text-[12.5px] text-muted-foreground sm:hidden">
        {attributionName} · {attributionRole}
      </div>

      {/* Desktop (1440): avatar circle beside two-line attribution. */}
      <div className="mt-7 hidden items-center justify-center gap-3 sm:flex">
        <span
          aria-hidden="true"
          className="size-11 shrink-0 overflow-hidden rounded-full bg-[repeating-linear-gradient(45deg,#eee_0_6px,#ddd_6px_12px)]"
        >
          {avatar}
        </span>
        <div className="text-left">
          <div className="text-[14.5px] font-bold">{attributionName}</div>
          <div className="text-[13px] text-muted-foreground">{attributionRole}</div>
        </div>
      </div>
    </div>
  )
}

export { QuoteBlock }
