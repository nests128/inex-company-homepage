import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface GradientBackdropProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Gradient tone. Defaults to `light` — a neutral light-grey diagonal
   * gradient (`surface-muted`-ish `#ececea` → `#f7f7f5`) designed to sit on
   * a white section background, matching this project's black & white
   * minimal tone (see `docs/design-tokens.md`) rather than the reference's
   * blue-purple gradient (`ref/image.png`).
   *
   * `dark` is exposed for cases where page-agent wants a `#111`→`#333`
   * panel, but note that transparent-background children (e.g.
   * `SettlementStatusCard`, which relies on the near-black `foreground`
   * text color and has no `bg-*` of its own) will render dark-on-dark and
   * need `bg-background` added explicitly when placed on this tone.
   */
  tone?: "light" | "dark"
}

/**
 * Diagonal gradient backdrop card — a neutral stand-in for the reference's
 * (`ref/image.png`) blue-purple gradient panel. Renders no content of its
 * own; pass a floating card (e.g. `SettlementStatusCard`) as `children` to
 * recreate the "white widget floating on a soft panel" composition. Sizing
 * (min-height, padding beyond the default, aspect ratio) is left to
 * page-agent via `className`.
 */
function GradientBackdrop({
  tone = "light",
  className,
  children,
  ...props
}: GradientBackdropProps) {
  return (
    <div
      data-slot="gradient-backdrop"
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl p-7",
        tone === "light"
          ? "bg-[linear-gradient(135deg,#ececea_0%,#f7f7f5_55%,#ffffff_100%)]"
          : "bg-[linear-gradient(135deg,#111111_0%,#2a2a2a_55%,#3a3a3a_100%)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { GradientBackdrop }
