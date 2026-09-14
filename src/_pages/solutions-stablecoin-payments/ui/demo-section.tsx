"use client";

// Page-local section: "Demo" 블록. 사용자 명시적 요청(2026-09-14: "데모 스텝
// https://inex-solution-homepage.vercel.app/demo/mobile-payment 이걸로 다시
// 바꿔줘 7단계.")에 따라 실제 운영 중인 "Pay X" 모바일 결제 데모의 7단계를
// 재현한다. 원본은 다크 테마 + 4주체 흐름 표시기를 쓰지만, 이 페이지는
// 라이트 테마와 기존 탭/코드 프리뷰/이전·다음 네비게이션 구조를 유지한다
// (사용자 명시적 요청) — 좌측 회색 배경 박스 안 폰 목업(스텝별 고유 UI) +
// 우측 탭(7스텝) + 코드 프리뷰(POST 경로+상태 헤더, REQUEST/RESPONSE 통합
// 패널 — 코드가 없는 스텝은 체크리스트만 표시).
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, LoaderCircleIcon } from "lucide-react";
import { cn } from "cn";

import { Reveal, Terminal } from "@/shared/ui";
import {
  stablecoinPaymentsDemoContent,
  stablecoinPaymentsDemoSteps,
  type StablecoinPaymentsDemoCodeBlock,
  type StablecoinPaymentsDemoScreen,
  type StablecoinPaymentsDemoStep,
} from "@/entities/company";

/**
 * Minimal token-based syntax highlighter — 동일 패턴이 크립토 트레이딩
 * 페이지(`solutions-crypto-trading/ui/capabilities-section.tsx`)에도 있으나,
 * 서로 다른 스니펫에 각자 칠하는 페이지 로컬 유틸이라 공용 컴포넌트로
 * 승격하지 않고 동일 패턴을 그대로 반복한다.
 */
const CODE_TOKEN_PATTERN =
  /("[^"]*"(?=\s*:))|('[^']*'|"[^"]*")|(true|false)|([{}()[\]])|(\b-?\d+(?:\.\d+)?\b)/g;

const TOKEN_PALETTE = {
  jsonKey: "text-blue-600",
  str: "text-emerald-600",
  bool: "text-violet-600",
  bracket: "text-slate-400",
  num: "text-violet-600",
} as const;

function tokenizeLine(line: string) {
  const tokens: Array<{ text: string; className?: string }> = [];
  let lastIndex = 0;
  for (const match of line.matchAll(CODE_TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) tokens.push({ text: line.slice(lastIndex, index) });

    const [full, jsonKey, str, bool, bracket, num] = match;
    if (jsonKey) tokens.push({ text: jsonKey, className: TOKEN_PALETTE.jsonKey });
    else if (str) tokens.push({ text: str, className: TOKEN_PALETTE.str });
    else if (bool) tokens.push({ text: bool, className: TOKEN_PALETTE.bool });
    else if (bracket) tokens.push({ text: bracket, className: TOKEN_PALETTE.bracket });
    else if (num) tokens.push({ text: num, className: TOKEN_PALETTE.num });

    lastIndex = index + full.length;
  }
  if (lastIndex < line.length) tokens.push({ text: line.slice(lastIndex) });
  return tokens;
}

function CodeLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <div key={index}>
          {line === "" ? (
            <span>&nbsp;</span>
          ) : (
            tokenizeLine(line).map((token, tokenIndex) => (
              <span key={tokenIndex} className={token.className ?? "text-foreground/60"}>
                {token.text}
              </span>
            ))
          )}
        </div>
      ))}
    </>
  );
}

/**
 * Checklist row shared by the "review" (KYC) and "processing" (DB 이체) phone
 * screens. `done` items (index below the current progress cursor) show a
 * check mark, the one item at the cursor spins, and the rest wait — so the
 * list reads as continuously advancing rather than frozen on the first row
 * (사용자 명시적 요청, 2026-09-14: "스텝3,5는 로딩 계속 진행되야지"). The icon
 * swap crossfades (`AnimatePresence mode="sync"`, both icons animate at
 * once) rather than waiting for the old one to fully exit before the new one
 * enters — `mode="wait"` was the cause of the visible stutter reported
 * (사용자 명시적 요청, 2026-09-14: "체크 순서 넘어갈때 좀 버벅이는데? 자연스럽게").
 */
