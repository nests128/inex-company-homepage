import { buildPageMetadata } from "@/shared/lib/site-metadata";

export { StablecoinPaymentsPage as default } from "./ui/stablecoin-payments-page";

export const metadata = buildPageMetadata({
  path: "/solutions/stablecoin-payments",
  title: "스테이블코인 결제 인프라",
  description:
    "차지백 없는 수납·지급과 T+0 정산을 하나의 레일로 연결합니다. VASP 규제 준수 하에 철저한 컴플라이언스를 갖춘 스테이블코인 결제 인프라를 API로 제공합니다.",
});
