/**
 * Icon key for `IconFeatureCard` items below — maps to a lucide-react glyph
 * in the widget (JSX can't live in this model file; same pattern as
 * `OperationsFeatureIconKey` in `operations-split-content.ts`).
 */
export type TrustGridIconKey = "chart" | "orderbook" | "ramp"

/**
 * Ramp flow node icon key — maps to a lucide-react glyph in the widget
 * (JSX can't live in this model file; same reasoning as `TrustGridIconKey`).
 */
export type TrustGridRampNodeIconKey = "fiat" | "wallet" | "stablecoin"

export interface TrustGridCard {
  iconKey: TrustGridIconKey
  title: string
  description: string
}

// Ref: ref/exchange/Solutions.dc.html ~L111-131 (연동 위젯/API 카드), ~L136-141
// (스테이블코인 결제 온·오프램프). 사용자 요청(2026-09-10)에 따라 기존
// "규제 준수/Trust" 주제를 폐기하고 INEX가 B2B로 제공하는 연동 가능 영역
// 소개로 교체.
export const trustGridContent = {
  eyebrow: "B2B",
  heading: "INEX의 인프라를 그대로 연동하세요",
}

export const trustGridCards: TrustGridCard[] = [
  {
    iconKey: "chart",
    title: "임베디드 차트",
    description:
      "캔들·라인·지표를 지원하는 차트를 iframe 또는 SDK로 파트너 서비스에 그대로 연동할 수 있습니다.",
  },
  {
    iconKey: "orderbook",
    title: "오더북 & 마켓 데이터 API",
    // TODO(real-data): "밀리초 단위 지연"은 ref/exchange/Solutions.dc.html의
    // 참고 문구를 그대로 가져온 것으로, 실제 서비스 지연 시간 스펙 확정 후 검증 필요.
    description:
      "WebSocket 기반 실시간 호가·체결 데이터를 밀리초 단위 지연으로 제공합니다.",
  },
  {
    iconKey: "ramp",
    // TODO(real-data): 온/오프램프 결제 인프라의 T+0 정산 등 구체적 스펙은
    // ref/exchange/Solutions.dc.html의 일반적인 소개 문구를 다듬은 것으로,
    // 실제 상품 스펙 확정 후 검증 필요.
    title: "온/오프램프 결제 인프라",
    description:
      "가상 지갑 기반의 온·오프램프와 Web3 결제를 T+0으로 정산하는 인프라를 API로 연동합니다.",
  },
]

// TODO(real-data): placeholder candle shapes only — no real price series.
// Pattern/scale follows `TradingTerminalCard`'s `DEFAULT_CANDLES`, trimmed to
// a shorter series for this compact preview.
export const trustGridChartCandles = [
  { wickTop: 30, wickBottom: 60, bodyTop: 36, bodyBottom: 52, bullish: false },
  { wickTop: 20, wickBottom: 50, bodyTop: 26, bodyBottom: 40, bullish: true },
  { wickTop: 10, wickBottom: 38, bodyTop: 14, bodyBottom: 28, bullish: true },
  { wickTop: 16, wickBottom: 44, bodyTop: 20, bodyBottom: 34, bullish: false },
  { wickTop: 6, wickBottom: 30, bodyTop: 10, bodyBottom: 20, bullish: true },
  { wickTop: 12, wickBottom: 36, bodyTop: 16, bodyBottom: 26, bullish: true },
]

export const trustGridChartSymbol = "BTC/KRW"
export const trustGridChartPrice = "142,850,000"

// TODO(real-data): placeholder order book rows — no live data.
export const trustGridOrderbookAsks = [
  { price: "142,910,000", amount: "0.184" },
  { price: "142,890,000", amount: "0.412" },
]

export const trustGridOrderbookBids = [
  { price: "142,840,000", amount: "0.331" },
  { price: "142,820,000", amount: "0.508" },
]

export interface TrustGridRampNode {
  iconKey: TrustGridRampNodeIconKey
  label: string
}

// TODO(real-data): 온/오프램프 흐름 단계 라벨은 일반적인 온램프 개념도로,
// 실제 상품 플로우 확정 후 검증 필요.
export const trustGridRampNodes: TrustGridRampNode[] = [
  { iconKey: "fiat", label: "법정화폐" },
  { iconKey: "wallet", label: "가상 지갑" },
  { iconKey: "stablecoin", label: "스테이블코인" },
]
