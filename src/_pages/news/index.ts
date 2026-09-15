import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/lib/site-metadata";
import { isLocale, defaultLocale } from "@/shared/lib/i18n";

export { NewsPage as default } from "./ui/news-page";

// TODO(page-agent/seo-agent): 실제 카피/설명으로 교체.
const TITLE = { ko: "소식", en: "News" };
const DESCRIPTION = {
  ko: "INEX의 소식과 업데이트를 확인하세요.",
  en: "Check out news and updates from INEX.",
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return buildPageMetadata({
    locale,
    path: "/news",
    title: TITLE[locale],
    description: DESCRIPTION[locale],
  });
}
