"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import UbigeoSelector from "@/components/UbigeoSelector";
import type { ShippingMethod, UbigeoSelection } from "@/lib/ubigeo";
import { useAuthStore } from "@/store/auth";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const couponData = useCartStore((s) => s.coupon);
  const totalPrice = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  );
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  const authUser = useAuthStore((s) => s.user);
  const [loading, setLoading] = useState(false);

  const discount = couponData?.discount || 0;
  const subtotal = Math.max(0, totalPrice - discount);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    invoiceType: "boleta" as "boleta" | "factura",
    documentType: "DNI" as "DNI" | "CE" | "PASAPORTE",
    documentNumber: "",
    ruc: "",
    razonSocial: "",
  });

  useEffect(() => {
    if (authUser) {
      fetch("/api/account/profile")
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data?.customer) {
            const c = data.customer;
            setForm((prev) => ({
              ...prev,
              firstName: c.first_name || prev.firstName,
              lastName: c.last_name || prev.lastName,
              email: c.billing?.email || c.email || prev.email,
              phone: c.billing?.phone || prev.phone,
              address: c.billing?.address_1 || prev.address,
            }));
          }
        })
        .catch(() => {});
    }
  }, [authUser]);

  const [ubigeo, setUbigeo] = useState<UbigeoSelection | null>(null);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod | null>(null);

  const shippingCost = selectedShipping?.cost ?? 0;
  const finalPrice = subtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUbigeoChange = useCallback((selection: UbigeoSelection | null) => {
    setUbigeo(selection);
  }, []);

  const handleShippingChange = useCallback((methods: ShippingMethod[]) => {
    setShippingMethods(methods);
    if (methods.length === 1) {
      setSelectedShipping(methods[0]);
    } else {
      setSelectedShipping(null);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ubigeo) {
      alert("Selecciona tu departamento, provincia y distrito.");
      return;
    }

    if (shippingMethods.length > 0 && !selectedShipping) {
      alert("Selecciona un método de envío.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          billing: form,
          coupon: couponData?.code || null,
          ubigeo,
          shippingMethod: selectedShipping,
          taxInfo: {
            invoiceType: form.invoiceType,
            documentType: form.invoiceType === "boleta" ? form.documentType : "RUC",
            documentNumber: form.invoiceType === "boleta" ? form.documentNumber : form.ruc,
            razonSocial: form.invoiceType === "factura" ? form.razonSocial : undefined,
          },
        }),
      });

      const data = await res.json();

      if (data.initPoint) {
        clearCart();
        window.location.href = data.initPoint;
      } else if (data.orderId) {
        clearCart();
        router.push(`/pedido-confirmado?order=${data.orderId}`);
      }
    } catch {
      alert("Error al procesar el pedido. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-6">
          <p className="font-playfair text-xl font-semibold text-primary">
            Tu carrito está vacío
          </p>
          <Link
            href="/tienda"
            className="mt-6 rounded-xl bg-primary px-8 py-3.5 font-playfair text-sm font-bold text-white transition-all hover:bg-secondary"
          >
            Ver productos
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3.5 font-roboto text-sm text-text outline-none transition-colors placeholder:text-gray-300 focus:border-peach";

  return (
    <>
      <Header />
      <main className="px-6 py-10">
        <div className="mx-auto max-w-site">
          <nav className="mb-6 font-roboto text-sm text-text/50">
            <Link href="/" className="transition-colors hover:text-peach">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/carrito" className="transition-colors hover:text-peach">Carrito</Link>
            <span className="mx-2">/</span>
            <span className="text-text/80">Checkout</span>
          </nav>

          <h1 className="mb-10 font-playfair text-4xl font-semibold text-primary">
            Checkout
          </h1>

          <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_400px]">
            <div className="space-y-8">
              <div>
                <h2 className="mb-5 flex items-center gap-3 font-playfair text-xl font-semibold text-primary">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-roboto text-sm font-bold text-white">1</span>
                  Datos personales
                </h2>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input name="firstName" placeholder="Nombre" value={form.firstName} onChange={handleChange} required className={inputClass} />
                    <input name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} required className={inputClass} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className={inputClass} />
                    <input name="phone" type="tel" placeholder="Teléfono" value={form.phone} onChange={handleChange} required className={inputClass} />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-5 flex items-center gap-3 font-playfair text-xl font-semibold text-primary">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-roboto text-sm font-bold text-white">2</span>
                  Comprobante de pago
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1">
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, invoiceType: "boleta", ruc: "", razonSocial: "" }))}
                      className={`flex-1 rounded-lg py-2.5 font-roboto text-sm font-semibold transition-all duration-200 ${
                        form.invoiceType === "boleta"
                          ? "bg-primary text-white shadow-sm"
                          : "text-text/50 hover:text-text/70"
                      }`}
                    >
                      Boleta
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, invoiceType: "factura", documentType: "DNI", documentNumber: "" }))}
                      className={`flex-1 rounded-lg py-2.5 font-roboto text-sm font-semibold transition-all duration-200 ${
                        form.invoiceType === "factura"
                          ? "bg-primary text-white shadow-sm"
                          : "text-text/50 hover:text-text/70"
                      }`}
                    >
                      Factura
                    </button>
                  </div>

                  {form.invoiceType === "boleta" ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="relative">
                        <select
                          name="documentType"
                          value={form.documentType}
                          onChange={handleChange}
                          required
                          className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-10 font-roboto text-sm text-text outline-none transition-colors focus:border-peach"
                        >
                          <option value="DNI">DNI</option>
                          <option value="CE">Carné de extranjería</option>
                          <option value="PASAPORTE">Pasaporte</option>
                        </select>
                        <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                      <input
                        name="documentNumber"
                        placeholder={form.documentType === "DNI" ? "Número de DNI" : form.documentType === "CE" ? "Número de CE" : "Número de pasaporte"}
                        value={form.documentNumber}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      <input name="ruc" placeholder="RUC" value={form.ruc} onChange={handleChange} required maxLength={11} className={inputClass} />
                      <input name="razonSocial" placeholder="Razón social" value={form.razonSocial} onChange={handleChange} required className={inputClass} />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="mb-5 flex items-center gap-3 font-playfair text-xl font-semibold text-primary">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-roboto text-sm font-bold text-white">3</span>
                  Dirección de envío
                </h2>
                <div className="space-y-4">
                  <input name="address" placeholder="Dirección completa" value={form.address} onChange={handleChange} required className={inputClass} />
                  <UbigeoSelector
                    cartTotal={subtotal}
                    onSelectionChange={handleUbigeoChange}
                    onShippingChange={handleShippingChange}
                  />
                </div>
              </div>

              {shippingMethods.length > 1 && (
                <div>
                  <h2 className="mb-5 flex items-center gap-3 font-playfair text-xl font-semibold text-primary">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-roboto text-sm font-bold text-white">4</span>
                    Método de envío
                  </h2>
                  <div className="space-y-3">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.method_id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-5 py-4 transition-colors ${
                          selectedShipping?.method_id === method.method_id
                            ? "border-peach/50 bg-peach/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={method.method_id}
                          checked={selectedShipping?.method_id === method.method_id}
                          onChange={() => setSelectedShipping(method)}
                          className="h-4 w-4 accent-peach"
                        />
                        <div className="flex flex-1 items-center justify-between">
                          <span className="font-roboto text-sm text-text">
                            {method.method_title}
                          </span>
                          <span className="font-playfair text-sm font-semibold text-primary">
                            {method.cost === 0 ? "Gratis" : `S/ ${method.cost.toFixed(2)}`}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="mb-5 flex items-center gap-3 font-playfair text-xl font-semibold text-primary">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-roboto text-sm font-bold text-white">
                    {shippingMethods.length > 1 ? "5" : "4"}
                  </span>
                  Método de pago
                </h2>
                <div className="flex items-center gap-3 rounded-xl border-2 border-peach/30 bg-peach/5 px-5 py-4">
                  <svg className="h-5 w-5 text-peach" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <div>
                    <span className="font-playfair text-sm font-semibold text-primary">MercadoPago</span>
                    <p className="font-roboto text-xs text-text/50">Tarjeta, transferencia, Yape y más</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="font-playfair text-xl font-semibold text-primary">
                  Tu pedido
                </h2>

                <div className="mt-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 font-roboto text-[10px] font-bold text-text/50">
                          {item.quantity}
                        </span>
                        <span className="font-roboto text-sm text-text/70 line-clamp-1">
                          {item.name}
                        </span>
                      </div>
                      <span className="shrink-0 font-playfair text-sm font-semibold text-primary">
                        S/ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-roboto text-sm text-text/60">Subtotal</span>
                    <span className="font-playfair text-sm font-semibold text-primary">
                      S/ {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {couponData && discount > 0 && (
                    <div className="flex items-center justify-between text-green-600">
                      <span className="font-roboto text-sm">
                        Cupón: {couponData.code}
                      </span>
                      <span className="font-playfair text-sm font-semibold">
                        - S/ {discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="font-roboto text-sm text-text/60">Envío</span>
                    {selectedShipping ? (
                      <span className="font-playfair text-sm font-semibold text-primary">
                        {selectedShipping.cost === 0
                          ? "Gratis"
                          : `S/ ${selectedShipping.cost.toFixed(2)}`}
                      </span>
                    ) : (
                      <span className="font-roboto text-sm text-text/40">
                        {ubigeo ? "Selecciona método" : "Selecciona ubicación"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-playfair text-lg font-bold text-primary">Total</span>
                  <span className="font-playfair text-2xl font-bold text-primary">
                    S/ {finalPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading || !ubigeo || (shippingMethods.length > 0 && !selectedShipping)}
                  className="btn-shine mt-6 w-full rounded-xl bg-primary py-4 font-playfair text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:shadow-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    `Pagar S/ ${finalPrice.toFixed(2)}`
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-text/40">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span className="font-roboto text-[11px]">Pago seguro con encriptación SSL</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
