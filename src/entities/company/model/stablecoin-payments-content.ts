// 솔루션 > 스테이블코인 결제 상세 페이지 콘텐츠.
// 구조 레퍼런스: https://www.bridge.xyz/solutions/global-payouts. hero 바로
// 아래 3개 섹션(Key use cases / Tools to build / How it works)은
// ref/pay/temp3.png(사용자 제공 bridge.xyz 스크린샷)의 레이아웃을 그대로
// 재현한다(사용자 명시적 요청, 2026-09-14):
// - Key use cases: 좌측정렬 eyebrow+타이틀 아래 3카드(outline).
// - Tools to build(이 프로젝트에서는 "핵심 역량"): 좌측 eyebrow+타이틀,
//   우측 2x2 정적 그리드(카드 테두리 없이 제목+설명만, 클릭 상호작용 없음).
// - How it works: 좌측정렬 헤딩 아래 가로형 플로우 다이어그램(고용주 계좌 ->
//   Fiat -> 가상계좌 -> 스테이블코인 -> 지갑 -> 스테이블코인 -> 3갈래 분기).
// 그 다음 "Demo" 섹션(`ref/pay/Temp4.png`, 사용자 명시적 요청,
// 2026-09-14)은 좌측 회색 배경 폰 목업 + 우측 탭(3스텝: 회원가입 -> KYC
// 오케스트레이션 -> 완료·지갑 생성) + 코드 프리뷰(curl) + 이전/다음 버튼으로
// 스텝을 넘기는 인터랙티브 데모. 원본의 "실제 운영중인 인프라" 통계
// 섹션(`ProvenSection`)은 이 Demo 섹션으로 대체되어 제거됐다.
// 홈페이지 `accountHighlightContent`/`operationsSplitContent`의 스테이블코인
// 결제 요약 카피를 반복하지 않고, 이 상세 페이지에서는 더 구체적인 단계·
// 수치로 파고든다.
//
// i18n(사용자 요청, 2026-09-15): 모든 콘텐츠 상수를
// `xxxContentByLocale: Record<Locale, T>` 형태로 감싼다. Demo 섹션의 API
// request/response JSON 페이로드는 코드 예시이므로 번역하지 않고 두 로케일
// 동일 값을 공유하되, 사용자 입력 예시 데이터(이름/주소 등)는 로케일에 맞는
// 예시로 바꾼다.
import type { Locale } from "@/shared/lib/i18n";

export interface StablecoinPaymentsHeroContent {
  title: string;
  description: string;
}

// 사용자 명시적 요청(2026-09-14) — 이 페이지 히어로에서는 거래소 바로가기/
// 앱 스토어 배지를 모두 제거. 크립토 트레이딩 페이지와 달리 이 결제 레일은
// 최종 사용자가 INEX 앱/거래소로 이동할 동선이 아니라 파트너사 대상 API
// 소개이므로.
// "T+0 원화 정산"이었던 문구는 INEX가 원화 관련 라이선스를 아직 보유하지
// 않은 상태(사용자 확인, 2026-09-14)와 배치돼 "T+0 정산"으로 일반화하고
// 원화 표현을 제거(사용자 요청, 2026-09-15: "좀더 자연스럽게. 원화 내용은
// 제거"). `nav-content.ts`의 동일 문구도 함께 수정. 이어서 "국경과 은행
// 영업시간에 묶이지 않는"이 어색하다는 지적(2026-09-15) 및 다른 소재로
// 바꿔달라는 요청에 따라, 사용자가 제시한 문구(거래·결제·송금 세 레일이
// VASP 규제 준수 하에 이루어진다는 컴플라이언스 강조)를 반영.
export const stablecoinPaymentsHeroContentByLocale: Record<Locale, StablecoinPaymentsHeroContent> = {
  ko: {
    title: "전 세계 어디든, 스테이블코인으로 정산하세요",
    description:
      "차지백 없는 수납과 지급, T+0 정산까지 하나의 레일로 연결합니다.\n거래·결제·송금 전 과정은 VASP 규제를 준수하는 컴플라이언스 위에서 이루어집니다.",
  },
  en: {
    title: "Settle in stablecoins, anywhere in the world",
    description:
      "Connect chargeback-free collection and payout, all the way to T+0 settlement, on a single rail.\nEvery step of trading, payments, and remittance runs on compliance that follows VASP regulation.",
  },
};

