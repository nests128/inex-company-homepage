import type { FooterLinkItem } from "@/shared/ui"

// TODO(real-data): 와이어프레임 플레이스홀더 카피. 실제 회사 소개 문구로 교체 필요.
export const footerBrand = {
  name: "INEX",
  description: "원화와 디지털자산을 잇는 인프라.\n거래 · 결제 · 송금을 하나의 라이선스 위에서.",
}

// 히어로(`hero-content.ts`의 `primaryCta`)와 동일한 파트너십 문의 링크.
// 하나의 값으로 관리해 두 곳이 어긋나지 않게 함.
export const footerPartnershipCta = {
  label: "파트너십 문의",
  href: "https://docs.google.com/forms/d/e/1FAIpQLSfIgc2tgDCkN5Rui7u3QizsBaaAz2OU_3vvteIpYumtyi5leQ/viewform?usp=sf_link",
}

// 현재 nav-bar에 실제로 노출된 메뉴만 재구성 (`entities/company/model/nav-content.ts`
// 참고 — 솔루션 메가메뉴는 hide 처리되어 제외). 실존하지 않는 라우트를 나열하던
// 이전 "추가 페이지"/"안내" 컬럼은 제거.
export const footerMainLinks: FooterLinkItem[] = [
  { label: "회사소개", href: "/company" },
  { label: "API 문서", href: "https://docs.inex.im/docs/datacenter-overview" },
  { label: "채용", href: "https://inexcareer.ninehire.site" },
  footerPartnershipCta,
]

export interface FooterContactItem {
  label: string
  value: string
  href?: string
}

// 상위 `company-homepage` 프로젝트(`lib/i18n/locales/ko.ts`의 `footer.contacts`)와
// 동일한 실제 연락처.
export const footerContacts: FooterContactItem[] = [
  { label: "제휴 문의", value: "partnership@inexkr.com", href: "mailto:partnership@inexkr.com" },
  { label: "상장 문의", value: "listing@inexcoin.com", href: "mailto:listing@inexcoin.com" },
  { label: "채용 문의", value: "inexhr@inexkr.com", href: "mailto:inexhr@inexkr.com" },
  { label: "대표 번호", value: "02-6283-0111", href: "tel:+82-2-6283-0111" },
]

export const footerLegal = {
  companyName: "(주)인피니티익스체인지코리아",
  ceoLabel: "대표이사",
  ceoName: "이재강",
  address: "서울특별시 강남구 테헤란로 116, 12층 (동경빌딩)",
  businessRegistrationNumber: "783-81-02738",
  vaspRegistrationNumber: "2024-3",
  cpoLabel: "개인정보보호책임자",
  cpoName: "이성호",
}

export const footerPrivacyPolicy = {
  label: "개인정보처리방침",
  href: "https://www.inexcoin.com/terms/privacy_original_terms",
}

// 협력 모델(향후 법령 제정에 맞춰 준비 중인 기능) 관련 공통 면책 고지. 실제
// 서비스 여부/범위를 명확히 하기 위한 법무 검토 문구 — 임의 수정 금지.
export const footerDisclaimer =
  "※ 서비스 안내 및 면책 고지: 본 웹사이트에 소개된 기능 중 일부는 향후 디지털자산기본법 및 스테이블코인 관련 법령 제정에 맞추어 추진·준비 중인 협력 모델을 포함합니다. \n실제 제공 범위와 시기는 관계 법령 및 제휴 계약 조건에 따라 확정되며, 법정화폐 정산 및 외환 업무는 정식 인허가를 보유한 제휴 금융기관 및 등록 사업자와의 연계를 통해 적법하게 제공됩니다."

export interface FooterSocialLink {
  label: string
  href: string
  /** 상위 `company-homepage`와 동일한 CDN 아이콘 URL. */
  icon: string
}

// 상위 `company-homepage` 프로젝트(`lib/i18n/locales/ko.ts`의 `footer.social`)와
// 동일한 실제 SNS 채널·아이콘.
export const footerSocialLinks: FooterSocialLink[] = [
  {
    label: "인엑스 SNS instagram 로고",
    href: "https://www.instagram.com/inexkr_official",
    icon: "https://cdn.inexcoin.com/service/common/footer/instagram.svg",
  },
  {
    label: "인엑스 SNS X 로고",
    href: "https://twitter.com/inexkr",
    icon: "https://cdn.inexcoin.com/service/common/footer/X.svg",
  },
  {
    label: "인엑스 SNS blog 로고",
    href: "https://blog.naver.com/inexkr_official",
    icon: "https://cdn.inexcoin.com/service/common/footer/blog.svg",
  },
]
