"use client"

// Owner: page-agent. Ref: ref/image.png ("Workhorse delivers insight, fast" section).
// Desktop-only section: the mobile (390) artboard runs the full page through
// to the footer but has no equivalent of this split section at all — it goes
// straight from the module cards to the stats band. So unlike feature-showcase
// (which trims a sub-grid on mobile), this entire section is hidden below `lg`.
//
// Client component: the left feature list is now clickable (page-agent
// follow-up request) and swaps the right-hand visual to match the selected
// item, which requires local `useState`.
import { useState } from "react"
import { LineChartIcon, BanknoteIcon, ShieldIcon } from "lucide-react"

import { BalanceBarChartCard, FeatureListItem, GradientBackdrop, PlaceholderMedia, Reveal, StablecoinOrderCard, TradingTerminalCard } from "@/shared/ui"
import {
  operationsSplitContentByLocale,
  type OperationsFeatureIconKey,
} from "@/entities/company"
import { custodyStatusCard, stablecoinOrderContent } from "@/entities/settlement"
import type { Locale } from "@/shared/lib/i18n"

/**
 * Maps `operationsSplitFeatures`' `iconKey` to the small glyph rendered
 * inline before each `FeatureListItem` title (ref/image.png left column).
 * Kept out of the `entities/company` model file since JSX can't live there —
 * same pattern as `SolutionIcon` in `widgets/nav-bar`.
 */
function FeatureIcon({ iconKey }: { iconKey: OperationsFeatureIconKey }) {
  switch (iconKey) {
    case "trading":
      return <LineChartIcon aria-hidden="true" />
    case "payments":
      return <BanknoteIcon aria-hidden="true" />
    case "custody":
      return <ShieldIcon aria-hidden="true" />
  }
}

export function OperationsSplit({ locale }: { locale: Locale }) {
  const operationsSplitContent = operationsSplitContentByLocale[locale]
  const operationsSplitFeatures = operationsSplitContent.features
  const tradingTerminalHeader = operationsSplitContent.tradingTerminalHeader

  // Defaults to the item flagged `active` in the data (falls back to the
  // first item), preserving the previous static "Invoicing highlighted"
  // behaviour before this became interactive.
  const defaultId =
    operationsSplitFeatures.find((item) => item.active)?.id ?? operationsSplitFeatures[0].id
  const [selectedId, setSelectedId] = useState(defaultId)
  const selected =
    operationsSplitFeatures.find((item) => item.id === selectedId) ?? operationsSplitFeatures[0]

  return (
    // Full-bleed section: vertical padding only (design-tokens.md "풀블리드
    // 배경 + 컨테이너 콘텐츠"). The bottom border that used to separate this
    // section from the module marquee was removed per explicit request
    // (2026-09-10) — section dividers throughout the page were dropped.
    <section className="hidden lg:block lg:py-24">
      <div className="container-inex grid grid-cols-2 items-start gap-20">
        {/* Left: heading (small tag + title — the sketch has no description
         * paragraph or CTA button under it) followed by a vertical stack of
         * three icon+title+description feature items. Clicking an item
         * selects it (light-grey highlight) and swaps the right-hand visual;
         * "크립토 트레이딩" is selected by default. */}
        <Reveal as="div">
          <div className="mb-4 flex items-center gap-2 text-[13px] font-medium text-foreground/80">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {operationsSplitContent.eyebrow}
          </div>
          <h2 className="text-[36px] leading-[1.2] tracking-[-.02em] whitespace-pre-line">
            {operationsSplitContent.title}
          </h2>
          <div className="mt-36 flex flex-col gap-1">
            {operationsSplitFeatures.map((item) => (
              <FeatureListItem
                key={item.id}
                icon={<FeatureIcon iconKey={item.iconKey} />}
                title={item.title}
                description={item.description}
                active={selectedId === item.id}
                onClick={() => setSelectedId(item.id)}
              />
            ))}
          </div>
        </Reveal>

        {/* Right: gradient panel, stretched to the left column's full height
         * (`self-stretch` overrides the grid's `items-start` for this column
         * only, on the outer scroll-reveal wrapper) so the panel always
         * fills the section rather than sitting at a fixed min-height.
         * Content swaps with the selected feature: "스테이블코인 결제" renders
         * a `StablecoinOrderCard` (TXID/수량/상태 transaction list,
         * `stablecoinOrderContent` — replaced the earlier generic SaaS-template
         * `PaymentCard` composition per explicit request for an order-list
         * feel instead of a single amount+status summary), "커스터디" renders
         * a `BalanceBarChartCard` with
         * `custodyStatusCard` (entities/settlement — kept independent of
         * `widgets/account-highlight`'s own content so this click-state stays
         * about custody regardless of what that section covers) mapped from
         * its `segments` into bars, and "크립토 트레이딩" renders a
         * `TradingTerminalCard` (dark BTC/KRW candlestick + order book,
         * `tradingTerminalHeader` for the symbol/price/change header — a
         * deliberate exception to this page's light/grayscale default,
         * since a trading-terminal look reads as genuinely dark UI rather
         * than a stylistic mismatch). The inner `Reveal`'s `key={selectedId}`
         * remounts just the swapped content on click, replaying the
         * fade/translate-in as a simple, dependency-free transition —
         * separate from the outer `Reveal`, which keeps the original
         * scroll-into-view entrance for the whole panel. The two side photos
         * (`sidePhotos`, real 스테이블코인 결제 images) only render when
         * "스테이블코인 결제" is selected — they're specific to that item, not
         * a static decoration shown for every selection — and stack
         * top/bottom (`flex-col`, each `flex-1`) to jointly fill the main
         * panel's height, rather than sitting side-by-side or at the small
         * fixed-height size this slot used before real images replaced the
         * placeholder pair. */}
        <Reveal as="div" delay={0.1} className="flex h-full items-stretch gap-4 self-stretch">
          <GradientBackdrop
            tone="light"
            className="h-full flex-1 items-center justify-center p-6"
          >
            <Reveal key={selectedId} as="div" inView={false} className="flex size-full items-center justify-center">
              {selected.visual === "payment-card" ? (
                <StablecoinOrderCard
                  title={stablecoinOrderContent.title}
                  columnLabels={stablecoinOrderContent.columnLabels}
                  rows={stablecoinOrderContent.rows}
                  className="w-[74%]"
                />
              ) : selected.visual === "account-card" ? (
                <BalanceBarChartCard
                  title={custodyStatusCard.title}
                  bars={custodyStatusCard.segments.map((segment) => ({
                    label: segment.label,
                    percent: segment.percent,
                    accent: segment.label === "콜드월렛",
                  }))}
                  className="w-[74%]"
                />
              ) : selected.visual === "trading-card" ? (
                <TradingTerminalCard
                  symbol={tradingTerminalHeader.symbol}
                  price={tradingTerminalHeader.price}
                  changePercent={tradingTerminalHeader.changePercent}
                  className="w-[74%]"
                />
              ) : (
                <PlaceholderMedia alt={selected.mediaAlt} className="size-full" />
              )}
            </Reveal>
          </GradientBackdrop>
          {selected.id === "payments" && (
            <div className="hidden w-[220px] flex-col gap-4 xl:flex">
              {operationsSplitContent.sidePhotos.map((photo) => (
                <PlaceholderMedia
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="220px"
                  quality={90}
                  compact
                  className="flex-1 rounded-2xl"
                />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