// "Key use cases" 3카드 그리드 — 사용자 요청(2026-09-14: "스테이블코인
// 관련 내용으로 다시 넣어봐줄래?")에 따라 결제 수단 방식(QR) / 정산 속도 /
// 규제 준수 3가지 스테이블코인 결제 특성으로 재구성.
export const stablecoinPaymentsFeatureGridContentByLocale = {
  ko: { eyebrow: "KEY USE CASES", title: "스테이블코인 결제가\n만드는 차이" },
  en: { eyebrow: "KEY USE CASES", title: "The difference stablecoin\npayments make" },
} satisfies Record<Locale, { eyebrow: string; title: string }>;

export type StablecoinPaymentsFeatureGridIconKey = "qr" | "settlement" | "compliance";

export interface StablecoinPaymentsFeatureGridItem {
  iconKey: StablecoinPaymentsFeatureGridIconKey;
  title: string;
  description: string;
}

export const stablecoinPaymentsFeatureGridItemsByLocale: Record<
  Locale,
  StablecoinPaymentsFeatureGridItem[]
> = {
  ko: [
    {
      iconKey: "qr",
      title: "CPM·MPM QR 모두 지원",
      description:
        "가맹점 제시형(CPM), 고객 제시형(MPM) QR 결제를 모두 지원해 기존 오프라인 결제 흐름 위에 그대로 스테이블코인 결제를 얹을 수 있습니다.",
    },
    {
      iconKey: "settlement",
      title: "일 단위에서 분 단위로",
      description:
        "온체인 정산 덕분에 T+1, T+2 같은 일 단위 정산 주기가 분 단위로 줄어들어, 가맹점이 대금을 훨씬 빠르게 확보합니다.",
    },
    {
      iconKey: "compliance",
      title: "VASP 라이선스 기반 운영",
      description:
        "VASP 라이선스를 갖춘 사업자가 KYC·KYT·AML 절차를 규제에 맞춰 직접 수행해, 결제 전 구간을 컴플라이언스 안에서 처리합니다.",
    },
  ],
  en: [
    {
      iconKey: "qr",
      title: "Both CPM and MPM QR supported",
      description:
        "Supports merchant-presented (CPM) and customer-presented (MPM) QR payments alike, so stablecoin payments layer directly onto existing offline payment flows.",
    },
    {
      iconKey: "settlement",
      title: "From days to minutes",
      description:
        "On-chain settlement shrinks T+1/T+2 day-based settlement cycles down to minutes, so merchants secure funds far faster.",
    },
    {
      iconKey: "compliance",
      title: "Run on a VASP license",
      description:
        "A VASP-licensed operator carries out KYC, KYT, and AML procedures directly per regulation, keeping the entire payment flow within compliance.",
    },
  ],
};

// "Tools to build"(이 프로젝트 카피로는 "핵심 역량") 블록 — ref/pay/temp3.png:
// 좌측 eyebrow+타이틀, 우측 2x2 정적 그리드(카드 테두리 없이 제목+설명만,
// 클릭 전환 없음 — 크립토 트레이딩 페이지의 `CapabilitiesSection` 클릭탭
// 패턴과 달리 이 섹션은 4개를 한 번에 모두 보여준다).
export const stablecoinPaymentsCapabilitiesContentByLocale = {
  ko: { eyebrow: "TOOLS TO BUILD", title: "스테이블코인 결제를 만드는\n핵심 역량" },
  en: { eyebrow: "TOOLS TO BUILD", title: "The core capabilities behind\nstablecoin payments" },
} satisfies Record<Locale, { eyebrow: string; title: string }>;

export interface StablecoinPaymentsCapabilityItem {
  title: string;
  description: string;
}

export const stablecoinPaymentsCapabilitiesByLocale: Record<
  Locale,
  StablecoinPaymentsCapabilityItem[]
