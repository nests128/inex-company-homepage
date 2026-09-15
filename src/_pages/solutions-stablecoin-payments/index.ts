import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/lib/site-metadata";
import { isLocale, defaultLocale } from "@/shared/lib/i18n";

export { StablecoinPaymentsPage as default } from "./ui/stablecoin-payments-page";

const TITLE = { ko: "스테이블코인 결제 인프라", en: "Stablecoin Payments Infrastructure" };
const DESCRIPTION = {
  ko: "차지백 없는 수납·지급과 T+0 정산을 하나의 레일로 연결합니다. VASP 규제 준수 하에 철저한 컴플라이언스를 갖춘 스테이블코인 결제 인프라를 API로 제공합니다.",
  en: "Connect chargeback-free collection, payout, and T+0 settlement on a single rail. A stablecoin payments infrastructure built on strict VASP-compliant compliance, delivered as an API.",
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/solutions/stablecoin-payments">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return buildPageMetadata({
    locale,
    path: "/solutions/stablecoin-payments",
    title: TITLE[locale],
    description: DESCRIPTION[locale],
  });
}
