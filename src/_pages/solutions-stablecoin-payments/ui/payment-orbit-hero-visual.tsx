// Page-local hero visual: Magic UI의 OrbitingCircles 패턴
// (https://magicui.design/docs/components/orbiting-circles, 사용자 명시적
// 요청) — 중앙에 INEX 로고 배지, 그 주위로 지원 체인·자산 아이콘이 두 겹의
// 점선 궤도(원본의 `path` 기본값)를 도는 형태. 실제 스테이블코인 로고는
// CDN에 USDT만 있고 USDC/DAI 등은 없어(403 확인, 2026-09-14) 대신 이미
// 실서비스 CDN에서 검증된 `stablecoinChainIcons`(10종 체인/자산 아이콘)를
// 궤도에 사용한다 — "멀티체인 결제"라는 페이지 메시지와도 부합한다.
// 처음에는 중앙에 `GlobeVisual`(world 지구본)을 뒀으나, Magic UI 원본은
// 궤도선이 뚜렷하고 중앙이 단순한 구조라 사용자 요청(2026-09-14)에 따라
// globe를 빼고 로고 배지로 단순화했다.
import { InexLogoMark, OrbitingCircles } from "@/shared/ui";
import { stablecoinChainIcons } from "@/entities/company";
import { cn } from "cn";

const INNER_ICONS = stablecoinChainIcons.slice(0, 4);
const OUTER_ICONS = stablecoinChainIcons.slice(4, 10);

function ChainIconBadge({ symbol, src }: { symbol: string; src: string }) {
  return (
    <span className="flex size-full items-center justify-center rounded-full border border-border bg-background shadow-[0_1px_4px_rgba(0,0,0,.08)]">
      {/* eslint-disable-next-line @next/next/no-img-element -- external CDN icon, see entities/company/model/integrations-content.ts for why next/image's remotePatterns proxy can't serve it. */}
      <img src={src} alt={symbol} className="size-[60%] object-contain" />
    </span>
  );
}

export function PaymentOrbitHeroVisual({ className }: { className?: string }) {
  return (
    // `OrbitingCircles`는 정원 궤도를 가정하므로 컨테이너가 반드시 정사각형
    // (`aspect-square`)이어야 한다 — 부모가 `aspect-[2/1]` 히어로 박스라
    // 단순히 `size-[N%]`만 주면 가로가 세로보다 넓은 직사각형이 되어 궤도가
    // 타원으로 찌그러진다. `w-fit`으로 두고 `className`이 명시적 높이(예:
    // `h-full`)를 주면 `aspect-square`가 그 높이로부터 폭을 계산해 정사각형을
    // 만든다.
    //
    // 반경/아이콘 크기는 이 정사각형 컨테이너의 실측 높이(데스크톱 기준 약
    // 300px, `solution-hero.tsx`의 `aspect-[2/1]` 참고)에 맞춰 계산한 값 —
    // 바깥 궤도의 가장 바깥 지점(radius + iconSize/2)이 컨테이너 절반 높이
    // (150px)를 넘으면 `overflow-hidden`에 잘린다(사용자 지적, 2026-09-14:
    // "이미지가 잘리고 있어"). 120/70 -> "너무 줄였다"로 126/76 -> "좀만 더
    // 크게"로 이 값까지 키움 — outer: 128 + 44/2 = 150 (한계값 그대로).
    <div className={cn("relative mx-auto aspect-square w-fit", className)}>
      <span className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full border border-border bg-background shadow-[0_1px_6px_rgba(0,0,0,.08)]">
        <InexLogoMark width={38} height={16} />
      </span>
      <OrbitingCircles radius={80} duration={22} iconSize={36}>
        {INNER_ICONS.map((coin) => (
          <ChainIconBadge key={coin.symbol} symbol={coin.symbol} src={coin.src} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles radius={128} duration={32} reverse iconSize={44}>
        {OUTER_ICONS.map((coin) => (
          <ChainIconBadge key={coin.symbol} symbol={coin.symbol} src={coin.src} />
        ))}
      </OrbitingCircles>
    </div>
  );
}