> = {
  ko: [
    {
      title: "결제 오케스트레이션",
      description: "하나의 API 엔드포인트로 CPM·MPM QR 결제 요청부터 스테이블코인 전환까지 매끄럽게 처리합니다.",
    },
    {
      title: "온체인 정산",
      description: "온체인 전송을 거쳐 정산 주기를 일 단위에서 분 단위로 단축해, 가맹점이 대금을 빠르게 확보합니다.",
    },
    {
      title: "KYC·KYT·AML",
      description: "가입자 검증부터 온체인 거래 모니터링까지, 결제 전 구간의 컴플라이언스 절차를 자동으로 수행합니다.",
    },
    {
      title: "VASP 컴플라이언스",
      description: "VASP 라이선스를 갖춘 사업자가 규제에 맞춰 스테이블코인 수납·지급을 직접 운영합니다.",
    },
  ],
  en: [
    {
      title: "Payment orchestration",
      description: "Handles everything from CPM/MPM QR payment requests to stablecoin conversion through a single API endpoint.",
    },
    {
      title: "On-chain settlement",
      description: "Shortens settlement cycles from days to minutes via on-chain transfer, so merchants secure funds quickly.",
    },
    {
      title: "KYC · KYT · AML",
      description: "Automatically runs compliance procedures across the entire payment flow, from subscriber verification to on-chain transaction monitoring.",
    },
    {
      title: "VASP compliance",
      description: "A VASP-licensed operator directly runs stablecoin collection and payout per regulation.",
    },
  ],
};

// "How it works" 블록 — 좌측정렬 헤딩 아래, 가로형 플로우 다이어그램.
// 처음에는 ref/pay/temp3.png(bridge.xyz 스크린샷)의 "고용주 계좌 -> ... ->
// 3갈래 분기" 구조를 그대로 재현했으나, 사용자 요청(2026-09-14: "국경을
// 넘는 지급이 작동하는 방식 이쪽 더 강화 시킬건데
// https://www.inex.im/platform 여기 보면 흐름이 좀 어색한데 정리한번
// 해봐줄래? rail 1개로 만들기.")에 따라 실제 운영 중인 INEX 플랫폼의
// "Payments 결제·정산" 레일 문구를 그대로 가져와 단일 직선 레일로
// 재구성했다 — 알약/노드 구분과 분기(직원·계약직 지갑) 없이 균일한 노드가
// 하나로 이어진다. 이후 사용자 요청(2026-09-14: "레일 디테일하게 더
// 추가해달라니까")으로 "온램프"/"오프램프·지급"처럼 추상적인 단계를
// 6단계에서 8단계로 한 번 더 풀었다 — "온램프"는 "입금 확인 -> 스테이블코인
// 전환"으로, "오프램프·지급"은 "수취 확인 -> 스테이블코인 매도 -> 지급"으로
// 세분화. 이어서 사용자 제안(2026-09-14: "중간에 KYT, KYC AML컴플라이언스
// 이런거 넣어주는건 어때?")에 따라 "온체인 전송" 직후·"수취 확인" 직전에
// "KYT·AML 검토" 노드를 추가해 9단계로 확장 — 온체인으로 들어온 자금을
// 검증하고 수취처에 반영한다는 실제 자금세탁방지 심사 순서와 일치한다.
// KRW/원화 관련 표현은 의도적으로 배제(사용자 확인, 2026-09-14: INEX가
// 아직 원화 관련 라이선스를 보유하지 않음).
export const stablecoinPaymentsHowItWorksContentByLocale = {
  ko: { eyebrow: "HOW IT WORKS", title: "스테이블코인 결제의 흐름" },
  en: { eyebrow: "HOW IT WORKS", title: "How stablecoin payments flow" },
} satisfies Record<Locale, { eyebrow: string; title: string }>;

