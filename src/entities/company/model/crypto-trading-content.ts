// 솔루션 > 크립토 트레이딩 상세 페이지 콘텐츠.
// Ref: ref/exchange/Solutions.dc.html L40-121 ("크립토 트레이딩" 탭) — 카피 톤/구조의
// 출처. 원본은 오지스/OZYS 예시 문구라 사명·수치를 INEX 기준으로 다듬었다.

export interface CryptoTradingHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryCta: {
    label: string;
    href: string;
    external?: boolean;
  };
  appLinks: {
    appStoreHref: string;
    googlePlayHref: string;
  };
}

// 실제 INEX 앱 스토어 링크. company-homepage 프로젝트 푸터
// (components/layout/footer/store-button.tsx)와 동일한 값 — 거래소가 앱으로도
// 실제 운영중이라는 근거를 히어로에서 함께 보여주기 위해 재사용한다.
export const cryptoTradingAppLinks = {
  // App Store는 slug 부분과 무관하게 id로만 리졸브되므로 id만 사용.
  appStoreHref: "https://apps.apple.com/kr/app/id6479237264",
  googlePlayHref:
    "https://play.google.com/store/apps/details?id=com.exchange.inex_flutter_app&hl=ko",
};

export const cryptoTradingHeroContent: CryptoTradingHeroContent = {
  eyebrow: "SOLUTION · 크립토 트레이딩",
  title: "실제 운영중인 거래소 엔진을 그대로 연결하세요",
  description:
    "INEX가 직접 운영하며 검증한 거래 엔진과 유동성을 임베디드 차트, SDK, 거래·오더북 API로 제공합니다. 별도 거래소 구축 없이 트레이딩 기능을 서비스에 그대로 탑재할 수 있습니다.",
  // TODO(real-data): 임시로 ref/exchange/image.png(다크 테마 거래소 UI)를 사용 중.
  // 사용자가 실제 최신 스크린샷으로 교체할 예정.
  imageSrc: "/images/solutions/crypto-trading-hero.png",
  imageAlt: "INEX 거래소 크립토 트레이딩 화면 스크린샷",
  primaryCta: {
    label: "파트너십 문의",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfIgc2tgDCkN5Rui7u3QizsBaaAz2OU_3vvteIpYumtyi5leQ/viewform?usp=sf_link",
    external: true,
  },
  appLinks: cryptoTradingAppLinks,
};

// "실제 운영중인 서비스" 소개 섹션 — INEX가 상용 서비스로 검증된 인프라임을
// 강조하는 텍스트 + 신뢰 배지/통계 조합.
export const cryptoTradingProvenContent = {
  eyebrow: "PROVEN INFRASTRUCTURE",
  title: "실서비스 트래픽으로 검증된 인프라입니다",
  description:
    "INEX는 자체 거래소를 직접 운영하며 매칭 엔진, 유동성, 리스크 관리 체계를 실서비스 트래픽 위에서 검증해 왔습니다. 그 인프라를 그대로 API·SDK로 제공하기 때문에, 파트너사는 별도의 검증 기간 없이 바로 도입할 수 있습니다.",
};

export interface CryptoTradingStat {
  value: string;
  caption: string;
}

export const cryptoTradingStats: CryptoTradingStat[] = [
  // TODO(real-data): 플레이스홀더 수치. 실제 무중단 운영 실적 확정 후 교체 필요.
  { value: "24/7", caption: "무중단 매칭 엔진 운영" },
  // TODO(real-data): 플레이스홀더 수치. 실제 API 가동률 확정 후 교체 필요.
  { value: "99.9%", caption: "API 가동률" },
  // TODO(real-data): 플레이스홀더 수치. 실제 오더북 응답속도 스펙 확정 후 교체 필요.
  { value: "<50ms", caption: "오더북 평균 응답 속도" },
  // 실데이터: VASP 신고 수리(2024.10 · FIU), ISMS 본인증(2025.04 · KISA) —
  // feature-showcase-content.ts의 licence 항목과 동일 근거, 플레이스홀더 아님.
  { value: "VASP·ISMS", caption: "규제 라이선스 완비" },
];

/**
 * "임베디드 차트 / SDK / 거래·오더북 API" 3분할 인터랙티브 섹션의 좌측 리스트
 * 아이템. 아이콘 키는 위젯에서 lucide-react 글리프로 매핑한다(JSX는 모델
 * 파일에 둘 수 없음 — `OperationsFeatureIconKey`와 동일 패턴).
 */
export type CryptoTradingFeatureIconKey = "chart" | "sdk" | "orderbook";

