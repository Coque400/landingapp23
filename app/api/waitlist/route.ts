import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const locale = body.locale === "en" ? "en" : "es";
    const source = String(body.source || "Aventuria App").slice(0, 120);

    if (name.length < 2 || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL;
    const secret = process.env.WAITLIST_SECRET;
    if (!endpoint || !secret) {
      console.error("Waitlist integration is missing its server configuration.");
      return NextResponse.json({ ok: false, error: "configuration" }, { status: 503 });
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, locale, source, secret }),
      redirect: "follow",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script returned ${response.status}`);
    }

    const result = await response.json();
    if (!result.ok) {
      throw new Error(result.error || "Waitlist registration failed");
    }

    return NextResponse.json({ ok: true, duplicate: Boolean(result.duplicate) });
  } catch (error) {
    console.error("Waitlist registration error", error);
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 502 });
  }
}
