import type { FlowDiagramNode } from "@/shared/ui"
import type { Locale } from "@/shared/lib/i18n"

interface AccountHighlightContent {
  heading: string
  description: string
}

interface AccountHighlightFlow {
  ariaLabel: string
  nodes: readonly [
    FlowDiagramNode,
    FlowDiagramNode,
    FlowDiagramNode,
    FlowDiagramNode,
    FlowDiagramNode,
    FlowDiagramNode,
  ]
}

export const accountHighlightContentByLocale: Record<Locale, AccountHighlightContent> = {
  ko: {
    heading: "다가오는 디지털자산 시장에 맞춰,\n온/오프램프 전 구간을 하나의 레일로 준비합니다",
    description:
      "고객·가맹점의 결제 수납부터 온체인 전송, 오프램프 지급과 정산까지 - 전 구간을 하나의 계정 구조로 연결하는 인프라를, 시장과 규제가 원하는 방향에 맞춰 단계적으로 갖춰가고 있습니다.",
  },
  en: {
    heading: "In step with the coming digital asset market,\nwe're preparing the full on/off-ramp flow on a single rail",
    description:
      "From customer/merchant payment collection to on-chain transfer, off-ramp payout, and settlement, we're progressively building infrastructure that connects the entire flow into a single account structure, in step with market and regulatory direction.",
  },
}

export const accountHighlightFlowByLocale: Record<Locale, AccountHighlightFlow> = {
  ko: {
    ariaLabel: "고객·가맹점의 결제가 온램프, 결제 수납, 온체인 전송, 오프램프, 정산을 거치는 6단계 흐름",
    nodes: [
      { step: "STEP 01", title: "고객 · 가맹점" },
      { step: "STEP 02", title: "온램프" },
      { step: "STEP 03", title: "결제", accent: true },
      { step: "STEP 04", title: "온체인 전송", accent: true },
      { step: "STEP 05", title: "오프램프 · 지급" },
      { step: "STEP 06", title: "정산" },
    ] as const,
  },
  en: {
    ariaLabel:
      "A 6-step flow of a customer/merchant payment through on-ramp, payment collection, on-chain transfer, off-ramp, and settlement",
    nodes: [
      { step: "STEP 01", title: "Customer · Merchant" },
      { step: "STEP 02", title: "On-ramp" },
      { step: "STEP 03", title: "Payment", accent: true },
      { step: "STEP 04", title: "On-chain Transfer", accent: true },
      { step: "STEP 05", title: "Off-ramp · Payout" },
      { step: "STEP 06", title: "Settlement" },
    ] as const,
  },
}
