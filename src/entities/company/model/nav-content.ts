export const navLogoLabel = "INEX"

export const navCompanyLink = {
  label: "회사소개",
  href: "/company",
}

export const navNewsLink = {
  label: "INEX 소식",
  href: "/news",
}

/**
 * Icon slot keys for the 솔루션 mega-menu tiles (wireframe ~L57, L63, L69:
 * triangle / ring / rotated square). JSX can't live in this model file, so
 * the widget maps these keys to actual glyphs.
 */
export type SolutionIconKey = "trading" | "payments" | "custody"

// 커스터디 상세 페이지(`/solutions/custody`)는 구현 완료 상태지만, 사용자
// 요청(2026-09-14: "커스터디 hide")에 따라 메뉴 노출만 다시 내렸다 — 페이지
// 자체는 삭제하지 않았으므로 아래 주석을 해제하면 바로 복원된다.

export const navSolutionItems: Array<{
  label: string
  description: string
  href: string
  iconKey: SolutionIconKey
}> = [
  {
    label: "크립토 트레이딩",
    description: "유동성·커스터디가 붙은 거래 인프라 API",
    href: "/solutions/crypto-trading",
    iconKey: "trading",
  },
  {
    label: "스테이블코인 결제",
    description: "차지백 없는 수납·지급, T+0 원화 정산",
    href: "/solutions/stablecoin-payments",
    iconKey: "payments",
  },
  // {
  //   label: "커스터디",
  //   description: "다중 승인 정책, 핫·콜드 분리 보관",
  //   href: "/solutions/custody",
  //   iconKey: "custody",
  // },
]

export const navSolutionFooter = {
  label: "어떤 레일이 맞는지 모르시나요?",
  cta: {
    label: "파트너십 문의 →",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfIgc2tgDCkN5Rui7u3QizsBaaAz2OU_3vvteIpYumtyi5leQ/viewform?usp=sf_link",
    external: true,
  },
}

export const navTrailingLinks = [
  { label: "API 문서", href: "https://docs.inex.im/docs/datacenter-overview", external: true },
  { label: "채용", href: "https://inexcareer.ninehire.site", external: true },
]

export const navLanguageLabel = "KO"

// 실제 운영 중인 거래소(inexcoin.com) 바로가기. "파트너십 문의" 솔리드
// CTA와 구분되도록 아웃라인 버튼으로 그 왼쪽에 배치.
export const navExchangeLink = {
  label: "INEX 거래소",
  href: "https://www.inexcoin.com",
  external: true,
}

export const navCta = {
  label: "파트너십 문의",
  href: "https://docs.google.com/forms/d/e/1FAIpQLSfIgc2tgDCkN5Rui7u3QizsBaaAz2OU_3vvteIpYumtyi5leQ/viewform?usp=sf_link",
  external: true,
}
