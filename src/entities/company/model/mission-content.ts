// Mission 섹션 실제 콘텐츠. 상위 `company-homepage` 프로젝트
// `lib/i18n/locales/ko.ts`의 `aboutPage.vision`에서 가져온 실제 INEX 카피.
import type { Locale } from "@/shared/lib/i18n"

interface MissionContent {
  eyebrow: string
  title: string
  paragraphs: string[]
  signatureName: string
  signatureRole: string
  imageSrc: string
  imageAlt: string
}

export const missionContentByLocale: Record<Locale, MissionContent> = {
  ko: {
    eyebrow: "Vision",
    title: "거래소를 넘어, \n디지털자산 금융 인프라의 표준으로",
    paragraphs: [
      "INEX는 단순 거래소가 아닌, 글로벌과 국내를 연결하고 디지털자산 금융 인프라의 표준을 제공하는 CaaS 기업입니다.\n(CaaS = Compliance / Crypto as a Service)",
      "더 빠르고, 저렴하고, 투명한 금융을 위해 금융사, 플랫폼 등 파트너사가 디지털자산으로 사업을 확장할 수 있도록 인프라 기반을 만듭니다.",
    ],
    // NOTE: signatureName/signatureRole 필드는 "이재강 / 대표이사" 문구 제거 요청에 따라
    // `company-page.tsx`에서 더 이상 전달하지 않음 (MissionSection이 둘 다 옵셔널로 지원,
    // 미전달 시 서명 블록 자체가 렌더링되지 않음). 향후 재활성화 시를 위해 값은 유지.
    signatureName: "이재강",
    signatureRole: "대표이사",
    // TODO(real-data): 실제 서명 이미지 자산 없음 — signatureImageSrc 생략(옵셔널, 미전달 시 이름/직함 텍스트만 렌더링).
    // TODO(real-data): 실제 인물/오피스 사진 자산 없음. `MissionSectionProps.imageSrc`는(Team/History의
    // `imageSrc`와 달리) 필수 string이라 빈 문자열을 전달한다 — `PlaceholderMedia`는 `if (src)`로 falsy를
    // 검사하므로 빈 문자열도 "no-src" 분기(줄무늬 placeholder 박스)로 정상 처리된다. 실재하지 않는 로컬
    // 경로(`/images/company/mission.jpg`)를 넣으면 `next/image`가 그대로 깨진 `<img>`를 렌더링해
    // 오히려 더 나쁘다.
    imageSrc: "",
    imageAlt: "이미지: INEX 오피스 또는 팀 사진",
  },
  en: {
    eyebrow: "Vision",
    title: "Beyond an exchange,\nsetting the standard for digital asset infrastructure",
    paragraphs: [
      "INEX is not just an exchange. We're a CaaS company connecting global and domestic markets, setting the standard for digital asset financial infrastructure.\n(CaaS = Compliance / Crypto as a Service)",
      "For faster, cheaper, and more transparent finance, we build the infrastructure that lets financial institutions and platforms expand their business into digital assets.",
    ],
    signatureName: "Jaekang Lee",
    signatureRole: "CEO",
    imageSrc: "",
    imageAlt: "Image: INEX office or team photo",
  },
}
