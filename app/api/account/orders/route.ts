import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getCustomerOrders } from "@/lib/woocommerce";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ orders: [] }, { status: 401 });
  }

  try {
    const orders = await getCustomerOrders(session.customerId);
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: [] }, { status: 500 });
  }
}
