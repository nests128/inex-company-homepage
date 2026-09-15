// History 섹션 실제 콘텐츠. 2022~2025는 상위 `company-homepage` 프로젝트
// `aboutPage.history` 기준 실제 연혁, 2026은 사용자 제공 실데이터.
// 연도는 최신순(내림차순)으로 배열, 연도 내 월도 내림차순으로 정리.
// 각 연도 카드는 이미지 없이 텍스트만 사용 — 월별 항목을 구분선으로 나눠 표시한다.
import type { Locale } from "@/shared/lib/i18n"

interface HistoryMilestoneContent {
  month: string
  label: string
}

interface HistoryYearContent {
  year: string
  items: HistoryMilestoneContent[]
}

interface HistoryContent {
  eyebrow: string
  title: string
  subtitle: string
  prevLabel: string
  nextLabel: string
  years: HistoryYearContent[]
}

// 고유명사(회사명·제품명·인증명)는 로케일에 따라 임의로 번역하지 않는다:
// INEX Exchange, AWS, Chainalysis, ISO 27001:2022, KPN(한국결제네트웍스),
// AVAX(Avalanche), Fireblocks, FIU, VASP, Xangle, CODE 트래블룰, ISMS,
// AML/FDS 등은 영어 로케일에서도 그대로 두거나(고유명사) 이미 영문 약어인
// 경우 그대로 사용.
export const historyContentByLocale: Record<Locale, HistoryContent> = {
  ko: {
    eyebrow: "History",
    title: "INEX 연혁",
    subtitle: "작은 팀에서 시작해, 금융 인프라를 만드는 회사로 성장하고 있습니다.",
    prevLabel: "이전 연도",
    nextLabel: "다음 연도",
    years: [
      {
        year: "2026",
        items: [
          { month: "09월", label: "다날과 스테이블코인 결제·정산 인프라 구축 업무협약 체결" },
          { month: "08월", label: "아마존웹서비스(AWS)의 생성형 AI 기술을 활용해 자금세탁방지(AML) 업무 PoC 착수" },
          { month: "07월", label: "체이널리시스(Chainalysis) 도입 통한 KYC/AML 고도화" },
          { month: "06월", label: "정보보안 관리체계 국제 표준 ISO 27001:2022 인증 획득" },
          { month: "01월", label: "KPN(한국결제네트웍스)과 USDC 기반 스테이블코인 결제 PoC 완료" },
        ],
      },
      {
        year: "2025",
        items: [
          { month: "09월", label: "AML 고도화 완료" },
          { month: "09월", label: "AVAX(아발란체)와 스테이블코인 혁신을 위한 전략적 제휴 체결" },
          { month: "08월", label: "한국결제네트웍스와 스테이블코인 결제 솔루션 구축 전략적 제휴 체결" },
          { month: "04월", label: "ISMS 본인증 획득" },
          { month: "01월", label: "파이어블록스(Fireblocks)와 파트너십 체결" },
        ],
      },
      {
        year: "2024",
        items: [
          { month: "11월", label: "INEX Exchange 정식 서비스 오픈" },
          { month: "10월", label: "FIU 가상자산사업자(VASP) 신고 수리 완료" },
          { month: "08월", label: "쟁글(Xangle)과 전략적 파트너십 체결" },
          { month: "04월", label: "AML / FDS 2차 고도화" },
          { month: "01월", label: "CODE트래블룰 솔루션 연동" },
        ],
      },
      {
        year: "2023",
        items: [
          { month: "11월", label: "법무법인 태평양 법률자문 계약 체결" },
          { month: "10월", label: "ISMS 예비인증 획득" },
          { month: "09월", label: "AML / FDS 1차 고도화" },
          { month: "05월", label: "ISMS 인증 심사 진행" },
          { month: "04월", label: "사무실 확장이전(서울시 강남 동경빌딩)" },
        ],
      },
      {
        year: "2022",
        items: [
          { month: "12월", label: "AML / FDS 시스템 구축" },
          { month: "04월", label: "(주)인피니티익스체인지코리아 법인 설립" },
        ],
      },
    ],
  },
  en: {
    eyebrow: "History",
    title: "INEX History",
    subtitle: "Starting as a small team, we're growing into a company building financial infrastructure.",
    prevLabel: "Previous year",
    nextLabel: "Next year",
    years: [
      {
        year: "2026",
        items: [
          { month: "Sep", label: "Signed MOU with Danal to build stablecoin payment/settlement infrastructure" },
          { month: "Aug", label: "Started AML PoC leveraging AWS generative AI technology" },
          { month: "Jul", label: "Upgraded KYC/AML with Chainalysis" },
          { month: "Jun", label: "Certified ISO 27001:2022, the international standard for information security management" },
          { month: "Jan", label: "Completed USDC-based stablecoin payment PoC with KPN (Korea Payment Network)" },
        ],
      },
      {
        year: "2025",
        items: [
          { month: "Sep", label: "Completed AML upgrade" },
          { month: "Sep", label: "Signed strategic alliance with Avalanche (AVAX) for stablecoin innovation" },
          { month: "Aug", label: "Signed strategic alliance with Korea Payment Network to build a stablecoin payment solution" },
          { month: "Apr", label: "Obtained full ISMS certification" },
          { month: "Jan", label: "Partnered with Fireblocks" },
        ],
      },
      {
        year: "2024",
        items: [
          { month: "Nov", label: "Officially launched INEX Exchange" },
          { month: "Oct", label: "Completed FIU VASP (Virtual Asset Service Provider) registration" },
          { month: "Aug", label: "Signed strategic partnership with Xangle" },
          { month: "Apr", label: "Completed 2nd-phase AML/FDS upgrade" },
          { month: "Jan", label: "Integrated CODE travel rule solution" },
        ],
      },
      {
        year: "2023",
        items: [
          // TODO(real-data): "법무법인 태평양"의 공식 영문 표기 미확인 — 임의로
          // 지어내지 않고 한글 고유명사를 그대로 둔다. 확정되면 교체.
          { month: "Nov", label: "Signed legal advisory contract with 법무법인 태평양 (law firm)" },
          { month: "Oct", label: "Obtained preliminary ISMS certification" },
          { month: "Sep", label: "Completed 1st-phase AML/FDS upgrade" },
          { month: "May", label: "Underwent ISMS certification review" },
          { month: "Apr", label: "Relocated to a larger office (Donggyeong Building, Gangnam, Seoul)" },
        ],
      },
      {
        year: "2022",
        items: [
          { month: "Dec", label: "Built AML/FDS system" },
          { month: "Apr", label: "Incorporated Infinity Exchange Korea Co., Ltd." },
        ],
      },
    ],
  },
}
