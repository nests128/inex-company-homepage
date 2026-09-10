import {
  CaseStudyBanner,
  InexLogoMark,
  NEWSLETTER_CONSENT_NOTICE,
  NewsletterSubscribeForm,
  Reveal,
} from "@/shared/ui"
import { newsletterHeroContent } from "@/entities/company"

export function NewsletterSignup() {
  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div">
          <CaseStudyBanner
            tag={newsletterHeroContent.tag}
            title={newsletterHeroContent.title}
            description={newsletterHeroContent.description}
            bodySlot={<NewsletterSubscribeForm consentNotice={null} />}
            visual={
              <span className="flex flex-col items-center gap-2 text-foreground/80">
                <InexLogoMark width={64} height={26} />
                <span className="text-xs font-bold tracking-[.2em]">NEWSLETTER</span>
              </span>
            }
            visualFootnote={NEWSLETTER_CONSENT_NOTICE}
          />
        </Reveal>
      </div>
    </section>
  )
}