function ChecklistRow({ label, active, done }: { label: string; active: boolean; done: boolean }) {
  const iconKey = done ? "done" : active ? "active" : "pending";
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex size-3.5 shrink-0 items-center justify-center">
        <AnimatePresence initial={false}>
          {done ? (
            <motion.span
              key="done"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-emerald-500 text-white"
            >
              <CheckIcon className="size-2.5" aria-hidden="true" />
            </motion.span>
          ) : active ? (
            <motion.span
              key="active"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <LoaderCircleIcon className="size-3.5 animate-spin text-sky-600" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="pending"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-border"
            />
          )}
        </AnimatePresence>
      </span>
      <span className={cn("text-[11px]", active || done ? "font-bold text-foreground" : "text-muted-foreground")}>
        {label}
      </span>
    </div>
  );
}

/**
 * Cycles a progress index through `count` items every `intervalMs`, looping
 * back to 0 so the checklist keeps visibly advancing rather than settling on
 * the last step and going idle — this is a decorative demo, not a real
 * async process with a natural end (사용자 명시적 요청, 2026-09-14: "다음스텝
 * 넘기지 말고 반복하게 하고" — reverses the earlier auto-advance-on-complete
 * behavior). `resetKey` (the tab's step index) forces a restart from 0 even
 * when `count` happens to match the previous step's.
 */
function useChecklistProgress(count: number, resetKey: unknown, intervalMs = 1100) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (count <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => clearInterval(id);
  }, [count, resetKey, intervalMs]);

  return index;
}

/**
 * Renders the step-specific phone screen content from
 * `StablecoinPaymentsDemoScreen`. `progressIndex` drives the two checklist
 * variants (review/processing) — see `useChecklistProgress` — and is unused
 * by every other screen kind.
 */
