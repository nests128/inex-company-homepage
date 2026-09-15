import type { Metadata } from "next";

import { fetchPostBySlug } from "@/shared/lib/confluence";
import { buildPageMetadata } from "@/shared/lib/site-metadata";
import { isLocale, defaultLocale } from "@/shared/lib/i18n";

export { NewsDetailPage as default } from "./ui/news-detail-page";

// 뉴스 게시글 본문은 Confluence(한글 CMS)에서 그대로 가져오며 번역하지
// 않는다 — 영문 로케일에서도 한글 게시글 그대로 노출(사용자 확정,
// 2026-09-15). 이 fallback 카피만 로케일별로 다르다.
const FALLBACK_TITLE = { ko: "소식", en: "News" };
const FALLBACK_DESCRIPTION = {
  ko: "INEX의 소식과 업데이트를 확인하세요.",
  en: "Check out news and updates from INEX.",
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news/[slug]">): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return buildPageMetadata({
      locale,
      path: `/news/${slug}`,
      title: FALLBACK_TITLE[locale],
      description: FALLBACK_DESCRIPTION[locale],
    });
  }

  return buildPageMetadata({
    locale,
    path: `/news/${slug}`,
    title: post.title,
    description: post.excerpt,
    // 게시글 자체 썸네일이 있으면 우선 사용 — 이 프록시(`/api/confluence-image`)는
    // 서버에서 Confluence 인증 요청을 매번 새로 트리거하므로, 실패 시엔
    // buildPageMetadata의 기본 브랜드 카드로 자연스럽게 폴백된다.
    imageUrl: post.thumbnailUrl,
  });
}
