// Page-local section: "실제 운영중인 보안 체계" 소개 + 신뢰 지표. 크립토
// 트레이딩 페이지의 `ProvenSection`과 동일한 흰 배경 + `StatGrid` 패턴.
import { Reveal, StatGrid, StatItem } from "@/shared/ui";
import { custodyProvenContent, custodyStats } from "@/entities/company";

export function ProvenSection() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div" className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {custodyProvenContent.eyebrow}
          </div>
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {custodyProvenContent.title}
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-muted-foreground lg:text-[16.5px] lg:leading-[1.7]">
            {custodyProvenContent.description}
          </p>
        </Reveal>

        <Reveal as="div" delay={0.1} className="mt-10 lg:mt-14">
          <StatGrid>
            {custodyStats.map((stat) => (
              <StatItem key={stat.caption} value={stat.value} caption={stat.caption} tone="light" />
            ))}
          </StatGrid>
        </Reveal>
      </div>
    </section>
  );
}
