import { NavBar } from "@/widgets/nav-bar";
import { Footer } from "@/widgets/footer";
import { SolutionHero } from "@/widgets/solution-hero";
import { cryptoTradingHeroContent } from "@/entities/company";
import { getNavContent } from "@/entities/company/server";

import { FeatureGridSection } from "./feature-grid-section";
import { ProvenSection } from "./proven-section";
import { CapabilitiesSection } from "./capabilities-section";
import { CryptoTradingCtaSection } from "./crypto-trading-cta-section";

export async function CryptoTradingPage() {
  const nav = await getNavContent();

  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <SolutionHero
          title={cryptoTradingHeroContent.title}
          description={cryptoTradingHeroContent.description}
          imageSrc={cryptoTradingHeroContent.imageSrc}
          imageAlt={cryptoTradingHeroContent.imageAlt}
          exchangeLink={nav.exchangeLink}
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
