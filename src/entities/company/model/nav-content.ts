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

// TODO(real-data): 아래 솔루션 상세 항목들은 실제 라우트가 없어 전부 `#` 플레이스홀더 링크임.
// 각 솔루션 상세 페이지 라우팅 확정 후 교체 필요 (회사소개는 `/company`로 이미 연결됨).

export const navSolutionItems: Array<{
  label: string
  description: string
  href: string
  iconKey: SolutionIconKey
}> = [
  {
    label: "크립토 트레이딩",
    description: "유동성·커스터디가 붙은 거래 인프라 API",
    // TODO(real-data): 실제 솔루션 상세 페이지 라우트로 교체 필요.
    href: "#",
    iconKey: "trading",
  },
  {
    label: "스테이블코인 결제",
    description: "차지백 없는 수납·지급, T+0 원화 정산",
    // TODO(real-data): 실제 솔루션 상세 페이지 라우트로 교체 필요.
    href: "#",
    iconKey: "payments",
  },
  {
    label: "커스터디",
    description: "MPC 다중 승인, 핫·콜드 분리 보관",
    // TODO(real-data): 실제 솔루션 상세 페이지 라우트로 교체 필요.
    href: "#",
    iconKey: "custody",
  },
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
