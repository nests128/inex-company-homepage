import { locale as getLocale } from "next/root-params";

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
import { isLocale, defaultLocale } from "@/shared/lib/i18n";

export async function HomePage() {
  const rawLocale = await getLocale();
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <Hero />
        <LogoMarquee />
        <FeatureShowcase />
        <OperationsSplit locale={locale} />
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
