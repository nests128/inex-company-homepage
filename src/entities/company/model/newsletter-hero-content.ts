// Copy adapted from the sibling `company-homepage` project's
// `newsPage.cta.title` / `newsPage.cta.body` (already real INEX copy).
export const newsletterHeroContent = {
  tag: "Newsletter",
  title: "INEX의 새 소식을\n가장 먼저 받아보세요",
  description: "제품 업데이트, 파트너십 소식, 보도자료까지 뉴스레터로 정리해서 보내드립니다.",
  // Unused since `widgets/newsletter-signup` now renders an inline
  // `NewsletterSubscribeForm` (via `CaseStudyBanner`'s `content` slot)
  // instead of a link/button — left in place per project convention.
  cta: {
    label: "구독하기",
    href: "#",
  },
}
