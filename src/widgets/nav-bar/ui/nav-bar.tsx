// Owner: page-agent. Ref: ref/INEX SaaS wireframe/INEX Home Wireframe.dc.html (~L60-145, nav + mega menu + mobile hamburger).
import type { ReactNode } from "react"
import { ArrowUpRight, LineChartIcon, ShieldIcon, WalletIcon } from "lucide-react"
import Link from "next/link"
import { locale as getLocale } from "next/root-params"

import {
  Button,
  InexLogoMark,
  LanguageSwitcher,
  MobileLanguageSwitcher,
  NavBar as NavBarPrimitive,
  type NavItem,
} from "@/shared/ui"
import { navLogoLabel, type SolutionIconKey } from "@/entities/company"
import { getNavContent } from "@/entities/company/server"
import { publicPath, isLocale, defaultLocale } from "@/shared/lib/i18n"

/**
 * Maps the mega-menu data's `iconKey` to the small glyph rendered in the
 * 38x38 dark tile. Originally CSS-shape placeholders (wireframe ~L57
 * triangle / L63 ring / L69 rotated square); replaced with outline
 * `lucide-react` icons matched to each solution (사용자 요청, 2026-09-14:
 * "filled 보다 outline으로 해주고 해당 메뉴에 맞는 아이콘"). Kept out of the
 * `entities/company` model file since JSX can't live there.
 */
function SolutionIcon({ iconKey }: { iconKey: SolutionIconKey }) {
  switch (iconKey) {
    case "trading":
      return <LineChartIcon aria-hidden="true" strokeWidth={1.75} className="size-[18px]" />
    case "payments":
      return <WalletIcon aria-hidden="true" strokeWidth={1.75} className="size-[18px]" />
    case "custody":
      return <ShieldIcon aria-hidden="true" strokeWidth={1.75} className="size-[18px]" />
  }
}

export async function NavBar() {
  const rawLocale = await getLocale()
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale
  const nav = await getNavContent()

  // "솔루션" mega-menu re-enabled (2026-09-14) — 크립토 트레이딩/스테이블코인
  // 결제 상세 페이지가 생겨 두 항목이 실제 라우트를 가리킨다. 커스터디는
  // 아직 `#` 플레이스홀더 (`entities/company/model/nav-content.ts` TODO 참고).
  // 위치는 "회사소개" 바로 옆(사용자 명시적 요청, 2026-09-14) — 원래 "INEX 소식"
  // 뒤였던 것을 앞으로 옮김.
  const navItems: NavItem[] = [
    { type: "link", label: nav.companyLink.label, href: publicPath(locale, nav.companyLink.href) },
    {
      type: "mega",
      label: nav.solutionLabel,
      items: nav.solutionItems.map((item) => ({
        label: item.label,
        description: item.description,
        href: publicPath(locale, item.href),
        icon: <SolutionIcon iconKey={item.iconKey} />,
      })),
      // 드롭다운 하단 "어떤 레일이 맞는지 모르시나요? 파트너십 문의 →" 푸터
      // 제거(사용자 명시적 요청, 2026-09-14) — navSolutionFooter 데이터/타입은
      // 그대로 두고 여기서만 전달하지 않는다.
    },
    { type: "link", label: nav.newsLink.label, href: publicPath(locale, nav.newsLink.href) },
    ...nav.trailingLinks.map(
      (item): NavItem => ({
        type: "link",
        label: item.label,
        href: item.href,
        external: item.external,
      })
    ),
  ]

  const logo: ReactNode = (
    <Link href={publicPath(locale, "/")} aria-label={nav.homeAriaLabel} className="flex w-fit items-center">
      <InexLogoMark label={navLogoLabel} className="h-6 w-auto text-foreground lg:h-7" />
    </Link>
  )

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
        mobileMenuLabel={nav.mobileMenuLabel}
        languageSwitcher={<LanguageSwitcher current={locale} />}
        mobileLanguageSwitcher={<MobileLanguageSwitcher current={locale} />}
        cta={
          // 모바일 시트는 이 cta를 `flex flex-col gap-3` 컨테이너 안에서
          // 렌더링하므로(shared/ui/nav-bar.tsx), 여기서 다시 `flex-row`를
          // 강제하면 두 버튼이 좁은 시트 폭에 억지로 나란히 눌려 잘린다.
          // 데스크톱 가로 배치는 lg 이상에서만 적용.
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* 실제 운영 중인 거래소(inexcoin.com) 바로가기 — "파트너십 문의"
                솔리드 CTA와 구분되도록 아웃라인 버튼으로 그 왼쪽에 배치. */}
            <Button
              variant="pill-outline"
              size="pill"
              // 기본 pill 패딩(px-[22px])에 아이콘+gap이 더해지면
              // "파트너십 문의"보다 눈에 띄게 커 보여서, 아이콘이 있는 쪽만
              // 좌우 패딩을 살짝 좁힘(파트너십 문의와 비슷한 체감 크기로).
              // 높이도 2px 더 줄여(h-9=36px -> 34px) 아웃라인 두께 때문에
              // 실제보다 커 보이던 것을 보정.
              className="h-[34px] w-full justify-center px-4 lg:w-auto"
              render={
                <a
                  href={nav.exchangeLink.href}
                  target={nav.exchangeLink.external ? "_blank" : undefined}
                  rel={nav.exchangeLink.external ? "noopener noreferrer" : undefined}
                />
              }
            >
              {nav.exchangeLink.label}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Button>
            <Button
              variant="pill-solid"
              size="pill"
              className="h-9 w-full justify-center lg:w-auto"
              render={
                <a
                  href={nav.cta.href}
                  target={nav.cta.external ? "_blank" : undefined}
                  rel={nav.cta.external ? "noopener noreferrer" : undefined}
                />
              }
            >
              {nav.cta.label}
            </Button>
          </div>
        }
        className="container-inex border-b-0 px-(--container-gutter) lg:px-(--container-gutter)"
      />
    </div>
  )
}
