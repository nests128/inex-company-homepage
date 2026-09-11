import type { Metadata } from "next";

import { fetchPostBySlug } from "@/shared/lib/confluence";

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
    return {
      title: "INEX | 소식",
      description: "INEX의 소식과 업데이트를 확인하세요.",
    };
  }

  return {
    title: `INEX | ${post.title}`,
    description: post.excerpt,
  };
}
