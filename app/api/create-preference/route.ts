import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce";
import type { CartProduct } from "@/store/cart";

export async function POST(request: NextRequest) {
  const { items, billing, coupon, ubigeo, shippingMethod, taxInfo } = (await request.json()) as {
    items: CartProduct[];
    billing: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
    };
    coupon: string | null;
    ubigeo: {
      idDepa: string;
      idProv: string;
      idDist: string;
      departamentoName: string;
      provinciaName: string;
      distritoName: string;
    } | null;
    shippingMethod: {
      method_id: string;
      method_title: string;
      cost: number;
    } | null;
    taxInfo: {
      invoiceType: "boleta" | "factura";
      documentType: string;
      documentNumber: string;
      razonSocial?: string;
    } | null;
  };

  const orderPayload: Record<string, unknown> = {
    payment_method: "mercadopago",
    payment_method_title: "MercadoPago",
    set_paid: false,
    billing: {
      first_name: billing.firstName,
      last_name: billing.lastName,
      email: billing.email,
      phone: billing.phone,
      address_1: billing.address,
      city: ubigeo?.distritoName || "",
      state: ubigeo?.departamentoName || "",
      country: "PE",
    },
    line_items: items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    })),
    meta_data: taxInfo
      ? [
          { key: "_billing_invoice_type", value: taxInfo.invoiceType },
          { key: "_billing_document_type", value: taxInfo.documentType },
          { key: "_billing_document_number", value: taxInfo.documentNumber },
          ...(taxInfo.razonSocial
            ? [{ key: "_billing_razon_social", value: taxInfo.razonSocial }]
            : []),
        ]
      : [],
  };

  if (coupon) {
    orderPayload.coupon_lines = [{ code: coupon }];
  }

  if (shippingMethod) {
    orderPayload.shipping_lines = [
      {
        method_id: `costo_ubigeo_peru_shipping_method:${shippingMethod.method_id}`,
        method_title: shippingMethod.method_title,
        total: String(shippingMethod.cost),
      },
    ];
  }

  const order = await createOrder(orderPayload as Parameters<typeof createOrder>[0]);

  const orderTotal = parseFloat(order.total) || items.reduce((s, i) => s + i.price * i.quantity, 0);

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  const preferenceRes = await fetch(
    "https://api.mercadopago.com/checkout/preferences",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        items: [
          {
            title: `Pedido BlackTiger #${order.id}`,
            quantity: 1,
            unit_price: orderTotal,
            currency_id: "PEN",
          },
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.WC_URL}/pedido-confirmado?order=${order.id}`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.WC_URL}/checkout`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.WC_URL}/pedido-confirmado?order=${order.id}`,
        },
        external_reference: String(order.id),
        auto_return: "approved",
      }),
    }
  );

  const preference = await preferenceRes.json();

  return NextResponse.json({
    orderId: order.id,
    preferenceId: preference.id,
    initPoint: preference.init_point,
  });
}
