// Page-local closing CTA. 사용자 요청(명시적)에 따라 다크(#111) 배너 대신
// `widgets/newsletter-signup`과 동일한 `CaseStudyBanner` 그라데이션 배너
// 디자인을 재사용한다. `widgets/cta-section`은 여전히 ui-agent 소유의
// 미구현 스텁(파일 헤더 참고) — 이 페이지는 그 스텁에 의존하거나 새 공용
// 위젯을 만들지 않고 기존 `CaseStudyBanner`를 그대로 가져다 쓴다.
import { ArrowUpRight } from "lucide-react";

import { Button, CaseStudyBanner, InexLogoMark, Reveal } from "@/shared/ui";
import { cryptoTradingCtaContent } from "@/entities/company";

export function CryptoTradingCtaSection() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div">
          <CaseStudyBanner
            tag={cryptoTradingCtaContent.eyebrow}
            title={cryptoTradingCtaContent.title}
            description={cryptoTradingCtaContent.description}
            bodySlot={
              // `CaseStudyBanner`의 `cta` slot은 outline 버튼 1개 + target/rel
              // 제어가 없어 외부 링크 2개(파트너십 문의/API 문서 보기) 모두를
              // 직접 제어할 수 있는 `bodySlot`에 담는다.
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="pill-solid"
                  size="pill-lg"
                  render={
                    <a
                      href={cryptoTradingCtaContent.primaryCta.href}
                      target={cryptoTradingCtaContent.primaryCta.external ? "_blank" : undefined}
                      rel={
                        cryptoTradingCtaContent.primaryCta.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                    />
                  }
                >
                  {cryptoTradingCtaContent.primaryCta.label}
                </Button>
                <Button
                  variant="outline"
                  size="pill-lg"
                  className="gap-2 border-foreground bg-transparent text-foreground hover:bg-background/40"
                  render={
                    <a
                      href={cryptoTradingCtaContent.secondaryCta.href}
                      target={cryptoTradingCtaContent.secondaryCta.external ? "_blank" : undefined}
                      rel={
                        cryptoTradingCtaContent.secondaryCta.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                    />
                  }
                >
                  {cryptoTradingCtaContent.secondaryCta.label}
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
