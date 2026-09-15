import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pretendard = localFont({
  src: "../src/shared/assets/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

import {
  buildPageMetadata,
  SITE_NAME,
  SITE_URL,
} from "@/shared/lib/site-metadata";

const SITE_DESCRIPTION =
  "거래 · 결제 · 송금 전 구간을 하나의 라이선스 위에서 운영하는 디지털자산 인프라.";

export const metadata: Metadata = {
  // OG/Twitter의 image url이 상대 경로일 때 절대 URL로 바꿔주는 기준.
  // 이게 없으면 링크 미리보기(카카오톡/슬랙/트위터 등)에서 썸네일이 아예
  // 안 뜬다.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | INEX",
  },
  // Next는 하위 페이지의 `title`을 이 title.template으로만 감싸고,
  // `openGraph`/`twitter`는 별도 top-level 키라서 자동으로 따라가지
  // 않는다 — 하위 페이지가 openGraph를 따로 지정하지 않으면 모든 공유
  // 링크가 이 루트 값("INEX")을 그대로 보여준다. 그래서 각 `src/_pages/*`는
  // 반드시 `buildPageMetadata()`로 자신의 openGraph/twitter를 완전히
  // 재지정해야 한다(부분 덮어쓰기는 images를 날려버리므로 금지 —
  // buildPageMetadata 주석 참고).
  ...buildPageMetadata({
    path: "/",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${interTight.variable} ${pretendard.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
