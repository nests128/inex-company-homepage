import { NavBar } from "@/widgets/nav-bar";
import { Footer } from "@/widgets/footer";
import { SolutionHero } from "@/widgets/solution-hero";
import { stablecoinPaymentsHeroContent } from "@/entities/company";

import { FeatureGridSection } from "./feature-grid-section";
import { CapabilitiesSection } from "./capabilities-section";
import { DemoSection } from "./demo-section";
import { HowItWorksSection } from "./how-it-works-section";
import { PaymentOrbitHeroVisual } from "./payment-orbit-hero-visual";
import { StablecoinPaymentsCtaSection } from "./stablecoin-payments-cta-section";

export function StablecoinPaymentsPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <SolutionHero
          title={stablecoinPaymentsHeroContent.title}
          description={stablecoinPaymentsHeroContent.description}
          visual={<PaymentOrbitHeroVisual className="h-full" />}
          // 사용자 명시적 요청(2026-09-14) — 기본 lg:py-24가 궤도 비주얼에
          // 비해 과하게 커 보여 이 페이지만 줄임(크립토 트레이딩 페이지는
          // 스크린샷 히어로라 기본값 그대로 유지).
          className="py-12 lg:py-16"
        />
        {/* 섹션 순서는 ref/pay/temp3.png+Temp4.png(bridge.xyz 스크린샷)와
            동일: Key use cases -> Tools to build -> How it works -> Demo. */}
        <FeatureGridSection />
        <CapabilitiesSection />
        <HowItWorksSection />
        <DemoSection />
        <StablecoinPaymentsCtaSection />
      </main>
      <Footer />
    </div>
  );
}
