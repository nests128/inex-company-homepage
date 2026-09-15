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
//
// 다국어(한/영) 전환: 각 콘텐츠 상수를 `xxxContentByLocale`로 감싼다.
// `next/root-params`의 `locale()` 게터는 이 파일이 아니라
// `entities/company/server.ts`에서만 쓴다 — 이 파일을 재export하는
// `entities/company` 배럴을 client component가 import할 때 클라이언트
// 번들 그래프에 root-params 참조가 딸려 들어가면 빌드가 깨지기 때문
// (hero-content.ts 상단 주석 참고).
import type { Locale } from "@/shared/lib/i18n";

// `_pages/solutions-custody/ui/monitor-animated-list.tsx`의 `MonitorEvent`와
// 형태가 동일해야 한다(FSD 계층상 entities가 _pages를 import할 수 없어 여기
// 별도 정의 — 구조가 바뀌면 두 곳을 함께 맞춰야 함).
export interface CustodyMonitorEvent {
  id: string;
  label: string;
  status: string;
  type: "in" | "out" | "alert";
}

export interface CustodyHeroContent {
  eyebrow: string;
  title: string;
  description: string;
}

export type CustodyFeatureGridIconKey = "exchange" | "wallet" | "treasury";

export interface CustodyFeatureGridItem {
  iconKey: CustodyFeatureGridIconKey;
  title: string;
  description: string;
}

export type CustodyCapabilityConsoleKey = "policy" | "approval" | "assets";

export interface CustodyCapabilityItem {
  consoleKey: CustodyCapabilityConsoleKey;
  title: string;
  description: string;
}

interface KeyShareContent {
  label: string;
  combined: boolean;
}

interface AssetSplitContent {
  label: string;
  ratio: number;
  colorClassName: string;
}

interface CustodyContent {
  hero: CustodyHeroContent;
  // "Key use cases" 3카드 그리드 — 이전엔 통제 장치(다중 승인/핫·콜드
  // 분리/감사 로그) 나열이었으나, "Tools to build" 섹션(실제 운영 콘솔)과
  // 개념이 거의 1:1로 겹친다는 지적(2026-09-14: "내용 좀 겹치지 않아?")에
  // 따라 "누가 어떻게 쓰는가" 유즈케이스 중심으로 재구성(Bridge 커스터디
  // 페이지의 세그먼트별 유즈케이스 구성 참고, 사용자 제시).
  featureGridContent: { eyebrow: string; title: string };
  featureGridItems: CustodyFeatureGridItem[];
  // "Tools to build" — Fireblocks/BitGo 콘솔 화면을 참고한 3카드 그리드.
  capabilitiesContent: { eyebrow: string; title: string };
  capabilities: CustodyCapabilityItem[];
  // 카드 2(다중 서명 · 승인) 다이어그램용 키 셰어 라벨.
  keyShares: KeyShareContent[];
  keyShareTitle: string;
  // 카드 2 다이어그램 중앙 원 안의 짧은 라벨("서명"/"Sign").
  keyShareResultLabel: string;
  // 카드 1/3 콘솔 내부 헤더용 축약 라벨(카드 밖 <h3> 타이틀과는 별개 —
  // 콘솔 폭이 좁아 영어에서 "Real-Time Monitoring" 전체를 쓰면 넘친다).
  monitorConsoleLabel: string;
  assetsConsoleLabel: string;
  // 카드 1(모니터링) AnimatedList 이벤트. 순환 재생되므로 "방금 전/3분 전"
  // 같은 상대 시간이 아니라 재순환해도 항상 유효한 상태 라벨을 쓴다.
  monitorEvents: CustodyMonitorEvent[];
  // 카드 3(자산 분포) 핫/콜드 비중.
  assetSplits: AssetSplitContent[];
  // "Proven" 신뢰 섹션.
  proven: { eyebrow: string; title: string; description: string };
  // 마무리 CTA.
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { label: string; href: string; external: boolean };
    secondaryCta: { label: string; href: string; external: boolean };
  };
}

