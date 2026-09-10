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
// artboard (~L360-368), which has no equivalent for it. That slot originally
// held a `VideoCard` (platform-intro.mp4, since reused in `widgets/hero`
// instead), then briefly a ported `NetworkXVisual` (dark rotating 3D "X"
// network canvas from the sibling `company-homepage` project's main hero),
// and now holds `AuroraBackground` (vendored from Aceternity UI,
// https://ui.aceternity.com/components/aurora-background, per explicit
// request to swap the X visual out, then set to its white-background variant
// per a follow-up request) — an animated gradient-sweep panel, with an
// `InexLogoMark` (dark via `text-foreground`, since the mark inherits text
// color and the panel is now light) centered on top as its `children`,
// mirroring how the `NetworkX`-based hero this was inspired by centers its
// title text over its background visual.
import { AuroraBackground, InexLogoMark, Reveal } from "@/shared/ui"
import { cn } from "@/shared/lib/utils"
import {
  featureShowcaseContent,
  featureShowcaseHighlights,
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
         * equivalent for it); from `lg` the wrapper becomes the 2-col
         * `1.1fr/.9fr` split from wireframe L152-175. No outer border,
         * internal dividers only. */}
        <Reveal
          as="div"
          delay={0.1}
          className="lg:grid lg:grid-cols-[1.1fr_.9fr] lg:gap-7"
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
          <AuroraBackground className="hidden min-h-[380px] items-center justify-center rounded-2xl border border-border lg:flex">
            <InexLogoMark className="relative z-10 h-auto w-32 text-foreground" />
          </AuroraBackground>
        </Reveal>
      </div>
    </section>
  )
}
