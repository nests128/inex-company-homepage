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
  /** Same value as `id` — Confluence content ID doubles as the `/news/[slug]` route param (simplicity over a title-derived slug). */
  slug: string;
  title: string;
  excerpt: string;
  thumbnailUrl: string | null;
  category: string | null;
  publishedAt: string;
  /** Post author display name, from `history.createdBy`. `null` if Confluence didn't return it. */
  authorName: string | null;
  /** `body.storage.value` with `<ac:image>` macros converted to real `<img>` tags — see `convertStorageHtmlToDisplayHtml`. Safe to render as the detail page body (still raw Confluence storage HTML otherwise; not sanitized beyond the macro rewrite). */
  htmlContent: string;
  href: string;
};

type RawResult = {
  id: string;
  title: string;
  body: { storage: { value: string } };
  history: { createdDate: string; createdBy?: { displayName?: string } };
  metadata: {
    labels: { results: { name: string }[] };
  };
  _links?: { webui?: string };
};

// storage format의 <ac:image> 매크로에서 첫 이미지 URL을 뽑는다.
// 외부 URL(ri:url)과 첨부파일(ri:attachment) 두 케이스를 처리한다. storage
// HTML에는 첨부파일명만 있고 실제 다운로드에 필요한 attachmentId가 없으며,
// `/wiki/download/attachments/{pageId}/{filename}` 형태로 직접 조합한 경로는
// Basic Auth(API 토큰)를 받아주지 않는다(브라우저 세션 쿠키 전용,
// 401 + `WWW-Authenticate: OAuth`) — 그래서 여기서는 URL을 조합하지 않고
// `app/api/confluence-image` 프록시로 pageId+filename만 넘긴다. 그 라우트가
// REST API로 attachmentId를 찾아 진짜 인증 가능한 download 링크를 가져온다.
function extractFirstImage(rawHtml: string, pageId: string): string | null {
  const externalMatch = rawHtml.match(
    /<ac:image[^>]*>[\s\S]*?<ri:url\s+ri:value="([^"]+)"/i,
  );
  if (externalMatch) return externalMatch[1];

  const attachmentMatch = rawHtml.match(
    /<ac:image[^>]*>[\s\S]*?<ri:attachment\s+ri:filename="([^"]+)"/i,
  );
  if (attachmentMatch) {
    const filename = attachmentMatch[1];
    return `/api/confluence-image?pageId=${pageId}&filename=${encodeURIComponent(filename)}`;
  }

  return null;
}

// storage format 본문 전체에서 <ac:image> 매크로를 실제 <img> 태그로 치환한다
// (상세 페이지 본문 렌더링용). extractFirstImage와 같은 external(ri:url) /
// attachment(ri:attachment) 두 케이스를 다루지만, 여기서는 문서 전체를 한 번에
// 훑어야 하므로 매크로 블록 전체(<ac:image ...>...</ac:image>)를 통째로
// 매치한 뒤 내부에서 개별 패턴을 찾는다 — extractFirstImage의 lazy
// `[\s\S]*?` 프리픽스 매치를 그대로 global로 바꾸면 인접한 매크로들 사이를
// 넘나들며 잘못 매치될 수 있어 피한다. 완전한 storage-format 파서는 아니며,
// 이 프로젝트 실데이터에 나오는 <ac:image> 매크로만 처리하고 나머지 태그는
// 그대로 통과시킨다. 매크로 안에 이미지 참조가 없으면(둘 다 매치 실패) 깨진
// 마크업을 남기지 않도록 통째로 제거한다.
function convertStorageHtmlToDisplayHtml(rawHtml: string, pageId: string): string {
  return rawHtml.replace(
    /<ac:image[^>]*>([\s\S]*?)<\/ac:image>/gi,
    (_match, inner: string) => {
      const externalMatch = inner.match(/<ri:url\s+ri:value="([^"]+)"/i);
      if (externalMatch) {
        return `<img src="${externalMatch[1]}" alt="" />`;
      }

      const attachmentMatch = inner.match(
        /<ri:attachment\s+ri:filename="([^"]+)"/i,
      );
      if (attachmentMatch) {
        const filename = attachmentMatch[1];
        const src = `/api/confluence-image?pageId=${pageId}&filename=${encodeURIComponent(filename)}`;
        return `<img src="${src}" alt="" />`;
      }

      return "";
    },
  );
}

// Confluence storage format의 본문에는 스마트 따옴표/줄임표 등이 named
// entity(`&rdquo;`, `&hellip;`...)로 들어있는 경우가 많다. 예전엔 `&nbsp;`
// 등 몇 개만 치환해서, 나머지가 발췌문에 문자 그대로("&rdquo;") 노출되는
// 버그가 있었다(사용자 리포트, 2026-09-15: "따옴표를 먼저 물었다... 이런식
// 으로 태그명이 나와"). 숫자 참조(`&#39;`, `&#8217;` 등)까지 포함해 범용
// 디코더로 교체.
const HTML_ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  ldquo: "“",
  rdquo: "”",
  lsquo: "‘",
  rsquo: "’",
  hellip: "…",
  mdash: "—",
  ndash: "–",
};

function decodeHtmlEntities(text: string): string {
  return text.replace(/&(#\d+|#x[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
    if (entity[0] === "#") {
      const codePoint = entity[1] === "x" || entity[1] === "X"
        ? parseInt(entity.slice(2), 16)
        : parseInt(entity.slice(1), 10);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }
    return HTML_ENTITIES[entity] ?? match;
  });
}

function extractPlainText(rawHtml: string): string {
  // 태그 제거 -> 엔티티 디코드 -> 공백 정리 순서가 중요하다: `&nbsp;`를
  // 먼저 " "로 디코드한 뒤에 `\s+` 정리를 해야 연속 nbsp가 하나로 뭉쳐진다
  // (순서를 바꾸면 디코드가 공백 정리 뒤에 일어나 여러 개의 &nbsp;가 그대로
  // 남는다).
  return decodeHtmlEntities(rawHtml.replace(/<[^>]+>/g, " "))
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
        slug: post.id,
        title: decodeHtmlEntities(post.title),
        excerpt: generateExcerpt(plain, 140),
        thumbnailUrl: extractFirstImage(rawHtml, post.id),
        category: labels[0] ?? null,
        publishedAt: post.history?.createdDate || "",
        authorName: post.history?.createdBy?.displayName ?? null,
        htmlContent: convertStorageHtmlToDisplayHtml(rawHtml, post.id),
        href: post._links?.webui ? `${CONFLUENCE_ORIGIN}${post._links.webui}` : CONFLUENCE_ORIGIN,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

/**
 * Looks up a single post by slug (== Confluence content `id`). Reuses
 * `fetchNewsPosts()` rather than the raw fetch so the blocked-label filter
 * (`internal`/`private`/`draft`/`confidential`) still applies — a post
 * hidden from the list should also 404 on its direct detail URL, not be
 * reachable by guessing the id. Traffic is low (company news page), so the
 * lack of a dedicated single-post API call is an acceptable trade-off.
 */
export async function fetchPostBySlug(slug: string): Promise<NewsPost | null> {
  const posts = await fetchNewsPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
