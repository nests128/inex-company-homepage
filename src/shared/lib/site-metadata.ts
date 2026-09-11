import type { Metadata } from "next"

export const SITE_URL = "https://inex.im"
export const SITE_NAME = "INEX"

// 실제 운영 중인 cdn.inexcoin.com의 브랜드 OG 카드 자산(1200x630) — 자매
// 프로젝트(company-homepage)가 이미 공유 카드 기본값으로 쓰고 있음. 카피가
// 거래소 톤("신뢰할 수 있는 Web 3.0 가상자산 거래소")이라 인프라/회사소개
// 톤인 이 프로젝트와는 결이 다르지만, 실존하는 승인된 브랜드 자산을
// 재사용하는 쪽을 택함 — 이 사이트 전용 카드가 필요해지면 교체.
export const DEFAULT_OG_IMAGE_URL =
  "https://cdn.inexcoin.com/service/common/metadata/meta_inex_02.png"

interface BuildPageMetadataInput {
  /** Route path, e.g. "/company", "/news/230424577". Root is "/". */
  path: string
  /** Page-specific title (no "INEX" suffix — the root layout's `title.template` adds that for the `<title>` tag only, not for OG/Twitter, which is why this function re-sets them explicitly). */
  title: string
  description: string
  /** Override the default brand OG image, e.g. a news post's own thumbnail. Falls back to `DEFAULT_OG_IMAGE_URL` when omitted/null. */
  imageUrl?: string | null
}

/**
 * Next.js does NOT merge a child page's plain `title`/`description` into
 * the root layout's `openGraph` object — a page that only sets `title` (as
 * `src/_pages/company`, `news`, `news-detail` used to) keeps the ROOT's
 * `openGraph.title`/`description`, so sharing any link but the homepage
 * showed the homepage's card. Each page must call this to get its own
 * complete `openGraph`/`twitter` block (not a partial override — a partial
 * `openGraph: { title }` would replace the whole object and drop `images`,
 * turning a wrong-title bug into a no-thumbnail bug).
 */
export function buildPageMetadata({
  path,
  title,
  description,
  imageUrl,
}: BuildPageMetadataInput): Metadata {
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`
  const image = imageUrl ?? DEFAULT_OG_IMAGE_URL

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      locale: "ko_KR",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}
