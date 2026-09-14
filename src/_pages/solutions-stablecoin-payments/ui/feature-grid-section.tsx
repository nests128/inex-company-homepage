// Page-local section: "Key use cases" 블록. 레이아웃(좌측정렬 헤딩 +
// 회색 배경 3카드 그리드)은 ref/pay/temp3.png 기반 그대로 유지하되, 카피는
// 사용자 요청(2026-09-14: "스테이블코인 관련 내용으로 다시 넣어봐줄래?")에
// 따라 QR 결제 방식 / 정산 속도 / 규제 준수 3가지 특성으로 재구성했다.
// "How it works"(가로형 플로우)는 원본과 동일한 섹션 순서(Key use cases ->
// Tools to build -> How it works)를 지키기 위해 `how-it-works-section.tsx`로
// 분리했다.
import { QrCodeIcon, ShieldCheckIcon, TimerIcon } from "lucide-react";

import { Reveal } from "@/shared/ui";
import {
  stablecoinPaymentsFeatureGridContent,
  stablecoinPaymentsFeatureGridItems,
  type StablecoinPaymentsFeatureGridIconKey,
} from "@/entities/company";

function FeatureGridIcon({ iconKey }: { iconKey: StablecoinPaymentsFeatureGridIconKey }) {
  switch (iconKey) {
    case "qr":
      return <QrCodeIcon aria-hidden="true" />;
    case "settlement":
      return <TimerIcon aria-hidden="true" />;
    case "compliance":
      return <ShieldCheckIcon aria-hidden="true" />;
  }
}

/** Small square marker + eyebrow label — same inline pattern as `ProvenSection`. */
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
          <SectionEyebrow label={stablecoinPaymentsFeatureGridContent.eyebrow} />
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] whitespace-pre-line lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {stablecoinPaymentsFeatureGridContent.title}
          </h2>
        </Reveal>

        <Reveal
          as="div"
          delay={0.1}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
        >
          {stablecoinPaymentsFeatureGridItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-2xl bg-muted p-6"
            >
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
