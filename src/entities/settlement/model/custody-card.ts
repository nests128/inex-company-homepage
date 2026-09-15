import type { Locale } from "@/shared/lib/i18n"

// TODO(real-data): 콜드/핫/정산대기 비율(82/12/6)은 업계 관행에 맞춘 그럴듯한 추정치이며
// INEX의 실제 커스터디 자산 배분 수치가 아니다. 확정 후 교체 필요.

interface CustodyStatusCard {
  title: string
  segments: Array<{ label: string; percent: number }>
  // NOTE: BalanceBarChartCard는 CTA를 지원하지 않아 이 필드는 현재 렌더링되지 않음.
  cta: { label: string; href: string }
}

// widgets/operations-split의 "커스터디" 항목 선택 시 렌더링되는 BalanceBarChartCard 데이터
// (segments를 bars로 매핑해서 사용). 원래 widgets/account-highlight 섹션 소유였으나, 그
// 섹션이 온/오프램프 콘텐츠로 바뀌면서 이 카드(커스터디 자산 배분)만 분리해 이곳으로
// 옮김 — operations-split의 "커스터디" 클릭 상태는 account-highlight 섹션이 무슨 내용이든
// 상관없이 계속 커스터디 데이터를 보여줘야 하기 때문.
export const custodyStatusCardByLocale: Record<Locale, CustodyStatusCard> = {
  ko: {
    title: "커스터디 자산 보관 비율",
    segments: [
      { label: "콜드월렛", percent: 82 },
      { label: "핫 월렛", percent: 12 },
      { label: "정산 대기", percent: 6 },
    ],
    cta: { label: "커스터디 안내 보기", href: "#" },
  },
  en: {
    title: "Custody Asset Storage Ratio",
    segments: [
      { label: "Cold Wallet", percent: 82 },
      { label: "Hot Wallet", percent: 12 },
      { label: "Settlement Pending", percent: 6 },
    ],
    cta: { label: "View Custody Overview", href: "#" },
  },
}
