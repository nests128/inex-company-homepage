// Owner: page-agent. Ref: ref/INEX SaaS wireframe/INEX Home Wireframe.dc.html (~L60-145, nav + mega menu + mobile hamburger).
import type { ReactNode } from "react"
import Link from "next/link"

import {
  Button,
  InexLogoMark,
  NavBar as NavBarPrimitive,
  type NavItem,
} from "@/shared/ui"
import {
  navCompanyLink,
  navCta,
  navLogoLabel,
  navNewsLink,
  navSolutionFooter,
  navSolutionItems,
  navTrailingLinks,
  type SolutionIconKey,
} from "@/entities/company"

/**
 * Maps the mega-menu data's `iconKey` to the small glyph rendered in the
 * 38x38 dark tile (wireframe ~L57 triangle / L63 ring / L69 rotated square).
 * Kept out of the `entities/company` model file since JSX can't live there.
 */
function SolutionIcon({ iconKey }: { iconKey: SolutionIconKey }) {
  switch (iconKey) {
    case "trading":
      return (
        <span
          aria-hidden="true"
          className="size-0 border-x-[6px] border-b-[10px] border-x-transparent border-b-background"
        />
      )
    case "payments":
      return (
        <span
          aria-hidden="true"
          className="size-3.5 rounded-full border-[2.5px] border-background"
        />
      )
    case "custody":
      return (
        <span aria-hidden="true" className="size-[13px] rotate-45 bg-background" />
      )
  }
}

// "솔루션" mega-menu item hidden per explicit request (2026-09-10) — solution
// detail pages aren't built yet ("나중에 개발"). Data/mapping
// (navSolutionItems/navSolutionFooter/SolutionIcon) is left intact so
// re-adding is just restoring the commented-out item below.
const navItems: NavItem[] = [
  { type: "link", label: navCompanyLink.label, href: navCompanyLink.href },
  { type: "link", label: navNewsLink.label, href: navNewsLink.href },
  // {
  //   type: "mega",
  //   label: "솔루션",
  //   items: navSolutionItems.map((item) => ({
  //     label: item.label,
  //     description: item.description,
  //     href: item.href,
  //     icon: <SolutionIcon iconKey={item.iconKey} />,
  //   })),
  //   footer: navSolutionFooter,
  // },
  ...navTrailingLinks.map(
    (item): NavItem => ({
      type: "link",
      label: item.label,
      href: item.href,
      external: item.external,
    })
  ),
]

const logo: ReactNode = (
  <Link href="/" aria-label="INEX 홈으로 이동" className="flex w-fit items-center">
    <InexLogoMark label={navLogoLabel} className="h-6 w-auto text-foreground lg:h-7" />
  </Link>
)

export function NavBar() {
  return (
    // Full-bleed background/border wrapper (design-tokens.md "풀블리드 배경 +
    // 컨테이너 콘텐츠"): the border-bottom must span the viewport, so it lives
    // here, not on the 1330px content row below. `sticky top-0` keeps the
    // header pinned while scrolling (ref: https://www.bridge.xyz/, explicit
    // request). Frosted-glass on scroll (also bridge.xyz, explicit request):
    // `bg-background/70` + `backdrop-blur-md` — a fully opaque `bg-background`
    // would make `backdrop-blur` a no-op since there'd be nothing to blur
    // *through*, so the background must stay translucent. `supports-` fallback
    // bumps opacity up for browsers without backdrop-filter support, so text
    // legibility doesn't depend on the blur landing. `z-50` keeps it above
    // scrolled-past section content.
    <div className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-background">
      <NavBarPrimitive
        logo={logo}
        items={navItems}
        // "KO" language switcher hidden per explicit request (2026-09-10) —
        // i18n isn't built yet ("추후개발"). `NavBarPrimitive` already
        // renders nothing when `languageLabel` is omitted.
        cta={
          <Button
            variant="pill-solid"
            size="pill"
            className="h-9"
            render={
              <a
                href={navCta.href}
                target={navCta.external ? "_blank" : undefined}
                rel={navCta.external ? "noopener noreferrer" : undefined}
              />
            }
          >
            {navCta.label}
          </Button>
        }
        className="container-inex border-b-0 px-(--container-gutter) lg:px-(--container-gutter)"
      />
    </div>
  )
}
