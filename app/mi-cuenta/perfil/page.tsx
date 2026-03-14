"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UbigeoSelector from "@/components/UbigeoSelector";
import { useAuthStore } from "@/store/auth";
import type { UbigeoSelection, ShippingMethod } from "@/lib/ubigeo";
import type { WCCustomer } from "@/lib/woocommerce";

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-3.5 font-roboto text-sm text-text outline-none transition-colors placeholder:text-gray-300 focus:border-peach";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });
  const [ubigeo, setUbigeo] = useState<UbigeoSelection | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/mi-cuenta");
      return;
    }

    if (user) {
      fetch("/api/account/profile")
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data?.customer) {
            const c: WCCustomer = data.customer;
            setForm({
              firstName: c.first_name || "",
              lastName: c.last_name || "",
              phone: c.billing?.phone || "",
              address: c.billing?.address_1 || "",
            });
          }
        })
        .catch(() => {})
        .finally(() => setLoadingProfile(false));
    }
  }, [user, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUbigeoChange = useCallback((selection: UbigeoSelection | null) => {
    setUbigeo(selection);
  }, []);

  const handleShippingChange = useCallback(
    (methods: ShippingMethod[]) => { void methods; },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    try {
      const body: Record<string, unknown> = {
        first_name: form.firstName,
        last_name: form.lastName,
        billing: {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
          address_1: form.address,
          ...(ubigeo && {
            city: ubigeo.distritoName,
            state: ubigeo.departamentoName,
          }),
          country: "PE",
        },
      };

      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        setUser({
          customerId: data.customer.id,
          email: data.customer.email,
          firstName: data.customer.first_name,
          lastName: data.customer.last_name,
        });
        setMessage({ type: "success", text: "Perfil actualizado correctamente." });
      } else {
        setMessage({ type: "error", text: "Error al actualizar el perfil." });
      }
    } catch {
      setMessage({ type: "error", text: "Error de conexión." });
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingProfile) {
    return (
      <>
        <Header />
        <main className="flex min-h-[60vh] items-center justify-center">
          <svg className="h-8 w-8 animate-spin text-peach" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="px-6 py-10">
        <div className="mx-auto max-w-site">
          <nav className="mb-6 font-roboto text-sm text-text/50">
            <Link href="/" className="transition-colors hover:text-peach">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/mi-cuenta" className="transition-colors hover:text-peach">Mi cuenta</Link>
            <span className="mx-2">/</span>
            <span className="text-text/80">Editar perfil</span>
          </nav>

          <h1 className="mb-10 font-playfair text-4xl font-semibold text-primary">
            Editar perfil
          </h1>

          <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
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
                <input name="phone" type="tel" placeholder="Teléfono" value={form.phone} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div>
              <h2 className="mb-5 flex items-center gap-3 font-playfair text-xl font-semibold text-primary">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-roboto text-sm font-bold text-white">2</span>
                Dirección
              </h2>
              <div className="space-y-4">
                <input name="address" placeholder="Dirección completa" value={form.address} onChange={handleChange} className={inputClass} />
                <UbigeoSelector
                  cartTotal={0}
                  onSelectionChange={handleUbigeoChange}
                  onShippingChange={handleShippingChange}
                />
              </div>
            </div>

            {message && (
              <div
                className={`rounded-xl px-5 py-3 font-roboto text-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="btn-shine rounded-xl bg-primary px-8 py-3.5 font-playfair text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
              <Link
                href="/mi-cuenta"
                className="rounded-xl border-2 border-gray-200 px-8 py-3.5 font-playfair text-sm font-semibold text-text/50 transition-colors hover:border-gray-300 hover:text-text/70"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
