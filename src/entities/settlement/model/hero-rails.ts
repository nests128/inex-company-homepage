import type { SettlementRailOption } from "../ui/settlement-rail-card"

// TODO(real-data): 레일 이름/메타(T+0, 수납·지급), 승인 담당자, CTA 링크는 와이어프레임 플레이스홀더. 실제 레일 구성 확정 후 교체 필요.

const heroSettlementRails: SettlementRailOption[] = [
  {
    id: "krcx-trading",
    label: "KRCX · Trading",
    meta: "T+0",
    selected: true,
  },
  {
    id: "ramp-payments",
    label: "Ramp · Payments",
    meta: "수납·지급",
    selected: false,
  },
]

/**
 * Mobile (390) artboard renders a trimmed rail card: the Ramp row loses its
 * `meta` tag (wireframe ~L347-348 has no trailing "수납·지급" label, unlike
 * desktop ~L118-121), and the card omits "+ 레일 추가" / the approver row.
 */
const heroSettlementRailsMobile: SettlementRailOption[] = heroSettlementRails.map(
  (rail) =>
    rail.id === "ramp-payments" ? { ...rail, meta: undefined } : rail
)

const heroSettlementCta = {
  label: "정산 요약으로 계속 →",
  // TODO(real-data): 실제 정산 요약 페이지 라우트로 교체 필요.
  href: "#",
}

export const heroSettlementRailCard = {
  eyebrow: "RAIL",
  title: "정산 레일 선택",
  rails: heroSettlementRails,
  addRailLabel: "+ 레일 추가",
  approver: {
    roleLabel: "승인 담당자",
    name: "컴플라이언스 팀",
  },
  cta: heroSettlementCta,
}

/** Trimmed variant for the mobile (390) hero artboard (~L342-350). */
export const heroSettlementRailCardMobile = {
  eyebrow: "RAIL",
  title: "정산 레일 선택",
  rails: heroSettlementRailsMobile,
  cta: heroSettlementCta,
}
