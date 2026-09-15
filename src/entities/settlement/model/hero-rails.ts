import type { SettlementRailOption } from "../ui/settlement-rail-card"
import type { Locale } from "@/shared/lib/i18n"

// TODO(real-data): 레일 이름/메타(T+0, 수납·지급), 승인 담당자, CTA 링크는 와이어프레임 플레이스홀더. 실제 레일 구성 확정 후 교체 필요.

interface HeroSettlementRailCard {
  eyebrow: string
  title: string
  rails: SettlementRailOption[]
  addRailLabel?: string
  approver?: { roleLabel: string; name: string }
  cta: { label: string; href: string }
}

export const heroSettlementRailCardByLocale: Record<Locale, HeroSettlementRailCard> = {
  ko: {
    eyebrow: "RAIL",
    title: "정산 레일 선택",
    rails: [
      { id: "krcx-trading", label: "KRCX · Trading", meta: "T+0", selected: true },
      { id: "ramp-payments", label: "Ramp · Payments", meta: "수납·지급", selected: false },
    ],
    addRailLabel: "+ 레일 추가",
    approver: { roleLabel: "승인 담당자", name: "컴플라이언스 팀" },
    // TODO(real-data): 실제 정산 요약 페이지 라우트로 교체 필요.
    cta: { label: "정산 요약으로 계속 →", href: "#" },
  },
  en: {
    eyebrow: "RAIL",
    title: "Choose Settlement Rail",
    rails: [
      { id: "krcx-trading", label: "KRCX · Trading", meta: "T+0", selected: true },
      { id: "ramp-payments", label: "Ramp · Payments", meta: "Collection · Payout", selected: false },
    ],
    addRailLabel: "+ Add Rail",
    approver: { roleLabel: "Approver", name: "Compliance Team" },
    cta: { label: "Continue to Settlement Summary →", href: "#" },
  },
}

/**
 * Trimmed variant for the mobile (390) hero artboard (~L342-350): the Ramp
 * row loses its `meta` tag (wireframe has no trailing "수납·지급" label,
 * unlike desktop), and the card omits "+ 레일 추가" / the approver row.
 */
export const heroSettlementRailCardMobileByLocale: Record<Locale, HeroSettlementRailCard> = {
  ko: {
    eyebrow: "RAIL",
    title: "정산 레일 선택",
    rails: [
      { id: "krcx-trading", label: "KRCX · Trading", meta: "T+0", selected: true },
      { id: "ramp-payments", label: "Ramp · Payments", meta: undefined, selected: false },
    ],
    cta: heroSettlementRailCardByLocale.ko.cta,
  },
  en: {
    eyebrow: "RAIL",
    title: "Choose Settlement Rail",
    rails: [
      { id: "krcx-trading", label: "KRCX · Trading", meta: "T+0", selected: true },
      { id: "ramp-payments", label: "Ramp · Payments", meta: undefined, selected: false },
    ],
    cta: heroSettlementRailCardByLocale.en.cta,
  },
}
