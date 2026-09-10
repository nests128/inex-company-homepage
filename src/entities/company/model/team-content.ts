// Team 섹션 실제 콘텐츠. 상위 `company-homepage` 프로젝트
// (`lib/i18n/locales/ko.ts`의 `aboutPage.team.members` + `app/[locale]/(homepage)/about/team/page-client.tsx`의
// `TEAM_PHOTOS`)의 실제 4인 경영진 데이터·사진.

interface TeamMemberContent {
  name: string
  role: string
  bio: string
  imageSrc?: string
  imageAlt?: string
}

export const teamContent = {
  eyebrow: "Team",
  title: "전문성과 경험이 만드는 디지털자산 인프라",
  subtitle:
    "금융·기술·준법·보안 각 분야에서 축적한 전문성을 갖춘 팀입니다.\n각자의 경험을 하나의 역량으로 연결해, 신뢰할 수 있는 디지털자산 인프라를 만들어갑니다.",
}

// 실제 CDN 사진. `/cdn/*`는 next.config.ts의 rewrite를 통한 same-origin 프록시 경로라
// `images.remotePatterns` 등록 없이도 로드된다 (docs/design-tokens.md "실제 이미지 CDN 연동" 참고).
const TEAM_PHOTO_BASE = "/cdn/image/renewal_2025/team"

export const teamMembers: TeamMemberContent[] = [
  {
    name: "이재강",
    role: "대표이사",
    bio: "IT/디지털자산 산업에서 축적한 창업·사업 경험을 바탕으로,\nINEX의 디지털자산 금융 인프라 사업과 성장 전략을 이끕니다.",
    imageSrc: `${TEAM_PHOTO_BASE}/ceo_2.png`,
    imageAlt: "이재강 대표이사 프로필 사진",
  },
  {
    name: "전주호",
    role: "CTO",
    bio: "금융·결제 시스템에 대한 높은 기술 전문성을 바탕으로,\nINEX의 거래·결제·정산 인프라를 안정적으로 설계·구축합니다.",
    imageSrc: `${TEAM_PHOTO_BASE}/cto_2.png`,
    imageAlt: "전주호 CTO 프로필 사진",
  },
  {
    name: "홍성진",
    role: "CCO",
    bio: "금융·IT 분야의 전문성과 준법 역량을 바탕으로,\nINEX의 규제 대응과 내부통제·컴플라이언스 체계를 총괄합니다.",
    imageSrc: `${TEAM_PHOTO_BASE}/cco_2.png`,
    imageAlt: "홍성진 CCO 프로필 사진",
  },
  {
    name: "이성호",
    role: "CISO",
    bio: "금융·IT 보안 분야의 전문성을 바탕으로,\nINEX의 디지털자산·금융 인프라 전반의 보안과 정보보호를 책임집니다.",
    imageSrc: `${TEAM_PHOTO_BASE}/ciso_2.png`,
    imageAlt: "이성호 CISO 프로필 사진",
  },
]
