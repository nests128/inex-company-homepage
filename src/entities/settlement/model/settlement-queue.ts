import type { SettlementQueueRow } from "../ui/settlement-queue-table"
import type { Locale } from "@/shared/lib/i18n"

// TODO(real-data): 금액/정산일은 참고용 예시이며 실제 정산 데이터 확정 후 교체 필요.

interface SettlementQueueContent {
  title: string
  liveLabel: string
  columnLabels: { item: string; amount: string; date: string }
}

export const settlementQueueContentByLocale: Record<Locale, SettlementQueueContent> = {
  ko: {
    title: "정산 대기열",
    liveLabel: "LIVE",
    columnLabels: { item: "항목", amount: "금액", date: "정산일" },
  },
  en: {
    title: "Settlement Queue",
    liveLabel: "LIVE",
    columnLabels: { item: "Item", amount: "Amount", date: "Date" },
  },
}

// 원화(₩) 표기는 한국어 로케일 전용 — 영어 로케일에서는 실제 정산 레일에서
// 쓰는 스테이블코인 단위(USDT)로 표시해 원화 정산/환산 문구가 노출되지
// 않게 한다.
export const settlementQueueRowsByLocale: Record<Locale, SettlementQueueRow[]> = {
  ko: [
    { id: "row-1", name: "수납 정산", amount: "₩4,580,000", date: "06.10" },
    { id: "row-2", name: "출금 정산", amount: "₩6,630,000", date: "05.08" },
    { id: "row-3", name: "가맹점 정산", amount: "₩2,304,000", date: "05.04" },
    { id: "row-4", name: "크로스보더 송금", amount: "₩1,980,000", date: "04.25" },
    { id: "row-5", name: "환전 정산", amount: "₩1,025,000", date: "03.13" },
  ],
  en: [
    { id: "row-1", name: "Collection Settlement", amount: "3,420 USDT", date: "06.10" },
    { id: "row-2", name: "Withdrawal Settlement", amount: "4,950 USDT", date: "05.08" },
    { id: "row-3", name: "Merchant Settlement", amount: "1,720 USDT", date: "05.04" },
    { id: "row-4", name: "Cross-border Remittance", amount: "1,480 USDT", date: "04.25" },
    { id: "row-5", name: "FX Settlement", amount: "765 USDT", date: "03.13" },
  ],
}
