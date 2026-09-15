import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/lib/site-metadata";
import { isLocale, defaultLocale } from "@/shared/lib/i18n";

export { CustodyPage as default } from "./ui/custody-page";

const TITLE = { ko: "커스터디 자산 보관", en: "Custody Asset Storage" };
const DESCRIPTION = {
  ko: "다중 승인 정책과 핫·콜드 분리 보관 체계로 고객 자산을 관리합니다. 자체 거래소를 직접 운영하며 다져온 보안·운영 체계를 그대로 커스터디 인프라로 제공합니다.",
  en: "Manage client assets with multi-approval policies and hot/cold segregated storage. The same security and operations discipline built running our own exchange, delivered as custody infrastructure.",
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/solutions/custody">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return buildPageMetadata({
    locale,
    path: "/solutions/custody",
    title: TITLE[locale],
    description: DESCRIPTION[locale],
  });
}
