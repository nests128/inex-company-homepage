// 솔루션 > 커스터디 상세 페이지 콘텐츠.
// 구조/톤 레퍼런스: BitGo(bitgo.com), Fireblocks(fireblocks.com)의 커스터디
// 제품 페이지 — 섹션 구성(정책 엔진·다중 승인·핫/콜드 분리·감사 로그
// 중심의 "Key use cases", 승인 흐름 "How it works")만 참고하고, 두 회사가
// 표방하는 구체 수치(보험 한도, SOC 2, 적격 수탁자 지위, 자체 MPC 프로토콜
// 명칭 등)는 INEX가 보유·검증했다는 근거가 없어 가져오지 않는다. 실제로
// 검증된 것은 VASP 신고 수리(FIU)·ISMS 인증(KISA)뿐이며(다른 두 솔루션
// 페이지와 동일 근거), 그 외 커스터디 특화 수치·인증은 모두
// TODO(real-data)로 표시해 실데이터 확정 전까지 게시하지 않는다.
// 다른 솔루션 페이지와 동일하게 KRW 관련 구체 문구는 넣지 않는다(INEX가
// 아직 원화 관련 라이선스를 보유하지 않음, no_krw_claims 메모리 참고).

export interface CustodyHeroContent {
  eyebrow: string;
  title: string;
  description: string;
}

export const custodyHeroContent: CustodyHeroContent = {
  eyebrow: "SOLUTION · 커스터디",
  title: "디지털 자산 보관을, 검증된 인프라 위에서",
  description:
    "다중 승인 정책과 핫·콜드 분리 보관 체계로 고객 자산을 관리합니다. 자체 거래소를 직접 운영하며 다져온 보안·운영 체계를 그대로 커스터디 인프라로 제공합니다.",
};

// "Key use cases" 3카드 그리드 — 정책 승인, 보관 구조, 감사 추적 세 축으로
// 구성(BitGo/Fireblocks 제품 페이지의 공통 골격 참고).
export const custodyFeatureGridContent = {
  eyebrow: "KEY USE CASES",
  title: "자산 보관에 필요한\n모든 통제 장치",
};

export type CustodyFeatureGridIconKey = "policy" | "cold" | "audit";

export interface CustodyFeatureGridItem {
  iconKey: CustodyFeatureGridIconKey;
  title: string;
  description: string;
}

export const custodyFeatureGridItems: CustodyFeatureGridItem[] = [
  {
    iconKey: "policy",
    title: "다중 승인 정책",
    description:
      "출금 한도·화이트리스트·승인자 그룹을 정책으로 설정해, 설정된 조건을 만족해야만 자산이 이동합니다.",
  },
  {
    iconKey: "cold",
    title: "핫 · 콜드 분리 보관",
    description:
      // TODO(real-data): 실제 콜드월렛 비중/보관 방식(예: 오프라인 서명 절차) 확정 후 구체화 필요.
      "일상적인 입출금은 핫월렛으로, 대부분의 자산은 오프라인 콜드월렛으로 분리해 보관합니다.",
  },
  {
    iconKey: "audit",
    title: "감사 로그 · 리포트",
    description:
      "모든 승인·서명·출금 요청을 타임스탬프와 함께 기록해, 내부 감사와 규제 대응에 그대로 활용할 수 있습니다.",
  },
];

// "Tools to build"(이 프로젝트 카피로는 "핵심 역량") — 스테이블코인 결제
// 페이지와 동일한 2x2 정적 그리드 패턴. 정확히 4개 유지(레이아웃 CSS가
// index % 2 기준 divider를 가정).
export const custodyCapabilitiesContent = {
  eyebrow: "TOOLS TO BUILD",
  title: "커스터디를 만드는\n핵심 역량",
};

export interface CustodyCapabilityItem {
  title: string;
  description: string;
}

export const custodyCapabilities: CustodyCapabilityItem[] = [
  {
    title: "정책 엔진",
    description: "승인자 수, 출금 한도, 화이트리스트 주소를 조합한 승인 규칙을 자산·계정 단위로 설정합니다.",
  },
  {
    title: "다중 서명 · 승인",
    description: "여러 승인자의 개별 승인을 모아야 서명이 완성되도록 해, 단일 키 탈취로 인한 유출을 막습니다.",
  },
  {
    title: "지갑 분리 관리",
    description: "입출금용 핫월렛과 장기 보관용 콜드월렛을 계정 단위로 분리해 자산 이동 동선을 통제합니다.",
  },
  {
    title: "API · 대시보드",
    description: "잔고·승인 대기·서명 상태를 API와 대시보드로 함께 제공해, 운영팀이 실시간으로 추적합니다.",
  },
];

// "How it works" — 다른 두 솔루션 페이지와 동일한 `FlowRail` 단일 레일.
export const custodyHowItWorksContent = {
  eyebrow: "HOW IT WORKS",
  title: "출금 요청이 처리되는 과정",
};

export const custodyFlow = {
  ariaLabel:
    "출금 요청이 정책 검증, 승인자 알림, 다중 승인, 서명, 콜드월렛 반출, 온체인 전송, 완료 확인을 거치는 단일 레일 흐름",
  nodes: [
    { label: "출금 요청" },
    { label: "정책 검증" },
    { label: "승인자 알림" },
    { label: "다중 승인", accent: true },
    { label: "서명", accent: true },
    { label: "콜드월렛 반출" },
    { label: "온체인 전송" },
    { label: "완료 확인" },
  ],
} as const;

// "Proven" 신뢰 섹션 — 다른 두 솔루션 페이지와 동일하게 실제 검증된 근거만
// 사용. 구체 보관 규모·가동률 등은 실데이터 확정 전까지 넣지 않는다.
export const custodyProvenContent = {
  eyebrow: "PROVEN INFRASTRUCTURE",
  title: "자체 거래소 운영으로 검증된 보안 체계입니다",
  description:
    "INEX는 자체 거래소를 직접 운영하며 다중 승인·핫·콜드 분리 보관 체계를 실서비스 자산 위에서 운영해 왔습니다. 그 체계를 그대로 커스터디 인프라로 제공합니다.",
};

export interface CustodyStat {
  value: string;
  caption: string;
}

// TODO(real-data): 콜드월렛 보관 비중, 다중 승인 정책 기본값(최소 승인자
// 수) 등 커스터디 특화 수치가 확정되면 두 번째·세 번째 통계로 추가한다.
// 그 전까지는 미완성 플레이스홀더("N/N" 등)를 노출하지 않기 위해 실제
// 검증된 항목 하나만 게시한다.
export const custodyStats: CustodyStat[] = [
  // 실데이터: VASP 신고 수리(2024.10 · FIU), ISMS 본인증(2025.04 · KISA) —
  // crypto-trading-content.ts의 동일 항목과 같은 근거, 플레이스홀더 아님.
  { value: "VASP · ISMS", caption: "규제 라이선스 완비" },
];

// 마무리 CTA.
export const custodyCtaContent = {
  eyebrow: "GET STARTED",
  title: "커스터디 인프라,\n지금 바로 논의하세요",
  description:
    "보관 자산 규모와 승인 정책 요구사항에 맞춰 필요한 자료와 논의를 제공합니다. 기술 검토와 규제 요건 정리를 함께 진행합니다.",
  primaryCta: {
    label: "파트너십 문의",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfIgc2tgDCkN5Rui7u3QizsBaaAz2OU_3vvteIpYumtyi5leQ/viewform?usp=sf_link",
    external: true,
  },
  secondaryCta: {
    label: "API 문서 보기",
    href: "https://docs.inex.im/docs/datacenter-overview",
    external: true,
  },
};
