import { cn } from "cn";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** A single selectable settlement rail row (e.g. "KRCX · Trading"). */
export interface SettlementRailOption {
  id: string;
  /** Rail name, e.g. "KRCX · Trading". Content is caller's concern. */
  label: string;
  /** Short meta tag on the right, e.g. "T+0" or "수납·지급". */
  meta?: string;
  /** Icon/glyph slot for the 30x30 tile. Falls back to a plain filled tile. */
  icon?: ReactNode;
  /** Whether this row is the selected/highlighted rail (ink border). */
  selected?: boolean;
}

export interface SettlementApprover {
  /** e.g. "승인 담당자" */
  roleLabel: string;
  /** e.g. "컴플라이언스 팀" */
  name: string;
  avatar?: ReactNode;
}

export interface SettlementRailCardProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> {
  /** Small eyebrow label, e.g. "RAIL". */
  eyebrow?: string;
  /** Card title, e.g. "정산 레일 선택". */
  title: string;
  rails: SettlementRailOption[];
  /** Trailing "add" affordance label, e.g. "+ 레일 추가". Omit to hide the row. */
  addRailLabel?: string;
  approver?: SettlementApprover;
  /** Primary CTA at the bottom, e.g. "정산 요약으로 계속 →". */
  cta?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

/**
 * Floating "정산 레일 선택" widget card from the hero visual composite
 * (wireframe ~L110-129 desktop / ~L342-350 mobile). All copy and rail data
 * are supplied by the caller — this component only owns layout/styling.
 */
function SettlementRailCard({
  eyebrow,
  title,
  rails,
  addRailLabel,
  approver,
  cta,
  className,
  ...props
}: SettlementRailCardProps) {
  return (
    <div
      data-slot="settlement-rail-card"
      className={cn(
        "rounded-2xl border border-border bg-card p-5 text-left shadow-[0_20px_50px_rgba(0,0,0,0.10)] lg:p-[22px]",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <div className="font-mono text-[10px] tracking-[.1em] text-muted-foreground lg:text-[11px]">
          {eyebrow}
        </div>
      ) : null}
      <div className="mt-1.5 mb-3 text-[15px] font-bold lg:mt-1.5 lg:mb-4 lg:text-[17px]">
        {title}
      </div>

      <div className="flex flex-col gap-2 lg:gap-2.5">
        {rails.map((rail) => (
          <div
            key={rail.id}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 lg:gap-3 lg:px-3.5",
              rail.selected
                ? "border-[1.5px] border-foreground"
                : "border-border",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex size-[26px] shrink-0 items-center justify-center rounded-lg lg:size-[30px] lg:rounded-[8px]",
                rail.selected ? "bg-foreground" : "bg-muted",
              )}
            >
              {rail.icon}
            </span>
            <span className="text-[13.5px] font-semibold lg:text-[14.5px]">
              {rail.label}
            </span>
            {rail.meta ? (
              <span className="ml-auto font-mono text-[10px] text-muted-foreground lg:text-[11px]">
                {rail.meta}
              </span>
            ) : null}
          </div>
        ))}
        {addRailLabel ? (
          <div className="px-1 py-0.5 text-[13px] text-muted-foreground">
            {addRailLabel}
          </div>
        ) : null}
      </div>

      {approver ? (
        <div className="mt-4 flex items-center gap-2.5 border-t border-border pt-4">
          <span
            aria-hidden="true"
            className="size-[34px] shrink-0 rounded-full bg-[repeating-linear-gradient(45deg,#eee_0_6px,#ddd_6px_12px)]"
          >
            {approver.avatar}
          </span>
          <div>
            <div className="text-[11px] text-muted-foreground">
              {approver.roleLabel}
            </div>
            <div className="text-[13.5px] font-semibold">{approver.name}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export { SettlementRailCard };