function PhoneScreenContent({
  screen,
  progressIndex,
}: {
  screen: StablecoinPaymentsDemoScreen;
  progressIndex: number;
}) {
  switch (screen.kind) {
    case "payment-request":
      return (
        <div className="flex h-full flex-col gap-4 p-5">
          <p className="text-[13px] font-bold text-foreground">결제</p>
          <div className="rounded-xl border border-border bg-muted px-3 py-3">
            <p className="text-[9.5px] font-medium text-muted-foreground">가맹점</p>
            <p className="mt-0.5 text-[13px] font-bold text-foreground">{screen.merchant}</p>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl bg-sky-50 py-5 text-center">
            <p className="text-[10.5px] text-muted-foreground">결제 금액</p>
            <p className="text-[24px] font-bold text-sky-700">
              {screen.amount} <span className="text-[13px] font-medium">{screen.asset}</span>
            </p>
          </div>
          <span className="mt-auto w-full rounded-lg bg-foreground py-2.5 text-center text-[12.5px] font-bold text-background">
            결제하기
          </span>
        </div>
      );
    case "register-form":
      return (
        <div className="flex h-full flex-col gap-3 overflow-y-auto p-5">
          <p className="text-[12.5px] font-bold text-foreground">회원 정보 입력</p>
          {screen.fields.map((field) => (
            <div key={field.label} className="flex flex-col gap-1">
              <span className="text-[9.5px] font-medium text-muted-foreground">{field.label}</span>
              <span className="rounded-lg border border-border bg-muted px-2.5 py-1.5 text-[11.5px] text-foreground">
                {field.value}
              </span>
            </div>
          ))}
        </div>
      );
    case "review-checklist":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-5 p-5">
          <LoaderCircleIcon className="size-9 animate-spin text-sky-600" aria-hidden="true" />
          <div className="text-center">
            <p className="text-[13px] font-bold text-foreground">INEX 검토 중</p>
            <p className="mt-0.5 text-[10.5px] text-muted-foreground">잠시만 기다려 주세요</p>
          </div>
          <div className="flex w-full flex-col gap-2.5">
            {screen.items.map((item, index) => (
              <ChecklistRow
                key={item.label}
                label={item.label}
                active={index === progressIndex}
                done={index < progressIndex}
              />
            ))}
          </div>
        </div>
      );
    case "qr-issued":
      return (
        <div className="flex h-full flex-col gap-3 p-5">
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <div className="flex size-[112px] items-center justify-center rounded-xl border border-border bg-white p-2 shadow-[0_1px_4px_rgba(0,0,0,.06)]">
              <div
                aria-hidden="true"
                className="size-full rounded-sm"
                style={{
                  backgroundImage: "repeating-conic-gradient(#0a0a0a 0% 25%, transparent 0% 50%)",
                  backgroundSize: "10px 10px",
                }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground">QR 스캔으로 입금</p>
          </div>
          <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-muted px-3 py-2.5 text-[10.5px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">네트워크</span>
              <span className="font-bold text-foreground">{screen.network}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">입금 수량</span>
              <span className="font-bold text-foreground">
                {screen.amount} {screen.asset}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="shrink-0 text-muted-foreground">입금 주소</span>
              <span className="truncate font-bold text-sky-700">{screen.address}</span>
            </div>
          </div>
        </div>
      );
    case "processing-checklist":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-5">
          <LoaderCircleIcon className="size-9 animate-spin text-sky-600" aria-hidden="true" />
          <div className="text-center">
            <p className="text-[13px] font-bold text-foreground">INEX 처리 중</p>
            <p className="mt-0.5 text-[10.5px] text-muted-foreground">잠시만 기다려 주세요</p>
          </div>
          <div className="flex w-full flex-col gap-2.5 rounded-xl border border-border bg-muted px-3 py-3">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] text-muted-foreground">결제 금액</span>
              <span className="text-[13px] font-bold text-foreground">
                {screen.amount} {screen.asset}
              </span>
            </div>
            <div className="flex flex-col gap-2 border-t border-border pt-2">
              {screen.items.map((item, index) => (
                <ChecklistRow
                  key={item.label}
                  label={item.label}
                  active={index === progressIndex}
                  done={index < progressIndex}
                />
              ))}
            </div>
          </div>
        </div>
      );
    case "payment-completed":
      return (
        <div className="flex h-full flex-col gap-3 p-5">
          <div className="flex flex-col items-center gap-2 py-2 text-center">
            <span className="flex size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckIcon className="size-5" aria-hidden="true" />
            </span>
            <p className="text-[15px] font-bold text-foreground">
              {screen.amount} {screen.asset} 결제 완료
            </p>
            <p className="text-[11px] text-muted-foreground">{screen.merchant}</p>
          </div>
          <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-muted px-3 py-2.5 text-[10.5px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제일시</span>
              <span className="font-bold text-foreground">{screen.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제방법</span>
              <span className="font-bold text-foreground">{screen.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">거래번호</span>
              <span className="font-bold text-sky-700">{screen.orderId}</span>
            </div>
          </div>
        </div>
      );
    case "receipt-detail":
      return (
        <div className="flex h-full flex-col gap-3 overflow-y-auto p-5 text-[10.5px]">
          <p className="text-[12.5px] font-bold text-foreground">거래 상세</p>
          <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-muted px-3 py-2.5">
            <p className="mb-0.5 text-[9.5px] font-bold tracking-[.06em] text-muted-foreground uppercase">결제 정보</p>
            <div className="flex justify-between">
              <span className="text-muted-foreground">가맹점</span>
              <span className="font-bold text-foreground">{screen.merchant}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제 금액</span>
              <span className="font-bold text-foreground">{screen.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">수수료</span>
              <span className="font-bold text-foreground">{screen.fee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">최종 결제액</span>
              <span className="font-bold text-sky-700">{screen.total}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-muted px-3 py-2.5">
            <p className="mb-0.5 text-[9.5px] font-bold tracking-[.06em] text-muted-foreground uppercase">거래 정보</p>
            <div className="flex justify-between">
              <span className="text-muted-foreground">거래번호</span>
              <span className="font-bold text-sky-700">{screen.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">거래일시</span>
              <span className="font-bold text-foreground">{screen.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제 수단</span>
              <span className="font-bold text-foreground">{screen.method}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-muted px-3 py-2.5">
            <p className="mb-0.5 text-[9.5px] font-bold tracking-[.06em] text-muted-foreground uppercase">블록체인</p>
            <p className="truncate font-bold text-sky-700">{screen.txId}</p>
            <div className="mt-1 flex justify-between">
              <span className="text-muted-foreground">컨펌</span>
              <span className="font-bold text-foreground">{screen.confirmations}</span>
            </div>
          </div>
        </div>
      );
  }
}

/** iPhone-style frame (rounded bezel + notch) wrapping the step's phone screen. */
function PhoneMockup({ step, progressIndex }: { step: StablecoinPaymentsDemoStep; progressIndex: number }) {
  return (
    <div className="flex aspect-[9/17.5] w-[220px] max-w-full flex-col rounded-[2.5rem] border-[6px] border-foreground bg-background p-1.5 shadow-xl lg:w-[240px]">
      <div className="relative flex-1 overflow-hidden rounded-[2rem] bg-background">
        <div
          aria-hidden="true"
          className="absolute top-2 left-1/2 h-4 w-20 -translate-x-1/2 rounded-full bg-foreground"
        />
        <div className="flex h-full flex-col pt-8">
          <PhoneScreenContent screen={step.screen} progressIndex={progressIndex} />
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ block }: { block: StablecoinPaymentsDemoCodeBlock }) {
  return (
    <Terminal tone="light" showTrafficLights={false} className="overflow-hidden">
      <div className="mb-1 flex items-center justify-between border-b border-border pb-2">
        <div className="flex items-center gap-2">
          {block.method ? (
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9.5px] font-bold text-emerald-700">
              {block.method}
            </span>
          ) : null}
          <span className="text-[11.5px] font-bold text-foreground">{block.path}</span>
        </div>
        <span className="text-[10.5px] font-bold text-sky-600">{block.status}</span>
      </div>
      <p className="mt-1 text-[9.5px] font-bold tracking-[.06em] text-muted-foreground uppercase">Request</p>
      <CodeLines lines={block.request} />
      <p className="mt-3 text-[9.5px] font-bold tracking-[.06em] text-muted-foreground uppercase">Response</p>
      <CodeLines lines={block.response} />
    </Terminal>
  );
}

/** Step-3/5 checklist-only panel — 원본 데모에는 코드 블록 없이 폰 화면의 체크리스트만 확대된 형태로 보였다. */
function ChecklistPanel({ items, progressIndex }: { items: Array<{ label: string }>; progressIndex: number }) {
  return (
    <div className="rounded-xl border border-border bg-muted p-5">
      <p className="mb-3 text-[11px] font-bold tracking-[.06em] text-muted-foreground uppercase">검토 진행</p>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <ChecklistRow
            key={item.label}
            label={item.label}
            active={index === progressIndex}
            done={index < progressIndex}
          />
        ))}
      </div>
    </div>
  );
}

export function DemoSection() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = stablecoinPaymentsDemoSteps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === stablecoinPaymentsDemoSteps.length - 1;

  // 스텝3(review-checklist)/스텝5(processing-checklist)의 체크리스트 항목 수를
  // 기준으로 진행 인덱스를 순환시킨다. 다른 스텝은 항목이 없어(count 0) 훅이
  // 사실상 아무 것도 하지 않는다.
  const checklistCount =
    step.screen.kind === "review-checklist" || step.screen.kind === "processing-checklist"
      ? step.screen.items.length
      : 0;
  const progressIndex = useChecklistProgress(checklistCount, stepIndex);

  return (
    <section className="py-14 lg:py-24">
      <div className="container-inex">
        <Reveal as="div">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-foreground/80 lg:mb-4">
            <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-sky-500" />
            {stablecoinPaymentsDemoContent.eyebrow}
          </div>
          <h2 className="text-2xl leading-[1.2] tracking-[-.015em] lg:text-[36px] lg:leading-[1.2] lg:tracking-[-.02em]">
            {stablecoinPaymentsDemoContent.title}
          </h2>
        </Reveal>

        <Reveal
          as="div"
          delay={0.1}
          className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-10"
        >
          {/* 좌측: 회색 배경 박스 안 폰 목업만(사용자 명시적 요청, 2026-09-14
              — 스텝 라벨/설명은 우측 컬럼 상단, 코드 프리뷰 위로 이동). */}
          <div className="flex items-center justify-center rounded-2xl bg-muted p-8 lg:p-14">
            <PhoneMockup step={step} progressIndex={progressIndex} />
          </div>

          {/* 우측: 탭 + 스텝 라벨/설명 + 코드 프리뷰(또는 체크리스트) + 이전/다음. */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-border">
              {stablecoinPaymentsDemoSteps.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStepIndex(index)}
                  className={cn(
                    "cursor-pointer border-b-2 pb-3 text-[12.5px] font-medium whitespace-nowrap transition-colors",
                    index === stepIndex
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.tabLabel}
                </button>
              ))}
            </div>

            <div key={step.id} className="mt-5">
              <p className="text-[11px] font-bold tracking-[.08em] text-muted-foreground">{step.stepLabel}</p>
              <h3 className="mt-2 text-[19px] font-bold text-foreground">{step.screenTitle}</h3>
              <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">{step.screenDescription}</p>
            </div>

            <div className="mt-5 flex flex-1 flex-col gap-4">
              {step.codeBlocks.length > 0 ? (
                step.codeBlocks.map((block) => <CodeBlock key={block.path} block={block} />)
              ) : step.screen.kind === "review-checklist" || step.screen.kind === "processing-checklist" ? (
                <ChecklistPanel items={step.screen.items} progressIndex={progressIndex} />
              ) : (
                <p className="text-[13px] text-muted-foreground">
                  이 단계는 고객이 거래 내역에서 상세 정보를 확인하는 화면입니다.
                </p>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                disabled={isFirst}
                aria-label="이전 단계"
                className="flex size-9 items-center justify-center rounded-full bg-foreground text-background disabled:opacity-30"
              >
                <ArrowLeftIcon className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setStepIndex((i) => Math.min(stablecoinPaymentsDemoSteps.length - 1, i + 1))}
                disabled={isLast}
                className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-bold text-background disabled:opacity-30"
              >
                다음
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
