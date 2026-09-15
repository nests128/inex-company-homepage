// 다국어(한국어/영어) 라우팅 공용 유틸.
//
// URL 전략: 한국어는 이미 색인된 루트 경로(`/company`, `/solutions/custody`
// 등)를 그대로 유지하고, `proxy.ts`가 내부적으로만 `/ko/*`로 rewrite한다
// (공개 URL은 절대 `/ko`를 노출하지 않음 — redirect가 아니라 rewrite인
// 이유). 영어만 실제 `/en/*` 접두사를 쓴다. 그래서 "루트 세그먼트 안에서의
// 내부 경로"와 "실제로 사용자에게 보여줄 공개 URL"이 한국어에서만
// 달라지므로, 이 차이를 함수 하나(`publicPath`)로 모아 각 페이지/사이트맵/
// hreflang/언어 스위처가 조건문을 반복하지 않게 한다.
export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * `route`는 항상 `/`로 시작하는 루트 기준 경로(예: "/", "/company",
 * "/news/230424577")이며 locale 접두사를 포함하지 않는다. 반환값은 실제
 * 브라우저 주소창/링크/사이트맵에 쓰는 공개 URL이다.
 */
export function publicPath(locale: Locale, route: string): string {
  const normalized = route === "/" ? "" : route;
  if (locale === defaultLocale) return normalized || "/";
  return `/en${normalized}`;
}

