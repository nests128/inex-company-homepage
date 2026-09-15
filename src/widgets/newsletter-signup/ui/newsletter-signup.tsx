import { locale as getLocale } from "next/root-params"

import {
  CaseStudyBanner,
  InexLogoMark,
  NEWSLETTER_CONSENT_NOTICE_BY_LOCALE,
  NewsletterSubscribeForm,
  Reveal,
} from "@/shared/ui"
import { newsletterHeroContentByLocale } from "@/entities/company"
import { isLocale, defaultLocale } from "@/shared/lib/i18n"

export async function NewsletterSignup() {
  const rawLocale = await getLocale()
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale
  const newsletterHeroContent = newsletterHeroContentByLocale[locale]

  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div">
          <CaseStudyBanner
            tag={newsletterHeroContent.tag}
            title={newsletterHeroContent.title}
            description={newsletterHeroContent.description}
            bodySlot={<NewsletterSubscribeForm locale={locale} consentNotice={null} />}
            visual={
              <span className="flex flex-col items-center gap-2 text-foreground/80">
                <InexLogoMark width={64} height={26} />
                <span className="text-xs font-bold tracking-[.2em]">NEWSLETTER</span>
              </span>
            }
            visualFootnote={NEWSLETTER_CONSENT_NOTICE_BY_LOCALE[locale]}
          />
        </Reveal>
      </div>
    </section>
  )
}
