// 커스터디 히어로 비주얼 — 사용자 요청(2026-09-14: "보안? 보관? 느낌 나는게
// 좋을거 같은데")에 따라 다중 승인 카드 목업(CustodyApprovalHeroVisual,
// 현재는 미사용)에서 "금고(Vault) 도어 + 다이얼 링 + 잠금 상태" 비주얼로
// 교체. 실제 제품 스크린샷이 없어(다른 두 솔루션 페이지와 달리 아직
// 커스터디 UI가 없음) 은유적 비주얼로 대체 — 원형 다이얼 눈금 링 중앙에
// 잠금 아이콘을 배치한다. 보안 상태 배지("다중 서명"/"콜드 보관")는
// 사용자 요청으로 제거(2026-09-14: "다중 서명, 콜드 보관 은 제거하자").
// BorderBeam(테두리를 도는 빛)은 처음엔 안쪽 금고문 원에 달았다가, 사용자
// 요청으로 바깥쪽 다이얼 링 원으로 이동(2026-09-14: "빔 안쪽 말고
// 바깥쪽 원에다 해보자") — 다이얼 눈금 전체를 감싸며 돌아 더 크게 보인다.
// ("우측하단에 쏠리게" 요청은 이 히어로가 아니라 핵심 역량 섹션의 모니터링
// 콘솔을 가리킨 것이었다 — 착오로 여기 적용했다가 되돌림, 2026-09-14.)
import { LockIcon } from "lucide-react";
import { cn } from "cn";

import { BorderBeam } from "@/shared/ui";

const DIAL_TICK_COUNT = 36;

export interface CustodyVaultHeroVisualProps {
  className?: string;
}

export function CustodyVaultHeroVisual({ className }: CustodyVaultHeroVisualProps) {
  return (
    <div className={cn("relative flex h-full w-full items-center justify-center", className)}>
      {/* 다이얼 눈금 링 — 고정 각도로 배치된 36개의 짧은 선분. 순수 CSS
          transform이라 컨테이너 크기(모바일 4/3, 데스크톱 2/1)에 맞춰
          `size-*` 유틸 하나만 바꾸면 함께 스케일된다. */}
      <div className="relative flex size-[220px] items-center justify-center lg:size-[280px]">
        <div className="absolute inset-0 rounded-full border border-border/70" aria-hidden="true" />
        <BorderBeam shape="circle" size={70} duration={7} borderWidth={2} />
        {Array.from({ length: DIAL_TICK_COUNT }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 left-1/2 w-px origin-top bg-border",
              i % 3 === 0 ? "h-2.5 bg-foreground/25" : "h-1.5",
            )}
            style={{ transform: `rotate(${(360 / DIAL_TICK_COUNT) * i}deg)` }}
          />
        ))}

        {/* 금고문 본체 */}
        <div className="relative flex size-[150px] items-center justify-center rounded-full border-[6px] border-foreground/10 bg-background shadow-[0_8px_24px_rgba(0,0,0,.08)] lg:size-[190px]">
          <div className="flex size-[104px] items-center justify-center rounded-full bg-muted lg:size-[132px]">
            <span
              aria-hidden="true"
              className="flex size-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-[0_4px_14px_rgba(14,165,233,.35)] lg:size-14"
            >
              <LockIcon aria-hidden="true" className="size-6 lg:size-7" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
