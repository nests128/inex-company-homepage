# INEX Homepage

인피니티익스체인지코리아(INEX) 회사/서비스 홈페이지. Next.js App Router + Feature-Sliced Design(FSD) 기반.

## 실행

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인합니다.

프로덕션 빌드:

```bash
npm run build
npm run start
```

## 환경 변수

`.env.example`을 참고해 `.env.local`을 만듭니다. 로컬 개발에는 대부분 필수가 아니며(코드 기본값으로 폴백), 아래 값들이 실제로 필요한 기능에 한해 채웁니다.

- `NEXT_PUBLIC_EX_IMG_CDN` — 이미지 CDN 베이스 URL. `next.config.ts`의 `/cdn/*` rewrite가 사용(허용 도메인: `cdn.inexcoin.com`, `www.inexcoin.com`).
- `NEWSLETTER_API_URL`, `NEWSLETTER_CONFIG_ID` — 뉴스레터 구독 API 프록시(`app/api/newsletter/subscribe`)용.
- `CONFLUENCE_BASE_URL`, `CONFLUENCE_EMAIL`, `CONFLUENCE_API_TOKEN`, `CONFLUENCE_SPACE_KEY` — Confluence 블로그 글 목록 연동(`src/shared/lib/confluence`)용.

## 구조 (Feature-Sliced Design)

```
app/                 Next.js App Router 라우트 (얇은 재-export만, 실제 구현은 src/_pages)
src/
  _pages/             페이지 조립 (예: home, company)
  widgets/            섹션 단위 컴포넌트 (hero, nav-bar, footer, footer, mission, team, history …)
  entities/           도메인 모델 + 콘텐츠 데이터 (company, settlement …)
  shared/
    ui/               재사용 UI 프리미티브 (shadcn Base UI 기반)
    lib/              공용 유틸리티
docs/design-tokens.md 디자인 토큰 · 컴포넌트 인벤토리 (단일 소스)
ref/                  레이아웃/카피 레퍼런스 자산 (스크린샷, 와이어프레임)
```

## 스택

- Next.js (App Router, Turbopack) · React · TypeScript
- Tailwind CSS v4
- shadcn (Base UI 기반 컴포넌트)
- Pretendard Variable + Inter Tight (자체 호스팅)

## 참고 문서

- `docs/design-tokens.md` — 색상/타이포/컨테이너/컴포넌트 인벤토리 등 디자인 토큰 단일 소스.
