import { NavBar } from "@/widgets/nav-bar";
import { Hero } from "@/widgets/hero";
import { LogoMarquee } from "@/widgets/logo-marquee";
import { FeatureShowcase } from "@/widgets/feature-showcase";
import { OperationsSplit } from "@/widgets/operations-split";
import { AccountHighlight } from "@/widgets/account-highlight";
import { IntegrationsShowcase } from "@/widgets/integrations-showcase";
import { NewsletterSignup } from "@/widgets/newsletter-signup";
import { SuccessStories } from "@/widgets/success-stories";
import { TrustGrid } from "@/widgets/trust-grid";
import { Footer } from "@/widgets/footer";

export function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <Hero />
        <LogoMarquee />
        <FeatureShowcase />
        <OperationsSplit />
        <AccountHighlight />
        <IntegrationsShowcase />
        <SuccessStories />
        <TrustGrid />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
}
