export const accountHighlightContent = {
  heading: "온/오프램프 전 구간을\n하나의 레일로 연결합니다",
  description:
    "고객·가맹점의 결제 수납부터 온체인 전송, 오프램프 지급과 정산까지 전 구간을 하나의 계정 구조 위에서 추적·정산합니다.",
}

export const accountHighlightFlow = {
  ariaLabel: "고객·가맹점의 결제가 온램프, 결제 수납, 온체인 전송, 오프램프, 정산을 거치는 6단계 흐름",
  nodes: [
    { step: "STEP 01", title: "고객 · 가맹점" },
    { step: "STEP 02", title: "온램프" },
    { step: "STEP 03", title: "결제", accent: true },
    { step: "STEP 04", title: "온체인 전송", accent: true },
    { step: "STEP 05", title: "오프램프 · 지급" },
    { step: "STEP 06", title: "정산" },
  ],
} as const

