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

## 간격 리듬 (데스크톱 1440)

- 섹션 수직 패딩: 80–110px (히어로 80, 일반 섹션 88–104, CTA 110)
- 섹션 수평 패딩: 120px (nav는 56px)
- 카드/그리드 gap: 20–60px (콘텐츠 밀도에 따라)

모바일은 수평 패딩 18–24px, 수직 패딩 40–60px로 축소.

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
