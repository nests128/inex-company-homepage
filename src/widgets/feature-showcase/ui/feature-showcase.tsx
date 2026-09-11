// Owner: page-agent. Ref: ref/INEX SaaS wireframe/INEX Home Wireframe.dc.html
// (big feature section, ~L146-175: heading + left widget ~L153-167, right
// visual ~L168-175). Heading is a single column, title followed by the
// description paragraph directly beneath at a constrained width — not a
// side-by-side 2-col grid, despite the wireframe's L148-151 markup, per
// page-agent's own layout call. The left cell was originally a settlement
// queue table; replaced with a text highlight grid per ref/temp2.png. Unlike
// the settlement queue it replaced, this grid is real product info (not
// placeholder), so it's shown at all breakpoints (1-col on mobile, 2-col from
// `sm`) while the right visual next to it stays desktop-only per the mobile
// artboard (~L360-368), which has no equivalent for it. That slot has held,
// in order: a `VideoCard` (platform-intro.mp4), a ported `NetworkXVisual`
// (dark rotating 3D "X" network canvas from the sibling `company-homepage`
// project's main hero), then `AuroraBackground` (vendored from Aceternity
// UI). It's now back to the `VideoCard`, swapped with `widgets/hero`'s visual
// (which took over the `AuroraBackground` as a full-bleed section
// background instead) per explicit request.
import { Reveal, VideoCard } from "@/shared/ui"
import { cn } from "@/shared/lib/utils"
import {
  featureShowcaseContent,
  featureShowcaseHighlights,
  featureShowcaseVideo,
} from "@/entities/company"

export function FeatureShowcase() {
  return (
    // Full-bleed section: vertical padding only (design-tokens.md "풀블리드
    // 배경 + 컨테이너 콘텐츠"). Background is white, so no bg utility needed.
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        {/* Heading: single column, title followed by the description
         * paragraph directly beneath at a constrained width — not a
         * side-by-side 2-col grid. Mobile already stacks this way, so only
         * the `lg:` grid-cols-2 needs undoing. */}
        <Reveal as="div" className="lg:mb-14">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {featureShowcaseContent.eyebrow}
          </div>
          <h2 className="text-2xl leading-[1.25] font-bold tracking-[-.015em] whitespace-normal lg:text-[44px] lg:leading-[1.15] lg:tracking-[-.02em] lg:whitespace-pre-line">
            {featureShowcaseContent.title}
          </h2>
          <p className="mt-3 max-w-xl whitespace-pre-line text-sm leading-[1.65] text-muted-foreground lg:mt-5 lg:text-[16.5px] lg:leading-[1.7]">
            {featureShowcaseContent.description}
          </p>
        </Reveal>

        {/* Highlight grid — real product info, shown at every breakpoint
         * (1-col stacked on mobile, 2x2 from `sm`). The right visual stays
         * desktop-only (wireframe mobile artboard ~L360-368 has no
         * equivalent for it); from `lg` the wrapper becomes a 2-col split.
         * Equal `1fr/1fr` + `gap-20`, matching every other 2-column section
         * on this page (account-highlight/integrations-showcase/mission) —
         * this one was the only section still on the wireframe's original
         * `1.1fr/.9fr` + `gap-7` ratio. No outer border, internal dividers
         * only. */}
        <Reveal
          as="div"
          delay={0.1}
          className="lg:grid lg:grid-cols-2 lg:gap-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {featureShowcaseHighlights.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "py-7",
                  index > 0 && "border-t border-border sm:border-t-0",
                  "sm:[&:nth-child(n+3)]:border-t",
                  index % 2 === 0
                    ? "sm:pr-8"
                    : "sm:border-l sm:border-border sm:pl-8"
                )}
              >
                <h3 className="text-[19px] leading-snug font-bold tracking-[-.01em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <VideoCard
            videoAlt={featureShowcaseVideo.videoAlt}
            videoSrc={featureShowcaseVideo.videoSrc}
            className="hidden lg:block"
          />
        </Reveal>
      </div>
    </section>
  )
}
