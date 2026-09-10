import type { SettlementStatusBar } from "../ui/settlement-status-card"

// TODO(real-data): 항목명/퍼센트/요약 금액은 와이어프레임 플레이스홀더(hint-placeholder-count=3).
// 실제 당일 정산 현황 데이터 확정 후 교체 필요.

export const settlementStatusContent = {
  title: "당일 정산 현황",
  summary: "₩100억 중 ₩82억 정산 완료",
  cta: {
    label: "정산 관리 →",
    href: "#",
  },
}

export const settlementStatusBars: SettlementStatusBar[] = [
  { id: "deposit", label: "수납 정산", pct: 92 },
  { id: "withdrawal", label: "출금 정산", pct: 78 },
  { id: "cross-border", label: "크로스보더 송금", pct: 65 },
]
