// Owner: page-agent. Ref: ref/INEX SaaS wireframe/INEX Home Wireframe.dc.html
// (logo marquee, ~L136-145 desktop / ~L353-359 mobile).
import { Marquee, PartnerLogoCard, Reveal } from "@/shared/ui"
import { partners } from "@/entities/company"
import { getLogoMarqueeContent } from "@/entities/company/server"

export async function LogoMarquee() {
  const logoMarqueeContent = await getLogoMarqueeContent()

  return (
    // Full-bleed section: vertical padding only (design-tokens.md "풀블리드
    // 배경 + 컨테이너 콘텐츠"). Wireframe desktop padding is 48px 0 64px;
    // mobile drops the top padding entirely (0 0 44px). The bottom divider
    // was removed per explicit request (2026-09-10) — section dividers
    // throughout the page were dropped.
    <section className="pt-0 pb-11 lg:pt-12 lg:pb-16">
      <div className="container-inex">
        <Reveal
          as="div"
          className="mb-4 text-center text-[12.5px] text-muted-foreground lg:mb-[26px] lg:text-[14px]"
        >
          {logoMarqueeContent.caption}
        </Reveal>

        {/*
         * Capped back to container-inex (1330px) per explicit user request
         * (2026-09-09): a prior request asked for full-bleed (edge-to-edge
         * of the viewport), then the user reversed course — "마퀴도
         * 최대가로값 넘어가지 마" (the marquee must not exceed the 1330px
         * max width either). The track wrapper now nests inside
         * container-inex like the caption above, rather than being a direct
         * child of the section. This is a deliberate exception to the
         * general marquee guidance in design-tokens.md (which still says
         * marquee tracks shouldn't nest in container-inex) — see that doc's
         * "마퀴" section for the reasoning specific to this instance.
         *
         * `gap`/`duration` props are intentionally omitted so Marquee
         * doesn't write inline `--marquee-gap`/`--marquee-duration` styles —
         * that lets the responsive className overrides below (which set
         * those same custom properties per-breakpoint) take effect instead.
         *
         * `maskWidth={3}` is unchanged from the full-bleed version, but the
         * arithmetic that originally justified it no longer applies now that
         * the track is capped to container-inex's ~1282px content width (1330
         * − 24px gutter × 2) instead of the full viewport — 3% of 1282px is
         * only ~38px/edge, close to what 8% (Marquee's wireframe-tuned
         * default) was on the old 1160px wireframe track (~93px/edge). Re-
         * verified visually at 1440px by comparing maskWidth 3 vs 5 vs 8
         * against the cropped edge logos: at 5 (~64px/edge) and 8
         * (~103px/edge) the second logo ("ABLE") gets visibly truncated to
         * "AB" by the fade, since the wide desktop logo slots put the
         * second card's start well within those larger mask widths. At 3
         * (~38px/edge) only the half-cropped edge logo fades and "ABLE"
         * stays fully legible — so 3 was kept, this time for a reason that
         * holds post-revert rather than the (now-invalid) full-bleed one.
         *
         * `--marquee-duration` scales with the half-track width so linear
         * scroll speed (half-track width / duration) stays ~55px/s desktop /
         * ~47px/s mobile regardless of slot size — this speed was set once
         * (see git history for the original 35s/44s → 46s/57s derivation
         * against a 176px/128px slot) and every subsequent logo-size change
         * re-derives duration from it rather than picking a new speed.
         * Current slot (`PartnerLogoCard`, 2026-09-10 size bump): desktop
         * `h-13 w-52` (208px) + 44px gap, mobile `h-9 w-36` (144px) + 24px
         * gap. 13 real partner logos fill a half-track of
         * 13×(208+44)=3276px desktop / 13×(144+24)=2184px mobile (no
         * pre-duplication needed, see below), giving durations of
         * 3276/55≈60s desktop / 2184/47≈46s mobile.
         */}
        <Marquee
          className="w-full [--marquee-duration:46s] [--marquee-gap:24px] lg:[--marquee-duration:60s] lg:[--marquee-gap:44px]"
          maskWidth={3}
        >
          {/*
           * Unlike the earlier 5-item sketch-wordmark placeholder set, the
           * 13 real partner logos alone already fill a half-track well past
           * container-inex's ~1282px content width (13×(208+44)=3276px
           * desktop), so no pre-duplication is needed here — Marquee
           * duplicates `children` itself per its normal API.
           */}
          {partners.map((partner) => (
            <PartnerLogoCard
              key={partner.name}
              name={partner.name}
              src={partner.logoSrc}
            />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