export interface CryptoTradingFeatureItem {
  id: string;
  iconKey: CryptoTradingFeatureIconKey;
  title: string;
  description: string;
  active?: boolean;
}

export const cryptoTradingFeatures: CryptoTradingFeatureItem[] = [
  {
    id: "chart",
    iconKey: "chart",
    title: "임베디드 차트",
    description:
      "캔들·라인·지표를 지원하는 실시간 시세 차트를 iframe 또는 SDK로 서비스에 즉시 삽입합니다.",
    active: true,
  },
  {
    id: "sdk",
    iconKey: "sdk",
    title: "SDK 제공",
    description:
      "웹·앱에 바로 붙일 수 있는 SDK로 주문, 잔고 조회, 체결 알림까지 몇 줄의 코드로 연동합니다.",
  },
  {
    id: "orderbook",
    iconKey: "orderbook",
    title: "거래 · 오더북 API",
    // TODO(real-data): "밀리초 단위 지연"은 ref/exchange/Solutions.dc.html의
    // 참고 문구를 그대로 가져온 것으로, 실제 서비스 지연 시간 스펙 확정 후 검증 필요.
    description:
      "WebSocket 기반 실시간 호가·체결 데이터와 주문 API를 밀리초 단위 지연으로 제공합니다.",
  },
];

// TODO(real-data): SDK 초기화 예시 코드. 실제 SDK 공개 API/문법 확정 후 교체 필요.
export const cryptoTradingSdkSnippet = [
  "import { InexSDK } from '@inex/sdk'",
  "",
  "const inex = new InexSDK({ apiKey })",
  "",
  "const orderbook = await inex.market",
  "  .orderbook('BTC/KRW')",
  "",
  "await inex.trade.placeOrder({",
  "  symbol: 'BTC/KRW',",
  "  side: 'buy',",
  "  amount: '0.01',",
  "})",
];

// TODO(real-data): 거래·오더북 API 탭 우측 터미널의 request/response 예시.
// Ref: ref/exchange/temp.png(사용자 레퍼런스, curl 요청 코드 화면) — 실제
// REST 엔드포인트 스펙 확정 후 교체 필요.
export const cryptoTradingOrderbookApiRequest = [
  "curl --request GET \\",
  "  --url https://api.inex.im/v1/orderbook \\",
  "  --header 'API-Key: sk-7fB9kL2WqT3eX8vR1zMaG6Jq0Pp' \\",
  "  --data '",
  "  {",
  '    "symbol": "BTCKRW",',
  '    "depth": 5',
  "  }",
];

export const cryptoTradingOrderbookApiResponse = [
  "{",
  '  "symbol": "BTCKRW",',
  '  "asks": [',
  '    { "price": "142970000", "qty": "0.052" },',
  '    { "price": "142950000", "qty": "0.128" }',
  "  ],",
  '  "bids": [',
  '    { "price": "142840000", "qty": "0.331" },',
  '    { "price": "142820000", "qty": "0.508" }',
  "  ]",
  "}",
];

// TODO(real-data): 실제 시세가 아닌 데모용 값 — 아래 차트/오더북 콘텐츠 전반.
export const cryptoTradingChartSymbol = "BTC/KRW";
export const cryptoTradingChartPrice = "142,850,000";

