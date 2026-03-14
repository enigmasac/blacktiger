"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/auth";
import type { WCOrderFull } from "@/lib/woocommerce";

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-3.5 font-roboto text-sm text-text outline-none transition-colors placeholder:text-gray-300 focus:border-peach";

const ORDER_STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-700" },
  processing: { label: "En proceso", color: "bg-blue-100 text-blue-700" },
  "on-hold": { label: "En espera", color: "bg-orange-100 text-orange-700" },
  completed: { label: "Completado", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-700" },
  refunded: { label: "Reembolsado", color: "bg-gray-100 text-gray-600" },
  failed: { label: "Fallido", color: "bg-red-100 text-red-700" },
};

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al iniciar sesión.");
        return;
      }

      setUser(data.user);
      onSuccess();
    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={inputClass}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={inputClass}
      />
      {error && (
        <p className="font-roboto text-sm text-red-500">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-shine w-full rounded-xl bg-primary py-3.5 font-playfair text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
      >
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}

function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al crear la cuenta.");
        return;
      }

      setUser(data.user);
      onSuccess();
    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="firstName" placeholder="Nombre" value={form.firstName} onChange={handleChange} required className={inputClass} />
        <input name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} required className={inputClass} />
      </div>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className={inputClass} />
      <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required className={inputClass} />
      <input name="confirmPassword" type="password" placeholder="Confirmar contraseña" value={form.confirmPassword} onChange={handleChange} required className={inputClass} />
      {error && (
        <p className="font-roboto text-sm text-red-500">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-shine w-full rounded-xl bg-primary py-3.5 font-playfair text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
      >
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}

function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [orders, setOrders] = useState<WCOrderFull[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetch("/api/account/orders")
      .then((r) => (r.ok ? r.json() : { orders: [] }))
      .then((d) => setOrders(d.orders))
      .catch(() => {})
      .finally(() => setLoadingOrders(false));
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-playfair text-2xl font-semibold text-primary">
            Hola, {user.firstName}
          </h2>
          <p className="mt-1 font-roboto text-sm text-text/50">{user.email}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/mi-cuenta/perfil"
            className="rounded-xl border-2 border-gray-200 px-6 py-2.5 font-playfair text-sm font-semibold text-primary transition-colors hover:border-peach hover:text-peach"
          >
            Editar perfil
          </Link>
          <button
            onClick={logout}
            className="rounded-xl border-2 border-gray-200 px-6 py-2.5 font-playfair text-sm font-semibold text-text/50 transition-colors hover:border-red-300 hover:text-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div>
        <h3 className="mb-6 font-playfair text-xl font-semibold text-primary">
          Mis pedidos
        </h3>

        {loadingOrders ? (
          <div className="flex items-center gap-3 py-12">
            <svg className="h-5 w-5 animate-spin text-peach" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="font-roboto text-sm text-text/50">Cargando pedidos...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-200" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="mt-4 font-roboto text-sm text-text/40">
              Aún no tienes pedidos
            </p>
            <Link
              href="/tienda"
              className="mt-4 inline-block rounded-xl bg-primary px-6 py-2.5 font-playfair text-sm font-bold text-white transition-all hover:bg-secondary"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = ORDER_STATUS_MAP[order.status] || {
                label: order.status,
                color: "bg-gray-100 text-gray-600",
              };
              const date = new Date(order.date_created).toLocaleDateString("es-PE", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={order.id}
                  className="rounded-2xl border border-gray-200 p-6 transition-shadow hover:shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-playfair text-sm font-bold text-primary">
                        #{order.number}
                      </span>
                      <span className={`rounded-full px-3 py-1 font-roboto text-xs font-semibold ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-roboto text-xs text-text/40">{date}</span>
                      <span className="font-playfair text-sm font-bold text-primary">
                        S/ {parseFloat(order.total).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <div className="flex flex-wrap gap-2">
                      {order.line_items.map((item, idx) => (
                        <span
                          key={idx}
                          className="rounded-lg bg-gray-50 px-3 py-1.5 font-roboto text-xs text-text/60"
                        >
                          {item.name} x{item.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MiCuentaPage() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <>
      <Header />
      <main className="px-6 py-10">
        <div className="mx-auto max-w-site">
          <nav className="mb-6 font-roboto text-sm text-text/50">
            <Link href="/" className="transition-colors hover:text-peach">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-text/80">Mi cuenta</span>
          </nav>

          <h1 className="mb-10 font-playfair text-4xl font-semibold text-primary">
            Mi cuenta
          </h1>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="h-8 w-8 animate-spin text-peach" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : user ? (
            <Dashboard />
          ) : (
            <div className="mx-auto max-w-md">
              <div className="mb-8 flex gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1">
                <button
                  onClick={() => setTab("login")}
                  className={`flex-1 rounded-lg py-2.5 font-roboto text-sm font-semibold transition-all duration-200 ${
                    tab === "login"
                      ? "bg-primary text-white shadow-sm"
                      : "text-text/50 hover:text-text/70"
                  }`}
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => setTab("register")}
                  className={`flex-1 rounded-lg py-2.5 font-roboto text-sm font-semibold transition-all duration-200 ${
                    tab === "register"
                      ? "bg-primary text-white shadow-sm"
                      : "text-text/50 hover:text-text/70"
                  }`}
                >
                  Crear cuenta
                </button>
              </div>

              {tab === "login" ? (
                <LoginForm onSuccess={() => {}} />
              ) : (
                <RegisterForm onSuccess={() => {}} />
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
