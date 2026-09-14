// Owner: page-agent. Ref: ref/image2.png, section 1 layout (content since
// repurposed from 커스터디 to 온/오프램프 — see account-highlight-content.ts).
// Sketch layout: left column is a light-background (`bg-muted`) panel
// containing a `FlowDiagram` (스테이블코인 -> 온/오프램프 -> 가맹점 정산),
// full-width within the panel per FlowDiagram's own sizing note; right
// column is a heading (with an inline check-icon badge, same inline-badge
// pattern as feature-showcase) + description paragraph + CTA button. No
// mobile artboard for this sketch, so this stacks (card panel above
// heading) on small screens via a plain `grid gap-* lg:grid-cols-2` rather
// than being hidden below `lg`.
import { FlowDiagram, Reveal } from "@/shared/ui"
import { accountHighlightContent, accountHighlightFlow } from "@/entities/company"

export function AccountHighlight() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Left: muted panel housing the FlowDiagram at full panel width
         * (no narrow card wrapper — FlowDiagram's desktop viewBox assumes a
         * ~520-600px rendered width, and this panel is one column of a
         * `lg:grid-cols-2` layout). `min-h` + `flex items-center` gives the
         * panel more presence than the diagram's own intrinsic height would
         * (it was reading as visually thin next to the taller text column). */}
        <Reveal as="div" className="flex min-h-[280px] items-center rounded-2xl bg-muted p-6 lg:min-h-[440px] lg:p-8">
          <FlowDiagram
            ariaLabel={accountHighlightFlow.ariaLabel}
            nodes={accountHighlightFlow.nodes}
            className="w-full"
          />
        </Reveal>

        {/* Right: heading + description. No trailing check-icon badge (removed
         * per explicit request) and no CTA button (removed earlier, also per
         * explicit request). */}
        <Reveal as="div" delay={0.1}>
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] whitespace-pre-line lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {accountHighlightContent.heading}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-[1.65] text-muted-foreground lg:mt-5 lg:text-[16.5px] lg:leading-[1.7]">
            {accountHighlightContent.description}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
