import "server-only";

import { CONFLUENCE_BASE_URL, CONFLUENCE_ORIGIN } from "./env";

const EMAIL = process.env.CONFLUENCE_EMAIL ?? "";
const API_TOKEN = process.env.CONFLUENCE_API_TOKEN ?? "";
const SPACE_KEYS = (process.env.CONFLUENCE_SPACE_KEY || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const BLOCKED_LABELS = ["internal", "private", "draft", "confidential"];

function authHeader() {
  return "Basic " + Buffer.from(`${EMAIL}:${API_TOKEN}`).toString("base64");
}

export type NewsPost = {
  id: string;
  title: string;
  excerpt: string;
  thumbnailUrl: string | null;
  category: string | null;
  publishedAt: string;
  href: string;
};

type RawResult = {
  id: string;
  title: string;
  body: { storage: { value: string } };
  history: { createdDate: string };
  metadata: {
    labels: { results: { name: string }[] };
  };
  _links?: { webui?: string };
};

// storage format의 <ac:image> 매크로에서 첫 이미지 URL을 뽑는다.
// 외부 URL(ri:url)과 첨부파일(ri:attachment) 두 케이스를 처리한다 — 첨부파일은
// 인증이 필요한 다운로드 경로이므로 프록시 없이는 <img>에 그대로 못 쓰지만,
// 목록 카드에서는 최선의 노력(best-effort) 값으로 반환하고 실패 시 page-agent가 폴백한다.
function extractFirstImage(rawHtml: string, pageId: string): string | null {
  const externalMatch = rawHtml.match(
    /<ac:image[^>]*>[\s\S]*?<ri:url\s+ri:value="([^"]+)"/i,
  );
  if (externalMatch) return externalMatch[1];

  const attachmentMatch = rawHtml.match(
    /<ac:image[^>]*>[\s\S]*?<ri:attachment\s+ri:filename="([^"]+)"/i,
  );
  if (attachmentMatch && CONFLUENCE_ORIGIN) {
    const filename = attachmentMatch[1];
    return `${CONFLUENCE_ORIGIN}/wiki/download/attachments/${pageId}/${encodeURIComponent(filename)}`;
  }

  return null;
}

function extractPlainText(rawHtml: string): string {
  return rawHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function generateExcerpt(plainText: string, length = 140): string {
  if (plainText.length <= length) return plainText;
  return plainText.slice(0, length).replace(/\s+\S*$/, "") + "...";
}

async function fetchAllRawPosts(): Promise<RawResult[]> {
  if (!CONFLUENCE_BASE_URL || !EMAIL || !API_TOKEN || SPACE_KEYS.length === 0) {
    console.error(
      "[confluence] CONFLUENCE_BASE_URL / CONFLUENCE_EMAIL / CONFLUENCE_API_TOKEN / CONFLUENCE_SPACE_KEY 중 누락된 값이 있습니다.",
    );
    return [];
  }

  const spaceConditions = SPACE_KEYS.map((s) => `space="${s}"`).join(" or ");
  const cql = `(${spaceConditions}) and type=blogpost`;
  const PAGE_SIZE = 50;
  const all: RawResult[] = [];
  let start = 0;

  try {
    while (true) {
      const params = new URLSearchParams({
        cql,
        expand: "body.storage,metadata.labels,history.createdBy",
        limit: String(PAGE_SIZE),
        start: String(start),
      });

      const res = await fetch(
        `${CONFLUENCE_BASE_URL}/rest/api/content/search?${params}`,
        {
          headers: {
            Authorization: authHeader(),
            "Content-Type": "application/json",
          },
          next: { revalidate: 300 },
        },
      );

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(
          `Confluence API ${res.status}: ${res.statusText} — ${body.slice(0, 500)}`,
        );
      }

      const data = await res.json();
      const results: RawResult[] = data.results || [];
      all.push(...results);

      if (results.length < PAGE_SIZE) break;
      start += PAGE_SIZE;
    }
  } catch (error) {
    console.error("[confluence] 글 목록을 가져오지 못했습니다.", error);
    return [];
  }

  return all;
}

export async function fetchNewsPosts(): Promise<NewsPost[]> {
  const results = await fetchAllRawPosts();

  return results
    .filter((post) => {
      const labels = post.metadata?.labels?.results?.map((l) => l.name) || [];
      return !labels.some((l) => BLOCKED_LABELS.includes(l));
    })
    .map((post) => {
      const labels = post.metadata?.labels?.results?.map((l) => l.name) || [];
      const rawHtml = post.body?.storage?.value || "";
      const plain = extractPlainText(rawHtml);

      return {
        id: post.id,
        title: post.title,
        excerpt: generateExcerpt(plain, 140),
        thumbnailUrl: extractFirstImage(rawHtml, post.id),
        category: labels[0] ?? null,
        publishedAt: post.history?.createdDate || "",
        href: post._links?.webui ? `${CONFLUENCE_ORIGIN}${post._links.webui}` : CONFLUENCE_ORIGIN,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}
