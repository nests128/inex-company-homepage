// 커스터디 히어로 비주얼 — 실제 제품 스크린샷이 없어(다른 두 솔루션
// 페이지와 달리 아직 커스터디 UI가 없음) 다중 승인 정책을 그대로 보여주는
// 카드 목업으로 대체. 출금 요청 1건에 필요한 승인자 3명 중 2명이 승인 완료된
// 상태를 정적으로 표현 — 실제 값이 아닌 데모용 구성(TODO(real-data) 대상).
import { CheckIcon, ClockIcon, ShieldCheckIcon } from "lucide-react";
import { cn } from "cn";

interface ApprovalRow {
  name: string;
  role: string;
  status: "approved" | "pending";
}

const APPROVAL_ROWS: ApprovalRow[] = [
  { name: "승인자 A", role: "운영팀", status: "approved" },
  { name: "승인자 B", role: "보안팀", status: "approved" },
  { name: "승인자 C", role: "재무팀", status: "pending" },
];

export interface CustodyApprovalHeroVisualProps {
  className?: string;
}

export function CustodyApprovalHeroVisual({ className }: CustodyApprovalHeroVisualProps) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center p-4 lg:p-10", className)}>
      {/* 컨테이너는 `SolutionHero`의 `visual` 슬롯(aspect-[2/1], overflow-hidden)
          기준 모바일 실측 높이가 약 180px로 좁아, 카드 세로 길이를
          `gap`/패딩을 줄여 그 안에 맞춘다(제목이 잘리던 문제 수정). */}
      <div className="w-full max-w-[360px] rounded-2xl border border-border bg-background p-3.5 shadow-[0_1px_3px_rgba(0,0,0,.06)] lg:p-5">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 lg:size-9"
          >
            <ShieldCheckIcon aria-hidden="true" className="size-4 lg:size-[18px]" />
          </span>
          <div>
            <p className="text-[12px] font-bold text-foreground lg:text-[13.5px]">출금 승인 대기</p>
            <p className="text-[11px] text-muted-foreground lg:text-[12px]">2 / 3 승인 완료</p>
          </div>
        </div>

        <ul className="mt-2.5 flex flex-col gap-1.5 lg:mt-5 lg:gap-2.5">
          {APPROVAL_ROWS.map((row) => (
            <li
              key={row.name}
              className="flex items-center justify-between rounded-xl bg-muted px-3 py-2 lg:px-3.5 lg:py-3"
            >
              <div>
                <p className="text-[12px] font-bold text-foreground lg:text-[13px]">{row.name}</p>
                <p className="text-[10.5px] text-muted-foreground lg:text-[11.5px]">{row.role}</p>
              </div>
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-5 items-center justify-center rounded-full lg:size-6",
                  row.status === "approved"
                    ? "bg-sky-500 text-white"
                    : "bg-background text-muted-foreground",
                )}
              >
                {row.status === "approved" ? (
                  <CheckIcon className="size-3 lg:size-3.5" />
                ) : (
                  <ClockIcon className="size-3 lg:size-3.5" />
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted lg:mt-5">
          <div className="h-full w-2/3 rounded-full bg-sky-500" />
        </div>
      </div>
    </div>
  );
}
