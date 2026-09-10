// History 섹션 실제 콘텐츠. 2022~2025는 상위 `company-homepage` 프로젝트
// `aboutPage.history` 기준 실제 연혁. 2026은 이번 세션에서 직접 추가된 항목.
// 연도는 최신순(내림차순)으로 배열, 연도 내 월도 내림차순으로 정리.
// 각 연도 카드는 이미지 없이 텍스트만 사용 — 월별 항목을 구분선으로 나눠 표시한다.

interface HistoryMilestoneContent {
  month: string
  label: string
}

interface HistoryYearContent {
  year: string
  items: HistoryMilestoneContent[]
}

export const historyContent = {
  eyebrow: "History",
  title: "INEX 연혁",
  subtitle: "작은 팀에서 시작해, 금융 인프라를 만드는 회사로 성장하고 있습니다.",
}

export const historyYears: HistoryYearContent[] = [
  {
    year: "2026",
    items: [{ month: "03월", label: "스테이블코인 결제 POC" }],
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
]
