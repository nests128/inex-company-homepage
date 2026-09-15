import type { FooterLinkItem } from "@/shared/ui"
import type { Locale } from "@/shared/lib/i18n"

// TODO(real-data): 와이어프레임 플레이스홀더 카피. 실제 회사 소개 문구로 교체 필요.
export const footerBrandByLocale: Record<Locale, { name: string; description: string }> = {
  ko: {
    name: "INEX",
    description: "원화와 디지털자산을 잇는 인프라.\n거래 · 결제 · 송금을 하나의 라이선스 위에서.",
  },
  en: {
    name: "INEX",
    description:
      "Infrastructure connecting fiat and digital assets.\nTrading, payments, and remittance — all on a single license.",
  },
}

const PARTNERSHIP_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfIgc2tgDCkN5Rui7u3QizsBaaAz2OU_3vvteIpYumtyi5leQ/viewform?usp=sf_link"

// 히어로(`hero-content.ts`의 `primaryCta`)와 동일한 파트너십 문의 링크.
// 하나의 값으로 관리해 두 곳이 어긋나지 않게 함.
export const footerPartnershipCtaByLocale: Record<Locale, { label: string; href: string }> = {
  ko: { label: "파트너십 문의", href: PARTNERSHIP_FORM_URL },
  en: { label: "Partnership Inquiry", href: PARTNERSHIP_FORM_URL },
}

// 현재 nav-bar에 실제로 노출된 메뉴만 재구성 (`entities/company/model/nav-content.ts`
// 참고 — 솔루션 메가메뉴는 hide 처리되어 제외). 실존하지 않는 라우트를 나열하던
// 이전 "추가 페이지"/"안내" 컬럼은 제거. 헤더에 INEX 소식/INEX 거래소 메뉴가
// 추가된 뒤 여기 동기화가 누락되어 있던 것을 재정렬(헤더와 동일한 순서).
// `href`는 로케일-무관 경로 — `publicPath(locale, href)`로 렌더링 시점에 변환한다
// (외부 링크는 그대로 절대 URL이라 영향 없음).
export const footerMainLinksByLocale: Record<Locale, FooterLinkItem[]> = {
  ko: [
    { label: "회사소개", href: "/company" },
    { label: "INEX 소식", href: "/news" },
    { label: "INEX 거래소", href: "https://www.inexcoin.com" },
    { label: "API 문서", href: "https://docs.inex.im/docs/datacenter-overview" },
    { label: "채용", href: "https://inexcareer.ninehire.site" },
    footerPartnershipCtaByLocale.ko,
  ],
  en: [
    { label: "About", href: "/company" },
    { label: "News", href: "/news" },
    { label: "INEX Exchange", href: "https://www.inexcoin.com" },
    { label: "API Docs", href: "https://docs.inex.im/docs/datacenter-overview" },
    { label: "Careers", href: "https://inexcareer.ninehire.site" },
    footerPartnershipCtaByLocale.en,
  ],
}

export interface FooterContactItem {
  label: string
  value: string
  href?: string
}

// 상위 `company-homepage` 프로젝트(`lib/i18n/locales/ko.ts`의 `footer.contacts`)와
// 동일한 실제 연락처. value(이메일/전화번호)는 사실 정보라 로케일 무관, label만 번역.
export const footerContactsByLocale: Record<Locale, FooterContactItem[]> = {
  ko: [
    { label: "제휴 문의", value: "partnership@inexkr.com", href: "mailto:partnership@inexkr.com" },
    { label: "상장 문의", value: "listing@inexcoin.com", href: "mailto:listing@inexcoin.com" },
    { label: "채용 문의", value: "inexhr@inexkr.com", href: "mailto:inexhr@inexkr.com" },
    { label: "대표 번호", value: "02-6283-0111", href: "tel:+82-2-6283-0111" },
  ],
  en: [
    { label: "Partnerships", value: "partnership@inexkr.com", href: "mailto:partnership@inexkr.com" },
    { label: "Listing Inquiries", value: "listing@inexcoin.com", href: "mailto:listing@inexcoin.com" },
    { label: "Careers", value: "inexhr@inexkr.com", href: "mailto:inexhr@inexkr.com" },
    { label: "Main Line", value: "02-6283-0111", href: "tel:+82-2-6283-0111" },
  ],
}

export interface FooterLegalContent {
  companyNameLabel: string
  companyName: string
  ceoLabel: string
  ceoName: string
  addressLabel: string
  address: string
  businessRegistrationLabel: string
  businessRegistrationNumber: string
  vaspRegistrationLabel: string
  vaspRegistrationNumber: string
  cpoLabel: string
  cpoName: string
  menuGroupLabel: string
}

