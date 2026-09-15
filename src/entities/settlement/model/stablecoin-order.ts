import type { Locale } from "@/shared/lib/i18n"

// TODO(real-data): 아래 TXID/수량/상태는 실제 온체인 트랜잭션이 아닌 더미 예시.
// 실제 연동 데이터 확정 후 교체 필요.

interface StablecoinOrderContent {
  title: string
  columnLabels: { txid: string; amount: string; status: string }
  rows: Array<{
    txid: string
    amount: string
    status: "completed" | "pending"
    statusLabel: string
  }>
}

export const stablecoinOrderContentByLocale: Record<Locale, StablecoinOrderContent> = {
  ko: {
    title: "스테이블코인 결제",
    columnLabels: { txid: "TXID", amount: "수량", status: "상태" },
    rows: [
      {
        txid: "0x7f3a9d2c8e1b4f6a5d3c2b1a9f8e7d6c9c2e",
        amount: "1,250 USDT",
        status: "completed",
        statusLabel: "완료",
      },
      {
        txid: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
        amount: "800 USDC",
        status: "pending",
        statusLabel: "대기",
      },
      {
        txid: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a",
        amount: "3,000 USDT",
        status: "completed",
        statusLabel: "완료",
      },
    ],
  },
  en: {
    title: "Stablecoin Payments",
    columnLabels: { txid: "TXID", amount: "Amount", status: "Status" },
    rows: [
      {
        txid: "0x7f3a9d2c8e1b4f6a5d3c2b1a9f8e7d6c9c2e",
        amount: "1,250 USDT",
        status: "completed",
        statusLabel: "Completed",
      },
      {
        txid: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
        amount: "800 USDC",
        status: "pending",
        statusLabel: "Pending",
      },
      {
        txid: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a",
        amount: "3,000 USDT",
        status: "completed",
        statusLabel: "Completed",
      },
    ],
  },
}
