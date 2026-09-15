import type { Locale } from "@/shared/lib/i18n"

interface NewsletterHeroContent {
  tag: string
  title: string
  description: string
  // Unused since `widgets/newsletter-signup` now renders an inline
  // `NewsletterSubscribeForm` (via `CaseStudyBanner`'s `content` slot)
  // instead of a link/button — left in place per project convention.
  cta: { label: string; href: string }
}

// Copy adapted from the sibling `company-homepage` project's
// `newsPage.cta.title` / `newsPage.cta.body` (already real INEX copy).
export const newsletterHeroContentByLocale: Record<Locale, NewsletterHeroContent> = {
  ko: {
    tag: "Newsletter",
    title: "INEX의 새 소식을\n가장 먼저 받아보세요",
    description: "일일 시장 동향, 시장 요약, 주요 뉴스를 정리해서 보내드립니다.",
    cta: { label: "구독하기", href: "#" },
  },
  en: {
    tag: "Newsletter",
    title: "Be the first to hear\nINEX's latest news",
    description: "We send a curated roundup of daily market trends, summaries, and key news.",
    cta: { label: "Subscribe", href: "#" },
  },
}
