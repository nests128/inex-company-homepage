// Page-local section: "How it works" 블록. 흰 배경 좌측정렬 헤딩 아래
// 가로형 플로우 다이어그램 — 실제 운영 중인 INEX 플랫폼의 "Payments
// 결제·정산" 레일(https://www.inex.im/platform)을 단일 레일로 재구성한
// 것(사용자 요청, 2026-09-14: "rail 1개로 만들기"). 헤딩 우측에 배치했다가
// ("우측에 레일 두자") 바로 되돌림("다시 밑으로 내려줘") — 헤딩 아래
// 전체 폭 레일이 최종. `FlowRail`은 `shared/ui`로 승격됨(2026-09-14).
import { FlowRail, Reveal } from "@/shared/ui";
import { stablecoinPaymentsFlow, stablecoinPaymentsHowItWorksContent } from "@/entities/company";

/** Small square marker + eyebrow label — same inline pattern as `ProvenSection`. */
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
          <SectionEyebrow label={stablecoinPaymentsHowItWorksContent.eyebrow} />
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] whitespace-pre-line lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {stablecoinPaymentsHowItWorksContent.title}
          </h2>
        </Reveal>

        <Reveal as="div" delay={0.1} className="mt-10 lg:mt-14">
          <FlowRail
            ariaLabel={stablecoinPaymentsFlow.ariaLabel}
            nodes={stablecoinPaymentsFlow.nodes}
            rowSize={6}
          />
        </Reveal>
      </div>
    </section>
  );
}
