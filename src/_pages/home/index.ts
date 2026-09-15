import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/lib/site-metadata";
import { isLocale, defaultLocale } from "@/shared/lib/i18n";

export { HomePage as default } from "./ui/home-page";

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
