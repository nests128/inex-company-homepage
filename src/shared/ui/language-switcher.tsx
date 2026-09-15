"use client"

import { CheckIcon, GlobeIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import { locales, publicPath, type Locale } from "@/shared/lib/i18n"
import { cn } from "cn"

import { Popover, PopoverContent, PopoverTrigger } from "./popover"

const LOCALE_LABEL: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
}

/**
 * `usePathname()`은 `proxy.ts`의 rewrite 이후 값(공개 URL)을 돌려주므로 —
 * 한국어는 "/company", 영어는 "/en/company" — 앞의 "/en" 접두사만 벗겨내면
 * 로케일-무관 route가 남는다. 이렇게 현재 페이지의 route를 그대로 유지한 채
 * 다른 언어로 전환한다(서브페이지에서 눌러도 그 언어의 홈으로 돌아가지 않음).
 */
function useLocaleRoute() {
  const pathname = usePathname() ?? "/"
  return pathname.startsWith("/en") ? pathname.slice(3) || "/" : pathname
}

/**
 * 데스크톱 nav-bar용 언어 전환 트리거. 지구본 아이콘 버튼을 누르면 두 로케일을
 * 나열하는 팝오버 드롭다운이 뜬다. `PopoverContent`는 Portal로 렌더링되므로
 * 모바일 시트 내부(포커스 트랩 + z-index 충돌)에서는 쓰지 않는다 —
 * `MobileLanguageSwitcher`를 대신 사용.
 */
export function LanguageSwitcher({ current }: { current: Locale }) {
  const route = useLocaleRoute()

  return (
    <Popover>
      <PopoverTrigger
        aria-label={LOCALE_LABEL[current]}
        openOnHover
        delay={0}
        closeDelay={100}
        className="flex size-9 cursor-pointer items-center justify-center rounded-full text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <GlobeIcon aria-hidden="true" className="size-[18px]" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40 p-1.5">
        {locales.map((locale) => (
          <a
            key={locale}
            href={publicPath(locale, route)}
            lang={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "flex cursor-pointer items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-foreground outline-none hover:bg-muted",
              locale === current && "text-foreground"
            )}
          >
            {LOCALE_LABEL[locale]}
            {locale === current ? (
              <CheckIcon aria-hidden="true" className="size-3.5 shrink-0" />
            ) : null}
          </a>
        ))}
      </PopoverContent>
    </Popover>
  )
}

/**
 * 모바일 시트 푸터용 언어 전환 링크 목록. `LanguageSwitcher`와 달리 팝오버가
 * 아닌 평범한 링크 두 개를 나란히 배치한다 — `PopoverContent`가 Portal로
 * 시트 바깥에 렌더링되면 포커스 트랩과 z-index가 꼬이기 때문(사이드바가 이미
 * 풀폭 세로 스택이라 팝오버 자체가 불필요하기도 함).
 */
export function MobileLanguageSwitcher({ current }: { current: Locale }) {
  const route = useLocaleRoute()

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {locales.map((locale, index) => (
        <div key={locale} className="flex items-center gap-2">
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
              "text-muted-foreground",
              locale === current && "text-foreground underline underline-offset-4"
            )}
          >
            {LOCALE_LABEL[locale]}
          </a>
        </div>
      ))}
    </div>
  )
}
