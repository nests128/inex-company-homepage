// Page-local section: "Key use cases" 3카드 그리드. 다른 두 솔루션 페이지의
// 동일 섹션과 같은 마크업(흰 배경, 좌측정렬 헤딩 + 회색 배경 카드)을 그대로
// 따른다.
import { FileClockIcon, ShieldCheckIcon, SnowflakeIcon } from "lucide-react";

import { Reveal } from "@/shared/ui";
import {
  custodyFeatureGridContent,
  custodyFeatureGridItems,
  type CustodyFeatureGridIconKey,
} from "@/entities/company";

function FeatureGridIcon({ iconKey }: { iconKey: CustodyFeatureGridIconKey }) {
  switch (iconKey) {
    case "policy":
      return <ShieldCheckIcon aria-hidden="true" />;
    case "cold":
      return <SnowflakeIcon aria-hidden="true" />;
    case "audit":
      return <FileClockIcon aria-hidden="true" />;
  }
}

/** Small square marker + eyebrow label — same inline pattern used across all solution pages. */
function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
      <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
      {label}
    </div>
  );
}

export function FeatureGridSection() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div">
          <SectionEyebrow label={custodyFeatureGridContent.eyebrow} />
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] whitespace-pre-line lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {custodyFeatureGridContent.title}
          </h2>
        </Reveal>

        <Reveal
          as="div"
          delay={0.1}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
        >
          {custodyFeatureGridItems.map((item) => (
            <div key={item.title} className="flex flex-col rounded-2xl bg-muted p-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-foreground [&_svg]:size-4.5"
                >
                  <FeatureGridIcon iconKey={item.iconKey} />
                </span>
                <h3 className="text-[15.5px] font-bold">{item.title}</h3>
              </div>
              <p className="mt-4 text-[13.5px] leading-[1.6] text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