// 사용자 명시적 요청(2026-09-14)으로 제공된 흐름을 그대로 레일 노드로
// 반영: 고객·가맹점 KYC/KYB -> 결제 요청 -> 결제 검증 -> 사전 KYT/AML/제재
// 스크리닝 -> 결제 승인 -> 스테이블코인 전송(Internal Ledger 또는
// On-chain) -> 블록체인 확인 -> 결제 완료 -> T+0 정산(수수료 차감) ->
// 가맹점 지급.
export const stablecoinPaymentsFlowByLocale = {
  ko: {
    ariaLabel:
      "고객·가맹점의 결제가 KYC·KYB, 결제 요청, 결제 검증, 사전 KYT·AML·제재 스크리닝, 결제 승인, 스테이블코인 전송(Internal Ledger 또는 On-chain), 블록체인 확인, 결제 완료, T+0 정산, 가맹점 지급을 거치는 단일 레일 흐름",
    nodes: [
      { label: "고객·가맹점\nKYC·KYB", accent: true },
      { label: "결제 요청" },
      { label: "결제 검증" },
      { label: "사전 KYT·AML\n제재 스크리닝", accent: true },
      { label: "결제 승인" },
      { label: "스테이블코인 전송", accent: true },
      { label: "블록체인 확인" },
      { label: "결제 완료" },
      { label: "T+0 정산\n(수수료 차감)" },
      { label: "가맹점 지급" },
    ],
  },
  en: {
    ariaLabel:
      "A single-rail flow where customer/merchant payments pass through KYC/KYB, payment request, payment verification, pre-transfer KYT/AML/sanctions screening, payment approval, stablecoin transfer (internal ledger or on-chain), blockchain confirmation, payment completion, T+0 settlement, and merchant payout",
    nodes: [
      { label: "Customer/merchant\nKYC · KYB", accent: true },
      { label: "Payment request" },
      { label: "Payment verification" },
      { label: "Pre-transfer KYT/AML\nsanctions screening", accent: true },
      { label: "Payment approval" },
      { label: "Stablecoin transfer", accent: true },
      { label: "Blockchain confirmation" },
      { label: "Payment completed" },
      { label: "T+0 settlement\n(fees deducted)" },
      { label: "Merchant payout" },
    ],
  },
} satisfies Record<Locale, { ariaLabel: string; nodes: Array<{ label: string; accent?: boolean }> }>;

// "Demo" 섹션 — 사용자 명시적 요청(2026-09-14: "데모 스텝
// https://inex-solution-homepage.vercel.app/demo/mobile-payment 이걸로 다시
// 바꿔줘 7단계." — 이전에는 pay-demo.inextest.com의 5단계 결제 데모를
// 재현했으나 데모 소스가 교체됨)에 따라 실제 운영 중인 "Pay X" 모바일 결제
// 데모의 7단계(상품 결제 요청 -> 회원정보 입력 -> KYC·CDD·EDD·FDS·AML 검토
// -> 입금 주소 발급(QR) -> 결제 처리·DB 이체 -> 결제 완료 -> 거래 상세·
// 영수증)를 재현한다. 원본은 다크 테마 + 4주체(고객/Pay APP/INEX(VASP)/
// On-chain) 흐름 표시기를 쓰지만, 이 페이지는 라이트 테마와 기존 탭 구조를
// 유지하고(사용자 명시적 요청) 각 스텝의 폰 화면·설명·API 코드 내용만
// 반영한다. 일부 스텝(3, 5)은 원본에 코드 블록이 없고 체크리스트 UI만
// 있어 `codeBlocks: []`로 표현한다.
export const stablecoinPaymentsDemoContentByLocale = {
  ko: { eyebrow: "DEMO", title: "스테이블코인 결제가 작동하는 모습을 확인하세요" },
  en: { eyebrow: "DEMO", title: "See stablecoin payments in action" },
} satisfies Record<Locale, { eyebrow: string; title: string }>;

export interface StablecoinPaymentsDemoCodeBlock {
  /** HTTP method, e.g. "POST". Omitted for webhook/response-only blocks. */
  method?: string;
  /** Endpoint path or panel label, e.g. "/api/v1/payment/initiate". */
  path: string;
  /** Status code shown at the right of the header, e.g. "201". */
  status: string;
  request: string[];
  response: string[];
}

export interface StablecoinPaymentsDemoChecklistItem {
  label: string;
}

