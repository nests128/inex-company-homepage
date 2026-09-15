"use client";

// Page-local section: "임베디드 차트 / SDK / 거래·오더북 API" 3분할 인터랙티브
// 섹션. 좌측 `FeatureListItem` 클릭 시 우측 비주얼이 전환되는 패턴은
// `widgets/operations-split`을 그대로 참고했으나, 그 위젯과 달리 모바일에서도
// 완전히 노출된다(홈페이지 operations-split은 모바일 아트보드에 대응 섹션이
// 없어 `hidden lg:block`이지만, 이 솔루션 상세 페이지는 모바일에서도 핵심
// 콘텐츠라 자연스러운 DOM 순서(헤딩+리스트 먼저, 비주얼 다음)를 두 브레이크
// 포인트 모두에서 그대로 유지한다).
//
// 참고: Aceternity UI의 Sticky Scroll Reveal
// (https://ui.aceternity.com/components/sticky-scroll-reveal) 패턴(스크롤에
// 따라 자동 전환)을 시도했으나 사용자 요청으로 이 클릭 기반 버전으로
// 원복했다(2026-09-14).
import { useState } from "react";
import { CandlestickChartIcon, CodeIcon, BookOpenTextIcon } from "lucide-react";
import { cn } from "cn";
import Image from "next/image";

import {
  AnimatedSpan,
  FeatureListItem,
  GradientBackdrop,
  OrderbookPreview,
  Reveal,
  Terminal,
} from "@/shared/ui";
import {
  cryptoTradingCapabilitiesContentByLocale,
  cryptoTradingFeaturesByLocale,
  cryptoTradingOrderbookApiRequest,
  cryptoTradingOrderbookApiResponse,
  cryptoTradingOrderbookAsks,
  cryptoTradingOrderbookBids,
  cryptoTradingSdkSnippet,
  type CryptoTradingFeatureIconKey,
} from "@/entities/company";
import type { Locale } from "@/shared/lib/i18n";

// chart2.png: 실제 트레이딩뷰 스타일 캡처(심볼/가격/고가·저가 배지 포함) —
// 사용자 명시적 요청(2026-09-14)으로 CSS 봉차트 대신 이미지를 그대로 채운다.
const CRYPTO_TRADING_CHART_IMAGE_SRC = "/images/solutions/crypto-trading-chart2.png";
const CRYPTO_TRADING_CHART_IMAGE_ALT: Record<Locale, string> = {
  ko: "BTC/USDT 실시간 캔들 차트 화면",
  en: "Real-time BTC/USDT candlestick chart screen",
};

function FeatureIcon({ iconKey }: { iconKey: CryptoTradingFeatureIconKey }) {
  switch (iconKey) {
    case "chart":
      return <CandlestickChartIcon aria-hidden="true" />;
    case "sdk":
      return <CodeIcon aria-hidden="true" />;
    case "orderbook":
      return <BookOpenTextIcon aria-hidden="true" />;
  }
}

/**
 * Minimal token-based syntax highlighter for the terminal previews (SDK
 * snippet, curl request, JSON response) — no highlighter dependency for a
 * handful of static demo lines. Splits on strings/JSON keys/keywords/curl
 * flags/numbers/punctuation and colors each token; anything else
 * (identifiers, dots, plain text) falls through to the base muted color.
 */
const SDK_TOKEN_PATTERN =
  /("[^"]*"(?=\s*:))|('[^']*'|"[^"]*")|(\b(?:import|from|const|new|await)\b)|(curl|--[a-z-]+)|([{}()[\]])|(\b-?\d+(?:\.\d+)?\b)/g;

/**
 * Color palette per token kind. `"dark"` is the original dark-terminal
 * scheme (SDK tab). `"light"` matches `ref/exchange/temp.png`(사용자
 * 제공 curl 요청 코드 캡처) exactly: 커맨드/플래그=보라, 문자열 값=초록,
 * JSON 키=진회색 — 사용자 명시적 요청(2026-09-14)으로 다크 팔레트를 그대로
 * 재사용하던 것에서 분리.
 */
