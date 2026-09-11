import { notFound } from "next/navigation";

import { NavBar } from "@/widgets/nav-bar";
import { Footer } from "@/widgets/footer";
import { NewsDetailSection } from "@/widgets/news-detail";
import { fetchNewsPosts, fetchPostBySlug } from "@/shared/lib/confluence";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const MAX_RELATED_POSTS = 3;

export async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  const post = await fetchPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const allPosts = await fetchNewsPosts();
  const relatedPosts = allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, MAX_RELATED_POSTS);

  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <NewsDetailSection post={post} relatedPosts={relatedPosts} />
      </main>
      <Footer />
    </div>
  );
}
