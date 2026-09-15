import { buildPageMetadata } from "@/shared/lib/site-metadata";

export { CustodyPage as default } from "./ui/custody-page";

export const metadata = buildPageMetadata({
  path: "/solutions/custody",
  title: "커스터디 자산 보관",
  description:
    "다중 승인 정책과 핫·콜드 분리 보관 체계로 고객 자산을 관리합니다. 자체 거래소를 직접 운영하며 다져온 보안·운영 체계를 그대로 커스터디 인프라로 제공합니다.",
});
