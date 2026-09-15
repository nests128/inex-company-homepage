import { buildPageMetadata } from "@/shared/lib/site-metadata";

export { CryptoTradingPage as default } from "./ui/crypto-trading-page";

// 루트 레이아웃의 `title.template`("%s | INEX")이 <title> 태그는 감싸주지만
// openGraph/twitter는 별도 키라 자동으로 따라가지 않으므로,
// buildPageMetadata로 이 페이지 전용 OG/Twitter 카드를 완전히 재지정한다.
export const metadata = buildPageMetadata({
  path: "/solutions/crypto-trading",
  title: "크립토 트레이딩 엔진 API",
  description:
    "INEX가 직접 운영·검증한 거래 엔진과 유동성을 임베디드 차트, SDK, 거래·오더북 API로 제공합니다. 별도 거래소 구축 없이 트레이딩 기능을 서비스에 그대로 탑재할 수 있습니다.",
});