const PARTNERSHIP_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfIgc2tgDCkN5Rui7u3QizsBaaAz2OU_3vvteIpYumtyi5leQ/viewform?usp=sf_link";

export const custodyContentByLocale: Record<Locale, CustodyContent> = {
  ko: {
    hero: {
      eyebrow: "SOLUTION · 커스터디",
      title: "디지털 자산 보관을, 검증된 인프라 위에서",
      description:
        "다중 승인 정책과 핫·콜드 분리 보관 체계로 고객 자산을 관리합니다.\n자체 거래소를 직접 운영하며 다져온 보안·운영 체계를 그대로 커스터디 인프라로 제공합니다.",
    },
    featureGridContent: {
      eyebrow: "KEY USE CASES",
      title: "어디서든, 어떤 규모든\n안전하게",
    },
    // - 거래소·거래 플랫폼: INEX가 직접 검증한 유즈케이스(ProvenSection의
    //   "자체 거래소 운영" 근거와 동일선상) — "OO 거래소가 쓰고 있다" 식의
    //   실적 주장이 아니라 "이런 목적에 쓸 수 있다"는 용도 설명으로 작성.
    // - 지갑 · 핀테크 서비스, 디지털 자산 보유 기업은 INEX 커스터디가 대응
    //   가능한 용도로 서술하되(TODO(real-data): 실제 해당 세그먼트 고객 사례
    //   확보 시 구체 사례로 교체), 감사 로그·리포트(구 3번째 카드)는 기업
    //   세그먼트 설명에 규제 대응 맥락으로 흡수해 정보 손실 없앰.
    featureGridItems: [
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
    ],
    capabilitiesContent: {
      eyebrow: "TOOLS TO BUILD",
      title: "커스터디를 움직이는\n핵심 기능",
    },
    capabilities: [
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
    ],
    keyShareTitle: "다중서명 2 of 3",
    keyShareResultLabel: "서명",
    monitorConsoleLabel: "실시간 모니터링",
    assetsConsoleLabel: "보관 자산 분포",
    keyShares: [
      { label: "Share A", combined: true },
      { label: "Share B", combined: true },
      { label: "Share C", combined: false },
    ],
    monitorEvents: [
      { id: "e1", label: "입금 확인", status: "온체인 컨펌 완료", type: "in" },
      { id: "e2", label: "출금 서명 완료", status: "2 of 3 승인", type: "out" },
      { id: "e3", label: "한도 초과 시도 차단", status: "정책 엔진 자동 차단", type: "alert" },
      { id: "e4", label: "입금 확인", status: "온체인 컨펌 완료", type: "in" },
      { id: "e5", label: "출금 서명 완료", status: "2 of 3 승인", type: "out" },
    ],
    assetSplits: [
      { label: "콜드월렛", ratio: 0.82, colorClassName: "text-sky-500" },
      { label: "핫월렛", ratio: 0.18, colorClassName: "text-sky-200" },
    ],
    proven: {
      eyebrow: "PROVEN INFRASTRUCTURE",
      title: "자체 거래소 운영으로 검증된 보안 체계입니다",
      description:
        "INEX는 자체 거래소를 직접 운영하며 다중 승인·핫·콜드 분리 보관 체계를 실서비스 자산 위에서 운영해 왔습니다. 그 체계를 그대로 커스터디 인프라로 제공합니다.",
    },
    cta: {
      eyebrow: "GET STARTED",
      title: "커스터디 인프라,\n지금 바로 논의하세요",
      description:
        "보관 자산 규모와 승인 정책 요구사항에 맞춰 필요한 자료와 논의를 제공합니다. 기술 검토와 규제 요건 정리를 함께 진행합니다.",
      primaryCta: { label: "파트너십 문의", href: PARTNERSHIP_FORM_URL, external: true },
      secondaryCta: {
        label: "API 문서 보기",
        href: "https://docs.inex.im/docs/datacenter-overview",
        external: true,
      },
    },
  },
  en: {
    hero: {
      eyebrow: "SOLUTION · Custody",
      title: "Digital asset storage, on proven infrastructure",
      description:
        "Manage client assets with multi-approval policies and hot/cold segregated storage.\nThe same security and operations discipline built running our own exchange, delivered as custody infrastructure.",
    },
    featureGridContent: {
      eyebrow: "KEY USE CASES",
      title: "Secure at any scale,\nwherever you operate",
    },
    featureGridItems: [
      {
        iconKey: "exchange",
        title: "Exchanges & Trading Platforms",
        description:
          "Manage client deposits with multi-approval policies and hot/cold segregated storage, keeping asset movement under control even at high transaction volume.",
      },
      {
        iconKey: "wallet",
        title: "Wallets & Fintech Services",
        description:
          "Launch digital asset services quickly by connecting a proven custody backend, without building your own custody infrastructure.",
      },
      {
        iconKey: "treasury",
        title: "Digital Asset Treasuries",
        description:
          "Record deposit, withdrawal, and signing history with timestamps, keeping the evidence you need for internal audits and regulatory response.",
      },
    ],
    capabilitiesContent: {
      eyebrow: "TOOLS TO BUILD",
      title: "The core features\npowering custody",
    },
    capabilities: [
      {
        consoleKey: "policy",
        title: "Real-Time Monitoring",
        description: "Track deposits, withdrawals, signatures, and balance changes in real time, with instant alerts on anomalies.",
      },
      {
        consoleKey: "approval",
        title: "Multi-Signature Approval",
        description: "Require independent approvals from multiple signers before a signature completes, preventing loss from a single compromised key.",
      },
      {
        consoleKey: "assets",
        title: "Segregated Wallet Management",
        description: "Separate hot wallets for transactions from cold wallets for long-term storage at the account level, controlling every asset movement path.",
      },
    ],
    keyShareTitle: "Multi-sig 2 of 3",
    keyShareResultLabel: "Sign",
    monitorConsoleLabel: "Live Monitoring",
    assetsConsoleLabel: "Asset Allocation",
    keyShares: [
      { label: "Share A", combined: true },
      { label: "Share B", combined: true },
      { label: "Share C", combined: false },
    ],
    monitorEvents: [
      { id: "e1", label: "Deposit confirmed", status: "On-chain confirmation complete", type: "in" },
      { id: "e2", label: "Withdrawal signed", status: "2 of 3 approved", type: "out" },
      { id: "e3", label: "Limit exceeded, blocked", status: "Auto-blocked by policy engine", type: "alert" },
      { id: "e4", label: "Deposit confirmed", status: "On-chain confirmation complete", type: "in" },
      { id: "e5", label: "Withdrawal signed", status: "2 of 3 approved", type: "out" },
    ],
    assetSplits: [
      { label: "Cold wallet", ratio: 0.82, colorClassName: "text-sky-500" },
      { label: "Hot wallet", ratio: 0.18, colorClassName: "text-sky-200" },
    ],
    proven: {
      eyebrow: "PROVEN INFRASTRUCTURE",
      title: "A security system proven by running our own exchange",
      description:
        "INEX has run multi-approval and hot/cold segregated storage on live production assets while operating its own exchange. We deliver that same system as custody infrastructure.",
    },
    cta: {
      eyebrow: "GET STARTED",
      title: "Let's discuss your custody\ninfrastructure today",
      description:
        "We provide the materials and discussion you need, tailored to your asset scale and approval policy requirements — including technical review and regulatory alignment.",
      primaryCta: { label: "Partnership Inquiry", href: PARTNERSHIP_FORM_URL, external: true },
      secondaryCta: {
        label: "View API Docs",
        href: "https://docs.inex.im/docs/datacenter-overview",
        external: true,
      },
    },
  },
};
