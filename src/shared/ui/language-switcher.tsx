"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { locales, publicPath, type Locale } from "@/shared/lib/i18n"
import { cn } from "cn"

const LOCALE_LABEL: Record<Locale, string> = {
  ko: "KO",
  en: "EN",
}

/** `pathname`에서 로케일 접두사(`/ko`, `/en`)를 벗겨내 로케일-무관 route로 되돌린다. */
function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en" || pathname.startsWith("/en/")) return pathname.slice(3) || "/"
  if (pathname === "/ko" || pathname.startsWith("/ko/")) return pathname.slice(3) || "/"
  return pathname
}

/**
 * `usePathname()`은 이 페이지가 정적 프리렌더된 뒤 `proxy.ts`의 rewrite로
 * 도달된 경우, 서버 렌더링 시점에는 **rewrite 전 내부 경로**(`/ko/company`
 * 형태)를 반환하고 클라이언트 마운트 후에야 실제 브라우저 URL(`/company`)로
 * 바뀐다(Next 공식 문서 "Avoid hydration mismatch with rewrites" 항목).
 * 이 차이를 놓치고 "/en" 접두사만 벗겨내면, 한국어 페이지의 서버 렌더 값
 * "/ko/company"가 그대로 남아 "/en/ko/company" 같은 잘못된 링크가 만들어진다
 * (실제로 발생했던 버그). 그래서 "/ko"/"/en" 둘 다 벗겨내고, 서버 값을 믿지
 * 않도록 마운트 후에만 실제 pathname을 반영한다(마운트 전에는 안전한 "/"
 * 폴백 — 링크가 항상 유효한 route를 가리키게 유지하기 위함).
 */
function useLocaleRoute() {
  const pathname = usePathname() ?? "/"
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? stripLocalePrefix(pathname) : "/"
}

/**
 * "KO / EN" 두 라벨을 나란히 두고 클릭하면 바로 전환하는 언어 스위처.
 * 드롭다운 없이 즉시 클릭 가능하게 해달라는 사용자 요청(2026-09-15)에 따라
 * 이전의 Globe 아이콘 + Popover 드롭다운을 대체했다. 데스크톱 nav-bar와
 * 모바일 시트 양쪽에서 동일하게 쓴다.
 */
export function LanguageSwitcher({ current }: { current: Locale }) {
  const route = useLocaleRoute()

  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      {locales.map((locale, index) => (
        <div key={locale} className="flex items-center gap-1.5">
          {index > 0 ? (
            <span aria-hidden="true" className="text-border">
              /
            </span>
          ) : null}
          <a
            href={publicPath(locale, route)}
            lang={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "cursor-pointer text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
              locale === current && "text-foreground"
            )}
          >
            {LOCALE_LABEL[locale]}
          </a>
        </div>
      ))}
    </div>
  )
}

/** `LanguageSwitcher`의 별칭 — 데스크톱/모바일 모두 같은 구현을 쓴다. */
export { LanguageSwitcher as MobileLanguageSwitcher }
