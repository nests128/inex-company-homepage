// 서버 컴포넌트 전용 로케일 게터 모음. `next/root-params`의 `locale()`은
// Server Component에서만 쓸 수 있고, 이 파일을 import하는 모듈 그래프
//전체가 "서버 전용"으로 취급된다 — 그래서 `entities/company/index.ts`
// (client component도 자유롭게 import하는 배럴)에는 절대 섞지 않는다.
// 클라이언트 컴포넌트가 로케일별 콘텐츠가 필요하면, `index.ts`에서
// `xxxContentByLocale` 순수 데이터를 가져와 자신이 prop으로 받은 `locale`로
// 직접 인덱싱한다(예: `src/shared/ui/nav-bar.tsx`의 `LanguageSwitcher`).
import { locale } from "next/root-params";

import { isLocale, defaultLocale } from "@/shared/lib/i18n";
import { heroContentByLocale, type HeroContent } from "./model/hero-content";
import { navContentByLocale, type NavContent } from "./model/nav-content";

async function getCurrentLocale() {
  const value = await locale();
  return isLocale(value) ? value : defaultLocale;
}

export async function getHeroContent(): Promise<HeroContent> {
  return heroContentByLocale[await getCurrentLocale()];
}

export async function getNavContent(): Promise<NavContent> {
  return navContentByLocale[await getCurrentLocale()];
}
