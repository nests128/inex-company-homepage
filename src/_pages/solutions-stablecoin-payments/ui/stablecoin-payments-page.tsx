import { NavBar } from "@/widgets/nav-bar";
import { Footer } from "@/widgets/footer";
import { SolutionHero } from "@/widgets/solution-hero";
import { FaqSection } from "@/shared/ui";
import { getStablecoinPaymentsContent, getCurrentLocale } from "@/entities/company/server";

import { FeatureGridSection } from "./feature-grid-section";
import { CapabilitiesSection } from "./capabilities-section";
import { DemoSection } from "./demo-section";
import { HowItWorksSection } from "./how-it-works-section";
import { PaymentOrbitHeroVisual } from "./payment-orbit-hero-visual";
import { StablecoinPaymentsCtaSection } from "./stablecoin-payments-cta-section";

export async function StablecoinPaymentsPage() {
  const [content, locale] = await Promise.all([getStablecoinPaymentsContent(), getCurrentLocale()]);

  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <SolutionHero
          title={content.hero.title}
          description={content.hero.description}
          visual={<PaymentOrbitHeroVisual className="h-full" />}
          // 사용자 명시적 요청(2026-09-14) — 기본 lg:py-24가 궤도 비주얼에
          // 비해 과하게 커 보여 이 페이지만 줄임(크립토 트레이딩 페이지는
          // 스크린샷 히어로라 기본값 그대로 유지).
          className="py-12 lg:py-16"
          // 두 문장 description(레일 연결 + VASP 컴플라이언스)이 기본
          // max-w-xl에서 둘째 문장이 두 줄로 넘쳐 총 3줄이 되는 문제 수정
          // (사용자 요청, 2026-09-15: "가로영역을 좀 늘려볼래?"). 영어
          // 문장은 길이가 달라 로케일별로 다른 값을 준다 — 영어는 한 문장이
          // 이미 길어 3xl로 더 넓힌다.
          descriptionClassName={locale === "en" ? "max-w-3xl" : "max-w-2xl"}
        />
        {/* 섹션 순서는 ref/pay/temp3.png+Temp4.png(bridge.xyz 스크린샷)와
            동일: Key use cases -> Tools to build -> How it works -> Demo. */}
        <FeatureGridSection />
        <CapabilitiesSection />
        <HowItWorksSection />
        <DemoSection locale={locale} />
        <FaqSection eyebrow={content.faqHeader.eyebrow} title={content.faqHeader.title} items={content.faq} />
        <StablecoinPaymentsCtaSection />
      </main>
      <Footer />
    </div>
  );
}
