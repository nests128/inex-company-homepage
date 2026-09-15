import { buildPageMetadata } from "@/shared/lib/site-metadata";

export { StablecoinPaymentsPage as default } from "./ui/stablecoin-payments-page";

export const metadata = buildPageMetadata({
  path: "/solutions/stablecoin-payments",
  title: "스테이블코인 결제 인프라",
  description:
    "차지백 없는 수납·지급과 T+0 정산을 하나의 레일로 연결합니다. 국경과 은행 영업시간에 묶이지 않는 스테이블코인 결제 인프라를 API로 제공합니다.",
});
