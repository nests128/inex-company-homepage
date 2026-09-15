// 솔루션 3개 상세 페이지(크립토 트레이딩/커스터디/스테이블코인 결제) 공용
// FAQ 콘텐츠. AEO(Answer Engine Optimization) 대응 — 검색/AI 답변 엔진이
// "질문-답" 쌍을 그대로 인용할 수 있도록 각 페이지 하단에 섹션으로 노출하고,
// `FAQPage` JSON-LD로도 함께 심는다(위젯에서 렌더링).
//
// 답변은 이미 각 콘텐츠 파일(crypto-trading/custody/stablecoin-payments-
// content.ts)에 있는 사실만 재구성한 것이며, 새로운 수치나 인증을 만들지
// 않는다. INEX가 아직 원화 관련 라이선스를 보유하지 않아 KRW 관련 문구를
// 넣지 않는 규칙(no_krw_claims)도 동일하게 적용.
import type { Locale } from "@/shared/lib/i18n";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionHeader {
  eyebrow: string;
  title: string;
}

export const faqSectionHeaderByLocale: Record<Locale, FaqSectionHeader> = {
  ko: { eyebrow: "FAQ", title: "자주 묻는 질문" },
  en: { eyebrow: "FAQ", title: "Frequently asked questions" },
};

export const cryptoTradingFaqByLocale: Record<Locale, FaqItem[]> = {
  ko: [
    {
      question: "크립토 트레이딩 엔진 API는 어떤 서비스인가요?",
      answer:
        "INEX가 자체 거래소에서 직접 운영·검증한 매칭 엔진과 유동성을 임베디드 차트, SDK, 거래·오더북 API 형태로 제공하는 인프라입니다. 별도로 거래소를 새로 구축하지 않고도 트레이딩 기능을 서비스에 그대로 탑재할 수 있습니다.",
    },
    {
      question: "직접 거래소를 구축하지 않아도 되나요?",
      answer:
        "네. 매칭 엔진과 유동성, 오더북을 INEX가 이미 운영 중인 인프라에서 그대로 가져다 쓰므로, 파트너사는 프론트엔드 연동과 API 호출만으로 트레이딩 기능을 제공할 수 있습니다.",
    },
    {
      question: "실시간 시세와 체결 데이터는 어떻게 받나요?",
      answer:
        "WebSocket 기반 실시간 호가·체결 데이터와 REST 주문 API를 함께 제공합니다. 임베디드 차트는 iframe 또는 SDK로 캔들·라인·지표를 즉시 삽입할 수 있습니다.",
    },
    {
      question: "규제 요건은 어떻게 충족하나요?",
      answer:
        "INEX는 FIU 가상자산사업자(VASP) 신고 수리와 KISA ISMS 인증을 완료한 인프라 위에서 서비스를 운영합니다. 도입 시 기술 검토와 함께 규제 요건 정리를 파트너십 문의를 통해 함께 진행합니다.",
    },
  ],
  en: [
    {
      question: "What is the Crypto Trading Engine API?",
      answer:
        "It's infrastructure that delivers the matching engine and liquidity INEX runs and verifies in its own exchange, via embeddable charts, an SDK, and trade/order book APIs — so you can add trading to your product without building an exchange from scratch.",
    },
    {
      question: "Do I need to build my own exchange?",
      answer:
        "No. The matching engine, liquidity, and order book are all provided from infrastructure INEX already operates, so partners only need frontend integration and API calls to offer trading.",
    },
    {
      question: "How do I get real-time prices and fill data?",
      answer:
        "We provide real-time order book and fill data over WebSocket, plus a REST order API. Embedded charts with candle, line, and indicator support can be dropped in via iframe or SDK.",
    },
    {
      question: "How are regulatory requirements handled?",
      answer:
        "INEX operates on infrastructure that has completed VASP registration with Korea's FIU and ISMS certification from KISA. Technical review and regulatory requirements are worked through together via a partnership inquiry.",
    },
  ],
};

