// Owner: page-agent. Ref: ref/INEX SaaS wireframe/INEX Home Wireframe.dc.html (hero section below nav, ~L90-134 desktop / ~L330-351 mobile).
import { featureShowcaseVideo, heroContent } from "@/entities/company";
import {
  SettlementRailCard,
  heroSettlementRailCardMobile,
} from "@/entities/settlement";
import {
  HERO_OFFSET_VISUAL,
  HERO_TRANSITION_VISUAL,
} from "@/shared/lib/motion";
import {
  Button,
  HeroReveal,
  Reveal,
  TextAnimate,
  TrustIndicator,
  VideoCard,
} from "@/shared/ui";

/**
 * Desktop hero visual composite entry delays (seconds), in wireframe DOM
 * order: trading placeholder → rail card → wallet placeholder (Wireframe
 * L108/110/131: `.3s` / `.42s` / `.54s`). Starts after the left column's
 * staggered entrance finishes (last left-column delay is `.46s`, per
 * `HERO_STAGGER_DELAYS`) so the two columns read as sequential, not
 * simultaneous. Local to this widget — promote to `shared/lib/motion.ts`
 * if another widget ever needs the same three-step visual stagger.
 */
const HERO_VISUAL_DELAYS = [0.3, 0.42, 0.54] as const;

export function Hero() {
  return (
    // Full-bleed section: vertical padding only (design-tokens.md "풀블리드
    // 배경 + 컨테이너 콘텐츠"). Horizontal gutter lives on container-inex below.
    <section className="py-12 lg:py-20">
      <div className="container-inex grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1fr] lg:gap-14">
        {/* Left: copy + CTAs. HeroReveal staggers its 5 direct children
            (eyebrow/H1/subcopy/CTA group/trust indicator) on mount, per
            wireframe `data-hero` delay sequence. No flex/gap here — the
            per-child Reveal wrappers are plain block divs, so the children's
            existing vertical margins (mb-3.5/mt-3.5/mt-5/mt-4) keep collapsing
            through them and spacing is unchanged. */}
        <HeroReveal className="text-center lg:text-left">
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
              re-triggers it. */}
          <TextAnimate
            as="h1"
            by="character"
            animation="slideUp"
            duration={1.1}
            startOnView={false}
            className="text-[19px] leading-[1.35] font-bold tracking-[-.02em] whitespace-pre-line lg:text-[50px] lg:leading-[1.08] lg:tracking-[-.03em]"
          >
            {heroContent.title}
          </TextAnimate>
          <p className="mx-auto mt-3.5 max-w-[520px] text-[14.5px] leading-[1.65] text-muted-foreground lg:mx-0 lg:mt-6 lg:text-lg lg:leading-[1.6]">
            {heroContent.subcopy}
          </p>
          <div className="mt-5 flex lg:mt-8">
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
          {/* `inline-flex` badge inside a `text-center lg:text-left` parent —
              text-align (not flex justify) centers/left-aligns it. */}
          <TrustIndicator
            label={heroContent.trustLabel}
            className="mt-4 text-[11.5px] lg:mt-[22px] lg:text-[13.5px]"
          />
        </HeroReveal>

        {/* Mobile (390): only the rail card ships, trimmed (no "+ 레일 추가" /
            approver row / rail meta — wireframe ~L341-350). Media placeholders
            and the desktop card variant are hidden below `lg`. The
            responsive-visibility class lives on the Reveal wrapper itself
            (not the card) so the wrapper doesn't occupy a grid slot at `lg`.
            Delay reuses HERO_VISUAL_DELAYS[1] (not [0]) because this is the
            same rail-card element as the desktop composite's middle item, not
            a first/only-visual index. */}
        <Reveal
          className="lg:hidden"
          inView={false}
          delay={HERO_VISUAL_DELAYS[1]}
          offset={HERO_OFFSET_VISUAL}
          scale
          transition={HERO_TRANSITION_VISUAL}
        >
          <SettlementRailCard
            eyebrow={heroSettlementRailCardMobile.eyebrow}
            title={heroSettlementRailCardMobile.title}
            rails={heroSettlementRailCardMobile.rails}
            cta={heroSettlementRailCardMobile.cta}
          />
        </Reveal>

        {/* Desktop (1440): right column is the same intro video used in
            `feature-showcase` ("제도권 안에서 움직이는 디지털 자산 인프라"
            section), reused here per explicit request — replaces the
            earlier 1fr/2fr photo composite (square photo + tradingDetail
            card + wallet image) entirely. */}
        <Reveal
          className="hidden lg:block"
          inView={false}
          delay={HERO_VISUAL_DELAYS[0]}
          offset={HERO_OFFSET_VISUAL}
          scale
          transition={HERO_TRANSITION_VISUAL}
        >
          <VideoCard
            videoAlt={featureShowcaseVideo.videoAlt}
            videoSrc={featureShowcaseVideo.videoSrc}
            className="aspect-[4/3]"
          />
        </Reveal>
      </div>
    </section>
  );
}
