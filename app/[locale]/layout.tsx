import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";

import {
  buildOrganizationJsonLd,
  buildPageMetadata,
  buildWebSiteJsonLd,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/shared/lib/site-metadata";
import { isLocale, locales } from "@/shared/lib/i18n";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pretendard = localFont({
  src: "../../src/shared/assets/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return {
    // OG/Twitter의 image url이 상대 경로일 때 절대 URL로 바꿔주는 기준.
    // 이게 없으면 링크 미리보기(카카오톡/슬랙/트위터 등)에서 썸네일이 아예
    // 안 뜬다.
    metadataBase: new URL(SITE_URL),
    // Next는 하위 페이지의 `title`을 이 title.template으로만 감싸고,
    // `openGraph`/`twitter`는 별도 top-level 키라서 자동으로 따라가지
    // 않는다 — 하위 페이지가 openGraph를 따로 지정하지 않으면 모든 공유
    // 링크가 이 루트 값("INEX")을 그대로 보여준다. 그래서 각 `src/_pages/*`는
    // 반드시 `buildPageMetadata()`로 자신의 openGraph/twitter를 완전히
    // 재지정해야 한다(부분 덮어쓰기는 images를 날려버리므로 금지 —
    // buildPageMetadata 주석 참고).
    ...buildPageMetadata({
      locale,
      path: "/",
      title: SITE_NAME,
      description: SITE_DESCRIPTION[locale],
    }),
    // `buildPageMetadata`가 반환하는 `title`은 plain string("INEX")이라,
    // 스프레드 순서상 위에 두면 이 template 객체를 통째로 덮어써 하위
    // 페이지의 title.template 상속 자체가 사라진다(하위 페이지 탭에 "| INEX"가
    // 전혀 안 붙던 버그). 반드시 스프레드 뒤에 다시 지정할 것.
    title: {
      default: SITE_NAME,
      template: "INEX | %s",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Organization/WebSite 구조화 데이터(AEO) — 검색엔진과 AI 답변 엔진이
  // 회사 정보를 정확한 형태로 인용할 수 있도록. `<` 이스케이프는 Next 공식
  // JSON-LD 가이드가 명시한 XSS 방지 조치(JSON.stringify는 스스로 sanitize하지
  // 않음).
  const organizationJsonLd = JSON.stringify(buildOrganizationJsonLd(locale)).replace(
    /</g,
    "\\u003c"
  );
  const websiteJsonLd = JSON.stringify(buildWebSiteJsonLd(locale)).replace(/</g, "\\u003c");

  return (
    <html
      lang={locale}
      className={`${interTight.variable} ${pretendard.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteJsonLd }} />
        {children}
      </body>
    </html>
  );
}
