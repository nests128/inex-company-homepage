import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

import { Badge } from "./badge"

export interface StablecoinOrderRow {
  /** Full transaction hash. The component truncates this for display (see `truncateTxid`). */
  txid: string
  /** Formatted coin + amount, e.g. "1,250 USDT". */
  amount: string
  /** Drives the status badge tone. */
  status: "pending" | "completed"
  /** Visible status text, e.g. "대기" / "완료". Kept separate from `status` so copy stays a page-agent concern. */
  statusLabel: string
}

export interface StablecoinOrderCardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Card title, e.g. "스테이블코인 결제". */
  title: string
  /** Column header labels for the 3-column list. */
  columnLabels: {
    txid: string
    amount: string
    status: string
  }
  rows: StablecoinOrderRow[]
  className?: string
}

/** Leading characters kept when truncating a txid, e.g. "0x7f3a". */
const TXID_HEAD_CHARS = 6
/** Trailing characters kept when truncating a txid, e.g. "9c2e". */
const TXID_TAIL_CHARS = 4

/** Truncates a full txid to `head...tail`. Strings too short to usefully shorten are returned verbatim. */
function truncateTxid(txid: string) {
  if (txid.length <= TXID_HEAD_CHARS + TXID_TAIL_CHARS + 3) return txid
  return `${txid.slice(0, TXID_HEAD_CHARS)}...${txid.slice(-TXID_TAIL_CHARS)}`
}

/**
 * White "stablecoin order queue" receipt card — same shell convention as
 * `BalanceBarChartCard`/`TradingTerminalCard` (the other two visuals that
 * swap into `operations-split`'s `GradientBackdrop` slot at `w-[74%]`), but
 * styled as a vertical paper receipt rather than a table: each transaction
 * is a stacked label/value block (TXID / amount / status, one per line)
 * separated from the next by a dashed rule, mimicking a printed receipt's
 * line items instead of a spreadsheet-style row. A server component — no
 * interactivity needed for a static receipt list.
 *
 * Txids are truncated (`head...tail`) by this component, not the caller —
 * pass the full hash string.
 */
function StablecoinOrderCard({
  title,
  columnLabels,
  rows,
  className,
  ...props
}: StablecoinOrderCardProps) {
  return (
    <div
      data-slot="stablecoin-order-card"
      className={cn(
        "w-full max-w-[394px] rounded-2xl border border-border bg-white px-6 pt-6 pb-6 shadow-[0_1px_3px_rgba(0,0,0,.06)]",
        className
      )}
      {...props}
    >
      <div className="mb-1 text-center text-lg font-bold">{title}</div>
      <div
        aria-hidden="true"
        className="mx-auto mb-4 h-0 w-full border-t-2 border-dashed border-border"
      />

      <div className="flex flex-col">
        {rows.map((row, index) => (
          <div
            key={row.txid}
            className={cn(
              "flex flex-col gap-1.5 py-3",
              index > 0 && "border-t border-dashed border-border"
            )}
          >
            <div className="flex items-baseline justify-between text-[12px]">
              <span className="text-muted-foreground">{columnLabels.txid}</span>
              <span className="font-mono text-foreground">{truncateTxid(row.txid)}</span>
            </div>
            <div className="flex items-baseline justify-between text-[13px]">
              <span className="text-muted-foreground">{columnLabels.amount}</span>
              <span className="font-semibold tabular-nums">{row.amount}</span>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-muted-foreground">{columnLabels.status}</span>
              <Badge
                variant="secondary"
                size="lg"
                className={cn(
                  "px-2.5 py-1 text-[11.5px] font-medium",
                  row.status === "completed" && "bg-sky-500/12 text-sky-600"
                )}
              >
                {row.statusLabel}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { StablecoinOrderCard }
