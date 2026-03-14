import { NextResponse } from "next/server";
import { buildClearCookie } from "@/lib/session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const cookie = buildClearCookie();
  res.cookies.set(cookie.name, cookie.value, cookie);
  return res;
}
