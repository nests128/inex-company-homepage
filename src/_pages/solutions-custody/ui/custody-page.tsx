import { NavBar } from "@/widgets/nav-bar";
import { Footer } from "@/widgets/footer";
import { SolutionHero } from "@/widgets/solution-hero";
import { FaqSection } from "@/shared/ui";
import { getCustodyContent } from "@/entities/company/server";

import { CustodyVaultHeroVisual } from "./custody-vault-hero-visual";
import { FeatureGridSection } from "./feature-grid-section";
import { ProvenSection } from "./proven-section";
import { CapabilitiesSection } from "./capabilities-section";
import { CustodyCtaSection } from "./custody-cta-section";

export async function CustodyPage() {
  const custodyContent = await getCustodyContent();

  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <SolutionHero
          title={custodyContent.hero.title}
          description={custodyContent.hero.description}
          visual={<CustodyVaultHeroVisual className="h-full" />}
          visualClassName="aspect-[4/3] lg:aspect-[2/1]"
        />
        <FeatureGridSection />
        <ProvenSection />
        <CapabilitiesSection />
        <FaqSection
          eyebrow={custodyContent.faqHeader.eyebrow}
          title={custodyContent.faqHeader.title}
          items={custodyContent.faq}
        />
        <CustodyCtaSection />
      </main>
      <Footer />
    </div>
  );
}