const TOKEN_PALETTE = {
  dark: {
    jsonKey: "text-sky-300",
    str: "text-amber-300",
    keyword: "text-sky-400",
    flag: "text-fuchsia-300",
    bracket: "text-[#5B6779]",
    num: "text-fuchsia-300",
  },
  light: {
    // 응답 JSON 키 색상 — 사용자 명시적 요청(2026-09-14)으로 진회색에서 파랑으로.
    jsonKey: "text-blue-600",
    str: "text-emerald-600",
    keyword: "text-violet-600",
    flag: "text-violet-600",
    bracket: "text-slate-400",
    num: "text-violet-600",
  },
} as const;

/** Tokenizes one line into `{text, className}` runs for inline syntax coloring. */
function tokenizeSdkLine(line: string, tone: "dark" | "light" = "dark") {
  const palette = TOKEN_PALETTE[tone];
  const tokens: Array<{ text: string; className?: string }> = [];
  let lastIndex = 0;
  for (const match of line.matchAll(SDK_TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) tokens.push({ text: line.slice(lastIndex, index) });

    const [full, jsonKey, str, keyword, flag, bracket, num] = match;
    if (jsonKey) tokens.push({ text: jsonKey, className: palette.jsonKey })
    else if (str) tokens.push({ text: str, className: palette.str });
    else if (keyword) tokens.push({ text: keyword, className: palette.keyword });
    else if (flag) tokens.push({ text: flag, className: palette.flag });
    else if (bracket) tokens.push({ text: bracket, className: palette.bracket });
    else if (num) tokens.push({ text: num, className: palette.num });

    lastIndex = index + full.length;
  }
  if (lastIndex < line.length) tokens.push({ text: line.slice(lastIndex) });
  return tokens;
}

/**
 * Renders a list of source lines inside a `Terminal`, one `AnimatedSpan` per
 * line. `highlight` (default true) applies token syntax coloring; set to
 * `false` to render every line in a single flat `fallbackClassName` color
 * (사용자 명시적 요청, 2026-09-14 — request 블록 전체를 회색 단색으로).
 */
function TerminalLines({
  lines,
  tone = "dark",
  fallbackClassName = "text-[#93A0B8]",
  delayOffset = 0,
  highlight = true,
}: {
  lines: string[];
  tone?: "dark" | "light";
  fallbackClassName?: string;
  delayOffset?: number;
  highlight?: boolean;
}) {
  return (
    <>
      {lines.map((line, index) => (
        <AnimatedSpan key={index} delay={(delayOffset + index) * 90}>
          {line === "" ? (
            <span>&nbsp;</span>
          ) : !highlight ? (
            <span className={fallbackClassName}>{line}</span>
          ) : (
            tokenizeSdkLine(line, tone).map((token, tokenIndex) => (
              <span key={tokenIndex} className={token.className ?? fallbackClassName}>
                {token.text}
              </span>
            ))
          )}
        </AnimatedSpan>
      ))}
    </>
  );
}

