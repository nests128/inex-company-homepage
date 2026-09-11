/**
 * 뉴스 목록/상세에서 쓰는 발행일 표기 공용 포매터.
 *
 * `Intl.DateTimeFormat`에 로케일/타임존을 명시하지 않으면 서버(빌드 환경)와
 * 클라이언트(브라우저 로케일) 렌더 결과가 달라져 하이드레이션 불일치가 날 수
 * 있다 — 항상 `ko-KR` + `Asia/Seoul`로 고정한다. 여러 컴포넌트
 * (`NewsFeaturedCard`, `NewsCard`, `NewsMeta`)가 동일한 포맷을 쓰므로 이 한
 * 곳에서만 구현한다.
 */
const formatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Seoul",
});

/**
 * ISO(또는 파싱 가능한) 날짜 문자열을 "2025년 9월 8일" 형태로 포맷한다.
 * 빈 문자열이거나 파싱 불가한 값이면 `null`을 반환한다 — 호출부는 `null`일 때
 * 아무것도 렌더링하지 않아야 한다("Invalid Date" 노출 방지).
 */
export function formatNewsDate(publishedAt: string): string | null {
  if (!publishedAt) return null;
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return null;
  return formatter.format(date);
}
