import { NextRequest, NextResponse } from "next/server";
import { createCustomer } from "@/lib/woocommerce";
import { buildSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  const { email, password, firstName, lastName } = (await request.json()) as {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };

  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json(
      { message: "Todos los campos son requeridos." },
      { status: 400 }
    );
  }

  try {
    const customer = await createCustomer({
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    });

    const payload = {
      customerId: customer.id,
      email: customer.email,
      firstName: customer.first_name,
      lastName: customer.last_name,
    };

    const res = NextResponse.json({ user: payload });
    const cookie = buildSessionCookie(payload);
    res.cookies.set(cookie.name, cookie.value, cookie);
    return res;
  } catch (err) {
    const message =
      err instanceof Error && err.message.includes("400")
        ? "Este email ya está registrado."
        : "Error al crear la cuenta.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
