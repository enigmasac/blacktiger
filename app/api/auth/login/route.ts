import { NextRequest, NextResponse } from "next/server";
import { buildSessionCookie } from "@/lib/session";

const WC_URL = process.env.WC_URL!;

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email y contraseña son requeridos." },
      { status: 400 }
    );
  }

  const wpRes = await fetch(`${WC_URL}/wp-json/bt-auth/v1/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!wpRes.ok) {
    const error = await wpRes.json().catch(() => ({}));
    return NextResponse.json(
      { message: error.message || "Credenciales incorrectas." },
      { status: 401 }
    );
  }

  const data = await wpRes.json();

  const payload = {
    customerId: data.customer_id,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
  };

  const res = NextResponse.json({ user: payload });
  const cookie = buildSessionCookie(payload);
  res.cookies.set(cookie.name, cookie.value, cookie);
  return res;
}
