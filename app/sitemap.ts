import type { MetadataRoute } from "next";

import { SITE_URL } from "@/shared/lib/site-metadata";

// 정적 라우트만 포함한다. `/news/[slug]`는 외부 Confluence API에서 동적으로
// 목록을 가져와야 해서 이 파일의 범위를 벗어난다 — 뉴스 상세 페이지를
// sitemap에 포함하려면 별도로 해당 API를 조회하는 로직이 필요하다.
const STATIC_ROUTES = [
  "",
  "/company",
  "/news",
  "/solutions/crypto-trading",
  "/solutions/stablecoin-payments",
  "/solutions/custody",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
