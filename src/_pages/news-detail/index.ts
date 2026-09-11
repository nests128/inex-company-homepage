import type { Metadata } from "next";

import { fetchPostBySlug } from "@/shared/lib/confluence";
import { buildPageMetadata } from "@/shared/lib/site-metadata";

export { NewsDetailPage as default } from "./ui/news-detail-page";

type NewsDetailPageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: NewsDetailPageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return buildPageMetadata({
      path: `/news/${slug}`,
      title: "INEX 소식",
      description: "INEX의 소식과 업데이트를 확인하세요.",
    });
  }

  return buildPageMetadata({
    path: `/news/${slug}`,
    title: post.title,
    description: post.excerpt,
    // 게시글 자체 썸네일이 있으면 우선 사용 — 이 프록시(`/api/confluence-image`)는
    // 서버에서 Confluence 인증 요청을 매번 새로 트리거하므로, 실패 시엔
    // buildPageMetadata의 기본 브랜드 카드로 자연스럽게 폴백된다.
    imageUrl: post.thumbnailUrl,
  });
}
