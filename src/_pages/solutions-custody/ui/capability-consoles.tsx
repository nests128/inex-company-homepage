// "핵심 역량" 3카드에 들어가는 미니 콘솔 UI들. 실제 이미지가 아니라
// Fireblocks/BitGo류 커스터디 콘솔 화면을 축약해 코드로 구현한 컴포넌트.
// 카드 박스(`h-[240px] lg:h-[280px]`, overflow-hidden)보다 콘솔 폭을 살짝
// 넓게 잡아(`w-[110%]` 등) 레퍼런스처럼 제품 화면이 카드 밖으로 자연스럽게
// 걸치도록 한다 — 딱 맞춘 미니어처보다 실제 제품 캡처처럼 보이는 효과.
//
// 세 컴포넌트 모두 서버 컴포넌트이며, 로케일별 라벨/데이터는
// `custody-content.ts`(`getCustodyContent()`)에서 가져온다.
import { ActivityIcon, KeyIcon, LockIcon } from "lucide-react";
import { cn } from "cn";

import { getCustodyContent } from "@/entities/company/server";

import { MonitorAnimatedList } from "./monitor-animated-list";

// 카드 1: 모니터링 — 입출금·서명·이상 징후를 실시간으로 추적하는 활동 로그.
// 이벤트 순환 애니메이션은 클라이언트 상태가 필요해 `monitor-animated-list.tsx`로
// 분리했고, 이 컴포넌트 자체는 서버 컴포넌트로 유지한다.
export async function PolicyConsole() {
  const custodyContent = await getCustodyContent();

  return (
    <div className="w-[112%] max-w-none bg-background p-4 shadow-[0_4px_16px_rgba(0,0,0,.10)] lg:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ActivityIcon aria-hidden="true" className="size-3.5 text-sky-500" />
          <p className="text-[12px] font-bold text-foreground lg:text-[13px]">{custodyContent.monitorConsoleLabel}</p>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-sky-500" />
          Live
        </span>
      </div>

      <MonitorAnimatedList events={custodyContent.monitorEvents} />
    </div>
  );
}

// 카드 2: 다중 서명 · 승인 — "승인자 리스트 + 체크" 콘솔 UI는 MPC/멀티시그의
// 핵심 개념(키가 여러 조각으로 분산되고, 그 조각들이 모여야 서명이
// 완성된다는 것)을 직접 보여주지 못한다는 사용자 지적(2026-09-14: "콘솔형
// 말고 MPC, 멀티시그 표현하는 다른 방법 없나")에 따라, 분산된 키 셰어 3개가
// 중앙 임계값 노드로 모여 하나의 서명 결과가 되는 추상 다이어그램으로 교체.
// 흰 카드 틀은 한 차례 제거했다가("흰색 카드도 제거해볼래?") 다른 두
// 카드와 톤이 맞지 않아 바로 복원("다시 넣어줘") — 정책/자산 카드와 동일한
// 흰 배경 카드 안에 다이어그램을 담는다. 각 키 셰어 육각형 안에는 열쇠
// 아이콘을 넣어 "분산된 키 조각"이라는 의미를 더 분명히 한다.
export async function ApprovalConsole() {
  const { keyShareTitle, keyShares, keyShareResultLabel } = await getCustodyContent();

  return (
    <div className="w-[88%] max-w-none bg-background p-4 shadow-[0_4px_16px_rgba(0,0,0,.10)] lg:p-5">
      <p className="text-[12px] font-bold text-foreground lg:text-[13px]">{keyShareTitle}</p>

      <svg viewBox="0 0 220 98" className="mt-4 w-full lg:mt-6">
        {keyShares.map((share, i) => {
          const x = 30 + i * 80;
          const combined = share.combined;
          return (
            <line
              key={`line-${share.label}`}
              x1={x}
              y1={23}
              x2={110}
              y2={73}
              strokeWidth={2}
              className={combined ? "stroke-sky-400 animate-key-share-dash" : "stroke-border"}
              strokeDasharray={combined ? "2 2" : "3 4"}
            />
          );
        })}

        {keyShares.map((share, i) => {
          const x = 30 + i * 80;
          return (
            <g key={share.label}>
              <polygon
                points={hexagonPoints(x, 16, 12)}
                strokeWidth={1.5}
                className={cn(
                  share.combined ? "fill-sky-50 stroke-sky-400" : "fill-muted stroke-border",
                )}
              />
              <KeyIcon
                x={x - 5}
                y={11}
                width={10}
                height={10}
                strokeWidth={2}
                className={share.combined ? "text-sky-500" : "text-muted-foreground"}
              />
            </g>
          );
        })}

        <circle cx={110} cy={73} r={16} className="fill-sky-500" />
        <text x={110} y={77} textAnchor="middle" className="fill-white text-[10px] font-bold">
          {keyShareResultLabel}
        </text>
      </svg>
    </div>
  );
}

function hexagonPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

// 카드 3: 지갑 분리 관리 — 핫/콜드 비중 도넛 차트 + 잔고 요약.
export async function AssetsConsole() {
  const { assetSplits, assetsConsoleLabel } = await getCustodyContent();
  const coldRatio = assetSplits[0].ratio;
  const circumference = 2 * Math.PI * 26;
  const coldDash = circumference * coldRatio;

  return (
    <div className="w-[88%] max-w-none bg-background p-4 shadow-[0_4px_16px_rgba(0,0,0,.10)] lg:p-5">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-bold text-foreground lg:text-[13px]">{assetsConsoleLabel}</p>
        <LockIcon aria-hidden="true" className="size-3.5 text-muted-foreground" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-5 lg:mt-6 lg:gap-6">
        <svg viewBox="0 0 64 64" className="size-20 shrink-0 lg:size-24">
          <circle cx="32" cy="32" r="26" fill="none" strokeWidth="9" className="stroke-sky-100" />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            strokeWidth="9"
            strokeLinecap="round"
            className="stroke-sky-500 -rotate-90 origin-center"
            strokeDasharray={`${coldDash} ${circumference}`}
          />
          <text
            x="32"
            y="36"
            textAnchor="middle"
            className="fill-foreground text-[14px] font-bold"
          >
            {Math.round(coldRatio * 100)}%
          </text>
        </svg>

        <div className="flex flex-col gap-2.5">
          {assetSplits.map((split) => (
            <div key={split.label} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={cn("size-2 shrink-0 rounded-full bg-current", split.colorClassName)}
              />
              <span className="text-[11px] whitespace-nowrap text-muted-foreground lg:text-[11.5px]">
                {split.label}
              </span>
              <span className="text-[11px] font-bold whitespace-nowrap text-foreground lg:text-[11.5px]">
                {Math.round(split.ratio * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
