import type { NextConfig } from "next";

// 이미지 CDN 프록시: 실제 CDN 도메인을 next.config에 직접 노출하지 않고
// /cdn/* 경로로 same-origin 프록시하여 next/image의 remotePatterns 설정 없이도
// 이미지를 서빙할 수 있게 한다. 로고 마퀴 등에서 `/cdn/image/...` 경로를 쓰면
// 아래 rewrite를 통해 실제 CDN 이미지가 로드된다.
//
// NEXT_PUBLIC_EX_IMG_CDN 환경변수로 CDN 베이스 URL을 지정할 수 있다.
// 미설정 시 기본값(DEFAULT_CDN_URL)으로 폴백한다. 값을 로컬에서 바꾸려면
// `.env.local`에 다음을 추가한다 (저장소에는 커밋하지 않음):
//   NEXT_PUBLIC_EX_IMG_CDN=https://cdn.inexcoin.com/homepage
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "www.inexcoin.com" }],
    // 브랜드/제품 이미지는 자주 안 바뀌므로 기본 4시간보다 길게 캐싱
    minimumCacheTTL: 604800, // 7일
    // 기본 75 외에, 텍스트/세부 묘사가 있는 사진(예: operations-split 결제
    // 이미지)에서 기본 화질로는 재인코딩 시 눈에 띄게 흐려져 90을 별도 허용.
    qualities: [75, 90],
  },
  async rewrites() {
    const DEFAULT_CDN_URL = "https://cdn.inexcoin.com/homepage";
    // 허용된 CDN 도메인만 프록시 (오타/오설정 가드) — 실제 운영 CDN인
    // cdn.inexcoin.com만 사용한다 (cdn.inextest.com은 테스트용이라 제외).
    const allowedDomains = ["cdn.inexcoin.com", "www.inexcoin.com"];

    const rawCdnUrl = process.env.NEXT_PUBLIC_EX_IMG_CDN;
    if (!rawCdnUrl) {
      console.warn(
        "⚠️ NEXT_PUBLIC_EX_IMG_CDN 환경변수가 설정되지 않았습니다. 기본값을 사용합니다.",
      );
    }

    const cdnUrl = (rawCdnUrl || DEFAULT_CDN_URL).replace(/\/$/, "");

    let cdnHostname: string;
    try {
      cdnHostname = new URL(cdnUrl).hostname;
    } catch {
      console.error(`❌ 잘못된 CDN URL: ${cdnUrl}. 기본값을 사용합니다.`);
      return [
        { source: "/cdn/:path*", destination: `${DEFAULT_CDN_URL}/:path*` },
      ];
    }

    if (!allowedDomains.includes(cdnHostname)) {
      console.error(
        `❌ 허용되지 않은 CDN 도메인: ${cdnHostname}. 기본값을 사용합니다.`,
      );
      return [
        { source: "/cdn/:path*", destination: `${DEFAULT_CDN_URL}/:path*` },
      ];
    }

    return [
      {
        source: "/cdn/:path*",
        destination: `${cdnUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
