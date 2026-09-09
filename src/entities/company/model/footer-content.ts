import type { FooterLinkItem } from "@/shared/ui"

// TODO(real-data): 와이어프레임 플레이스홀더 카피. 실제 회사 소개 문구로 교체 필요.
export const footerBrand = {
  name: "INEX",
  description: "원화와 디지털자산을 잇는 인프라.\n거래 · 결제 · 송금을 하나의 라이선스 위에서.",
}

// TODO(real-data): 실제 라우트가 없어 전부 `#` 플레이스홀더 링크임. 페이지 라우팅 확정 후 교체 필요.
export const footerCompanyLinks: FooterLinkItem[] = [
  { label: "회사소개", href: "#" },
  { label: "산업", href: "#" },
  { label: "상품", href: "#" },
  { label: "디지털자산 레일", href: "#" },
]

// TODO(real-data): 실제 라우트가 없어 전부 `#` 플레이스홀더 링크임. 페이지 라우팅 확정 후 교체 필요.
export const footerResourceLinks: FooterLinkItem[] = [
  { label: "개발센터", href: "#" },
  { label: "규제친화", href: "#" },
  { label: "INEX 소식", href: "#" },
  { label: "채용", href: "#" },
]

export const footerContactLinks: FooterLinkItem[] = [
  // TODO(real-data): 실제 파트너십 문의 이메일 확인 필요.
  { label: "partnership@inexkr.com", href: "mailto:partnership@inexkr.com" },
  // TODO(real-data): 실제 대표 전화번호 확인 필요.
  { label: "02-6283-0111", href: "tel:+82-2-6283-0111" },
  // TODO(real-data): 실제 사업장 주소 확인 필요.
  { label: "서울 강남구 테헤란로 116" },
]

// TODO(real-data): 회사명, 사업자등록번호, VASP 등록번호 전부 와이어프레임 플레이스홀더. 실제 값으로 교체 필요.
export const footerLegal = {
  companyName: "인피니티익스체인지코리아",
  businessRegistrationNumber: "783-81-02738",
  vaspRegistrationNumber: "2024-3",
}
