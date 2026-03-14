"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

const TRUST_ITEMS = [
  { icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12", label: "Envío a todo el Perú" },
  { icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", label: "Compra 100% segura" },
  { icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99", label: "Cambios y devoluciones" },
];

export default function CarritoPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalItems = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.quantity, 0)
  );
  const totalPrice = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  );

  const couponData = useCartStore((s) => s.coupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const discount = couponData?.discount || 0;
  const finalPrice = Math.max(0, totalPrice - discount);

  const handleApplyCoupon = async () => {
    setCouponError("");
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    try {
      const res = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput.trim(), cartTotal: totalPrice }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error);
        return;
      }
      applyCoupon(data);
      setCouponInput("");
    } catch {
      setCouponError("Error al validar el cupón");
    } finally {
      setCouponLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-[60vh] px-6 py-10">
        <div className="mx-auto max-w-site">
          <nav className="mb-6 font-roboto text-sm text-text/50">
            <Link href="/" className="transition-colors hover:text-peach">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-text/80">Carrito</span>
          </nav>

          <div className="mb-10 flex items-end justify-between">
            <div>
              <h1 className="font-playfair text-4xl font-semibold text-primary">
                Tu carrito
              </h1>
              {items.length > 0 && (
                <p className="mt-1 font-roboto text-sm text-text/50">
                  {totalItems} {totalItems === 1 ? "producto" : "productos"}
                </p>
              )}
            </div>
            {items.length > 0 && (
              <Link
                href="/tienda"
                className="hidden font-playfair text-sm font-semibold text-primary transition-colors hover:text-peach md:inline-flex md:items-center md:gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Seguir comprando
              </Link>
            )}
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center py-24">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
                <svg className="h-10 w-10 text-gray-300" viewBox="0 0 1000 1000" fill="currentColor">
                  <path d="M188 167H938C943 167 949 169 953 174 957 178 959 184 958 190L926 450C919 502 875 542 823 542H263L271 583C281 631 324 667 373 667H854C866 667 875 676 875 687S866 708 854 708H373C304 708 244 659 230 591L129 83H21C9 83 0 74 0 62S9 42 21 42H146C156 42 164 49 166 58L188 167ZM771 750C828 750 875 797 875 854S828 958 771 958 667 912 667 854 713 750 771 750ZM354 750C412 750 458 797 458 854S412 958 354 958 250 912 250 854 297 750 354 750Z" />
                </svg>
              </div>
              <p className="mt-6 font-playfair text-xl font-semibold text-primary">
                Tu carrito está vacío
              </p>
              <p className="mt-2 font-roboto text-sm text-text/50">
                Explora nuestros productos y encuentra lo que necesitas
              </p>
              <Link
                href="/tienda"
                className="btn-shine mt-8 rounded-xl bg-primary px-8 py-4 font-playfair text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
              <div>
                <div className="hidden border-b border-gray-200 pb-4 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_40px] md:gap-4">
                  <span className="font-roboto text-xs font-medium uppercase tracking-wider text-text/40">
                    Producto
                  </span>
                  <span className="text-center font-roboto text-xs font-medium uppercase tracking-wider text-text/40">
                    Precio
                  </span>
                  <span className="text-center font-roboto text-xs font-medium uppercase tracking-wider text-text/40">
                    Cantidad
                  </span>
                  <span className="text-center font-roboto text-xs font-medium uppercase tracking-wider text-text/40">
                    Subtotal
                  </span>
                  <span />
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group border-b border-gray-100 py-6 transition-colors hover:bg-gray-50/50 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_40px] md:items-center md:gap-4 md:rounded-xl md:px-2"
                  >
                    <div className="flex items-center gap-4">
                      <Link href={`/producto/${item.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/producto/${item.slug}`}
                          className="font-playfair text-sm font-semibold text-primary transition-colors hover:text-peach"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 font-roboto text-sm text-text/60 md:hidden">
                          S/ {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <p className="hidden text-center font-roboto text-sm text-text/60 md:block">
                      S/ {item.price.toFixed(2)}
                    </p>

                    <div className="mt-3 flex items-center gap-3 pl-[96px] md:mt-0 md:justify-center md:pl-0">
                      <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center text-sm text-text/50 transition-colors hover:text-primary"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-playfair text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center text-sm text-text/50 transition-colors hover:text-primary"
                        >
                          +
                        </button>
                      </div>

                      <div className="ml-auto md:hidden">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition-all hover:bg-red-50 hover:text-red-400"
                          aria-label="Eliminar"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <p className="hidden text-center font-playfair text-sm font-bold text-primary md:block">
                      S/ {(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="hidden h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition-all hover:bg-red-50 hover:text-red-400 md:flex"
                      aria-label="Eliminar"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="lg:sticky lg:top-28">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <h2 className="font-playfair text-xl font-semibold text-primary">
                    Resumen del pedido
                  </h2>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-roboto text-sm text-text/60">
                        Subtotal ({totalItems} {totalItems === 1 ? "producto" : "productos"})
                      </span>
                      <span className="font-playfair text-sm font-semibold text-primary">
                        S/ {totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-roboto text-sm text-text/60">Envío</span>
                      <span className="font-roboto text-sm text-text/60">Calculado en checkout</span>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-4">
                    {couponData ? (
                      <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2.5">
                        <div>
                          <span className="font-roboto text-xs font-semibold text-green-700">
                            Cupón: {couponData.code}
                          </span>
                          <span className="ml-2 font-roboto text-xs text-green-600">
                            {couponData.discount_type === "percent"
                              ? `(-${couponData.amount}%)`
                              : `(-S/ ${parseFloat(couponData.amount).toFixed(2)})`}
                          </span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="font-roboto text-xs font-semibold text-red-400 transition-colors hover:text-red-600"
                        >
                          Quitar
                        </button>
                      </div>
                    ) : (
                      <>
                        <label className="font-roboto text-xs font-medium uppercase tracking-wider text-text/40">
                          Cupón de descuento
                        </label>
                        <div className="mt-2 flex gap-2">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                            placeholder="Ingresa tu código"
                            className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 font-roboto text-sm text-text outline-none transition-colors placeholder:text-gray-300 focus:border-peach"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            disabled={couponLoading}
                            className="shrink-0 rounded-lg border-2 border-primary px-4 py-2.5 font-playfair text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white disabled:opacity-50"
                          >
                            {couponLoading ? "..." : "Aplicar"}
                          </button>
                        </div>
                        {couponError && (
                          <p className="mt-2 font-roboto text-xs text-red-400">{couponError}</p>
                        )}
                      </>
                    )}
                  </div>

                  {discount > 0 && (
                    <div className="mt-3 flex items-center justify-between text-green-600">
                      <span className="font-roboto text-sm">Descuento</span>
                      <span className="font-playfair text-sm font-semibold">
                        - S/ {discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="font-playfair text-lg font-bold text-primary">
                      Total
                    </span>
                    <span className="font-playfair text-2xl font-bold text-primary">
                      S/ {finalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    className="btn-shine mt-6 block w-full rounded-xl bg-primary py-4 text-center font-playfair text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
                  >
                    Proceder al pago
                  </Link>

                  <div className="mt-4 flex items-center justify-center gap-2 text-text/40">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <span className="font-roboto text-[11px]">Pago seguro con MercadoPago</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {TRUST_ITEMS.map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-2 rounded-xl bg-gray-50 py-4 text-center">
                      <svg className="h-5 w-5 text-peach" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                      <span className="px-1 font-roboto text-[10px] font-medium leading-tight text-text/50">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
