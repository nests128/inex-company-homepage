// Page-local section: "Tools to build"(핵심 역량) 블록. `widgets/feature-showcase`
// ("제도권 안에서 움직이는 디지털 자산 인프라")와 동일한 레이아웃으로 재구성
// (사용자 요청, 2026-09-14: "4분할로 해주고 우측은 이미지로") — 헤딩은 전체
// 폭 한 줄로 배치하고, 그 아래를 2열로 나눠 좌측은 4개 항목 2x2 그리드,
// 우측은 실사 이미지(ref/pay1.webp, POS 결제 장면)를 배치한다.
import Image from "next/image";
import { Reveal } from "@/shared/ui";
import { getStablecoinPaymentsContent, getCurrentLocale } from "@/entities/company/server";
import { cn } from "@/shared/lib/utils";

const POS_IMAGE_ALT = {
  ko: "스테이블코인으로 결제를 수납하는 POS 단말",
  en: "A POS terminal collecting a payment in stablecoin",
};

export async function CapabilitiesSection() {
  const [content, locale] = await Promise.all([getStablecoinPaymentsContent(), getCurrentLocale()]);

  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div" className="mb-8 lg:mb-14">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {content.capabilitiesContent.eyebrow}
          </div>
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] whitespace-pre-line lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {content.capabilitiesContent.title}
          </h2>
        </Reveal>

        <Reveal as="div" delay={0.1} className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative min-h-[380px] w-full overflow-hidden rounded-2xl lg:col-start-2 lg:row-start-1">
            <Image
              src="/images/solutions/stablecoin-payments-pos.webp"
              alt={POS_IMAGE_ALT[locale]}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-start-1 lg:row-start-1">
            {content.capabilities.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "py-7",
                  index > 0 && "border-t border-border sm:border-t-0",
                  "sm:[&:nth-child(n+3)]:border-t",
                  index % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:border-border sm:pl-8"
                )}
              >
                <h3 className="text-[15.5px] font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-[15.5px] leading-[1.6] text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
