import { NextRequest, NextResponse } from "next/server";
import { getSession, buildSessionCookie } from "@/lib/session";
import { getCustomerById, updateCustomer } from "@/lib/woocommerce";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "No autenticado." }, { status: 401 });
  }

  try {
    const customer = await getCustomerById(session.customerId);
    return NextResponse.json({ customer });
  } catch {
    return NextResponse.json({ message: "Error al obtener perfil." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "No autenticado." }, { status: 401 });
  }

  const body = await request.json();

  try {
    const customer = await updateCustomer(session.customerId, body);

    const newPayload = {
      customerId: customer.id,
      email: customer.email,
      firstName: customer.first_name,
      lastName: customer.last_name,
    };

    const res = NextResponse.json({ customer });
    const cookie = buildSessionCookie(newPayload);
    res.cookies.set(cookie.name, cookie.value, cookie);
    return res;
  } catch {
    return NextResponse.json({ message: "Error al actualizar perfil." }, { status: 500 });
  }
}
