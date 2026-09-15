import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/lib/site-metadata";
import { isLocale, defaultLocale } from "@/shared/lib/i18n";

export { CryptoTradingPage as default } from "./ui/crypto-trading-page";

const TITLE = { ko: "크립토 트레이딩 엔진 API", en: "Crypto Trading Engine API" };
const DESCRIPTION = {
  ko: "INEX가 직접 운영·검증한 거래 엔진과 유동성을 임베디드 차트, SDK, 거래·오더북 API로 제공합니다. 별도 거래소 구축 없이 트레이딩 기능을 서비스에 그대로 탑재할 수 있습니다.",
  en: "Embed the trading engine and liquidity INEX runs and verifies in its own exchange — via embeddable charts, an SDK, and trade/order book APIs. Add trading to your product without building an exchange.",
};

// 루트 레이아웃의 `title.template`("%s | INEX")이 <title> 태그는 감싸주지만
// openGraph/twitter는 별도 키라 자동으로 따라가지 않으므로,
// buildPageMetadata로 이 페이지 전용 OG/Twitter 카드를 완전히 재지정한다.
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/solutions/crypto-trading">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return buildPageMetadata({
    locale,
    path: "/solutions/crypto-trading",
    title: TITLE[locale],
    description: DESCRIPTION[locale],
  });
}
