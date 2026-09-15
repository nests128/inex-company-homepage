import { NavBar } from "@/widgets/nav-bar";
import { Footer } from "@/widgets/footer";
import { SolutionHero } from "@/widgets/solution-hero";
import { getNavContent, getCryptoTradingContent, getCurrentLocale } from "@/entities/company/server";

import { FeatureGridSection } from "./feature-grid-section";
import { ProvenSection } from "./proven-section";
import { CapabilitiesSection } from "./capabilities-section";
import { CryptoTradingCtaSection } from "./crypto-trading-cta-section";

export async function CryptoTradingPage() {
  const [nav, content, locale] = await Promise.all([
    getNavContent(),
    getCryptoTradingContent(),
    getCurrentLocale(),
  ]);

  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <SolutionHero
          title={content.hero.title}
          description={content.hero.description}
          imageSrc={content.hero.imageSrc}
          imageAlt={content.hero.imageAlt}
          exchangeLink={nav.exchangeLink}
          appLinks={content.hero.appLinks}
        />
        <FeatureGridSection />
        <ProvenSection />
        <CapabilitiesSection locale={locale} />
        <CryptoTradingCtaSection />
      </main>
      <Footer />
    </div>
  );
}
