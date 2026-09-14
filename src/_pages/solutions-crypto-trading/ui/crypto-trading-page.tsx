import { NavBar } from "@/widgets/nav-bar";
import { Footer } from "@/widgets/footer";
import { SolutionHero } from "@/widgets/solution-hero";
import { cryptoTradingHeroContent, navExchangeLink } from "@/entities/company";

import { FeatureGridSection } from "./feature-grid-section";
import { ProvenSection } from "./proven-section";
import { CapabilitiesSection } from "./capabilities-section";
import { CryptoTradingCtaSection } from "./crypto-trading-cta-section";

export function CryptoTradingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <SolutionHero
          title={cryptoTradingHeroContent.title}
          description={cryptoTradingHeroContent.description}
          imageSrc={cryptoTradingHeroContent.imageSrc}
          imageAlt={cryptoTradingHeroContent.imageAlt}
          exchangeLink={navExchangeLink}
          appLinks={cryptoTradingHeroContent.appLinks}
        />
        <FeatureGridSection />
        <ProvenSection />
        <CapabilitiesSection />
        <CryptoTradingCtaSection />
      </main>
      <Footer />
    </div>
  );
}
