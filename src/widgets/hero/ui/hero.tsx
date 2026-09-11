// Owner: page-agent. Ref: ref/INEX SaaS wireframe/INEX Home Wireframe.dc.html (hero section below nav, ~L90-134 desktop / ~L330-351 mobile).
import { heroContent } from "@/entities/company";
import {
  AuroraBackground,
  Button,
  HeroReveal,
  TextAnimate,
  TrustIndicator,
} from "@/shared/ui";

export function Hero() {
  return (
    // Full-bleed Aurora background (replaces the earlier 2-col copy/visual
    // grid) — copy + CTAs sit centered on top of it. The video previously
    // shown here moved to `feature-showcase`'s right-column visual slot,
    // swapping places with the aurora that used to live there. Vertical
    // spacing lives inside the aurora panel (not on this outer `<section>`)
    // so the panel itself is flush against the sticky nav header above it,
    // full-bleed with no white gap.
    <section>
      <AuroraBackground className="rounded-none">
        <div className="container-inex relative z-10 flex flex-col items-center py-16 text-center lg:py-24">
          {/* HeroReveal staggers its 4 direct children (H1/subcopy/CTA
              group/trust indicator) on mount, per wireframe `data-hero`
              delay sequence. No flex/gap here — the per-child Reveal
              wrappers are plain block divs, so the children's existing
              vertical margins (mb-3.5/mt-3.5/mt-5/mt-4) keep collapsing
              through them and spacing is unchanged. */}
          <HeroReveal className="text-center">
            {/* Character-by-character fly-in on top of HeroReveal's own
                fade/slide-up wrapper for this slot — the outer wrapper still
                animates the whole heading in per the stagger sequence, and
                within that, each character additionally slides up + fades in
                with a short per-character stagger (`by="character"`), per
                explicit reference to the hero title animation on
                https://workhorse-saas-software-template.webflow.io/.
                `startOnView={false}` because this always plays on mount (the
                hero is above the fold), matching the rest of HeroReveal's
                children. `once` isn't needed for the same reason — nothing
                re-triggers it.

                Rendered as one `TextAnimate` per source line (split on `\n`)
                instead of a single element: `by="character"` explodes text
                into one `inline-block` span per character, which makes `\n`
                itself just another isolated character span — it never
                becomes an actual line break in the parent's flow, so
                `whitespace-pre-line`/`text-balance` on the wrapping `h1` had
                no effect and the two intended lines would reflow together at
                every mobile font size tried. Splitting at the call site turns
                the break into a real block-level boundary, independent of
                container width. */}
            <h1 className="text-[28px] leading-[1.25] font-bold tracking-[-.02em] text-slate-950 lg:text-[50px] lg:leading-[1.08] lg:tracking-[-.03em]">
              {heroContent.title.split("\n").map((line, i) => (
                <TextAnimate
                  key={line}
                  as="span"
                  by="character"
                  animation="slideUp"
                  duration={1.1}
                  delay={i * 0.15}
                  startOnView={false}
                  className="block"
                >
                  {line}
                </TextAnimate>
              ))}
            </h1>
            <p className="mx-auto mt-3.5 max-w-[520px] text-[14.5px] leading-[1.65] text-slate-600 lg:mt-6 lg:text-lg lg:leading-[1.6]">
              {heroContent.subcopy}
            </p>
            <div className="mt-5 flex justify-center lg:mt-8">
              <Button
                variant="pill-solid"
                size="pill-lg"
                render={
                  <a
                    href={heroContent.primaryCta.href}
                    target={heroContent.primaryCta.external ? "_blank" : undefined}
                    rel={heroContent.primaryCta.external ? "noopener noreferrer" : undefined}
                  />
                }
                className="w-full lg:w-auto"
              >
                {heroContent.primaryCta.label}
              </Button>
            </div>
            {/* `inline-flex` badge — centered via the flex-col parent's
                `items-center`. */}
            <TrustIndicator
              label={heroContent.trustLabel}
              className="mt-4 text-[11.5px] lg:mt-[22px] lg:text-[13.5px]"
            />
          </HeroReveal>
        </div>
      </AuroraBackground>
    </section>
  );
}
