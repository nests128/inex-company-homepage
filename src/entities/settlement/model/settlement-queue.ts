import type { SettlementQueueRow } from "../ui/settlement-queue-table"

// TODO(real-data): 금액/정산일은 참고용 예시이며 실제 정산 데이터 확정 후 교체 필요.

export const settlementQueueContent = {
  title: "정산 대기열",
  liveLabel: "LIVE",
  columnLabels: {
    item: "항목",
    amount: "금액",
    date: "정산일",
  },
}

export const settlementQueueRows: SettlementQueueRow[] = [
  { id: "row-1", name: "수납 정산", amount: "₩4,580,000", date: "06.10" },
  { id: "row-2", name: "출금 정산", amount: "₩6,630,000", date: "05.08" },
  { id: "row-3", name: "가맹점 정산", amount: "₩2,304,000", date: "05.04" },
  { id: "row-4", name: "크로스보더 송금", amount: "₩1,980,000", date: "04.25" },
  { id: "row-5", name: "환전 정산", amount: "₩1,025,000", date: "03.13" },
]
