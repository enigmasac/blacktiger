import { NextRequest, NextResponse } from "next/server";
import { getCouponByCode } from "@/lib/woocommerce";

export async function POST(request: NextRequest) {
  const { code, cartTotal } = (await request.json()) as {
    code: string;
    cartTotal: number;
  };

  try {
    const coupon = await getCouponByCode(code);

    if (!coupon) {
      return NextResponse.json({ error: "Cupón no encontrado" }, { status: 404 });
    }

    if (coupon.date_expires) {
      const expires = new Date(coupon.date_expires);
      if (expires < new Date()) {
        return NextResponse.json({ error: "Este cupón ha expirado" }, { status: 400 });
      }
    }

    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return NextResponse.json({ error: "Este cupón ya alcanzó su límite de uso" }, { status: 400 });
    }

    const minAmount = parseFloat(coupon.minimum_amount || "0");
    if (minAmount > 0 && cartTotal < minAmount) {
      return NextResponse.json(
        { error: `El monto mínimo para este cupón es S/ ${minAmount.toFixed(2)}` },
        { status: 400 }
      );
    }

    let discount = 0;
    if (coupon.discount_type === "percent") {
      discount = (cartTotal * parseFloat(coupon.amount)) / 100;
    } else {
      discount = parseFloat(coupon.amount);
    }

    discount = Math.min(discount, cartTotal);

    return NextResponse.json({
      code: coupon.code,
      discount_type: coupon.discount_type,
      amount: coupon.amount,
      discount: Math.round(discount * 100) / 100,
      description: coupon.description,
    });
  } catch {
    return NextResponse.json({ error: "Error al validar el cupón" }, { status: 500 });
  }
}