export type StablecoinPaymentsDemoScreen =
  | { kind: "payment-request"; merchant: string; amount: string; asset: string }
  | { kind: "register-form"; fields: Array<{ label: string; value: string }> }
  | { kind: "review-checklist"; items: StablecoinPaymentsDemoChecklistItem[] }
  | { kind: "qr-issued"; network: string; asset: string; amount: string; address: string }
  | { kind: "processing-checklist"; amount: string; asset: string; items: StablecoinPaymentsDemoChecklistItem[] }
  | { kind: "payment-completed"; amount: string; asset: string; merchant: string; date: string; method: string; orderId: string }
  | { kind: "receipt-detail"; merchant: string; amount: string; fee: string; total: string; orderId: string; date: string; method: string; network: string; txId: string; confirmations: string };

export interface StablecoinPaymentsDemoStep {
  id: string;
  /** Tab label shown in the tab row above the code preview. */
  tabLabel: string;
  /** STEP N/7 label shown above the step title. */
  stepLabel: string;
  /** Group badge, e.g. "온보딩" / "결제" / "정산" — matches the original demo's phase tag. */
  phaseLabel: string;
  screenTitle: string;
  screenDescription: string;
  screen: StablecoinPaymentsDemoScreen;
  /** Empty when this step has no code panel in the source demo (steps 3, 5 — checklist-only). */
  codeBlocks: StablecoinPaymentsDemoCodeBlock[];
}