// TODO(real-data): placeholder candle shapes only — no real price series.
// 28개로 촘촘하게(기존 6개), ref/exchange/chart.png(사용자 레퍼런스)처럼
// 완만한 상승 -> 고점 변동성 횡보 -> 급격한 하락 -> 저점 소폭 반등의 큰
// 등락폭 파동 형태로 재구성 — 사용자 명시적 요청(2026-09-14).
export const cryptoTradingChartCandles = [
  { wickTop: 56, wickBottom: 67, bodyTop: 62, bodyBottom: 65, bullish: true },
  { wickTop: 50, wickBottom: 70, bodyTop: 54, bodyBottom: 62, bullish: true },
  { wickTop: 49, wickBottom: 60, bodyTop: 53, bodyBottom: 56, bullish: true },
  { wickTop: 47, wickBottom: 58, bodyTop: 52, bodyBottom: 55, bullish: true },
  { wickTop: 43, wickBottom: 55, bodyTop: 45, bodyBottom: 52, bullish: true },
  { wickTop: 41, wickBottom: 51, bodyTop: 45, bodyBottom: 48, bullish: false },
  { wickTop: 36, wickBottom: 50, bodyTop: 42, bodyBottom: 46, bullish: true },
  { wickTop: 32, wickBottom: 49, bodyTop: 38, bodyBottom: 42, bullish: true },
  { wickTop: 27, wickBottom: 44, bodyTop: 35, bodyBottom: 38, bullish: true },
  { wickTop: 26, wickBottom: 42, bodyTop: 35, bodyBottom: 39, bullish: false },
  { wickTop: 32, wickBottom: 47, bodyTop: 39, bodyBottom: 42, bullish: false },
  { wickTop: 35, wickBottom: 52, bodyTop: 41, bodyBottom: 44, bullish: false },
  { wickTop: 39, wickBottom: 51, bodyTop: 42, bodyBottom: 45, bullish: true },
  { wickTop: 40, wickBottom: 53, bodyTop: 42, bodyBottom: 46, bullish: false },
  { wickTop: 39, wickBottom: 59, bodyTop: 46, bodyBottom: 51, bullish: false },
  { wickTop: 45, wickBottom: 59, bodyTop: 51, bodyBottom: 56, bullish: false },
  { wickTop: 51, wickBottom: 71, bodyTop: 56, bodyBottom: 64, bullish: false },
  { wickTop: 60, wickBottom: 74, bodyTop: 64, bodyBottom: 67, bullish: false },
  { wickTop: 57, wickBottom: 74, bodyTop: 64, bodyBottom: 67, bullish: false },
  { wickTop: 62, wickBottom: 76, bodyTop: 66, bodyBottom: 69, bullish: true },
  { wickTop: 62, wickBottom: 76, bodyTop: 66, bodyBottom: 74, bullish: false },
  { wickTop: 68, wickBottom: 82, bodyTop: 74, bodyBottom: 77, bullish: false },
  { wickTop: 68, wickBottom: 84, bodyTop: 75, bodyBottom: 78, bullish: true },
  { wickTop: 64, wickBottom: 81, bodyTop: 69, bodyBottom: 75, bullish: true },
  { wickTop: 56, wickBottom: 71, bodyTop: 64, bodyBottom: 69, bullish: true },
  { wickTop: 56, wickBottom: 69, bodyTop: 64, bodyBottom: 67, bullish: false },
  { wickTop: 55, wickBottom: 72, bodyTop: 61, bodyBottom: 64, bullish: true },
  { wickTop: 54, wickBottom: 67, bodyTop: 57, bodyBottom: 61, bullish: true },
];

// TODO(real-data): placeholder order book rows — no live data.
// 미리보기가 꽉 차 보이도록 8행씩으로 늘림(기존 3행). depth/changePercent는
// 사용자 제공 INEX 거래소 호가창 스크린샷(매도=파랑 depth bar+등락률,
// 매수=빨강)을 반영해 추가 — 사용자 명시적 요청(2026-09-14).
export const cryptoTradingOrderbookAsks = [
  {
    price: "142,970,000",
    amount: "0.052",
    depth: 0.13,
    changePercent: "+3.02%",
  },
  {
    price: "142,950,000",
    amount: "0.128",
    depth: 0.31,
    changePercent: "+2.72%",
  },
  {
    price: "142,930,000",
    amount: "0.241",
    depth: 0.58,
    changePercent: "+2.42%",
  },
  {
    price: "142,910,000",
    amount: "0.184",
    depth: 0.45,
    changePercent: "+2.11%",
  },
  { price: "142,890,000", amount: "0.412", depth: 1, changePercent: "+1.81%" },
  {
    price: "142,870,000",
    amount: "0.097",
    depth: 0.24,
    changePercent: "+1.50%",
  },
  {
    price: "142,860,000",
    amount: "0.303",
    depth: 0.74,
    changePercent: "+1.27%",
  },
  {
    price: "142,850,000",
    amount: "0.076",
    depth: 0.18,
    changePercent: "+0.90%",
  },
];

export const cryptoTradingOrderbookBids = [
  {
    price: "142,840,000",
    amount: "0.331",
    depth: 0.65,
    changePercent: "-0.51%",
  },
  { price: "142,820,000", amount: "0.508", depth: 1, changePercent: "-0.61%" },
  {
    price: "142,800,000",
    amount: "0.129",
    depth: 0.25,
    changePercent: "-0.70%",
  },
  {
    price: "142,790,000",
    amount: "0.256",
    depth: 0.5,
    changePercent: "-0.77%",
  },
  {
    price: "142,770,000",
    amount: "0.088",
    depth: 0.17,
    changePercent: "-0.91%",
  },
  {
    price: "142,750,000",
    amount: "0.367",
    depth: 0.72,
    changePercent: "-1.05%",
  },
  {
    price: "142,730,000",
    amount: "0.145",
    depth: 0.29,
    changePercent: "-1.19%",
  },
  {
    price: "142,710,000",
    amount: "0.219",
    depth: 0.43,
    changePercent: "-1.33%",
  },
];

