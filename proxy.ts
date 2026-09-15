import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next 16(App Router)의 `middleware` 파일 컨벤션은 `proxy`로 개명됐다
// (node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md
// "The `middleware` file convention is deprecated and has been renamed to
// `proxy`") — 옛 이름(`middleware.ts`)으로 만들면 아예 실행되지 않는다.
//
// URL 전략: 한국어는 이미 색인된 루트 경로를 그대로 유지해야 하므로(커밋
// 534cde3의 sitemap/OG 작업이 전제한 URL들), `/company` 같은 무접두사
// 경로는 리다이렉트가 아니라 **내부 rewrite**로 `/ko/company`에 매핑한다 —
// 리다이렉트였다면 이미 색인된 모든 URL이 301을 타게 된다. 영어만 실제
// `/en/*` 접두사 경로를 그대로 통과시킨다.
const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/en/") ||
    pathname === "/en" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/ko${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // sitemap.xml, robots.txt 등 app/ 루트의 특수 파일과 api/, 정적 자산은
    // 제외 — 이 파일들은 `app/[locale]/` 밖에 그대로 남아 있다.
    "/((?!_next|api|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
