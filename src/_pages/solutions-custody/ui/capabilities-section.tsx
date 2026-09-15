// Page-local section: "핵심 역량" 블록. 이전엔 텍스트만 있는 2x2 정적
// 그리드였으나, 사용자 요청으로 Fireblocks류 커스터디 콘솔 화면을 참고한
// 3카드 그리드로 재구성했다(레퍼런스: ref/custody/image.png의 3카드 패턴 —
// 회색 배경 박스 안에 미니 제품 UI + 아래 소제목/설명). 콘솔은 이미지가
// 아니라 `capability-consoles.tsx`에 실제 코드로 구현한 컴포넌트.
import { cn } from "cn";

import { Reveal } from "@/shared/ui";
import { type CustodyCapabilityConsoleKey } from "@/entities/company";
import { getCustodyContent } from "@/entities/company/server";

import { ApprovalConsole, AssetsConsole, PolicyConsole } from "./capability-consoles";

function CapabilityConsole({ consoleKey }: { consoleKey: CustodyCapabilityConsoleKey }) {
  switch (consoleKey) {
    case "policy":
      return <PolicyConsole />;
    case "approval":
      return <ApprovalConsole />;
    case "assets":
      return <AssetsConsole />;
  }
}

export async function CapabilitiesSection() {
  const custodyContent = await getCustodyContent();

  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {custodyContent.capabilitiesContent.eyebrow}
          </div>
          <h2 className="max-w-2xl text-2xl leading-[1.2] tracking-[-.015em] whitespace-pre-line lg:text-[37px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {custodyContent.capabilitiesContent.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {custodyContent.capabilities.map((item, index) => (
            <Reveal as="div" delay={index * 0.08} key={item.title}>
              <div
                className={cn(
                  "flex h-[240px] overflow-hidden rounded-2xl bg-muted lg:h-[280px]",
                  // 카드 1(모니터링 콘솔)은 크립토 트레이딩 히어로 이미지처럼
                  // 우측·하단에 꽉 붙여 배치한다(사용자 요청, 2026-09-14:
                  // "크립토 트레이딩 히어로 이미지처럼 우측하단에 쏠리게") —
                  // 좌측·상단에만 여백을 두고 콘솔이 카드 밖으로 자연스럽게
                  // 걸치도록 우측 패딩은 없앤다. 카드 2(다중 서명, 키 셰어
                  // 결합 다이어그램)·3(자산 분포)은 완결된 다이어그램이라
                  // 수직/수평 중앙정렬 유지.
                  item.consoleKey === "policy"
                    ? "items-end justify-end pt-10 pl-4 lg:pt-14 lg:pl-6"
                    : "items-center justify-center px-4",
                )}
              >
                <CapabilityConsole consoleKey={item.consoleKey} />
              </div>
              <h3 className="mt-5 text-[16px] font-bold text-foreground lg:text-[17px]">
                {item.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-muted-foreground">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
