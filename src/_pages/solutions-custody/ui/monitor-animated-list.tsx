"use client";

// magicui AnimatedList(https://magicui.design/docs/components/animated-list)를
// motion/react로 그대로 포팅한 패턴 — 항목이 delay마다 하나씩 스프링
// 애니메이션으로 등장해 쌓인다. 원본은 새 항목이 위로 쌓이며 리스트 자체
// 높이가 계속 늘어나는 구조지만, 이 카드는 `overflow-hidden` +
// `items-end`로 하단에 고정된 고정 폭 콘솔이라 리스트가 자라면 매 틱마다
// 보이는 행이 밀리며 흔들린다. 그래서 컨테이너 높이를 표시할 행 수만큼
// 고정해두고, 그 안에서만 최신 항목이 위로 밀어내는 형태로 바꿨다.
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ArrowDownLeftIcon, ArrowUpRightIcon, AlertTriangleIcon } from "lucide-react";
import { cn } from "cn";

export interface MonitorEvent {
  id: string;
  label: string;
  status: string;
  type: "in" | "out" | "alert";
}

const VISIBLE_ROWS = 3;
const ROW_HEIGHT_PX = 44;
const ROW_GAP_PX = 8;
const TICK_DELAY_MS = 2200;

function MonitorEventRow({ event }: { event: MonitorEvent }) {
  return (
    <motion.li
      layout
      initial={{ scale: 0.8, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 40 }}
      className="flex items-center gap-2.5 rounded-lg bg-muted px-3 py-2"
      style={{ height: ROW_HEIGHT_PX }}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full",
          event.type === "alert" ? "bg-amber-100 text-amber-600" : "bg-sky-100 text-sky-600",
        )}
      >
        {event.type === "in" ? (
          <ArrowDownLeftIcon className="size-3.5" />
        ) : event.type === "out" ? (
          <ArrowUpRightIcon className="size-3.5" />
        ) : (
          <AlertTriangleIcon className="size-3.5" />
        )}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11.5px] font-bold text-foreground lg:text-[12px]">
          {event.label}
        </p>
        <p className="truncate text-[10px] text-muted-foreground lg:text-[11px]">
          {event.status}
        </p>
      </div>
    </motion.li>
  );
}

/**
 * 카드 1(모니터링) 이벤트 목록. `events`를 delay 간격으로 하나씩 흘려보내
 * 가장 최근 `VISIBLE_ROWS`개만 위에서 아래로 쌓아 보여준다(오래된 항목은
 * 자연스럽게 위로 밀려 사라짐). `prefers-reduced-motion`이면 순환을 멈추고
 * 마지막 상태(고정된 정적 리스트)만 렌더링.
 */
export function MonitorAnimatedList({ events }: { events: MonitorEvent[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [cursor, setCursor] = useState(VISIBLE_ROWS - 1);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setCursor((prev) => (prev + 1) % events.length);
    }, TICK_DELAY_MS);
    return () => clearInterval(timer);
  }, [prefersReducedMotion, events.length]);

  const visible = useMemo(() => {
    return Array.from({ length: VISIBLE_ROWS }, (_, i) => {
      const idx = (cursor - i + events.length * 10) % events.length;
      return events[idx];
    }).reverse();
  }, [cursor, events]);

  const containerHeight = VISIBLE_ROWS * ROW_HEIGHT_PX + (VISIBLE_ROWS - 1) * ROW_GAP_PX;

  return (
    <ul
      className="mt-3.5 flex flex-col justify-end gap-2 overflow-hidden lg:mt-4 lg:gap-2.5"
      style={{ height: containerHeight }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {visible.map((event) => (
          <MonitorEventRow key={event.id} event={event} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
