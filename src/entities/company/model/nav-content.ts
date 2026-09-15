import type { Locale } from "@/shared/lib/i18n"

export const navLogoLabel = "INEX"

/**
 * Icon slot keys for the 솔루션 mega-menu tiles (wireframe ~L57, L63, L69:
 * triangle / ring / rotated square). JSX can't live in this model file, so
 * the widget maps these keys to actual glyphs.
 */
export type SolutionIconKey = "trading" | "payments" | "custody"

// 순수 데이터만 두는 파일 — `next/root-params`의 `locale()` 게터는
// `entities/company/server.ts`에 분리돼 있다(hero-content.ts 상단 주석
// 참고: 이 파일을 재export하는 `entities/company` 배럴을 client component가
// import할 때 클라이언트 번들에 root-params 참조가 딸려 들어가는 걸 방지).
export interface NavContent {
  companyLink: { label: string; href: string }
  newsLink: { label: string; href: string }
  solutionLabel: string
  solutionItems: Array<{
    label: string
    description: string
    href: string
    iconKey: SolutionIconKey
  }>
  solutionFooter: {
    label: string
    cta: { label: string; href: string; external: boolean }
  }
  trailingLinks: Array<{ label: string; href: string; external: boolean }>
  exchangeLink: { label: string; href: string; external: boolean }
  cta: { label: string; href: string; external: boolean }
  mobileMenuLabel: string
  homeAriaLabel: string
}

const PARTNERSHIP_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfIgc2tgDCkN5Rui7u3QizsBaaAz2OU_3vvteIpYumtyi5leQ/viewform?usp=sf_link"

export const navContentByLocale: Record<Locale, NavContent> = {
  ko: {
    companyLink: { label: "회사소개", href: "/company" },
    newsLink: { label: "INEX 소식", href: "/news" },
    solutionLabel: "솔루션",
    solutionItems: [
      {
        label: "크립토 트레이딩",
        description: "유동성·커스터디가 붙은 거래 인프라 API",
        href: "/solutions/crypto-trading",
        iconKey: "trading",
      },
      {
        label: "스테이블코인 결제",
        description: "차지백 없는 수납·지급, T+0 정산",
        href: "/solutions/stablecoin-payments",
        iconKey: "payments",
      },
      {
        label: "커스터디",
        description: "다중 승인 정책, 핫·콜드 분리 보관",
        href: "/solutions/custody",
        iconKey: "custody",
      },
    ],
    solutionFooter: {
      label: "어떤 레일이 맞는지 모르시나요?",
      cta: { label: "파트너십 문의 →", href: PARTNERSHIP_FORM_URL, external: true },
    },
    trailingLinks: [
      { label: "API 문서", href: "https://docs.inex.im/docs/datacenter-overview", external: true },
      { label: "채용", href: "https://inexcareer.ninehire.site", external: true },
    ],
    exchangeLink: { label: "INEX 거래소", href: "https://www.inexcoin.com", external: true },
    cta: { label: "파트너십 문의", href: PARTNERSHIP_FORM_URL, external: true },
    mobileMenuLabel: "메뉴 열기",
    homeAriaLabel: "INEX 홈으로 이동",
  },
  en: {
    companyLink: { label: "About", href: "/company" },
    newsLink: { label: "News", href: "/news" },
    solutionLabel: "Solutions",
    solutionItems: [
      {
        label: "Crypto Trading",
        description: "Trading infrastructure API with liquidity & custody built in",
        href: "/solutions/crypto-trading",
        iconKey: "trading",
      },
      {
        label: "Stablecoin Payments",
        description: "Chargeback-free collection & payout, T+0 settlement",
        href: "/solutions/stablecoin-payments",
        iconKey: "payments",
      },
      {
        label: "Custody",
        description: "Multi-approval policies, hot/cold segregated storage",
        href: "/solutions/custody",
        iconKey: "custody",
      },
    ],
    solutionFooter: {
      label: "Not sure which rail fits?",
      cta: { label: "Partnership Inquiry →", href: PARTNERSHIP_FORM_URL, external: true },
    },
    trailingLinks: [
      { label: "API Docs", href: "https://docs.inex.im/docs/datacenter-overview", external: true },
      { label: "Careers", href: "https://inexcareer.ninehire.site", external: true },
    ],
    exchangeLink: { label: "INEX Exchange", href: "https://www.inexcoin.com", external: true },
    cta: { label: "Partnership Inquiry", href: PARTNERSHIP_FORM_URL, external: true },
    mobileMenuLabel: "Open menu",
    homeAriaLabel: "Go to INEX home",
  },
}
