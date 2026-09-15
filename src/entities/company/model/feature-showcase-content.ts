export const featureShowcaseContent = {
  eyebrow: "Infra",
  title: "제도권 안에서 움직이는\n디지털 자산 인프라",
  description: "거래 · 결제 · 송금 서비스 레일은 VASP의 규제 준수 하에 철저한 컴플라이언스를 통해 이루어집니다.",
}

export interface FeatureShowcaseItem {
  id: string
  iconShape: "square" | "circle" | "diamond"
  title: string
  description: string
}

// TODO(real-data): 와이어프레임 플레이스홀더 카피. 실제 상품/모듈 설명 확정 후 교체 필요.
export const featureShowcaseItems: FeatureShowcaseItem[] = [
  {
    id: "trading",
    iconShape: "square",
    title: "Trading — KRCX",
    description:
      "유동성·커스터디·컴플라이언스가 함께 붙어 있는 거래 인프라를 API로 제공합니다.",
  },
  {
    id: "payments",
    iconShape: "circle",
    title: "Payments",
    description:
      "체인과 지갑의 복잡성을 감춘 채 수납과 정산을 처리합니다. 차지백 없는 구조입니다.",
  },
  {
    id: "settlement",
    iconShape: "diamond",
    title: "Settlement",
    description:
      "트래블룰 교환을 포함한 크로스보더 송금을 하나의 호출로 처리합니다.",
  },
]

export const featureShowcaseVideo = {
  videoAlt: "영상: 플랫폼 소개",
  videoSrc: "/videos/platform-intro.mp4",
}

export interface FeatureShowcaseHighlight {
  id: string
  title: string
  description: string
}

// Ref: 규제 라이선스 항목은 trust-grid-content.ts와 동일한 실데이터(FIU/KISA 인증일)를 재서술.
// B2B/온-오프램프 항목은 상위 company-homepage 프로젝트의 실제 카피를 참고해 다듬음 — 플레이스홀더 아님.
export const featureShowcaseHighlights: FeatureShowcaseHighlight[] = [
  {
    id: "license",
    title: "VASP·ISMS 인증 완료",
    description:
      "VASP 신고 수리(2024.10 · FIU), ISMS 본인증(2025.04 · KISA)을 완료해 규제 요건을 충족한 인프라 위에서 운영합니다.",
  },
  {
    id: "travel-rule",
    title: "트래블룰 검증과 AML·KYT 탐지",
    description:
      "온체인 실시간 모니터링(KYT)과 이상거래 탐지(FDS)를 게이트웨이 단계에 내장해, 트래블룰 교환과 AML 이벤트를 실시간으로 처리합니다.",
  },
  {
    id: "b2b",
    title: "파트너와 함께",
    description:
      "파트너사의 비즈니스 성장을 최우선으로 생각하고, 이를 위해 우리가 가진 모든 역량을 집중합니다.",
  },
  {
    id: "on-off-ramp",
    title: "온·오프램프",
    description:
      "온/오프램프, 수납·지급·충전, 송금·정산까지: 다가오는 디지털자산 결제/송금 시장의 수요에 맞춰, 전 구간을 관련 규제를 준수하며 하나의 인프라로 준비하고 있습니다.",
  },
]
