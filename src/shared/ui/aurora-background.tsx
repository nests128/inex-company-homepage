"use client"

// Vendored from Aceternity UI (`npx shadcn@latest add @aceternity/aurora-background`,
// https://ui.aceternity.com/components/aurora-background), adapted to this
// project's `cn` import path (`"cn"`, not `"@/lib/utils"`) and trimmed to a
// fixed-height panel instead of the original's `h-screen w-screen` full-page
// layout, since here it's a contained visual inside a section, not a page
// background. The `--aurora` gradient sweep and `animate-aurora` keyframe
// are otherwise unmodified — see `app/globals.css` for the keyframe, added
// alongside this file since it didn't previously exist in this project.
//
// Always renders the source's light-mode look (white base, `invert`'d
// white/aurora gradient) rather than switching on a `dark:` class — this
// project doesn't toggle a dark mode, and the white background was an
// explicit request. `text-slate-950` is the default text color for any
// `children`; a caller placing light text (e.g. a white logo mark) on this
// background must override it explicitly.
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react"
import { cn } from "cn"

export interface AuroraBackgroundProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  children?: ReactNode
  /** Fades the aurora out toward the edges via a radial mask. Default true, matching the source. */
  showRadialGradient?: boolean
}

function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden bg-white text-slate-950",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          {
            "--blue-300": "#93c5fd",
            "--blue-400": "#60a5fa",
            "--blue-500": "#3b82f6",
            "--indigo-300": "#a5b4fc",
            "--violet-200": "#ddd6fe",
            "--black": "#000",
            "--white": "#fff",
            "--transparent": "transparent",
          } as CSSProperties
        }
      >
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            invert
            filter blur-[10px]
            after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:content-[""]
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        />
      </div>
      {children}
    </div>
  )
}

export { AuroraBackground }
