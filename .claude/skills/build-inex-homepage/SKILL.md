---
name: build-inex-homepage
description: INEX 홈페이지(Next.js + FSD + shadcn Base UI) 작업을 4개 담당 에이전트(구조/UI/페이지조립/QA)에게 분배하는 오케스트레이션 스킬. "/build-inex-homepage" 로 호출하거나, INEX 홈페이지의 섹션 추가·컴포넌트 작업·SEO 점검 등을 요청받았을 때 이 스킬을 통해 적절한 담당 에이전트에게 위임한다.
---

# INEX 홈페이지 오케스트레이션

너는 이 스킬이 호출되는 순간 **오케스트레이터**다. 직접 코드를 작성하지 말고, 아래 4개 담당 에이전트에게 Agent 도구로 작업을 위임해라. 각 에이전트 정의는 `.claude/agents/`에 있다:

| 에이전트 | 역할 | 영역 |
|---|---|---|
| `inex-structure-agent` | FSD 폴더 구조, 설정 파일(tsconfig/components.json/next.config), alias | `app/`, `src/*/index.ts` 골격, 설정 파일 |
| `inex-ui-agent` | 재사용 컴포넌트 (shadcn Base UI 기반) | `src/shared/ui`, `src/entities/*/ui` |
| `inex-page-agent` | 섹션 조립, 카피/콘텐츠, 데이터 상수 | `src/widgets/*`, `src/_pages/*`, `src/entities/*/model` |
| `inex-qa-agent` | SEO, 반응형, 접근성, 빌드 품질 검증·보완 | `app/layout.tsx` metadata, `app/robots.ts`, `app/sitemap.ts`, 리뷰/수정 |

공유 컨텍스트: `docs/design-tokens.md`(디자인 토큰·컴포넌트 인벤토리), `ref/INEX SaaS wireframe/INEX Home Wireframe.dc.html`(원본 와이어프레임, 데스크톱 1440/모바일 390). 모든 에이전트에게 이 두 경로를 참고하라고 프롬프트에 명시해라.

## 실행 순서 (기본 플로우 — "처음부터 끝까지 만들어줘" 같은 전체 요청일 때)

**반드시 순차적으로 진행한다.** UI 컴포넌트와 페이지 조립이 병렬로 같은 파일을 건드리면 충돌하므로, structure → ui → page 순서를 지키고 각 단계가 끝난 뒤 다음 단계를 시작해라. qa는 항상 마지막.

1. **structure 단계** — `inex-structure-agent`에게 위임. 이번에 필요한 새 슬라이스(예: `widgets/hero`, `widgets/logo-marquee` 등 이번 요청 범위에 해당하는 것들)의 골격과 `index.ts`가 필요하면 만들게 한다. 이미 있는 골격(`src/_pages/home`, shadcn 설정)은 건드리지 않게 한다.
2. **ui 단계** — `inex-structure-agent`의 결과(어떤 슬라이스가 생겼는지)를 프롬프트에 포함해서 `inex-ui-agent`에게 위임. `docs/design-tokens.md`의 "컴포넌트 인벤토리" 중 이번 범위에 필요한 컴포넌트를 구체적으로 지정해라 (한 번에 전체 12개를 다 시키지 말고, 사용자가 요청한 섹션에 필요한 것만).
3. **page 단계** — `inex-ui-agent`가 보고한 컴포넌트 인벤토리(경로, props)를 프롬프트에 포함해서 `inex-page-agent`에게 위임. 이번에 조립할 섹션을 구체적으로 지정한다.
4. **qa 단계** — 위 세 단계 결과 요약을 `inex-qa-agent`에게 전달하며 위임. 재위임이 필요한 항목이 나오면 해당 단계 담당에게 다시 위임하고, 다시 qa로 마무리한다.

## 부분 요청일 때 (예: "카드 컴포넌트 하나만 추가해줘", "SEO만 점검해줘")

전체 플로우를 다 돌리지 말고 관련된 에이전트만 호출해라. 단, 의존관계는 지켜라 — 예를 들어 새 컴포넌트가 필요한 페이지 수정 요청이면 ui → page 순서로, 이미 있는 컴포넌트로 충분한 조립 요청이면 page-agent만 호출한다.

## 위임 프롬프트 작성 원칙

- 각 서브에이전트는 매번 새로 시작하므로(컨텍스트 없음), 프롬프트에 반드시 포함할 것: (1) 이번 요청에서 사용자가 실제로 원하는 범위, (2) 이전 단계 에이전트가 보고한 산출물 요약(파일 경로, 컴포넌트명, props), (3) `docs/design-tokens.md`와 와이어프레임 경로를 참고하라는 지시, (4) 완료 후 무엇을 보고해야 하는지.
- 절대로 여러 담당의 작업을 한 프롬프트에 섞어서 한 에이전트에게 시키지 마라 — 역할 경계가 이 하네스의 핵심이다.
- 각 에이전트 호출 후 반환된 보고를 요약해서 사용자에게 중간 진행 상황을 짧게 알려라 (파일 목록 나열하지 말고 "구조 단계 완료, N개 슬라이스 생성" 정도).

## 완료 조건

qa 단계까지 끝나고 `npm run build`가 통과하면 완료로 본다. 마지막에 사용자에게: 이번에 변경/생성된 파일 개요, 남은 실데이터 TODO(`docs/design-tokens.md`의 플레이스홀더 원칙 참고) 목록, qa에서 재위임 없이 통과한 항목을 간단히 요약해라.
