// Page-local section: "실제 운영중인 서비스" 소개 + 운영 지표. 다크(#111)
// 배경이었으나 사용자 명시적 요청(2026-09-14)으로 제거 — 흰 배경으로 변경.
// `StatItem`은 `tone="light"`로 caption 색을 `text-muted-foreground`로
// 전환한다(`shared/ui/stat-item.tsx` 참고). 히어로 바로 아래라
// above-the-fold일 수 있으므로 `StatItem`의 `countTo` 카운트업은 쓰지 않고
// (값이 above-the-fold에서 0으로 리셋 후 재생되는 문제) 최종 값만 바로 표시한다.
import { Reveal, StatGrid, StatItem } from "@/shared/ui";
import { getCryptoTradingContent } from "@/entities/company/server";

export async function ProvenSection() {
  const content = await getCryptoTradingContent();

  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div" className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {content.proven.eyebrow}
          </div>
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {content.proven.title}
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-muted-foreground lg:text-[16.5px] lg:leading-[1.7]">
            {content.proven.description}
          </p>
        </Reveal>

        <Reveal as="div" delay={0.1} className="mt-10 lg:mt-14">
          <StatGrid>
            {content.stats.map((stat) => (
              <StatItem key={stat.caption} value={stat.value} caption={stat.caption} tone="light" />
            ))}
          </StatGrid>
        </Reveal>
      </div>
    </section>
  );
}