// 법인명/대표자명/주소/사업자등록번호/VASP 등록번호는 법적 사실 정보라
// 로케일과 무관하게 동일 — 라벨(항목명)만 번역한다.
export const footerLegalByLocale: Record<Locale, FooterLegalContent> = {
  ko: {
    companyNameLabel: "법인명",
    companyName: "(주)인피니티익스체인지코리아",
    ceoLabel: "대표이사",
    ceoName: "이재강",
    addressLabel: "주소",
    address: "서울특별시 강남구 테헤란로 116, 12층 (동경빌딩)",
    businessRegistrationLabel: "사업자등록번호",
    businessRegistrationNumber: "783-81-02738",
    vaspRegistrationLabel: "가상자산사업자(VASP) 등록번호",
    vaspRegistrationNumber: "2024-3",
    cpoLabel: "개인정보보호책임자",
    cpoName: "이성호",
    menuGroupLabel: "메뉴",
  },
  en: {
    companyNameLabel: "Company",
    companyName: "Infinity Exchange Korea Co., Ltd.",
    ceoLabel: "CEO",
    ceoName: "Jaekang Lee",
    addressLabel: "Address",
    address: "12F, Donggyeong Bldg., 116 Teheran-ro, Gangnam-gu, Seoul, Republic of Korea",
    businessRegistrationLabel: "Business Registration No.",
    businessRegistrationNumber: "783-81-02738",
    vaspRegistrationLabel: "VASP Registration No.",
    vaspRegistrationNumber: "2024-3",
    cpoLabel: "Chief Privacy Officer",
    cpoName: "Seongho Lee",
    menuGroupLabel: "Menu",
  },
}

export const footerPrivacyPolicyByLocale: Record<Locale, { label: string; href: string }> = {
  ko: { label: "개인정보처리방침", href: "https://www.inexcoin.com/terms/privacy_original_terms" },
  en: { label: "Privacy Policy", href: "https://www.inexcoin.com/terms/privacy_original_terms" },
}

// 협력 모델(향후 법령 제정에 맞춰 준비 중인 기능) 관련 공통 면책 고지. 한글
// 원문은 법무 검토 문구 그대로(임의 수정 금지) — 영문은 동일 의미의 번역이며
// 별도 법무 검토 문구를 새로 작성한 것은 아니다.
export const footerDisclaimerByLocale: Record<Locale, string> = {
  ko: "※ 서비스 안내 및 면책 고지: 본 웹사이트에 소개된 기능 중 일부는 향후 디지털자산기본법 및 스테이블코인 관련 법령 제정에 맞추어 추진·준비 중인 협력 모델을 포함합니다. \n실제 제공 범위와 시기는 관계 법령 및 제휴 계약 조건에 따라 확정되며, 법정화폐 정산 및 외환 업무는 정식 인허가를 보유한 제휴 금융기관 및 등록 사업자와의 연계를 통해 적법하게 제공됩니다.",
  en: "※ Service Notice & Disclaimer: Some features introduced on this website include cooperation models being pursued and prepared in anticipation of future digital asset and stablecoin-related legislation. \nThe actual scope and timing of these offerings will be finalized in accordance with applicable laws and partnership agreements, and fiat settlement and foreign exchange operations are lawfully provided in connection with duly licensed partner financial institutions and registered operators.",
}

export interface FooterSocialLink {
  label: string
  href: string
  /** 상위 `company-homepage`와 동일한 CDN 아이콘 URL. */
  icon: string
}

// 상위 `company-homepage` 프로젝트(`lib/i18n/locales/ko.ts`의 `footer.social`)와
// 동일한 실제 SNS 채널·아이콘. `label`은 접근성용 aria-label이라 번역.
export const footerSocialLinksByLocale: Record<Locale, FooterSocialLink[]> = {
  ko: [
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
  ],
  en: [
    {
      label: "INEX Instagram",
      href: "https://www.instagram.com/inexkr_official",
      icon: "https://cdn.inexcoin.com/service/common/footer/instagram.svg",
    },
    {
      label: "INEX X (Twitter)",
      href: "https://twitter.com/inexkr",
      icon: "https://cdn.inexcoin.com/service/common/footer/X.svg",
    },
    {
      label: "INEX Blog",
      href: "https://blog.naver.com/inexkr_official",
      icon: "https://cdn.inexcoin.com/service/common/footer/blog.svg",
    },
  ],
}
