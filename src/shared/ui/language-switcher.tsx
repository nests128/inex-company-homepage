"use client"

import { usePathname } from "next/navigation"

import { otherLocale, publicPath, type Locale } from "@/shared/lib/i18n"

/**
 * 언어 전환 링크. `usePathname()`은 `proxy.ts`의 rewrite 이후 값(공개
 * URL)을 돌려주므로 — 한국어는 "/company", 영어는 "/en/company" — 앞의
 * "/en" 접두사만 벗겨내면 로케일-무관 route가 남는다. 이렇게 현재 페이지의
 * route를 그대로 유지한 채 다른 언어로 전환한다(서브페이지에서 눌러도 그
 * 언어의 홈으로 돌아가지 않음).
 */
export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() ?? "/"
  const target = otherLocale(current)
  const route = pathname.startsWith("/en") ? pathname.slice(3) || "/" : pathname

  return (
    <a
      href={publicPath(target, route)}
      lang={target}
      className="text-[13px] font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
    >
      {target === "en" ? "English" : "한국어"}
    </a>
  )
}
