import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "cn"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

export interface SettlementQueueRow {
  id: string
  /** Item/party name, e.g. "수납 정산". */
  name: string
  /** Formatted amount, e.g. "₩4,580,000". Formatting is the caller's concern. */
  amount: string
  /** Formatted settlement date, e.g. "06.10". */
  date: string
  /** Leading icon/glyph slot for the 26px avatar circle. Falls back to a plain filled circle. */
  avatar?: ReactNode
}

export interface SettlementQueueTableProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Card title, e.g. "정산 대기열". */
  title: string
  /** "LIVE" indicator label. Omit to hide the indicator. */
  liveLabel?: string
  /** Column header labels, e.g. { item: "항목", amount: "금액", date: "정산일" }. */
  columnLabels: {
    item: string
    amount: string
    date: string
  }
  rows: SettlementQueueRow[]
}

/**
 * "정산 대기열" live settlement-queue table card (wireframe big-feature
 * section ~L153-167). Uses a semantic `<table>` since the wireframe has real
 * column headers; the date column hides below `sm` to keep the row compact
 * on narrow viewports.
 */
function SettlementQueueTable({
  title,
  liveLabel,
  columnLabels,
  rows,
  className,
  ...props
}: SettlementQueueTableProps) {
  return (
    <div
      data-slot="settlement-queue-table"
      className={cn(
        "rounded-2xl border border-border p-[26px]",
        className
      )}
      {...props}
    >
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-base font-bold">{title}</span>
        {liveLabel ? (
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-foreground motion-safe:animate-pulse"
            />
            {liveLabel}
          </span>
        ) : null}
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-6 p-0" />
            <TableHead className="h-auto px-0 py-2 text-xs font-normal text-muted-foreground">
              {columnLabels.item}
            </TableHead>
            <TableHead className="h-auto px-0 py-2 text-xs font-normal text-muted-foreground">
              {columnLabels.amount}
            </TableHead>
            <TableHead className="hidden h-auto px-0 py-2 text-xs font-normal text-muted-foreground sm:table-cell">
              {columnLabels.date}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className="border-border/60 hover:bg-transparent">
              <TableCell className="w-6 p-0 py-3">
                <span
                  aria-hidden="true"
                  className="block size-4 rounded-[4px] bg-foreground"
                />
              </TableCell>
              <TableCell className="px-0 py-3 text-sm whitespace-normal">
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="size-[26px] shrink-0 overflow-hidden rounded-full bg-[repeating-linear-gradient(45deg,#eee_0_5px,#ddd_5px_10px)]"
                  >
                    {row.avatar}
                  </span>
                  <span className="font-semibold">{row.name}</span>
                </span>
              </TableCell>
              <TableCell className="px-0 py-3 font-sans text-[13px]">
                {row.amount}
              </TableCell>
              <TableCell className="hidden px-0 py-3 text-[13px] text-muted-foreground sm:table-cell">
                {row.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { SettlementQueueTable }
