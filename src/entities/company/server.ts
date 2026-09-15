// 서버 컴포넌트 전용 로케일 게터 모음. `next/root-params`의 `locale()`은
// Server Component에서만 쓸 수 있고, 이 파일을 import하는 모듈 그래프
//전체가 "서버 전용"으로 취급된다 — 그래서 `entities/company/index.ts`
// (client component도 자유롭게 import하는 배럴)에는 절대 섞지 않는다.
// 클라이언트 컴포넌트가 로케일별 콘텐츠가 필요하면, `index.ts`에서
// `xxxContentByLocale` 순수 데이터를 가져와 자신이 prop으로 받은 `locale`로
// 직접 인덱싱한다(예: `src/shared/ui/nav-bar.tsx`의 `LanguageSwitcher`).
import { locale } from "next/root-params";

import { isLocale, defaultLocale } from "@/shared/lib/i18n";
import { heroContentByLocale, type HeroContent } from "./model/hero-content";
import { navContentByLocale, type NavContent } from "./model/nav-content";
import {
  featureShowcaseContentByLocale,
  featureShowcaseHighlightsByLocale,
  featureShowcaseItemsByLocale,
} from "./model/feature-showcase-content";
import { logoMarqueeContentByLocale } from "./model/logo-marquee-content";
import { integrationsContentByLocale } from "./model/integrations-content";
import { custodyContentByLocale } from "./model/custody-content";
import { missionContentByLocale } from "./model/mission-content";
import { teamContentByLocale } from "./model/team-content";
import { historyContentByLocale } from "./model/history-content";
import {
  cryptoTradingHeroContentByLocale,
  cryptoTradingProvenContentByLocale,
  cryptoTradingStatsByLocale,
  cryptoTradingCapabilitiesContentByLocale,
  cryptoTradingFeaturesByLocale,
  cryptoTradingFeatureGridContentByLocale,
  cryptoTradingFeatureGridItemsByLocale,
  cryptoTradingHowItWorksContentByLocale,
  cryptoTradingHowItWorksStepsByLocale,
  cryptoTradingHowItWorksImageByLocale,
  cryptoTradingCtaContentByLocale,
} from "./model/crypto-trading-content";
import {
  stablecoinPaymentsHeroContentByLocale,
  stablecoinPaymentsFeatureGridContentByLocale,
  stablecoinPaymentsFeatureGridItemsByLocale,
  stablecoinPaymentsCapabilitiesContentByLocale,
  stablecoinPaymentsCapabilitiesByLocale,
  stablecoinPaymentsHowItWorksContentByLocale,
  stablecoinPaymentsFlowByLocale,
  stablecoinPaymentsDemoContentByLocale,
  stablecoinPaymentsDemoStepsByLocale,
  stablecoinPaymentsCtaContentByLocale,
} from "./model/stablecoin-payments-content";

/** Also exported for pages that need the raw locale value itself (e.g. to pass as a prop into a client component). */
export async function getCurrentLocale() {
  const value = await locale();
  return isLocale(value) ? value : defaultLocale;
}

export async function getHeroContent(): Promise<HeroContent> {
  return heroContentByLocale[await getCurrentLocale()];
}

export async function getNavContent(): Promise<NavContent> {
  return navContentByLocale[await getCurrentLocale()];
}

export async function getFeatureShowcaseContent() {
  const current = await getCurrentLocale();
  return {
    content: featureShowcaseContentByLocale[current],
    highlights: featureShowcaseHighlightsByLocale[current],
    items: featureShowcaseItemsByLocale[current],
  };
}

export async function getLogoMarqueeContent() {
  return logoMarqueeContentByLocale[await getCurrentLocale()];
}

export async function getIntegrationsContent() {
  return integrationsContentByLocale[await getCurrentLocale()];
}

export async function getMissionContent() {
  return missionContentByLocale[await getCurrentLocale()];
}

export async function getTeamContent() {
  return teamContentByLocale[await getCurrentLocale()];
}

export async function getHistoryContent() {
  return historyContentByLocale[await getCurrentLocale()];
}

export async function getCustodyContent() {
  const current = await getCurrentLocale();
  return {
    ...custodyContentByLocale[current],
  };
}

export async function getCryptoTradingContent() {
  const current = await getCurrentLocale();
  return {
    hero: cryptoTradingHeroContentByLocale[current],
    proven: cryptoTradingProvenContentByLocale[current],
    stats: cryptoTradingStatsByLocale[current],
    capabilitiesContent: cryptoTradingCapabilitiesContentByLocale[current],
    features: cryptoTradingFeaturesByLocale[current],
    featureGridContent: cryptoTradingFeatureGridContentByLocale[current],
    featureGridItems: cryptoTradingFeatureGridItemsByLocale[current],
    howItWorksContent: cryptoTradingHowItWorksContentByLocale[current],
    howItWorksSteps: cryptoTradingHowItWorksStepsByLocale[current],
    howItWorksImage: cryptoTradingHowItWorksImageByLocale[current],
    cta: cryptoTradingCtaContentByLocale[current],
  };
}

export async function getStablecoinPaymentsContent() {
  const current = await getCurrentLocale();
  return {
    hero: stablecoinPaymentsHeroContentByLocale[current],
    featureGridContent: stablecoinPaymentsFeatureGridContentByLocale[current],
    featureGridItems: stablecoinPaymentsFeatureGridItemsByLocale[current],
    capabilitiesContent: stablecoinPaymentsCapabilitiesContentByLocale[current],
    capabilities: stablecoinPaymentsCapabilitiesByLocale[current],
    howItWorksContent: stablecoinPaymentsHowItWorksContentByLocale[current],
    flow: stablecoinPaymentsFlowByLocale[current],
    demoContent: stablecoinPaymentsDemoContentByLocale[current],
    demoSteps: stablecoinPaymentsDemoStepsByLocale[current],
    cta: stablecoinPaymentsCtaContentByLocale[current],
  };
}
