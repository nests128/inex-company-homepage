// Team 섹션 실제 콘텐츠. 상위 `company-homepage` 프로젝트
// (`lib/i18n/locales/ko.ts`의 `aboutPage.team.members` + `app/[locale]/(homepage)/about/team/page-client.tsx`의
// `TEAM_PHOTOS`)의 실제 4인 경영진 데이터·사진.
import type { Locale } from "@/shared/lib/i18n"

interface TeamMemberContent {
  name: string
  role: string
  bio: string
  imageSrc?: string
  imageAlt?: string
}

interface TeamContent {
  eyebrow: string
  title: string
  subtitle: string
  prevLabel: string
  nextLabel: string
  members: TeamMemberContent[]
}

// 실제 CDN 사진. `/cdn/*`는 next.config.ts의 rewrite를 통한 same-origin 프록시 경로라
// `images.remotePatterns` 등록 없이도 로드된다 (docs/design-tokens.md "실제 이미지 CDN 연동" 참고).
const TEAM_PHOTO_BASE = "/cdn/image/renewal_2025/team"

// 팀원 이름은 실제 임직원의 한글 이름이라 로케일에 따라 임의로 로마자
// 표기를 지어내지 않고 두 로케일 모두 한글 그대로 둔다(확정된 공식 영문
// 표기가 없음). role(CEO/CTO/CCO/CISO/CBO)은 이미 영문 약어라 그대로.
export const teamContentByLocale: Record<Locale, TeamContent> = {
  ko: {
    eyebrow: "Team",
    title: "전문성과 경험이 만드는 디지털자산 인프라",
    subtitle:
      "금융·기술·준법·보안 각 분야에서 축적한 전문성을 갖춘 팀입니다.\n각자의 경험을 하나의 역량으로 연결해, 신뢰할 수 있는 디지털자산 인프라를 만들어갑니다.",
    prevLabel: "이전 팀원",
    nextLabel: "다음 팀원",
    members: [
      {
        name: "이재강",
        role: "대표이사",
        bio: "IT/디지털자산 산업에서 축적한 창업·사업 경험을 바탕으로,\nINEX의 디지털자산 금융 인프라 사업과 성장 전략을 이끕니다.",
        // 로컬 제공 이미지로 교체 (다른 항목처럼 public/images/team/ 정적 자산 참조).
        imageSrc: "/images/team/ceo.png",
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
      {
        name: "김태현",
        role: "CBO",
        bio: "금융·디지털자산 산업에서 축적한 사업 경험과 전략적 인사이트를 바탕으로,\nINEX의 사업 확장과 전략적 파트너십을 이끌며 지속 가능한 디지털자산 비즈니스 생태계를 구축합니다.",
        // 다른 팀원은 상위 프로젝트의 실제 CDN 사진(TEAM_PHOTO_BASE)을 쓰지만,
        // CBO 사진은 CDN에 아직 없는 로컬 제공 이미지(ref/team/cbo.png)라
        // public/images/team/에 정적 자산으로 넣어 참조한다.
        // 원본(ref/team/cbo.png, 1024x1024 정사각형)은 상반신이 넓게 나와 다른
        // 팀원과 톤이 달랐음 — public 자산은 얼굴 중심으로 확대 크롭해 맞춘 버전
        // (640x800, 카드는 정사각형 표시 영역이라 세로가 추가로 크롭됨).
        imageSrc: "/images/team/cbo.png",
        imageAlt: "김태현 CBO 프로필 사진",
      },
    ],
  },
  en: {
    eyebrow: "Team",
    title: "Digital asset infrastructure built on expertise and experience",
    subtitle:
      "A team with deep expertise across finance, technology, compliance, and security.\nWe connect each person's experience into a single capability, building digital asset infrastructure you can trust.",
    prevLabel: "Previous member",
    nextLabel: "Next member",
    members: [
      {
        name: "이재강",
        role: "CEO",
        bio: "Drawing on founding and business experience built in the IT/digital asset industry,\nhe leads INEX's digital asset financial infrastructure business and growth strategy.",
        imageSrc: "/images/team/ceo.png",
        imageAlt: "이재강 CEO profile photo",
      },
      {
        name: "전주호",
        role: "CTO",
        bio: "With deep technical expertise in financial and payment systems,\nhe reliably designs and builds INEX's trading, payments, and settlement infrastructure.",
        imageSrc: `${TEAM_PHOTO_BASE}/cto_2.png`,
        imageAlt: "전주호 CTO profile photo",
      },
      {
        name: "홍성진",
        role: "CCO",
        bio: "With expertise in finance/IT and strong compliance capability,\nhe oversees INEX's regulatory response and internal control/compliance framework.",
        imageSrc: `${TEAM_PHOTO_BASE}/cco_2.png`,
        imageAlt: "홍성진 CCO profile photo",
      },
      {
        name: "이성호",
        role: "CISO",
        bio: "With expertise in financial and IT security,\nhe is responsible for security and information protection across INEX's digital asset and financial infrastructure.",
        imageSrc: `${TEAM_PHOTO_BASE}/ciso_2.png`,
        imageAlt: "이성호 CISO profile photo",
      },
      {
        name: "김태현",
        role: "CBO",
        bio: "Drawing on business experience and strategic insight built in the finance/digital asset industry,\nhe leads INEX's business expansion and strategic partnerships to build a sustainable digital asset business ecosystem.",
        imageSrc: "/images/team/cbo.png",
        imageAlt: "김태현 CBO profile photo",
      },
    ],
  },
}