/** Renders the right-hand visual (orderbook+terminal / SDK terminal / chart image) for one feature id. */
function CapabilityVisual({ id, locale }: { id: string; locale: Locale }) {
  if (id === "orderbook") {
    return (
      // 좌: 오더북(직사각형 카드), 우: 거래·오더북 API 예시 코드를 보여주는
      // 라이트 톤 터미널.
      <div className="grid w-full grid-cols-1 items-start gap-4 sm:grid-cols-2">
        {/* 오더북(자연 높이, 약 350px)이 이 2단의 기준 높이 — 데스크톱 2열
            (sm 이상)에서만 우측 터미널을 그 높이에 맞추고 넘치는 내용은
            자른다. grid 기본 stretch는 두 셀 중 더 큰 쪽(터미널의
            request+response 전체 텍스트)에 맞춰 둘 다 늘어나 버리므로,
            items-start로 그 동작을 끄고 터미널에 오더북과 동일한 고정
            높이를 직접 준다. 모바일(1열 스택)에서는 나란히 맞출 필요가
            없으니 sm: 프리픽스로만 적용해 전체 내용이 보이게 둔다. */}
        <OrderbookPreview asks={cryptoTradingOrderbookAsks} bids={cryptoTradingOrderbookBids} />
        {/* ref/exchange/temp.png: request(curl) 코드 다음 response JSON을
            같은 터미널 안에서 순차 표시. request 블록은 하이라이팅 없이
            전체 회색 단색. */}
        <Terminal tone="light" className="overflow-hidden sm:h-[351px]">
          <TerminalLines
            lines={cryptoTradingOrderbookApiRequest}
            highlight={false}
            fallbackClassName="text-foreground/60"
          />
          <TerminalLines
            lines={cryptoTradingOrderbookApiResponse}
            tone="light"
            fallbackClassName="text-foreground/80"
            delayOffset={cryptoTradingOrderbookApiRequest.length}
          />
        </Terminal>
      </div>
    );
  }

  if (id === "sdk") {
    return (
      // Magic UI Terminal 패턴(https://magicui.design/docs/components/terminal)을
      // 이 프로젝트의 motion/react 컨벤션으로 재구현 — macOS 창 프레임 +
      // 줄 단위 순차 진입(AnimatedSpan).
      <Terminal className="h-full w-full border-0">
        <TerminalLines lines={cryptoTradingSdkSnippet} />
      </Terminal>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/8 bg-[#0B101C]">
      <Image
        src={CRYPTO_TRADING_CHART_IMAGE_SRC}
        alt={CRYPTO_TRADING_CHART_IMAGE_ALT[locale]}
        fill
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="object-cover"
      />
    </div>
  );
}

export function CapabilitiesSection({ locale }: { locale: Locale }) {
  const capabilitiesContent = cryptoTradingCapabilitiesContentByLocale[locale];
  const cryptoTradingFeatures = cryptoTradingFeaturesByLocale[locale];

  const defaultId =
    cryptoTradingFeatures.find((item) => item.active)?.id ?? cryptoTradingFeatures[0].id;
  const [selectedId, setSelectedId] = useState(defaultId);
  const selected =
    cryptoTradingFeatures.find((item) => item.id === selectedId) ?? cryptoTradingFeatures[0];

  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal as="div">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {capabilitiesContent.eyebrow}
          </div>
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {capabilitiesContent.title}
          </h2>
          <div className="mt-8 flex flex-col gap-1 lg:mt-12">
            {cryptoTradingFeatures.map((item) => (
              <FeatureListItem
                key={item.id}
                icon={<FeatureIcon iconKey={item.iconKey} />}
                title={item.title}
                description={item.description}
                active={selectedId === item.id}
                onClick={() => setSelectedId(item.id)}
              />
            ))}
          </div>
        </Reveal>

        <Reveal
          as="div"
          delay={0.1}
          className={selected.id === "orderbook" ? "self-start" : "self-stretch"}
        >
          {/* 카드(GradientBackdrop) 전체를 채우도록 내부 프리뷰의 폭 제약
              (기존 w-[86%] max-w-sm)을 제거. 오더북 탭은 콘텐츠 자체 높이만큼만
              카드가 커지도록 self-start(부모 grid의 stretch를 받지 않음) +
              items-start — 다른 탭(차트/SDK)은 카드 전체를 채우는
              self-stretch/items-stretch 유지. */}
          <GradientBackdrop
            tone="light"
            className={cn(
              "min-h-[360px] justify-center p-6",
              selected.id === "orderbook" ? "items-start" : "h-full items-stretch"
            )}
          >
            <Reveal key={selectedId} as="div" inView={false} className="flex w-full items-stretch">
              <CapabilityVisual id={selected.id} locale={locale} />
            </Reveal>
          </GradientBackdrop>
        </Reveal>
      </div>
    </section>
  );
}