// API request/response JSON 페이로드(코드 예시)는 로케일 무관 — 영어
// 로케일에서도 그대로 재사용한다. 사용자 입력 예시 데이터(이름/주소 등)만
// 로케일에 맞게 바꾼다.
export const stablecoinPaymentsDemoStepsByLocale: Record<Locale, StablecoinPaymentsDemoStep[]> = {
  ko: [
    {
      id: "payment-request",
      tabLabel: "결제 요청",
      stepLabel: "STEP 1/7",
      phaseLabel: "온보딩",
      screenTitle: "상품 결제 요청",
      screenDescription: "고객이 가맹점 앱에서 상품을 선택하고 USDC 결제를 요청합니다.",
      screen: { kind: "payment-request", merchant: "INEX Store", amount: "100", asset: "USDC" },
      codeBlocks: [
        {
          method: "POST",
          path: "/api/v1/payment/initiate",
          status: "201",
          request: [
            "{",
            '  "merchantId": "mch_inex_store",',
            '  "orderId": "ord_2025_0422_001",',
            '  "amount": "100.000000",',
            '  "tokenType": "USDC"',
            "}",
          ],
          response: ["{", '  "paymentId": "pay_3a4b5c6d",', '  "status": "kyc_required"', "}"],
        },
      ],
    },
    {
      id: "register",
      tabLabel: "회원정보 입력",
      stepLabel: "STEP 2/7",
      phaseLabel: "온보딩",
      screenTitle: "회원정보 입력",
      screenDescription: "최초 결제 시 본인 확인을 위해 이름, 생년월일, 주소 등 회원 정보를 입력합니다.",
      screen: {
        kind: "register-form",
        fields: [
          { label: "이름", value: "홍길동" },
          { label: "성", value: "Hong" },
          { label: "생년월일", value: "1990-01-01" },
          { label: "주소", value: "서울시 강남구..." },
          { label: "국적", value: "대한민국" },
        ],
      },
      codeBlocks: [
        {
          method: "POST",
          path: "/api/v1/user/register",
          status: "201",
          request: [
            "{",
            '  "userId": "usr_9f3a2c1d",',
            '  "name": "홍길동",',
            '  "birthDate": "1990-01-01",',
            '  "nationality": "KR",',
            '  "address": "서울시 강남구"',
            "}",
          ],
          response: [
            "{",
            '  "userId": "usr_9f3a2c1d",',
            '  "status": "kyc_required",',
            '  "kycSessionId": "kyc_7e4b1a92"',
            "}",
          ],
        },
      ],
    },
    {
      id: "review",
      tabLabel: "KYC 검토",
      stepLabel: "STEP 3/7",
      phaseLabel: "온보딩",
      screenTitle: "KYC · CDD · EDD · FDS · AML 검토",
      screenDescription:
        "INEX가 신원 확인(KYC), 고객 확인(CDD/EDD), 이상거래 탐지(FDS), 자금세탁 방지(AML) 검토를 순차적으로 수행합니다.",
      screen: {
        kind: "review-checklist",
        items: [
          { label: "KYC 신원 인증" },
          { label: "CDD 고객 확인" },
          { label: "EDD 강화 고객 확인" },
          { label: "FDS 이상거래 탐지" },
          { label: "AML 자금세탁 방지" },
        ],
      },
      codeBlocks: [],
    },
    {
      id: "wallet-issue",
      tabLabel: "입금 주소 발급",
      stepLabel: "STEP 4/7",
      phaseLabel: "온보딩",
      screenTitle: "입금 주소 발급 (QR)",
      screenDescription:
        "KYC 통과 후 INEX가 고객 전용 USDC 입금 주소를 발급합니다. QR 코드로 외부 지갑에서 입금합니다.",
      screen: {
        kind: "qr-issued",
        network: "Ethereum (ERC-20)",
        asset: "USDC",
        amount: "100",
        address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6dabcd",
      },
      codeBlocks: [
        {
          method: "POST",
          path: "/api/v1/wallet/issue",
          status: "201",
          request: [
            "{",
            '  "userId": "usr_9f3a2c1d",',
            '  "kycId": "kyc_result_4d8e",',
            '  "chain": "ethereum",',
            '  "tokenType": "USDC"',
            "}",
          ],
          response: [
            "{",
            '  "walletId": "wal_1b2c3d4e",',
            '  "address": "0x1a2b3c4d5e6f...abcd",',
            '  "qrCodeUrl": "https://api.inex.io/qr/0x1a2b..."',
            "}",
          ],
        },
      ],
    },
    {
      id: "processing",
      tabLabel: "결제 처리",
      stepLabel: "STEP 5/7",
      phaseLabel: "결제",
      screenTitle: "결제 처리 · DB 이체",
      screenDescription:
        "고객이 QR로 USDC를 전송하면 블록체인 컨펌 후 INEX가 DB 원장에서 고객 계좌 → 결제 계좌로 즉시 이체합니다.",
      screen: {
        kind: "processing-checklist",
        amount: "100",
        asset: "USDC",
        items: [
          { label: "온체인 입금 감지" },
          { label: "블록 컨펌 완료 (12/12)" },
          { label: "DB 잔액 반영" },
          { label: "결제 계좌 이체" },
        ],
      },
      codeBlocks: [],
    },
    {
      id: "completed",
      tabLabel: "결제 완료",
      stepLabel: "STEP 6/7",
      phaseLabel: "결제",
      screenTitle: "결제 완료",
      screenDescription:
        "INEX가 Pay APP으로 결제 완료 웹훅을 전송합니다. 고객에게 결제 완료 화면이 즉시 표시됩니다.",
      screen: {
        kind: "payment-completed",
        amount: "100",
        asset: "USDC",
        merchant: "INEX Store",
        date: "2025-04-22 09:05:32",
        method: "USDC · ERC-20",
        orderId: "ORD-20250422-001",
      },
      codeBlocks: [
        {
          method: "POST",
          path: "/webhook/payment/completed",
          status: "200",
          request: [
            "{",
            '  "event": "payment.completed",',
            '  "paymentId": "pay_3a4b5c6d",',
            '  "amount": "100.000000",',
            '  "ledgerTxId": "ltx_7f8a9b0c"',
            "}",
          ],
          response: ["{", '  "received": true,', '  "merchantStatus": "order_fulfilled"', "}"],
        },
      ],
    },
    {
      id: "receipt",
      tabLabel: "거래 상세",
      stepLabel: "STEP 7/7",
      phaseLabel: "정산",
      screenTitle: "거래 상세 · 영수증",
      screenDescription:
        "고객은 거래 내역에서 상세 정보와 영수증을 확인할 수 있습니다. 거래번호, TXID, 결제 방법 등이 표시됩니다.",
      screen: {
        kind: "receipt-detail",
        merchant: "INEX Store",
        amount: "100.000000 USDC",
        fee: "0.00 USDC",
        total: "100.000000 USDC",
        orderId: "ORD-20250422-001",
        date: "2025-04-22 09:05:32",
        method: "USDC · ERC-20",
        network: "Ethereum",
        txId: "0x4f2a8c1e3b9d7e2f5a0c6d1b4e8f3a7c2d9e6b1f4a8c3e7d2b5f0a9c4d8e3b7",
        confirmations: "12/12",
      },
      codeBlocks: [],
    },
  ],
  en: [
    {
      id: "payment-request",
      tabLabel: "Payment request",
      stepLabel: "STEP 1/7",
      phaseLabel: "Onboarding",
      screenTitle: "Product payment request",
      screenDescription: "The customer selects a product in the merchant app and requests a USDC payment.",
      screen: { kind: "payment-request", merchant: "INEX Store", amount: "100", asset: "USDC" },
      codeBlocks: [
        {
          method: "POST",
          path: "/api/v1/payment/initiate",
          status: "201",
          request: [
            "{",
            '  "merchantId": "mch_inex_store",',
            '  "orderId": "ord_2025_0422_001",',
            '  "amount": "100.000000",',
            '  "tokenType": "USDC"',
            "}",
          ],
          response: ["{", '  "paymentId": "pay_3a4b5c6d",', '  "status": "kyc_required"', "}"],
        },
      ],
    },
    {
      id: "register",
      tabLabel: "Register",
      stepLabel: "STEP 2/7",
      phaseLabel: "Onboarding",
      screenTitle: "Registration",
      screenDescription: "For first-time payments, the customer enters name, date of birth, address, and other identity details.",
      screen: {
        kind: "register-form",
        fields: [
          { label: "First name", value: "Jane" },
          { label: "Last name", value: "Doe" },
          { label: "Date of birth", value: "1990-01-01" },
          { label: "Address", value: "123 Main St, San Francisco..." },
          { label: "Nationality", value: "United States" },
        ],
      },
      codeBlocks: [
        {
          method: "POST",
          path: "/api/v1/user/register",
          status: "201",
          request: [
            "{",
            '  "userId": "usr_9f3a2c1d",',
            '  "name": "Jane Doe",',
            '  "birthDate": "1990-01-01",',
            '  "nationality": "US",',
            '  "address": "San Francisco, CA"',
            "}",
          ],
          response: [
            "{",
            '  "userId": "usr_9f3a2c1d",',
            '  "status": "kyc_required",',
            '  "kycSessionId": "kyc_7e4b1a92"',
            "}",
          ],
        },
      ],
    },
    {
      id: "review",
      tabLabel: "KYC review",
      stepLabel: "STEP 3/7",
      phaseLabel: "Onboarding",
      screenTitle: "KYC · CDD · EDD · FDS · AML review",
      screenDescription:
        "INEX runs identity verification (KYC), customer due diligence (CDD/EDD), fraud detection (FDS), and anti-money-laundering (AML) review in sequence.",
      screen: {
        kind: "review-checklist",
        items: [
          { label: "KYC identity verification" },
          { label: "CDD customer diligence" },
          { label: "EDD enhanced diligence" },
          { label: "FDS fraud detection" },
          { label: "AML screening" },
        ],
      },
      codeBlocks: [],
    },
    {
      id: "wallet-issue",
      tabLabel: "Deposit address",
      stepLabel: "STEP 4/7",
      phaseLabel: "Onboarding",
      screenTitle: "Deposit address issued (QR)",
      screenDescription:
        "After passing KYC, INEX issues a dedicated USDC deposit address for the customer. Deposit from an external wallet via QR code.",
      screen: {
        kind: "qr-issued",
        network: "Ethereum (ERC-20)",
        asset: "USDC",
        amount: "100",
        address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6dabcd",
      },
      codeBlocks: [
        {
          method: "POST",
          path: "/api/v1/wallet/issue",
          status: "201",
          request: [
            "{",
            '  "userId": "usr_9f3a2c1d",',
            '  "kycId": "kyc_result_4d8e",',
            '  "chain": "ethereum",',
            '  "tokenType": "USDC"',
            "}",
          ],
          response: [
            "{",
            '  "walletId": "wal_1b2c3d4e",',
            '  "address": "0x1a2b3c4d5e6f...abcd",',
            '  "qrCodeUrl": "https://api.inex.io/qr/0x1a2b..."',
            "}",
          ],
        },
      ],
    },
    {
      id: "processing",
      tabLabel: "Processing",
      stepLabel: "STEP 5/7",
      phaseLabel: "Payment",
      screenTitle: "Payment processing · ledger transfer",
      screenDescription:
        "Once the customer sends USDC via QR, INEX confirms it on-chain and immediately transfers from the customer's ledger account to the payment account.",
      screen: {
        kind: "processing-checklist",
        amount: "100",
        asset: "USDC",
        items: [
          { label: "On-chain deposit detected" },
          { label: "Block confirmation complete (12/12)" },
          { label: "Ledger balance updated" },
          { label: "Transferred to payment account" },
        ],
      },
      codeBlocks: [],
    },
    {
      id: "completed",
      tabLabel: "Completed",
      stepLabel: "STEP 6/7",
      phaseLabel: "Payment",
      screenTitle: "Payment completed",
      screenDescription:
        "INEX sends a payment-completed webhook to the Pay App. The customer immediately sees the payment-completed screen.",
      screen: {
        kind: "payment-completed",
        amount: "100",
        asset: "USDC",
        merchant: "INEX Store",
        date: "2025-04-22 09:05:32",
        method: "USDC · ERC-20",
        orderId: "ORD-20250422-001",
      },
      codeBlocks: [
        {
          method: "POST",
          path: "/webhook/payment/completed",
          status: "200",
          request: [
            "{",
            '  "event": "payment.completed",',
            '  "paymentId": "pay_3a4b5c6d",',
            '  "amount": "100.000000",',
            '  "ledgerTxId": "ltx_7f8a9b0c"',
            "}",
          ],
          response: ["{", '  "received": true,', '  "merchantStatus": "order_fulfilled"', "}"],
        },
      ],
    },
    {
      id: "receipt",
      tabLabel: "Receipt",
      stepLabel: "STEP 7/7",
      phaseLabel: "Settlement",
      screenTitle: "Transaction detail · receipt",
      screenDescription:
        "The customer can view detailed information and a receipt from the transaction history — order number, TXID, payment method, and more.",
      screen: {
        kind: "receipt-detail",
        merchant: "INEX Store",
        amount: "100.000000 USDC",
        fee: "0.00 USDC",
        total: "100.000000 USDC",
        orderId: "ORD-20250422-001",
        date: "2025-04-22 09:05:32",
        method: "USDC · ERC-20",
        network: "Ethereum",
        txId: "0x4f2a8c1e3b9d7e2f5a0c6d1b4e8f3a7c2d9e6b1f4a8c3e7d2b5f0a9c4d8e3b7",
        confirmations: "12/12",
      },
      codeBlocks: [],
    },
  ],
};

// 마무리 CTA. `CaseStudyBanner` 재사용(크립토 트레이딩 페이지와 동일 패턴).
export const stablecoinPaymentsCtaContentByLocale = {
  ko: {
    eyebrow: "GET STARTED",
    title: "스테이블코인 결제 레일,\n지금 바로 연동하세요",
    description:
      "도입 검토 단계에 맞춰 필요한 자료와 논의를 제공합니다. 기술 검토와 규제 요건 정리를 함께 진행합니다.",
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
  },
  en: {
    eyebrow: "GET STARTED",
    title: "Integrate the stablecoin\npayments rail today",
    description:
      "We provide the materials and discussion you need at every stage of evaluation, working alongside you on technical review and regulatory requirements.",
    primaryCta: {
      label: "Partnership Inquiry",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSfIgc2tgDCkN5Rui7u3QizsBaaAz2OU_3vvteIpYumtyi5leQ/viewform?usp=sf_link",
      external: true,
    },
    secondaryCta: {
      label: "View API Docs",
      href: "https://docs.inex.im/docs/datacenter-overview",
      external: true,
    },
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { label: string; href: string; external: boolean };
    secondaryCta: { label: string; href: string; external: boolean };
  }
>;
