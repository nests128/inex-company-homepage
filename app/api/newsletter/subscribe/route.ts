import { NextRequest, NextResponse } from "next/server";

const NEWSLETTER_API_URL = process.env.NEWSLETTER_API_URL;
const NEWSLETTER_CONFIG_ID = Number(process.env.NEWSLETTER_CONFIG_ID ?? 1);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  if (!NEWSLETTER_API_URL) {
    console.error("[newsletter] NEWSLETTER_API_URL is not configured");
    return NextResponse.json({ code: "not_configured" }, { status: 500 });
  }

  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ code: "bad_request" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ code: "invalid_email" }, { status: 400 });
  }

  try {
    const res = await fetch(NEWSLETTER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newsletterConfigId: NEWSLETTER_CONFIG_ID,
        email,
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || data?.code !== "0") {
      console.error("[newsletter] subscribe failed:", res.status, data);
      return NextResponse.json(
        { code: "upstream_error" },
        { status: res.ok ? 502 : res.status },
      );
    }

    return NextResponse.json({ code: "0" });
  } catch (err) {
    console.error("[newsletter] subscribe error:", err);
    return NextResponse.json({ code: "network_error" }, { status: 502 });
  }
}
