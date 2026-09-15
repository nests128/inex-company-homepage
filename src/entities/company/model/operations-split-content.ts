// TODO(real-data): 와이어프레임 플레이스홀더 카피. 실제 운영 체계 설명 확정 후 교체 필요.
import type { Locale } from "@/shared/lib/i18n"

/**
 * Icon key for `FeatureListItem` items below — maps to a lucide-react glyph
 * in the widget (JSX can't live in this model file; same pattern as
 * `SolutionIconKey` in `nav-content.ts`).
 */
export type OperationsFeatureIconKey = "trading" | "payments" | "custody"

export interface OperationsFeatureListItem {
  id: string
  iconKey: OperationsFeatureIconKey
  title: string
  description: string
  /**
   * Marks the initially-selected item (`widgets/operations-split` defaults
   * its `useState` to whichever item has `active: true`). The light-grey
   * highlight itself is state-driven in the widget, not derived from this
   * flag directly — this only decides the starting selection.
   */
  active?: boolean
  /**
   * `alt` text for the `PlaceholderMedia` shown on the right when this item
   * is selected (`widgets/operations-split` click interaction). Ignored for
   * items with a `visual` override ("payments" → `PaymentCard`, "custody" →
   * `BalanceBarChartCard`), which render an existing composition instead —
   * see the widget.
   */
  mediaAlt: string
  /**
   * Right-panel visual to render when this item is selected. Omit for the
   * default (`PlaceholderMedia` using `mediaAlt`); set to `"payment-card"`
   * to render the `PaymentCard` composition instead (billing/payment fits
   * "스테이블코인 결제" naturally), `"account-card"` to render a
   * `BalanceBarChartCard` with the custody asset breakdown (fits "커스터디"
   * naturally, the name is a historical holdover from when this slot
   * rendered `AccountCard`), or `"trading-card"` to render a
   * `TradingTerminalCard` (BTC candlestick + order book, fits "크립토
   * 트레이딩" naturally).
   */
  visual?: "payment-card" | "account-card" | "trading-card"
}

interface OperationsSplitContent {
  eyebrow: string
  title: string
  description: string
  cta: { label: string; href: string }
  sidePhotos: Array<{ src: string; alt: string }>
  features: OperationsFeatureListItem[]
  tradingTerminalHeader: { symbol: string; price: string; changePercent: string }
}

// operations-split 위젯은 이 객체에서 `eyebrow`, `title`, `teamPhotoAlts`를
// 사용한다 (스케치 ref/image.png에는 설명문단/CTA 버튼이 없음 — 헤딩 위 작은
// 태그, 헤딩 아래 바로 기능 리스트 3개). `description`/`cta`는 이 섹션에서
// 더 이상 렌더링되지 않지만, 다른 곳에서 재사용될 수 있으니 값은 보존한다.
export const operationsSplitContentByLocale: Record<Locale, OperationsSplitContent> = {
  ko: {
    eyebrow: "Solutions",
    title: "거래부터 결제, 커스터디까지\n하나의 인프라에서",
    description:
      "내부·파트너 은행·외부 MM을 정책 기반으로 라우팅해 단일 종속을 피하고, MPC 다중 승인과 핫·콜드 분리를 기본으로 운영합니다.",
    cta: { label: "운영 체계 살펴보기 →", href: "#" },
    // ref/image.png 하단 우측의 세로형 사진 쌍 자리. "스테이블코인 결제" 항목이
    // 선택됐을 때만 노출되는 보조 이미지(위젯에서 `selected.id === "payments"`로
    // 게이팅) — 다른 두 항목(트레이딩/커스터디)은 각자 다른 이미지로 채워질 예정.
    sidePhotos: [
      { src: "/images/operations/pay1.webp", alt: "스테이블코인 결제 이미지 1" },
      { src: "/images/operations/pay2.webp", alt: "스테이블코인 결제 이미지 2" },
    ],
    features: [
      {
        id: "trading",
        iconKey: "trading",
        title: "크립토 트레이딩",
        description:
          "유동성과 커스터디, 컴플라이언스가 함께 붙어 있는 거래 인프라를 REST API로 제공합니다.",
        active: true,
        visual: "trading-card",
        mediaAlt: "이미지: 거래 화면",
      },
      {
        id: "payments",
        iconKey: "payments",
        title: "스테이블코인 결제",
        description:
          "체인과 지갑의 복잡성을 감춘 채, 온체인에서 검증된 수납과 정산을 처리합니다.",
        visual: "payment-card",
        mediaAlt: "이미지: 결제 대시보드",
      },
      {
        id: "custody",
        iconKey: "custody",
        title: "커스터디",
        description: "고객 자산을 멀티시그 다중 승인, 핫·콜드 분리 보관 구조로 관리합니다.",
        visual: "account-card",
        mediaAlt: "이미지: 커스터디 대시보드",
      },
    ],
    // TODO(real-data): 실제 시세가 아닌 데모용 값.
    tradingTerminalHeader: { symbol: "BTC/USDT", price: "97,850", changePercent: "+2.4%" },
  },
  en: {
    eyebrow: "Solutions",
    title: "From trading to payments and custody\non a single infrastructure",
    description:
      "Route through internal liquidity, partner banks, and external market makers on a policy basis to avoid single points of dependency — MPC multi-approval and hot/cold segregation are the default.",
    cta: { label: "Explore how it runs →", href: "#" },
    sidePhotos: [
      { src: "/images/operations/pay1.webp", alt: "Stablecoin payments image 1" },
      { src: "/images/operations/pay2.webp", alt: "Stablecoin payments image 2" },
    ],
    features: [
      {
        id: "trading",
        iconKey: "trading",
        title: "Crypto Trading",
        description:
          "A trading infrastructure with liquidity, custody, and compliance built in — delivered as a REST API.",
        active: true,
        visual: "trading-card",
        mediaAlt: "Image: trading screen",
      },
      {
        id: "payments",
        iconKey: "payments",
        title: "Stablecoin Payments",
        description:
          "Handles on-chain verified collection and settlement while hiding chain and wallet complexity.",
        visual: "payment-card",
        mediaAlt: "Image: payments dashboard",
      },
      {
        id: "custody",
        iconKey: "custody",
        title: "Custody",
        description: "Manages client assets with multisig multi-approval and hot/cold segregated storage.",
        visual: "account-card",
        mediaAlt: "Image: custody dashboard",
      },
    ],
    tradingTerminalHeader: { symbol: "BTC/USDT", price: "97,850", changePercent: "+2.4%" },
  },
}
