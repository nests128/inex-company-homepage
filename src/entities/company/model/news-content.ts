import type { Locale } from "@/shared/lib/i18n"

// 목록/상세 페이지 카피 — 실데이터 아님, 다른 섹션들과 톤(간결한 한국어 헤딩 +
// 보조 설명)을 맞춰 page-agent가 직접 작성. 뉴스 게시글 본문 자체는
// Confluence CMS에서 그대로 가져오며 번역하지 않는다(사용자 확정,
// 2026-09-15) — 여기 있는 건 목록/상세 UI 문구만.

interface NewsListContent {
  eyebrow: string
  title: string
  allCategoryLabel: string
  emptyMessage: string
  latestSectionTitle: string
  sectionAriaLabel: string
  categoryFilterLabel: string
  imageAltPrefix: string
  paginationLabels: { nav: string; prevPage: string; nextPage: string }
}

interface NewsDetailContent {
  backToListLabel: string
  relatedSectionTitle: string
}

export const newsListContentByLocale: Record<Locale, NewsListContent> = {
  ko: {
    eyebrow: "NEWS",
    title: "INEX 소식",
    allCategoryLabel: "전체",
    emptyMessage: "아직 등록된 소식이 없습니다. 곧 새로운 소식으로 찾아뵙겠습니다.",
    latestSectionTitle: "최신 소식",
    sectionAriaLabel: "INEX 소식 목록",
    categoryFilterLabel: "카테고리 필터",
    imageAltPrefix: "이미지",
    paginationLabels: { nav: "뉴스 페이지 네비게이션", prevPage: "이전 페이지", nextPage: "다음 페이지" },
  },
  en: {
    eyebrow: "NEWS",
    title: "INEX News",
    allCategoryLabel: "All",
    emptyMessage: "No news yet. Check back soon for updates.",
    latestSectionTitle: "Latest News",
    sectionAriaLabel: "INEX news list",
    categoryFilterLabel: "Category filter",
    imageAltPrefix: "Image",
    paginationLabels: { nav: "News pagination", prevPage: "Previous page", nextPage: "Next page" },
  },
}

export const newsDetailContentByLocale: Record<Locale, NewsDetailContent> = {
  ko: {
    backToListLabel: "INEX 소식",
    relatedSectionTitle: "다른 소식 더 보기",
  },
  en: {
    backToListLabel: "INEX News",
    relatedSectionTitle: "More News",
  },
}
