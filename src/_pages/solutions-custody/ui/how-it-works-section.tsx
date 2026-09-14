// Page-local section: "How it works" 블록. 흰 배경 좌측정렬 헤딩 아래
// 가로형 플로우 다이어그램 — 스테이블코인 결제 페이지와 동일하게 `FlowRail`
// 공용 컴포넌트를 재사용한다. 8노드라 데스크톱에서 rowSize 기본값(5)이면
// 5+3으로 갈라져 균형이 안 맞으므로 4+4로 rowSize={4} 지정.
import { FlowRail, Reveal } from "@/shared/ui";
import { custodyFlow, custodyHowItWorksContent } from "@/entities/company";

/** Small square marker + eyebrow label — same inline pattern used across all solution pages. */
function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
      <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
      {label}
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div">
          <SectionEyebrow label={custodyHowItWorksContent.eyebrow} />
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] whitespace-pre-line lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {custodyHowItWorksContent.title}
          </h2>
        </Reveal>

        <Reveal as="div" delay={0.1} className="mt-10 lg:mt-14">
          <FlowRail ariaLabel={custodyFlow.ariaLabel} nodes={custodyFlow.nodes} rowSize={4} />
        </Reveal>
      </div>
    </section>
  );
}
