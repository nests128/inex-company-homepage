import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/lib/site-metadata";
import { isLocale, defaultLocale } from "@/shared/lib/i18n";

export { HomePage as default } from "./ui/home-page";

// 홈페이지(`app/[locale]/page.tsx`)는 `app/[locale]/layout.tsx`와 같은 라우트
// 세그먼트에 속해서 그 레이아웃의 `title.template`이 적용되지 않는다(Next.js
// 공식 문서: "title.template defined in layout.js will not apply to a title
// defined in a page.js of the same route segment") — 그래서 유일하게 이
// 페이지만 "INEX | ..." 접두사를 직접 완성형으로 넣는다.
const TITLE = { ko: "INEX | 디지털자산 인프라", en: "INEX | Digital Asset Infrastructure" };
const DESCRIPTION = {
  ko: "거래 · 결제 · 송금 전 구간을 하나의 라이선스 위에서 운영하는 디지털자산 인프라.",
  en: "Digital asset infrastructure operating trading, payments, and remittance end-to-end under a single license.",
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return buildPageMetadata({
    locale,
    path: "/",
    title: TITLE[locale],
    description: DESCRIPTION[locale],
  });
}
