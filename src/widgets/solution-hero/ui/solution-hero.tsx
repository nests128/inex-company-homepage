// Owner: ui-agent (design), page-agent (content/assembly). Solution detail
// page hero — text column (eyebrow + H1 + description + optional CTA) next
// to an image slot. Mirrors `feature-showcase.tsx`'s full-bleed section +
// `container-inex` two-layer structure, and `hero.tsx`'s mount-triggered
// entrance pattern (`HeroReveal`/`Reveal`), scaled down for a detail page
// rather than the homepage's full aurora treatment (aurora was tried per
// solution page — green/orange tints — then removed again per explicit
// request, 2026-09-14).
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";

import { Button, HeroReveal, PlaceholderMedia, Reveal, StoreBadgeLinks } from "@/shared/ui";
import {
  HERO_OFFSET_VISUAL,
  HERO_STAGGER_DELAYS,
  HERO_TRANSITION_VISUAL,
} from "@/shared/lib/motion";

export interface SolutionHeroProps {
  /** Optional small label above the H1. Omitted entirely when not provided. */
  eyebrow?: string;
  title: string;
  description: string;
  /**
   * Screenshot-style visual — rendered inside the gray card treatment
   * (asymmetric padding, image flush to the bottom-right corner). Ignored
   * when `visual` is provided instead.
   */
  imageSrc?: string;
  imageAlt?: string;
  /**
   * Arbitrary visual replacing the whole gray-card/`PlaceholderMedia`
   * treatment — for non-screenshot visuals (e.g. `GlobeVisual`) that
   * shouldn't be cropped into that card's asymmetric padding. Takes
   * precedence over `imageSrc`.
   */
  visual?: ReactNode;
  /** Optional primary CTA below the description. Omitted entirely when not provided. */
  primaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  /**
   * Optional outline CTA linking to the live exchange (e.g. inexcoin.com),
   * rendered next to `primaryCta` — same pattern as the header's
   * `navExchangeLink` outline button. Omitted entirely when not provided.
   */
  exchangeLink?: {
    label: string;
    href: string;
    external?: boolean;
  };
  /** Optional App Store/Google Play badges below the CTA. Omitted entirely when not provided. */
  appLinks?: {
    appStoreHref: string;
    googlePlayHref: string;
  };
  /** Overrides the section's default vertical padding (`py-14 lg:py-24`) — e.g. a shorter hero for a page whose visual doesn't need as much room. */
  className?: string;
}

export function SolutionHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  visual,
  primaryCta,
  exchangeLink,
  appLinks,
  className,
}: SolutionHeroProps) {
  return (
    <section className={cn("py-14 lg:py-24", className)}>
      <div className="container-inex grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <HeroReveal className="flex flex-col">
          {eyebrow ? (
            <p className="text-[12px] font-medium tracking-[.13em] text-muted-foreground uppercase lg:text-[13px]">
              {eyebrow}
            </p>
          ) : null}
          {/* 사용자 명시적 요청(2026-09-14) — 히어로 타이틀은 섹션
              타이틀(32px)보다 눈에 띄게 크게(42px -> 48px). */}
          <h1 className="text-[28px] leading-[1.15] font-bold tracking-[-.02em] text-foreground lg:text-[48px] lg:leading-[1.1] lg:tracking-[-.03em]">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-[14.5px] leading-[1.65] text-muted-foreground lg:mt-6 lg:text-lg lg:leading-[1.6]">
            {description}
          </p>
          {primaryCta || exchangeLink ? (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-8">
              {primaryCta ? (
                <Button
                  variant="pill-solid"
                  size="pill-lg"
                  render={
                    <a
                      href={primaryCta.href}
                      target={primaryCta.external ? "_blank" : undefined}
                      rel={primaryCta.external ? "noopener noreferrer" : undefined}
                    />
                  }
                  className="w-full sm:w-auto"
                >
                  {primaryCta.label}
                </Button>
              ) : null}
              {exchangeLink ? (
                <Button
                  variant="pill-outline"
                  size="pill-lg"
                  render={
                    <a
                      href={exchangeLink.href}
                      target={exchangeLink.external ? "_blank" : undefined}
                      rel={exchangeLink.external ? "noopener noreferrer" : undefined}
                    />
                  }
                  className="w-full gap-1.5 sm:w-auto"
                >
                  {exchangeLink.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
              ) : null}
            </div>
          ) : null}
          {appLinks ? (
            <StoreBadgeLinks
              appStoreHref={appLinks.appStoreHref}
              googlePlayHref={appLinks.googlePlayHref}
              className="mt-5 lg:mt-6"
            />
          ) : null}
        </HeroReveal>
        <Reveal
          inView={false}
          delay={HERO_STAGGER_DELAYS[2]}
          offset={HERO_OFFSET_VISUAL}
          scale
          transition={HERO_TRANSITION_VISUAL}
        >
          {visual ? (
            // 사용자 명시적 요청(2026-09-14) — visual 슬롯(스테이블코인 결제
            // 페이지의 궤도 비주얼 등)은 스크린샷이 아니라 배경 위에 떠
            // 있는 형태라 카드 배경(`bg-muted`)은 없앴지만, `overflow-hidden`은
            // 유지한다 — 고정 반경 궤도가 모바일의 좁은 박스 안에서는 그
            // 박스보다 커져 위 텍스트와 겹치므로, 넘치는 부분을 잘라내는
            // 역할이 여전히 필요하다. aspect도 `imageSrc`(스크린샷) 분기의
            // 16/10보다 가로로 넓은 2/1로 낮춰 높이를 줄임(사용자 명시적
            // 요청, 2026-09-14: "히어로 이미지 높이를 좀 줄여봐" — 반복
            // 요청되어 16/9에서 한 단계 더 낮춤). `PaymentOrbitHeroVisual`의
            // 궤도 반경은 이 컨테이너의 실측 높이(데스크톱 기준 약 300px)에
            // 맞춰 함께 조정해야 잘리지 않는다.
            <div className="relative flex aspect-[2/1] w-full items-center justify-center overflow-hidden">
              {visual}
            </div>
          ) : (
            // ref/exchange/hero.png: 회색 카드 배경 위에 이미지가 얹힌 형태.
            // 여백은 좌측·상단에만 두고 이미지는 우측·하단 모서리에 꽉 붙인다
            // (명시적 요청) — 카드 자체는 overflow-hidden으로 둥근 모서리
            // 밖으로 이미지가 삐져나가지 않게 한다.
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted pt-6 pl-6 lg:pt-8 lg:pl-10">
              <PlaceholderMedia
                src={imageSrc ?? ""}
                alt={imageAlt ?? ""}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                objectPosition="top"
                className="relative h-full w-full rounded-tl-xl border-t border-l border-border"
              />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
