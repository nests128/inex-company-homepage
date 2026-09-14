import { NavBar } from "@/widgets/nav-bar";
import { Footer } from "@/widgets/footer";
import { SolutionHero } from "@/widgets/solution-hero";
import { custodyHeroContent } from "@/entities/company";

import { CustodyApprovalHeroVisual } from "./custody-approval-hero-visual";
import { FeatureGridSection } from "./feature-grid-section";
import { ProvenSection } from "./proven-section";
import { CapabilitiesSection } from "./capabilities-section";
import { HowItWorksSection } from "./how-it-works-section";
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
          visual={<CustodyApprovalHeroVisual className="h-full" />}
          visualClassName="aspect-[4/3] lg:aspect-[2/1]"
        />
        <FeatureGridSection />
        <ProvenSection />
        <CapabilitiesSection />
        <HowItWorksSection />
        <CustodyCtaSection />
      </main>
      <Footer />
    </div>
  );
}
