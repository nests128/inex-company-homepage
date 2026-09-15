import type { SettlementStatusBar } from "../ui/settlement-status-card"
import type { Locale } from "@/shared/lib/i18n"

// TODO(real-data): 항목명/퍼센트/요약 금액은 와이어프레임 플레이스홀더(hint-placeholder-count=3).
// 실제 당일 정산 현황 데이터 확정 후 교체 필요.

interface SettlementStatusContent {
  title: string
  summary: string
  cta: { label: string; href: string }
}

export const settlementStatusContentByLocale: Record<Locale, SettlementStatusContent> = {
  ko: {
    title: "당일 정산 현황",
    summary: "₩100억 중 ₩82억 정산 완료",
    cta: { label: "정산 관리 →", href: "#" },
  },
  en: {
    // 원화(₩) 표기는 한국어 전용 — 영어 로케일은 원화 정산 문구를 넣지
    // 않기 위해 스테이블코인 단위(USDT)로 표시.
    title: "Today's Settlement Status",
    summary: "8.2M of 10M USDT settled",
    cta: { label: "Manage Settlement →", href: "#" },
  },
}

export const settlementStatusBarsByLocale: Record<Locale, SettlementStatusBar[]> = {
  ko: [
    { id: "deposit", label: "수납 정산", pct: 92 },
    { id: "withdrawal", label: "출금 정산", pct: 78 },
    { id: "cross-border", label: "크로스보더 송금", pct: 65 },
  ],
  en: [
    { id: "deposit", label: "Collection Settlement", pct: 92 },
    { id: "withdrawal", label: "Withdrawal Settlement", pct: 78 },
    { id: "cross-border", label: "Cross-border Remittance", pct: 65 },
  ],
}
