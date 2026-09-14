// Page-local section, ref/exchange/section2.png(사용자 스케치)를 그대로 따른
// 2블록 구성: (1) 흰 배경 + 좌측정렬 사각마커/라벨/타이틀 + 6카드 그리드
// ("Key use cases"), (2) 흰 배경 좌측정렬 라벨/타이틀 아래 연한 회색 박스
// 안에 좌측 4단 순서형 리스트 + 우측 폰 목업 이미지 ("How it works").
import {
  BarChart3Icon,
  CodeIcon,
  ListOrderedIcon,
  ShieldIcon,
  TimerIcon,
  WavesIcon,
} from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/shared/ui";
import {
  cryptoTradingFeatureGridContent,
  cryptoTradingFeatureGridItems,
  cryptoTradingHowItWorksContent,
  cryptoTradingHowItWorksSteps,
  cryptoTradingHowItWorksImage,
  type CryptoTradingFeatureGridIconKey,
} from "@/entities/company";

function FeatureGridIcon({ iconKey }: { iconKey: CryptoTradingFeatureGridIconKey }) {
  switch (iconKey) {
    case "chart":
      return <BarChart3Icon aria-hidden="true" />;
    case "sdk":
      return <CodeIcon aria-hidden="true" />;
    case "orderbook":
      return <ListOrderedIcon aria-hidden="true" />;
    case "liquidity":
      return <WavesIcon aria-hidden="true" />;
    case "custody":
      return <ShieldIcon aria-hidden="true" />;
    case "uptime":
      return <TimerIcon aria-hidden="true" />;
  }
}

/** Small square marker + eyebrow label — same inline pattern as `ProvenSection`/`feature-showcase`. */
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
    <>
      {/* "Key use cases": 흰 배경, 좌측정렬 헤딩 + 6카드 그리드. */}
      <section className="py-14 lg:py-24">
        <div className="container-inex">
          <Reveal as="div">
            <SectionEyebrow label={cryptoTradingFeatureGridContent.eyebrow} />
            <h2 className="text-2xl leading-[1.2] tracking-[-.015em] whitespace-pre-line lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
              {cryptoTradingFeatureGridContent.title}
            </h2>
          </Reveal>

          <Reveal
            as="div"
            delay={0.1}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
          >
            {/* ref/exchange/section2.png: 회색 채움 카드가 아니라 흰 배경 +
                얇은 테두리(outline) 카드. `IconFeatureCard`(다른 곳에서 회색
                채움으로 쓰이는 공용 컴포넌트)를 재사용하지 않고 이 페이지
                전용 마크업으로 둔다. */}
            {cryptoTradingFeatureGridItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-2xl border border-border bg-background p-6"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg]:size-4.5"
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

      {/* "How it works": 흰 배경 헤딩 아래, 연한 회색 박스 안에 좌측 4단
          순서형 리스트 + 우측 폰 목업. */}
      <section className="py-14 lg:py-24">
        <div className="container-inex">
          <Reveal as="div">
            <SectionEyebrow label={cryptoTradingHowItWorksContent.eyebrow} />
            <h2 className="text-2xl leading-[1.2] tracking-[-.015em] whitespace-pre-line lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
              {cryptoTradingHowItWorksContent.title}
            </h2>
          </Reveal>

          <Reveal
            as="div"
            delay={0.1}
            className="mt-10 grid grid-cols-1 items-center gap-10 overflow-hidden rounded-2xl bg-muted p-6 lg:mt-14 lg:grid-cols-2 lg:gap-16 lg:p-14"
          >
            <ol className="flex flex-col gap-7 lg:gap-9">
              {cryptoTradingHowItWorksSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background text-[13px] font-bold text-foreground"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[15.5px] font-bold">{step.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-[1.6] text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* 사용자 명시적 요청(2026-09-14) — 이미지를 확대하되 카드
                (연한 회색 박스) 높이는 좌측 리스트 콘텐츠 기준으로 고정하고
                늘어나지 않게 한다. 카드(Reveal) 자체를 overflow-hidden으로
                되돌려 grid 셀의 자연 높이를 유지하고, 이미지 wrapper를
                absolute로 grid 흐름에서 완전히 빼서(자기 크기가 grid 행
                높이 계산에 반영되지 않도록) 카드 밖으로 넘치는 부분은
                카드의 overflow-hidden이 그대로 잘라낸다.
                모바일(1열 스택)은 이 relative 셀에 h-full만 주면 absolute
                자식이 높이 계산에 기여하지 않아 셀 자체가 찌그러져 리스트
                텍스트와 겹치므로, min-h로 최소 높이를 명시해 겹침을 막는다. */}
            <div className="relative h-full min-h-[280px] w-full lg:min-h-0">
              {/* top-90%: 사용자가 직접 확정한 값(2026-09-14) — 이미지를
                  카드 하단 쪽으로 크게 내려, 폰 상단부가 더 잘 보이게 한다. */}
              <div className="absolute top-[90%] left-1/2 aspect-square w-[135%] max-w-2xl -translate-x-1/2 -translate-y-1/2">
                <Image
                  src={cryptoTradingHowItWorksImage.src}
                  alt={cryptoTradingHowItWorksImage.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
