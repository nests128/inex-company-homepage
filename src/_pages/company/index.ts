import { buildPageMetadata } from "@/shared/lib/site-metadata";

export { CompanyPage as default } from "./ui/company-page";

// 루트 레이아웃의 `title.template`("%s | INEX")이 <title> 태그는 감싸주지만
// openGraph/twitter는 별도 키라 자동으로 따라가지 않으므로,
// buildPageMetadata로 이 페이지 전용 OG/Twitter 카드를 완전히 재지정한다.
export const metadata = buildPageMetadata({
  path: "/company",
  title: "회사소개",
  description:
    "디지털자산 금융 인프라의 표준을 만드는 INEX의 비전과 팀, 그리고 걸어온 발자취를 소개합니다.",
});
