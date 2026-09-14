// Page-local closing CTA. 크립토 트레이딩 페이지와 동일한 `CaseStudyBanner`
// 그라데이션 배너 재사용.
import { ArrowUpRight } from "lucide-react";

import { Button, CaseStudyBanner, InexLogoMark, Reveal } from "@/shared/ui";
import { stablecoinPaymentsCtaContent } from "@/entities/company";

export function StablecoinPaymentsCtaSection() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div">
          <CaseStudyBanner
            tag={stablecoinPaymentsCtaContent.eyebrow}
            title={stablecoinPaymentsCtaContent.title}
            description={stablecoinPaymentsCtaContent.description}
            bodySlot={
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="pill-solid"
                  size="pill-lg"
                  render={
                    <a
                      href={stablecoinPaymentsCtaContent.primaryCta.href}
                      target={stablecoinPaymentsCtaContent.primaryCta.external ? "_blank" : undefined}
                      rel={
                        stablecoinPaymentsCtaContent.primaryCta.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                    />
                  }
                >
                  {stablecoinPaymentsCtaContent.primaryCta.label}
                </Button>
                <Button
                  variant="outline"
                  size="pill-lg"
                  className="gap-2 border-foreground bg-transparent text-foreground hover:bg-background/40"
                  render={
                    <a
                      href={stablecoinPaymentsCtaContent.secondaryCta.href}
                      target={
                        stablecoinPaymentsCtaContent.secondaryCta.external ? "_blank" : undefined
                      }
                      rel={
                        stablecoinPaymentsCtaContent.secondaryCta.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                    />
                  }
                >
                  {stablecoinPaymentsCtaContent.secondaryCta.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            }
            visual={
              <span className="flex flex-col items-center gap-2 text-foreground/80">
                <InexLogoMark width={64} height={26} />
                <span className="text-xs font-bold tracking-[.2em]">SOLUTION</span>
              </span>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
