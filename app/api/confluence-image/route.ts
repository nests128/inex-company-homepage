import { NextRequest, NextResponse } from "next/server";
import "server-only";

import { CONFLUENCE_BASE_URL } from "@/shared/lib/confluence/env";

const EMAIL = process.env.CONFLUENCE_EMAIL ?? "";
const API_TOKEN = process.env.CONFLUENCE_API_TOKEN ?? "";

function authHeader() {
  return "Basic " + Buffer.from(`${EMAIL}:${API_TOKEN}`).toString("base64");
}

type AttachmentSearchResult = {
  results: { id: string; title: string; _links?: { download?: string } }[];
};

// Confluence Cloud의 첨부파일 "다운로드" 경로에는 두 종류가 있고 서로 인증
// 방식이 다르다:
// - `/wiki/download/attachments/{pageId}/{filename}` (storage format의
//   `<ri:attachment>`에서 바로 조합 가능한 경로) — 브라우저 세션 쿠키만
//   받고, Basic Auth(API 토큰)로는 401 + `WWW-Authenticate: OAuth`를 반환.
//   이 경로로는 서버 인증 요청도 통과하지 못한다.
// - `/wiki/rest/api/content/{pageId}/child/attachment/{attachmentId}/download`
//   (REST API가 응답에 포함해 주는 `_links.download`) — Basic Auth를 받고,
//   실제 파일 바이트가 있는 `api.media.atlassian.com`의 서명된 URL로
//   302 리다이렉트한다(그 URL 자체는 별도 인증 불필요).
// storage HTML에는 파일명만 있고 attachmentId가 없으므로, 이 라우트는
// pageId+filename을 받아 먼저 REST API로 attachmentId를 찾고, 그다음
// 진짜 download 링크를 인증된 요청으로 가져와 바이트를 중계한다.
export async function GET(req: NextRequest) {
  const pageId = req.nextUrl.searchParams.get("pageId");
  const filename = req.nextUrl.searchParams.get("filename");

  if (!pageId || !filename || !CONFLUENCE_BASE_URL) {
    return NextResponse.json({ code: "bad_request" }, { status: 400 });
  }

  if (!EMAIL || !API_TOKEN) {
    console.error("[confluence-image] CONFLUENCE_EMAIL / CONFLUENCE_API_TOKEN이 설정되어 있지 않습니다.");
    return NextResponse.json({ code: "not_configured" }, { status: 500 });
  }

  // pageId는 항상 숫자 콘텐츠 ID이므로 여기서 검증 — 그 외 값은 거부해
  // 이 라우트가 임의 경로를 중계하는 오픈 프록시가 되지 않게 한다.
  if (!/^\d+$/.test(pageId)) {
    return NextResponse.json({ code: "forbidden" }, { status: 403 });
  }

  try {
    const searchRes = await fetch(
      `${CONFLUENCE_BASE_URL}/rest/api/content/${pageId}/child/attachment?filename=${encodeURIComponent(filename)}`,
      { headers: { Authorization: authHeader() }, next: { revalidate: 3600 } },
    );

    if (!searchRes.ok) {
      return NextResponse.json({ code: "upstream_error" }, { status: 502 });
    }

    const searchData = (await searchRes.json()) as AttachmentSearchResult;
    const downloadPath = searchData.results?.[0]?._links?.download;
    if (!downloadPath) {
      return NextResponse.json({ code: "not_found" }, { status: 404 });
    }

    // `downloadPath` (e.g. "/rest/api/content/.../download") is relative to
    // the `/wiki` base, NOT the bare origin — `CONFLUENCE_BASE_URL` already
    // ends in `/wiki` (see `env.ts`), so prefix with that, not
    // `CONFLUENCE_ORIGIN` (an earlier version of this route did that and
    // got a 404: it built `https://host/rest/api/...` instead of
    // `https://host/wiki/rest/api/...`).
    const upstream = await fetch(`${CONFLUENCE_BASE_URL}${downloadPath}`, {
      headers: { Authorization: authHeader() },
      next: { revalidate: 3600 },
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ code: "upstream_error" }, { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
    if (!contentType.startsWith("image/")) {
      return NextResponse.json({ code: "not_an_image" }, { status: 502 });
    }

    return new NextResponse(upstream.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("[confluence-image] 이미지를 가져오지 못했습니다.", error);
    return NextResponse.json({ code: "fetch_failed" }, { status: 502 });
  }
}
