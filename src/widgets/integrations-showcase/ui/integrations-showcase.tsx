// Owner: page-agent. Ref: ref/image2.png, section 2 (originally "Works with
// tools you love" in the sketch; repurposed for multi-chain asset support).
// Sketch layout: left column is a heading + description paragraph; right
// column is a dark, fixed-frame marquee card containing circular coin-icon
// badges (symbol + network label under each), scrolling infinitely. No
// mobile artboard for this sketch, so this stacks (heading above marquee) on
// small screens via a plain `grid gap-* lg:grid-cols-2` rather than being
// hidden below `lg`.
import {
  IntegrationLogoCard,
  IntegrationsMarqueeCard,
  Reveal,
} from "@/shared/ui"
import { stablecoinChainIcons, integrationsContent } from "@/entities/company"

export function IntegrationsShowcase() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Left: heading + description. */}
        <Reveal as="div">
          <h2 className="text-2xl leading-[1.2] font-bold tracking-[-.015em] lg:text-[44px] lg:leading-[1.15] lg:tracking-[-.02em]">
            {integrationsContent.heading}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-[1.65] text-muted-foreground lg:mt-5 lg:text-[16.5px] lg:leading-[1.7]">
            {integrationsContent.description}
          </p>
        </Reveal>

        {/* Right: dark fixed frame with an infinitely-scrolling coin-icon track. */}
        <Reveal as="div" delay={0.1}>
          <IntegrationsMarqueeCard>
            {stablecoinChainIcons.map((coin) => (
              <IntegrationLogoCard
                key={coin.symbol}
                name={coin.symbol}
                category={coin.network}
                icon={
                  // eslint-disable-next-line @next/next/no-img-element -- external CDN icon, see entities/company/model/integrations-content.ts for why next/image's remotePatterns proxy can't serve it.
                  <img src={coin.src} alt={coin.symbol} className="size-8 lg:size-11" />
                }
              />
            ))}
          </IntegrationsMarqueeCard>
        </Reveal>
      </div>
    </section>
  )
}
