import { NavBar } from "@/widgets/nav-bar";
import { Footer } from "@/widgets/footer";
import { NewsListSection } from "@/widgets/news-list";

type NewsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export async function NewsPage({ searchParams }: NewsPageProps) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  return (
    <div className="flex min-h-svh flex-col">
      <NavBar />
      <main>
        <NewsListSection page={page} />
      </main>
      <Footer />
    </div>
  );
}
