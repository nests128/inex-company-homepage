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

// "Key use cases" 3카드 그리드 — 이전엔 통제 장치(다중 승인/핫·콜드
// 분리/감사 로그) 나열이었으나, "Tools to build" 섹션(실제 운영 콘솔)과
// 개념이 거의 1:1로 겹친다는 지적(2026-09-14: "내용 좀 겹치지 않아?")에
// 따라 "누가 어떻게 쓰는가" 유즈케이스 중심으로 재구성(Bridge 커스터디
// 페이지의 세그먼트별 유즈케이스 구성 참고, 사용자 제시).
// - 거래소·거래 플랫폼: INEX가 직접 검증한 유즈케이스(ProvenSection의
//   "자체 거래소 운영" 근거와 동일선상) — "OO 거래소가 쓰고 있다" 식의
//   실적 주장이 아니라 "이런 목적에 쓸 수 있다"는 용도 설명으로 작성.
// - 지갑 · 핀테크 서비스, 디지털 자산 보유 기업은 INEX 커스터디가 대응
//   가능한 용도로 서술하되(TODO(real-data): 실제 해당 세그먼트 고객 사례
//   확보 시 구체 사례로 교체), 감사 로그·리포트(구 3번째 카드)는 기업
//   세그먼트 설명에 규제 대응 맥락으로 흡수해 정보 손실 없앰.
export const custodyFeatureGridContent = {
  eyebrow: "KEY USE CASES",
  title: "어디서든, 어떤 규모든\n안전하게",
};

export type CustodyFeatureGridIconKey = "exchange" | "wallet" | "treasury";

export interface CustodyFeatureGridItem {
  iconKey: CustodyFeatureGridIconKey;
  title: string;
  description: string;
}

export const custodyFeatureGridItems: CustodyFeatureGridItem[] = [
  {
    iconKey: "exchange",
    title: "거래소 · 거래 플랫폼",
    description:
      "고객 예치 자산을 다중 승인 정책과 핫·콜드 분리 보관으로 관리해, 대규모 거래 환경에서도 자산 이동을 안전하게 통제합니다.",
  },
  {
    iconKey: "wallet",
    title: "지갑 · 핀테크 서비스",
    description:
      "자체 커스터디 인프라를 구축하지 않고도, 검증된 보관 체계를 백엔드로 연결해 디지털 자산 서비스를 빠르게 출시할 수 있습니다.",
  },
  {
    iconKey: "treasury",
    title: "디지털 자산 보유 기업",
    description:
      "보유 자산의 입출금·서명 이력을 타임스탬프와 함께 기록해, 내부 감사와 규제 대응에 필요한 근거를 그대로 확보합니다.",
  },
];

// "Tools to build" — Fireblocks/BitGo 콘솔 화면을 참고한 3카드 그리드.
// 각 카드는 실제 제품 화면을 축약한 미니 콘솔 UI(이미지 아님, 컴포넌트로 구현)
// + 소제목 + 설명으로 구성. consoleKey로 카드별 콘솔을 매칭한다.
export const custodyCapabilitiesContent = {
  eyebrow: "TOOLS TO BUILD",
  title: "커스터디를 움직이는\n핵심 기능",
};

export type CustodyCapabilityConsoleKey = "policy" | "approval" | "assets";

export interface CustodyCapabilityItem {
  consoleKey: CustodyCapabilityConsoleKey;
  title: string;
  description: string;
}

export const custodyCapabilities: CustodyCapabilityItem[] = [
  {
    consoleKey: "policy",
    title: "실시간 모니터링",
    description: "입출금·서명·잔고 변동을 실시간으로 추적하고, 이상 징후는 즉시 알림으로 전달합니다.",
  },
  {
    consoleKey: "approval",
    title: "다중 서명 · 승인",
    description: "여러 승인자의 개별 승인을 모아야 서명이 완성되도록 해, 단일 키 탈취로 인한 유출을 막습니다.",
  },
  {
    consoleKey: "assets",
    title: "지갑 분리 관리",
    description: "입출금용 핫월렛과 장기 보관용 콜드월렛을 계정 단위로 분리해 자산 이동 동선을 통제합니다.",
  },
];

// "Proven" 신뢰 섹션 — 다른 두 솔루션 페이지와 동일하게 실제 검증된 근거만
// 사용. 구체 보관 규모·가동률 등은 실데이터 확정 전까지 넣지 않는다.
export const custodyProvenContent = {
  eyebrow: "PROVEN INFRASTRUCTURE",
  title: "자체 거래소 운영으로 검증된 보안 체계입니다",
  description:
    "INEX는 자체 거래소를 직접 운영하며 다중 승인·핫·콜드 분리 보관 체계를 실서비스 자산 위에서 운영해 왔습니다. 그 체계를 그대로 커스터디 인프라로 제공합니다.",
};

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
