import type { Locale } from "@/shared/lib/i18n"

interface SuccessStoriesContent {
  heading: string
  emptyMessage: string
}

export const successStoriesContentByLocale: Record<Locale, SuccessStoriesContent> = {
  ko: {
    heading: "INEX 소식",
    emptyMessage: "곧 새로운 소식을 전해드리겠습니다.",
  },
  en: {
    heading: "INEX News",
    emptyMessage: "New updates are coming soon.",
  },
}
