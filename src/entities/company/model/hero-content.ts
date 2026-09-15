// TODO(real-data): 와이어프레임 플레이스홀더 카피/링크. 실제 카피/라우트 확정 후 교체 필요.
import type { Locale } from "@/shared/lib/i18n";

export interface HeroContent {
  title: string;
  subcopy: string;
  primaryCta: { label: string; href: string; external: boolean };
  trustLabel: string;
}

// 순수 데이터만 두는 파일 — `next/root-params`의 `locale()` 게터를 여기서
// import하면, 이 파일을 재export하는 `entities/company` 배럴을 client
// component가 import할 때 클라이언트 번들 그래프에 root-params 참조가
//딸려 들어가 빌드가 깨진다("Export locale doesn't exist in target
// module" — [app-ssr] 레이어). 로케일 게터는 `entities/company/server.ts`로
// 분리해, 서버 컴포넌트만 그 파일을 import하게 한다.
export const heroContentByLocale: Record<Locale, HeroContent> = {
  ko: {
    title: "디지털자산 · 스테이블코인의\n새로운 표준을 함께 준비합니다",
    subcopy:
      "다가오는 디지털자산 결제 시장의 수요에 맞춰, 온/오프램프부터 수납·지급·충전, 송금·정산까지 결제의 전 구간을 하나의 인프라로 준비하고 있습니다.",
    primaryCta: {
      label: "파트너십 문의",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSfIgc2tgDCkN5Rui7u3QizsBaaAz2OU_3vvteIpYumtyi5leQ/viewform?usp=sf_link",
      external: true,
    },
    // TODO(real-data): VASP 신고 수리 번호(FIU 2024-3)와 ISMS 인증 여부는 와이어프레임 플레이스홀더. 실제 등록/인증 현황 확인 후 교체 필요.
    trustLabel: "VASP 신고 수리 (FIU 2024-3) · ISMS 인증 완료",
  },
  en: {
    title: "Preparing the new standard for\ndigital assets and stablecoins",
    subcopy:
      "In step with the coming demand in digital asset payments, we're building infrastructure that connects the entire flow — on/off-ramp, collection, payout, top-up, remittance, and settlement — on a single rail.",
    primaryCta: {
      label: "Partnership Inquiry",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSfIgc2tgDCkN5Rui7u3QizsBaaAz2OU_3vvteIpYumtyi5leQ/viewform?usp=sf_link",
      external: true,
    },
    trustLabel: "VASP Registered (FIU 2024-3) · ISMS Certified",
  },
};

// Currently unused by widgets/hero — its right-column photo composite
// (trading/tradingDetail/wallet) was replaced with the VideoCard reused from
// feature-showcase (2026-09-10). Left in place per project convention
// (unused content/components aren't deleted); may be reused elsewhere later.
export const heroVisualPlaceholders = {
  trading: {
    // TODO(real-data): 카드/결제 무드 스톡 이미지 플레이스홀더. 실제 촬영/브랜드 이미지로 교체 필요.
    src: "/images/hero/hero1.png",
    alt: "신용카드와 커피잔이 놓인 결제 이미지",
  },
  // 1열 하단 카드 자리 — 원래 CandlestickChart 컴포넌트였다가 hero2.png(원래
  // 2열 wallet 자리)로 교체됨.
  tradingDetail: {
    src: "/images/hero/hero2.png",
    alt: "INEX 사옥 외벽 간판",
  },
  // 2열(넓은 우측 컬럼) 자리 — hero4.png로 교체됨.
  wallet: {
    src: "/images/hero/hero4.png",
    alt: "지갑/월렛 이미지",
  },
  // TODO(design-decision): settlement.png는 아직 배치 위치 미정 — SettlementRailCard(정보성 카드)를
  // 이미지로 교체할지, 별도 슬롯을 추가할지 사용자 확인 필요. src만 등록해두고 hero.tsx에서는 사용하지 않음.
  settlementVisual: {
    src: "/images/hero/settlement.png",
    alt: "정산 네트워크(코인 아이콘) 비주얼",
  },
};