export const custodyFaqByLocale: Record<Locale, FaqItem[]> = {
  ko: [
    {
      question: "INEX 커스터디는 어떤 방식으로 자산을 보관하나요?",
      answer:
        "핫월렛과 콜드월렛을 분리 보관하는 체계 위에서, 정책 엔진과 다중 승인(멀티시그/MPC 기반) 절차를 거쳐야 자산이 이동하도록 운영합니다. 입출금 전 구간은 실시간 모니터링 대상입니다.",
    },
    {
      question: "출금 승인은 어떻게 이루어지나요?",
      answer:
        "사전에 정의한 정책 엔진 규칙과 다중 승인 절차를 통과해야 출금이 처리됩니다. 승인 이력과 자산 이동 내역은 감사 로그로 남습니다.",
    },
    {
      question: "거래소·트레저리와 연동해서 사용할 수 있나요?",
      answer:
        "네. 커스터디는 크립토 트레이딩 엔진, 트레저리 운영과 연계해 입출금부터 보관까지 전 구간을 하나의 체계 안에서 운영할 수 있도록 설계되어 있습니다.",
    },
    {
      question: "규제 관련 인증을 보유하고 있나요?",
      answer:
        "INEX는 FIU 가상자산사업자(VASP) 신고 수리와 KISA ISMS 인증을 완료했습니다. 커스터디 특화 인증·보험 한도 등 추가 항목은 확정되는 대로 안내합니다.",
    },
  ],
  en: [
    {
      question: "How does INEX Custody store assets?",
      answer:
        "Assets are held under a hot/cold segregated wallet structure, and any movement requires passing a policy engine plus multi-approval procedures (multisig/MPC-based). The entire deposit/withdrawal path is monitored in real time.",
    },
    {
      question: "How are withdrawals approved?",
      answer:
        "A withdrawal is only processed after it passes predefined policy engine rules and a multi-approval procedure. Approval history and asset movements are recorded in an audit log.",
    },
    {
      question: "Can this integrate with an exchange or treasury operation?",
      answer:
        "Yes. Custody is designed to connect with the crypto trading engine and treasury operations so deposits, withdrawals, and storage can all run under one system.",
    },
    {
      question: "What regulatory certifications does INEX hold?",
      answer:
        "INEX has completed VASP registration with Korea's FIU and ISMS certification from KISA. Custody-specific certifications and insurance limits will be announced once finalized.",
    },
  ],
};

export const stablecoinPaymentsFaqByLocale: Record<Locale, FaqItem[]> = {
  ko: [
    {
      question: "스테이블코인 결제 인프라는 무엇을 제공하나요?",
      answer:
        "차지백 없는 수납과 지급, T+0 정산까지 하나의 레일로 연결하는 인프라입니다. 거래·결제·송금 전 과정은 VASP 규제를 준수하는 컴플라이언스 위에서 이루어집니다.",
    },
    {
      question: "정산까지 얼마나 걸리나요?",
      answer:
        "T+0 정산을 지원합니다. 스테이블코인으로 수납된 자금은 별도의 은행 영업일 대기 없이 처리됩니다.",
    },
    {
      question: "KYC·AML 절차는 누가 처리하나요?",
      answer:
        "VASP 라이선스를 갖춘 사업자가 KYC·KYT·AML 절차를 규제에 맞춰 직접 수행합니다. 파트너사는 결제 전 구간을 컴플라이언스 안에서 그대로 위임할 수 있습니다.",
    },
    {
      question: "차지백 리스크는 어떻게 처리되나요?",
      answer:
        "스테이블코인 결제는 카드 결제와 달리 차지백이 발생하지 않는 방식으로 수납·지급이 이루어져, 이와 관련된 정산 리스크를 구조적으로 줄입니다.",
    },
  ],
  en: [
    {
      question: "What does the stablecoin payments infrastructure provide?",
      answer:
        "It connects chargeback-free collection and payout, all the way to T+0 settlement, on a single rail. Every step of trading, payments, and remittance runs on compliance that follows VASP regulation.",
    },
    {
      question: "How long does settlement take?",
      answer:
        "T+0 settlement is supported. Funds collected in stablecoins are processed without waiting on separate banking business days.",
    },
    {
      question: "Who handles KYC/AML?",
      answer:
        "A VASP-licensed operator performs KYC, KYT, and AML procedures directly in line with regulatory requirements, so partners can delegate the entire payment flow within a compliant framework.",
    },
    {
      question: "How is chargeback risk handled?",
      answer:
        "Unlike card payments, stablecoin collection and payout are not subject to chargebacks, structurally reducing the settlement risk that comes with them.",
    },
  ],
};