// "Key use cases" 6카드 기능 그리드 (흰 배경, 좌측정렬). Ref:
// ref/exchange/section2.png(사용자 스케치) "Key use cases" 블록 — 작은 사각
// 마커+eyebrow, 좌측정렬 대형 타이틀(설명 문단 없음), 그 아래 6카드 그리드.
// 콘텐츠는 INEX 크립토 트레이딩 인프라 전체 역량 스펙트럼(차트/SDK/API는
// CapabilitiesSection과 겹치지 않게 한 줄 요약만, 나머지는 유동성·리스크·
// 커스터디 연계 등 그 섹션에 없는 항목)으로 구성.
export const cryptoTradingFeatureGridContent = {
  eyebrow: "KEY USE CASES",
  title: "필요한 모든 것을,\n이미 갖춘 인프라로",
};

export type CryptoTradingFeatureGridIconKey =
  | "chart"
  | "sdk"
  | "orderbook"
  | "liquidity"
  | "custody"
  | "uptime";

export interface CryptoTradingFeatureGridItem {
  iconKey: CryptoTradingFeatureGridIconKey;
  title: string;
  description: string;
}

export const cryptoTradingFeatureGridItems: CryptoTradingFeatureGridItem[] = [
  {
    iconKey: "chart",
    title: "임베디드 차트",
    description:
      "실시간 캔들·지표 차트를 iframe/SDK로 서비스 화면에 그대로 삽입.",
  },
  {
    iconKey: "sdk",
    title: "SDK 제공",
    description: "웹·앱 어디서든 주문·잔고·체결 알림을 몇 줄의 코드로 연동.",
  },
  {
    iconKey: "orderbook",
    title: "거래 · 오더북 API",
    description: "WebSocket 기반 실시간 호가·체결 데이터와 주문 API 제공.",
  },
  {
    iconKey: "liquidity",
    title: "통합 유동성",
    description:
      // TODO(real-data): 연동 거래소·마켓메이커 실제 목록/규모 확정 후 교체 필요.
      "자체 매칭 엔진과 외부 유동성을 함께 묶어 안정적인 체결 환경을 제공.",
  },
  {
    iconKey: "custody",
    title: "커스터디 연계",
    description:
      "핫·콜드 지갑 분리 보관 체계와 연동해 입출금 전 구간을 함께 운영.",
  },
  {
    iconKey: "uptime",
    title: "24/7 운영 대응",
    description:
      "실서비스 트래픽을 상시 모니터링하는 운영팀이 장애 대응까지 지원.",
  },
];

// "How it works" 블록 — 연한 회색 박스 안에 좌측 4단 순서형 리스트 + 우측
// 폰 목업. Ref: ref/exchange/section2.png "How it works" 섹션(사용자 스케치).
export const cryptoTradingHowItWorksContent = {
  eyebrow: "HOW IT WORKS",
  title: "주문부터 체결까지,\n하나의 화면에서",
};

export interface CryptoTradingHowItWorksStep {
  title: string;
  description: string;
}

export const cryptoTradingHowItWorksSteps: CryptoTradingHowItWorksStep[] = [
  {
    title: "실시간 시세 확인",
    description:
      "임베디드 차트와 시세 화면으로 캔들·지표를 실시간으로 확인합니다.",
  },
  {
    title: "호가 · 오더북 조회",
    description:
      "매수·매도 호가창을 실시간으로 조회하고 체결 강도를 파악합니다.",
  },
  {
    title: "주문 및 체결",
    description:
      "지정가·시장가 주문을 API로 전달하면 매칭 엔진이 즉시 체결합니다.",
  },
  {
    title: "잔고 · 내역 관리",
    description:
      "체결 내역과 잔고를 API로 조회해 파트너 서비스 화면에 반영합니다.",
  },
];

// 실제 INEX 모바일 앱 스크린샷 3종 조합 목업. 배경 투명(PNG) — 연한 회색
// 박스 위에 자연스럽게 얹는다. company-homepage 프로젝트의
// public/images/solutions/trading_2.png를 그대로 가져옴(실사용 앱 화면,
// 플레이스홀더 아님).
export const cryptoTradingHowItWorksImage = {
  src: "/images/solutions/trading-app-mockup.png",
  alt: "INEX 모바일 앱 주문·호가·차트 화면",
};

// 마무리 CTA (다크). Ref: INEX Home Wireframe.dc.html ~L290-302 ("INEX와 함께
// 시작하십시오" 다크 CTA)와 동일한 톤을 이 페이지 전용 문구로 재구성.
export const cryptoTradingCtaContent = {
  eyebrow: "GET STARTED",
  title: "크립토 트레이딩 인프라,\n지금 바로 연동하세요",
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
};
