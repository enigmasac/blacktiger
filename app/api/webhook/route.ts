import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.type === "payment" && body.data?.id) {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    const paymentRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${body.data.id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const payment = await paymentRes.json();

    if (payment.status === "approved" && payment.external_reference) {
      const WC_URL = process.env.WC_URL!;
      const WC_KEY = process.env.WC_CONSUMER_KEY!;
      const WC_SECRET = process.env.WC_CONSUMER_SECRET!;

      await fetch(
        `${WC_URL}/wp-json/wc/v3/orders/${payment.external_reference}?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "processing",
            set_paid: true,
            transaction_id: String(payment.id),
          }),
        }
      );
    }
  }

  return NextResponse.json({ received: true });
}
