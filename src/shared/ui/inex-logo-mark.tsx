import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

export interface InexLogoMarkProps extends ComponentPropsWithoutRef<"svg"> {
  /** Accessible label for the mark. Defaults to "INEX". */
  label?: string
}

/**
 * INEX wordmark, vector logo mark (replaces the plain-text "INEX" wordmark
 * previously used in NavBar/Footer). Renders with `fill="currentColor"` so
 * callers control color via the inherited text color — defaults to
 * near-black (`text-foreground`) since `body` sets that globally, matching
 * the "검정색으로" requirement without hardcoding a color here. Callers on a
 * dark background (e.g. Footer) must override with a light text color
 * class, same pattern as `pill-solid-inverse`/`pill-outline-inverse` in
 * `button.tsx`.
 */
function InexLogoMark({
  label = "INEX",
  width = 80,
  height = 32,
  className,
  ...props
}: InexLogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 80 32"
      fill="none"
      role="img"
      aria-label={label}
      className={cn(className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 5H4.61118V27H0V5ZM53.9323 22.6651V27H35.0079V5H53.9323V9.3368H39.6191V13.8307H53.5404V18.1693H39.6191V22.6651H53.9323ZM30.5332 5H25.922V20.5591L14.7831 5H9.35298V27H13.9642V11.4409L25.1012 27H30.5332V5ZM62.6789 27H57.0695L72.7143 5H78.3296L62.6789 27ZM68.6257 27L73.4786 20.1788L78.3316 27H68.6276H68.6257ZM61.9205 11.8231L57.0675 5H66.7715L61.9205 11.8231Z"
        fill="currentColor"
      />
    </svg>
  )
}

export { InexLogoMark }
