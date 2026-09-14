import { NavBar } from "@/widgets/nav-bar";
import { Footer } from "@/widgets/footer";
import { SolutionHero } from "@/widgets/solution-hero";
import { custodyHeroContent } from "@/entities/company";

import { CustodyVaultHeroVisual } from "./custody-vault-hero-visual";
import { FeatureGridSection } from "./feature-grid-section";
import { ProvenSection } from "./proven-section";
import { CapabilitiesSection } from "./capabilities-section";
import { CustodyCtaSection } from "./custody-cta-section";

export function CustodyPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <SolutionHero
          eyebrow={custodyHeroContent.eyebrow}
          title={custodyHeroContent.title}
          description={custodyHeroContent.description}
          visual={<CustodyVaultHeroVisual className="h-full" />}
          visualClassName="aspect-[4/3] lg:aspect-[2/1]"
        />
        <FeatureGridSection />
        <ProvenSection />
        <CapabilitiesSection />
        <CustodyCtaSection />
      </main>
      <Footer />
    </div>
  );
}
