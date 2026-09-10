import "server-only";

// CONFLUENCE_BASE_URL을 "/wiki"가 있든 없든 항상 "/wiki"로 끝나도록 정규화한다.
// (Confluence Cloud REST API는 /wiki 하위 경로에 있음 — 자주 빠뜨리는 설정이라 방어적으로 처리)
function normalizeBaseUrl(raw: string): string {
  if (!raw) return "";
  const trimmed = raw.replace(/\/+$/, "");
  return trimmed.endsWith("/wiki") ? trimmed : `${trimmed}/wiki`;
}

export const CONFLUENCE_BASE_URL = normalizeBaseUrl(
  process.env.CONFLUENCE_BASE_URL ?? "",
);

export const CONFLUENCE_ORIGIN = CONFLUENCE_BASE_URL
  ? new URL(CONFLUENCE_BASE_URL).origin
  : "";
