// Page-local section: "Tools to build"(핵심 역량) 블록. 스테이블코인 결제
// 페이지의 동일 섹션과 같은 2x2 정적 그리드(카드 테두리 없이 제목+설명만,
// 세로 구분선).
import { Reveal } from "@/shared/ui";
import { custodyCapabilities, custodyCapabilitiesContent } from "@/entities/company";

export function CapabilitiesSection() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal as="div">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {custodyCapabilitiesContent.eyebrow}
          </div>
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] whitespace-pre-line lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {custodyCapabilitiesContent.title}
          </h2>
        </Reveal>

        <Reveal
          as="div"
          delay={0.1}
          className="grid grid-cols-1 gap-x-10 gap-y-8 border-border sm:grid-cols-2 sm:divide-x sm:divide-border"
        >
          {custodyCapabilities.map((item, index) => (
            <div key={item.title} className={index % 2 === 1 ? "sm:pl-10" : undefined}>
              <h3 className="text-[15.5px] font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
