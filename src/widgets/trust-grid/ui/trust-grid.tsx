// Owner: page-agent. Ref: ref/temp5.png (heading-less 3-up icon card row) —
// this project keeps the eyebrow+heading pattern used by other sections for
// consistency, stacked above the 3-column grid instead of temp5's bare row.
// Each card's preview was originally a purpose-built mini UI widget
// (EmbeddedChartPreview/OrderbookPreview/RampFlowPreview) but per explicit
// request those were removed in favor of the real reference photos in
// ref/b2b/ (embed.png, api.png, pay.png), copied to public/images/b2b/ —
// and per a follow-up correction, the image renders *inside* each
// `IconFeatureCard` (via its `image` slot) rather than as a sibling element
// below the card.
import { CandlestickChartIcon, BookOpenTextIcon, ArrowLeftRightIcon } from "lucide-react"

import { IconFeatureCard, PlaceholderMedia, Reveal } from "@/shared/ui"
import { trustGridCards, trustGridContent, type TrustGridIconKey } from "@/entities/company"

/**
 * Maps `trustGridCards`' `iconKey` to the glyph rendered in each
 * `IconFeatureCard` badge. Kept out of `entities/company` since JSX can't
 * live there — same pattern as `FeatureIcon` in `widgets/operations-split`.
 */
function FeatureIcon({ iconKey }: { iconKey: TrustGridIconKey }) {
  switch (iconKey) {
    case "chart":
      return <CandlestickChartIcon aria-hidden="true" />
    case "orderbook":
      return <BookOpenTextIcon aria-hidden="true" />
    case "ramp":
      return <ArrowLeftRightIcon aria-hidden="true" />
  }
}

/** Maps `trustGridCards`' `iconKey` to its `ref/b2b` reference photo. */
function trustGridCardImage(iconKey: TrustGridIconKey) {
  switch (iconKey) {
    case "chart":
      return { src: "/images/b2b/embed.png", alt: "임베디드 차트 위젯 스크린샷" }
    case "orderbook":
      return { src: "/images/b2b/api.png", alt: "API 이미지" }
    case "ramp":
      return { src: "/images/b2b/pay.png", alt: "결제 승인 화면 사진" }
  }
}

export function TrustGrid() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {trustGridContent.eyebrow}
          </div>
          <h2 className="max-w-2xl text-2xl leading-[1.2] font-bold tracking-[-.015em] lg:text-[36px] lg:leading-[1.15] lg:tracking-[-.02em]">
            {trustGridContent.heading}
          </h2>
        </Reveal>

        <Reveal
          as="div"
          delay={0.1}
          className="mt-8 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6"
        >
          {trustGridCards.map((card) => {
            const image = trustGridCardImage(card.iconKey)
            return (
              <IconFeatureCard
                key={card.iconKey}
                icon={<FeatureIcon iconKey={card.iconKey} />}
                title={card.title}
                description={card.description}
                image={
                  <PlaceholderMedia
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="aspect-[4/3] rounded-xl"
                  />
                }
              />
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
