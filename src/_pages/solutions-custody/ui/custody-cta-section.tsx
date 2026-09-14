// Page-local closing CTA. 다른 두 솔루션 페이지와 동일하게 `CaseStudyBanner`
// 그라데이션 배너를 재사용한다.
import { ArrowUpRight } from "lucide-react";

import { Button, CaseStudyBanner, InexLogoMark, Reveal } from "@/shared/ui";
import { custodyCtaContent } from "@/entities/company";

export function CustodyCtaSection() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div">
          <CaseStudyBanner
            tag={custodyCtaContent.eyebrow}
            title={custodyCtaContent.title}
            description={custodyCtaContent.description}
            bodySlot={
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="pill-solid"
                  size="pill-lg"
                  render={
                    <a
                      href={custodyCtaContent.primaryCta.href}
                      target={custodyCtaContent.primaryCta.external ? "_blank" : undefined}
                      rel={custodyCtaContent.primaryCta.external ? "noopener noreferrer" : undefined}
                    />
                  }
                >
                  {custodyCtaContent.primaryCta.label}
                </Button>
                <Button
                  variant="outline"
                  size="pill-lg"
                  className="gap-2 border-foreground bg-transparent text-foreground hover:bg-background/40"
                  render={
                    <a
                      href={custodyCtaContent.secondaryCta.href}
                      target={custodyCtaContent.secondaryCta.external ? "_blank" : undefined}
                      rel={custodyCtaContent.secondaryCta.external ? "noopener noreferrer" : undefined}
                    />
                  }
                >
                  {custodyCtaContent.secondaryCta.label}
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
