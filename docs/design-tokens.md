# INEX 디자인 토큰 (와이어프레임 추출)

출처: `ref/INEX SaaS wireframe/INEX Home Wireframe.dc.html` (Claude Design 캔버스 파일, 데스크톱 1440 / 모바일 390 아트보드)

> 이 문서는 4개 에이전트가 공유하는 단일 소스다. 각자 와이어프레임 HTML에서 색상/타이포를 재추출하지 말고 이 문서를 참조할 것.

## 톤

블랙 & 화이트 미니멀. 컬러 포인트 없음 — 대비와 타이포그래피 위계로 강조.

## 색상

| 토큰 | 값 | 용도 |
|---|---|---|
| ink (primary) | `#111111` | 텍스트 기본, 버튼 배경, 다크 섹션 배경 |
| white | `#ffffff` | 배경, 다크 섹션 위 텍스트 |
| border | `#e2e2e2` / `#eeeeee` | 카드·구분선 (연한 것 `#eee`, 진한 것 `#e2e2e2`) |
| text-secondary | `#555555` | 본문 보조 텍스트 |
| text-tertiary | `#777777` / `#888888` | 캡션, 라벨, 메타 정보 |
| surface-muted | `#f7f7f5` | Trust 섹션 등 은은한 배경 |
| dark-text-muted | `#aaaaaa` / `#bbbbbb` / `#999999` | 다크(#111) 배경 위 보조 텍스트 |
| dark-border | `#2a2a2a` | 다크 배경 위 구분선 |

shadcn neutral 팔레트(oklch 그레이스케일)와 1:1로 대응된다 — 별도 커스텀 컬러 토큰을 추가하지 말고 기존 `--foreground`/`--muted-foreground`/`--border`/`--background` 등을 그대로 사용. `--primary`(라이트: 거의 블랙)가 곧 ink 역할.

## 타이포그래피

- 본문/헤딩: **Inter Tight** (400/500/600/700/800) + **Pretendard** (한글 폴백)
- 모노(플레이스홀더 라벨 전용, 실제 콘텐츠에는 불필요): IBM Plex Mono
- 구현 완료: `app/layout.tsx`에서 `next/font/google`의 `Inter_Tight` + `next/font/local`로 자체호스팅한 Pretendard Variable(`src/shared/assets/fonts/PretendardVariable.woff2`)을 로드한다. `--font-inter-tight`/`--font-pretendard` CSS 변수가 `globals.css`의 `--font-sans`에 연결되어 있다. Geist는 완전히 제거됨 — 새 컴포넌트에서 Geist를 참조하지 마라.

### 스케일 (데스크톱 1440 기준)

| 용도 | size / weight / letter-spacing |
|---|---|
| eyebrow 라벨 | 12–13px / 500 / letter-spacing .12~.14em, uppercase |
| H1 (hero) | 62px / 700 / -.03em |
| H2 (섹션) | 40–44px / 700 / -.02em |
| H3 (CTA 대형) | 54px / 700 / -.025em |
| 본문 large | 16.5–18px / 400 / #555, line-height 1.6–1.7 |
| 본문 small | 13–14.5px |
| 카드 타이틀 | 15.5–18px / 700 |
| 통계 숫자 | 30–38px / 700 |

### 모바일 (390 기준) 스케일 다운

- H1: 34px, H2: 24–26px, CTA 타이틀: 30px, 본문: 14–14.5px

## 반경 (radius)

- pill 버튼: `999px`
- 카드: `18px` (큰 카드) / `16px` / `14px` (작은 카드)
- 아이콘 박스: `10px` / `8px`
- shadcn 기본 `--radius: 0.625rem`을 lg 기준으로 삼고, pill은 Tailwind `rounded-full`로 별도 처리.

## 컨테이너 (콘텐츠 최대 폭)

레퍼런스: `workhorse-saas-software-template.webflow.io` (Webflow 템플릿, 실제 CSS 확인).

- 콘텐츠 max-width: **1330px** — 모든 브레이크포인트에서 동일하게 유지된다. 반응형은 max-width를 바꾸지 않고 좌우 gutter(패딩)로만 처리한다.
- 좌우 gutter: **24px** (기본), **12px** (뷰포트 480px 미만)
- 구현: `app/globals.css`의 `:root`에 `--container-max-width: 1330px`, `--container-gutter: 24px` 커스텀 프로퍼티로 등록되어 있고, `480px` 미만에서 `--container-gutter`가 `12px`로 오버라이드된다. Tailwind v4 커스텀 유틸 `@utility container-inex`로 노출되어 있으며, 위젯에서 `className="container-inex"`로 사용한다 (`width: 100%; max-width: var(--container-max-width); margin-inline: auto; padding-inline: var(--container-gutter);`).
- 주의: `--container-max-width`/`--container-gutter`는 반드시 `:root`(또는 일반 CSS 커스텀 프로퍼티)에 둔다. Tailwind v4의 `--container-*`는 예약 네임스페이스(`--container-sm` 등이 `max-w-*`/`w-*`/`min-w-*`/`basis-*` 유틸을 생성)이므로 `@theme` 안에 넣으면 `max-w-max-width` 같은 의도치 않은 유틸이 생성된다. `@theme`으로 옮기지 말 것.
- box-sizing: Tailwind preflight가 `border-box`를 쓰므로 1330px은 패딩을 포함한 전체 폭이다. 기본 gutter(24px×2) 적용 시 실제 콘텐츠 내부 폭은 1330 − 48 = **1282px**. 레퍼런스 사이트도 동일하게 계산된다 — 나중에 "48px를 더해야 한다"고 임의로 보정하지 말 것.
- 아래 "섹션 수평 패딩 120px"은 **콘텐츠 폭 기준으로는 superseded** — 실제 콘텐츠 정렬은 이 절의 "풀블리드 배경 + 컨테이너 콘텐츠" 규칙을 따른다.

### 풀블리드 배경 + 컨테이너 콘텐츠 (원칙)

이 프로젝트의 모든 섹션은 다음 두 겹 구조를 기본으로 한다:

1. **배경은 항상 풀블리드(뷰포트 전체 폭)다.** 다크 CTA 섹션(`bg-[#111]`), 통계 밴드, 연한 배경(`#f7f7f5`) 신뢰 그리드 섹션 등 — 배경색·배경 요소는 화면 끝까지 꽉 차야 한다.
2. **그 배경 안의 실제 콘텐츠(텍스트, 카드, 그리드)만 `container-inex`(1330px)로 감싸서 중앙 정렬**한다.

패딩 소유권을 명확히 나눈다 — 이중 패딩을 방지하기 위한 규칙이다:

- **수직 패딩**(섹션 상하 여백)은 풀블리드 `<section>` 요소에만 준다.
- **수평 패딩(gutter)**은 `container-inex`에만 있다 (`padding-inline: var(--container-gutter)`). 배경 역할을 하는 바깥 `<section>`에는 좌우 패딩을 절대 주지 않는다.

의사코드:

```tsx
<section className="bg-[#111] py-[110px]">   {/* 풀블리드 배경, 수직 패딩만 */}
  <div className="container-inex">           {/* 실제 콘텐츠는 1330px로 제한, 수평 패딩은 여기서만 */}
    ...
  </div>
</section>
```

### 예외: 마퀴(무한 스크롤 트랙)

로고 마퀴, 모듈 마퀴처럼 트랙 자체가 좌우로 무한 스크롤되는 콘텐츠는 위 원칙을 그대로 적용하지 않는다. 트랙이 컨테이너 폭을 넘어서거나 `mask-image`로 좌우가 페이드아웃되는 게 의도된 디자인이기 때문이다.

- 마퀴 트랙(`data-marquee`, `width:max-content`로 좌우로 흐르는 요소)은 기본적으로 `container-inex`에 가두지 않는다. **단, 로고 마퀴는 아래 항목대로 예외적으로 `container-inex` 안에 중첩한다** — 새 마퀴 인스턴스(예: 모듈 마퀴)를 만들 때는 이 기본 원칙을 따르되, 로고 마퀴처럼 컨테이너 폭 제약이 명시적으로 요구되는 경우가 아니면 굳이 가두지 않는다.
- 대신 트랙을 감싸는 **wrapper**를 `overflow:hidden` + `mask-image`(좌우 페이드)로 처리한다. 이 wrapper는 기본적으로 `container-inex` 안에 중첩하지 않는다 — 섹션의 직계 자식으로 두어 gutter가 이중 적용되지 않게 한다. (로고 마퀴는 예외 — 아래 참고.)
  ```css
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  ```
- **로고 마퀴는 `container-inex`(1330px) 안에 위치한다.** 이 항목은 두 차례 요청을 거쳐 최종 결정됐다: 처음 사용자가 "전체 폭(풀블리드)으로"라고 요청해 데스크톱의 `max-width` 캡을 제거한 적이 있었으나(`ref/image.png` Workhorse 템플릿 참고), 이후 "마퀴도 최대가로값 넘어가지 마"라는 재요청(2026-09-09)에 따라 다시 `container-inex`(1330px) 안에 가두는 것으로 최종 확정됐다. 와이어프레임 원안(`INEX Home Wireframe.dc.html` L136-145 데스크톱, L353-359 모바일)은 애초에 컨테이너보다도 좁은 `max-width:1160px`을 쓰고 있었지만, 1330px 컨테이너 폭이면 충분하다고 판단해 그보다 더 좁히지는 않았다. 구현상으로는 마퀴 wrapper(`Marquee` 컴포넌트)를 캡션과 같은 `container-inex` div 안에 중첩해서, 가장자리는 `overflow:hidden` + `mask-image`(마스크 페이드)로만 부드럽게 처리한다(하드 클립 아님). (모듈 마퀴 등 다른 마퀴 인스턴스는 이 예외의 대상이 아니며, 필요 시 각자 판단한다.)
- 위 로고 마퀴처럼 `container-inex` 안에 중첩하기로 한 경우, gutter(좌우 패딩)는 `container-inex`가 담당하고 mask-image는 컨테이너 안쪽 가장자리의 시각적 페이드만 담당한다 — 이 조합은 마퀴에 대한 위 일반 원칙("container-inex에 가두지 않는다", "wrapper는 섹션의 직계 자식")의 명시적 예외다.

### 참고: container-inex보다 좁은 콘텐츠 폭

마퀴 외에도 섹션 헤더처럼 가운데 정렬된 텍스트 블록은 `container-inex`보다 좁은 자체 `max-width`를 쓸 수 있다 (예: 와이어프레임 모듈 마퀴 섹션 헤더 `max-width:680px; margin:0 auto; padding:0 24px`, L221). 이런 경우도 `container-inex` 안에 중첩하지 말고, 섹션의 직계 자식으로 자체 max-width + margin-inline:auto를 적용한다.

## 간격 리듬 (데스크톱 1440)

- 섹션 수직 패딩: 80–110px (히어로 80, 일반 섹션 88–104, CTA 110)
- 섹션 수평 패딩: 120px — 와이어프레임 원본 수치이나, 콘텐츠 정렬은 위 "컨테이너" 섹션의 `container-inex`(1330px + 24/12px gutter)를 기준으로 삼는다. 참고로 1440 − 56×2 = 1328px로 와이어프레임의 nav 패딩(56px)도 이미 거의 컨테이너 폭과 맞아떨어진다 — nav에 `container-inex`를 적용하는 것도 예외가 아니라 일관된 선택지다 (최종 판단은 page-agent).
- 카드/그리드 gap: 20–60px (콘텐츠 밀도에 따라)

모바일은 수직 패딩 40–60px로 축소. 좌우 여백은 `container-inex`의 gutter(24px/12px)를 따른다.

## 섀도우

- 카드 기본: `0 1px 3px rgba(0,0,0,.06)`
- 플로팅 카드(히어로 위젯 등): `0 20~24px 50~60px rgba(0,0,0,.06~.14)`

## 컴포넌트 인벤토리 (와이어프레임에서 식별된 반복 패턴)

이 목록이 `ui-agent`가 `shared/ui` + `entities`에 만들어야 할 최소 세트다.

1. **Button** — pill 버튼, variant: solid-dark(`bg-ink text-white`), outline(`border-ink`), ghost. shadcn `button.tsx`(Base UI 기반, 이미 설치됨)에 pill 스타일 variant 추가.
2. **Badge/Pill** — 작은 라벨칩 (예: 섹터 태그 "카드사 · PG · VAN", "LIVE" 인디케이터)
3. **NavBar** — 로고 + 메뉴 + 드롭다운(솔루션 메가메뉴) + 언어 스위치 + CTA 버튼. 모바일은 햄버거.
4. **AnnouncementBar** — 상단 공지 바 (dismissible)
5. **Card** (shadcn `card.tsx` 확장) — 일반 카드, 통계 카드, 사례 카드(이미지+뱃지+통계+타이틀)
6. **LogoMarquee** — 무한 스크롤 로고 트랙 (CSS animation, `prefers-reduced-motion` 대응 필수)
7. **StatBand** — 다크 배경 4열 통계 그리드 (숫자 카운트업 애니메이션)
8. **ProgressBar** — 라벨 + 퍼센트 + 바 (정산 현황 위젯)
9. **DataTable(간이)** — 정산 대기열 리스트 (아이콘 + 이름 + 금액 + 날짜)
10. **QuoteBlock** — 대형 인용구 + 아바타 + 소속
11. **Footer** — 4열 링크 그룹 + 하단 법적 정보 바
12. **SectionHeading** — eyebrow + 타이틀 + 설명 조합 (여러 섹션에서 반복)

## 플레이스홀더 처리 원칙

와이어프레임의 인증번호("VASP 신고 수리 FIU 2024-3", "ISMS 인증"), 파트너사 로고(FIREBLOCKS, CHAINALYSIS, AWS, AVALANCHE, CLOVA eKYC, XANGLE, BKL, INTERLIZEN, GTONE, KPN), 정산 금액, 고객 인용문, 통계(T+0, 3개 레일, 9개 모듈 등)는 **전부 실제 데이터가 아니다.** 모든 콘텐츠는 상수 파일(`src/entities/*/model/*.ts` 또는 `src/shared/config`)로 분리하고, 명확히 `// TODO(real-data): ...` 주석을 달아 실데이터 교체 지점을 표시한다. 이미지/영상 자리는 `alt`가 명확한 placeholder(`div` + 설명 텍스트 or `shared/ui/placeholder-media.tsx`)로 대체한다.

> 예외: 파트너사 로고는 아래 "실제 이미지 CDN 연동" 섹션의 `/cdn/...` rewrite를 통해 실제 이미지를 로드하는 경로가 마련되어 있다 (데이터 자체는 `src/entities` 쪽에 담긴다). 다른 플레이스홀더(인증번호, 정산 금액, 고객 인용문, 통계)는 이 예외에 해당하지 않으며 여전히 실데이터가 아니다.

## 실제 이미지 CDN 연동

- `next.config.ts`에 `/cdn/:path*` → CDN 베이스 URL로의 `rewrites()`가 구성되어 있다. 로고 마퀴 등에서 이미지 `src`를 `/cdn/image/...` 형태의 same-origin 경로로 두면, 이 rewrite를 통해 실제 CDN(기본값 `https://cdn.inexcoin.com/homepage`, 환경변수 `NEXT_PUBLIC_EX_IMG_CDN`로 오버라이드 가능)의 이미지가 로드된다.
- 허용 CDN 도메인은 `cdn.inexcoin.com`, `www.inexcoin.com` 뿐이다 — 운영 CDN만 허용하며 테스트 도메인(`cdn.inextest.com`)은 사용하지 않는다. 다른 도메인을 가리키는 CDN URL을 환경변수에 넣으면 rewrite가 자동으로 기본값으로 폴백한다(콘솔에 에러 로그).
- `next.config.ts`의 `images.remotePatterns`에는 `www.inexcoin.com`만 등록되어 있다 — `/cdn/...` 경로는 rewrite로 same-origin 프록시되므로 `next/image`의 `remotePatterns`에 CDN 호스트를 추가로 등록할 필요가 없다.
- 주의: 파트너 로고는 전부 `.svg`다. `next/image`(`/_next/image` 최적화 파이프라인)는 기본적으로 SVG 최적화를 거부한다(`images.dangerouslyAllowSVG` 필요, XSS 서페이스가 있어 이 저장소에서 아직 활성화하지 않았다). 로고 마퀴 위젯을 조립할 때는 `next/image`에 `unoptimized` prop을 주거나 평범한 `<img>` 태그를 쓰는 방식을 고려할 것 — 아무 설정 없이 `next/image`에 SVG를 넣으면 이미지가 뜨지 않을 수 있다.
- 로컬 개발에서 CDN URL을 바꿔보려면 `.env.local`에 `NEXT_PUBLIC_EX_IMG_CDN`을 설정한다 (`.env.example` 참고). 미설정 시 코드 기본값으로 정상 동작하므로 필수는 아니다.

## 인터랙션 · 애니메이션

레퍼런스: `workhorse-saas-software-template.webflow.io`(GSAP+ScrollTrigger 사용)의 동작을 참고했지만, 실제 구현은 GSAP이 아니라 `motion` 패키지(framer-motion의 후신, https://motion.dev)로 한다. 사용자가 참고로 제시한 Magic UI `BlurFade`(https://magicui.design/docs/components/blur-fade)와 유사한 패턴 — 단 그대로 복사하지 않고 이 프로젝트의 와이어프레임 원안(`ref/INEX SaaS wireframe/INEX Home Wireframe.dc.html`)에 이미 있는 `data-hero`/`data-reveal` 트랜지션 패턴을 값의 출처로 삼는다.

### 적용 범위 (2가지, 둘 다 적용)

1. **히어로 진입 애니메이션** — 페이지 로드 시 eyebrow → 헤딩 → 설명 → CTA 버튼 → 신뢰 배지 순으로 순차 fade-up. 와이어프레임 `data-hero` 참고(78~131줄 부근).
2. **스크롤 리빌** — 스크롤로 뷰포트에 들어오는 섹션(헤딩, 카드 등)이 흐리게 시작해 완전한 상태로 전환되며 위로 살짝 이동. 와이어프레임 `data-reveal` 참고. 한 번 트리거되면 재실행하지 않는다(와이어프레임의 `io.unobserve` 동작과 동일 — `once: true`).

### 패키지 / import

- 패키지: `motion` (`npm install motion`으로 설치됨, `package.json`에 `motion` 확인). **`framer-motion`을 직접 설치하지 않는다** — `motion`이 내부적으로 `framer-motion`을 의존성으로 가져오지만, 우리 코드에서는 항상 `motion/react`에서 import한다.
  ```ts
  import { motion, useInView, useReducedMotion, MotionConfig } from "motion/react";
  ```
- `motion/react`는 `framer-motion`의 API를 그대로 재수출하므로(`export * from "framer-motion"`), framer-motion 문서의 API 이름(`useInView`, `useReducedMotion`, `MotionConfig`, `AnimatePresence` 등)을 그대로 참고해도 된다 — import 경로만 `motion/react`로 바꾸면 된다.

### 공용 상수: `src/shared/lib/motion.ts`

애니메이션 관련 duration/easing/offset/stagger 상수는 `src/shared/lib/motion.ts`에 정의되어 있다 (barrel/`index.ts` 없음 — `src/shared/lib/utils.ts`와 동일하게 `@/shared/lib/motion`에서 직접 import). 값은 전부 와이어프레임의 인라인 트랜지션에서 그대로 옮긴 것이며 임의로 재정의하지 않는다:

| 상수 | 값 | 출처 |
|---|---|---|
| `REVEAL_DURATION` | `0.8`(초) | `data-reveal` 전 구간 `.8s` |
| `HERO_DURATION` | `0.8`(초) | `data-hero` 텍스트 열 |
| `HERO_DURATION_VISUAL` | `0.9`(초) | `data-hero` 비주얼(플로팅 카드) 열 |
| `REVEAL_EASE` | `[0.2, 0.7, 0.2, 1]` (4-tuple) | 와이어프레임 `cubic-bezier(.2,.7,.2,1)` — `data-hero`에서 사용되던 값을 리빌에도 통일 적용(아래 "의도된 차이" 참고) |
| `REVEAL_OFFSET` | `24`(px) | `data-reveal` `translateY(24px)` |
| `HERO_OFFSET` | `28`(px) | `data-hero` 텍스트 열 `translateY(24~34px)` 대표값 |
| `HERO_OFFSET_VISUAL` | `40`(px) | `data-hero` 비주얼 열 `translateY(40px) scale(.97)` |
| `HERO_STAGGER_STEP` / `HERO_STAGGER_DELAYS` | `0.12`(초) 근사치 / `[0, .1, .22, .34, .46]` 실값 | 히어로 순차 진입 delay 시퀀스 |
| `REVEAL_IN_VIEW_AMOUNT` | `0.15` | 와이어프레임 IntersectionObserver `{threshold: 0.15}` → `useInView`의 `amount` 옵션으로 번역 (Magic UI 기본값 `inViewMargin:"-50px"` 대신 와이어프레임 방식을 따름) |
| `REVEAL_ONCE` | `true` | 와이어프레임의 `io.unobserve` 동작 |
| `REVEAL_TRANSITION` / `HERO_TRANSITION` / `HERO_TRANSITION_VISUAL` | 위 duration+ease 조합 프리셋 | `motion`의 `transition` prop에 바로 스프레드용 |

**의도된 차이 1건**: 와이어프레임의 `data-reveal` 트랜지션은 커스텀 이징을 지정하지 않고 브라우저 기본 `ease`를 쓴다(`data-hero`만 `cubic-bezier(.2,.7,.2,1)`을 명시). 이 프로젝트에서는 진입/리빌 전체에 동일한 `REVEAL_EASE`를 적용하기로 의도적으로 통일했다 — 나중에 "와이어프레임과 다르다"며 리빌 이징을 브라우저 기본값으로 되돌리지 말 것.

실제 `Reveal`/`Hero` 애니메이션 컴포넌트 구현(Magic UI `BlurFade` 유사 패턴 — `duration`/`delay`/`offset`/`direction`/`blur`/`inView` 등 props 설계 포함)과 위젯 적용은 이 문서의 범위가 아니다(ui-agent/page-agent 담당).

### `prefers-reduced-motion` 대응 (필수 원칙)

이 프로젝트의 기존 마퀴 컴포넌트(`LogoMarquee`, `ModuleMarquee` 등)가 이미 `prefers-reduced-motion: reduce`를 지키고 있는 것과 동일하게, 히어로 진입/스크롤 리빌 애니메이션도 예외 없이 다음을 지켜야 한다:

- `prefers-reduced-motion: reduce`인 환경에서는 fade/translate/blur 등 모션 효과를 끄거나, 애니메이션의 최종(완료) 상태로 즉시 렌더링해야 한다. 요소가 계속 투명하거나 위치가 어긋난 채로 멈춰 있으면 안 된다.
- `motion/react`는 `useReducedMotion()` 훅과 `<MotionConfig reducedMotion="user">`(OS/브라우저의 reduced-motion 설정을 자동으로 반영하는 전역 옵션)를 제공한다. 개별 컴포넌트마다 `matchMedia` 쿼리를 직접 작성하지 않도록, 가능하면 앱 최상단(예: `src/_app` 레이어의 provider 또는 루트 레이아웃)에 `<MotionConfig reducedMotion="user">`를 두어 전역 기본값으로 삼고, 컴포넌트 단위로 세밀한 제어가 필요할 때만 `useReducedMotion()`으로 opt-out하는 방식을 권장한다. (전역 `MotionConfig` 배치 위치와 개별 컴포넌트 구현은 ui-agent/page-agent 담당 — 여기서는 원칙과 권장 메커니즘만 명시한다.)
- 이 원칙은 히어로 진입/스크롤 리빌뿐 아니라 앞으로 추가되는 모든 `motion` 기반 애니메이션에 동일하게 적용된다.
