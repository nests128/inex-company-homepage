/**
 * 진입(hero) / 스크롤 리빌(reveal) 애니메이션 공용 상수.
 *
 * 값의 출처: `ref/INEX SaaS wireframe/INEX Home Wireframe.dc.html`의 인라인 트랜지션
 * (`data-hero`, `data-reveal`, IntersectionObserver 옵션). 새로 발명한 값이 아니라
 * 와이어프레임 원안에서 그대로 옮긴 것이니 임의로 바꾸지 말 것 — 바꿔야 한다면 와이어프레임도
 * 함께 갱신하거나, 최소한 이 파일의 출처 주석을 갱신할 것.
 *
 * 실제 `Reveal`/`Hero` 애니메이션 컴포넌트 구현은 ui-agent 담당. 이 파일은 상수만 정의한다.
 */

import type { Transition } from "motion/react";

/** 스크롤 리빌(`data-reveal`) 트랜지션 지속 시간(초). 와이어프레임 전 구간에서 `.8s` 고정. */
export const REVEAL_DURATION = 0.8;

/**
 * 히어로 진입(`data-hero`) 트랜지션 지속 시간(초). 와이어프레임에서 텍스트 열은 `.7s`~`.8s`,
 * 비주얼(카드) 열은 `.9s`로 살짝 더 길다. 공용 기본값은 텍스트 열 기준 `.8s`로 통일하고,
 * 비주얼 카드처럼 더 느린 진입이 필요하면 컴포넌트 단에서 `HERO_DURATION_VISUAL`을 쓴다.
 */
export const HERO_DURATION = 0.8;

/** 히어로 비주얼(플로팅 카드) 진입 지속 시간(초). 와이어프레임 L108/110/131 기준 `.9s`. */
export const HERO_DURATION_VISUAL = 0.9;

/**
 * 공용 이징. 와이어프레임의 `cubic-bezier(.2,.7,.2,1)` (`data-hero`에 적용됨)과 동일.
 *
 * 참고: 와이어프레임의 `data-reveal` 트랜지션은 이 이징을 명시하지 않고 브라우저 기본
 * easing(`ease`)을 쓴다 — `data-hero`만 커스텀 큐빅베지어를 쓰는 셈이다. 이 프로젝트에서는
 * 진입/리빌 전체를 하나의 이징으로 통일하기로 의도적으로 결정했다(일관성을 위함). 나중에
 * "와이어프레임과 다르다"며 리빌 쪽 이징을 브라우저 기본값으로 "고치지" 말 것 — 통일은 의도된
 * 선택이다.
 *
 * motion의 `Transition["ease"]`는 4-tuple 큐빅베지어를 요구하므로 명시적으로 4-tuple 타입을
 * 부여했다. `as const`는 readonly tuple이 되어 `Transition`과 맞지 않으니 쓰지 않는다.
 */
export const REVEAL_EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

/** 스크롤 리빌 시 위로 이동해 들어오는 거리(px). 와이어프레임 `data-reveal` 전 구간 `translateY(24px)`. */
export const REVEAL_OFFSET = 24;

/** 히어로 진입 시 위로 이동해 들어오는 거리(px). 와이어프레임 `data-hero` 텍스트 열 기준(`24~34px` 범위, 대표값 28). */
export const HERO_OFFSET = 28;

/** 히어로 비주얼(플로팅 카드) 진입 이동 거리(px). 와이어프레임 L108/110/131 `translateY(40px) scale(.97)` 기준. */
export const HERO_OFFSET_VISUAL = 40;

/**
 * 히어로 순차 진입(eyebrow → 헤딩 → 설명 → CTA → 신뢰 배지) 스태거 스텝(초).
 * 와이어프레임 delay 시퀀스 `0 / .1 / .22 / .34 / .46`에서 역산한 평균 간격(~0.115s)을
 * 반올림한 값. 정확한 재현이 필요하면 이 상수로 인덱스를 곱하지 말고 와이어프레임의 delay
 * 배열을 그대로 쓰는 것도 고려할 것(HERO_STAGGER_DELAYS 참고).
 */
export const HERO_STAGGER_STEP = 0.12;

/**
 * 와이어프레임 히어로 텍스트 열의 실제 delay 시퀀스(초) — eyebrow, 헤딩, 설명, CTA, 신뢰 배지 순.
 * `HERO_STAGGER_STEP × index`로 근사하는 대신 와이어프레임 값을 그대로 쓰고 싶을 때 사용한다.
 */
export const HERO_STAGGER_DELAYS: readonly number[] = [0, 0.1, 0.22, 0.34, 0.46];

/**
 * `useInView`의 `amount` 옵션(뷰포트에 얼마나 들어와야 트리거할지, 0~1 비율).
 * 와이어프레임 IntersectionObserver의 `{ threshold: 0.15 }`를 그대로 옮긴 값 — Magic UI
 * `BlurFade`의 기본값인 `inViewMargin: "-50px"`(margin 기반) 대신, 와이어프레임 원안과
 * 동일한 방식(threshold 기반)으로 번역했다.
 */
export const REVEAL_IN_VIEW_AMOUNT = 0.15;

/** 리빌은 한 번 트리거되면 다시 사라지지 않는다 (와이어프레임의 `io.unobserve(e.target)`와 동일). */
export const REVEAL_ONCE = true;

/** 스크롤 리빌 트랜지션 프리셋. `motion`의 `transition` prop에 그대로 스프레드해서 쓴다. */
export const REVEAL_TRANSITION: Transition = {
  duration: REVEAL_DURATION,
  ease: REVEAL_EASE,
};

/** 히어로 진입 트랜지션 프리셋(텍스트 열 기준). */
export const HERO_TRANSITION: Transition = {
  duration: HERO_DURATION,
  ease: REVEAL_EASE,
};

/** 히어로 진입 트랜지션 프리셋(비주얼/플로팅 카드 열 기준). */
export const HERO_TRANSITION_VISUAL: Transition = {
  duration: HERO_DURATION_VISUAL,
  ease: REVEAL_EASE,
};
