// Page-local closing CTA. 다른 두 솔루션 페이지와 동일하게 `CaseStudyBanner`
// 그라데이션 배너를 재사용한다.
import { ArrowUpRight } from "lucide-react";

import { Button, CaseStudyBanner, InexLogoMark, Reveal } from "@/shared/ui";
import { getCustodyContent } from "@/entities/company/server";

export async function CustodyCtaSection() {
  const { cta } = await getCustodyContent();

  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div">
          <CaseStudyBanner
            tag={cta.eyebrow}
            title={cta.title}
            description={cta.description}
            bodySlot={
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="pill-solid"
                  size="pill-lg"
                  render={
                    <a
                      href={cta.primaryCta.href}
                      target={cta.primaryCta.external ? "_blank" : undefined}
                      rel={cta.primaryCta.external ? "noopener noreferrer" : undefined}
                    />
                  }
                >
                  {cta.primaryCta.label}
                </Button>
                <Button
                  variant="outline"
                  size="pill-lg"
                  className="gap-2 border-foreground bg-transparent text-foreground hover:bg-background/40"
                  render={
                    <a
                      href={cta.secondaryCta.href}
                      target={cta.secondaryCta.external ? "_blank" : undefined}
                      rel={cta.secondaryCta.external ? "noopener noreferrer" : undefined}
                    />
                  }
                >
                  {cta.secondaryCta.label}
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
