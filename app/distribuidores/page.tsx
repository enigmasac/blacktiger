"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { useState } from "react";

export default function DistribuidoresPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    city: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-4 py-3 font-roboto text-sm text-text outline-none transition-colors focus:border-primary";

  return (
    <>
      <Header />
      <main>
        <PageBanner title="Distribuidores" />

        <section className="px-6 py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-center font-playfair text-2xl font-semibold text-primary">
              ¿Quieres ser distribuidor de la marca?
            </h2>
            <p className="mb-10 text-center font-roboto text-sm text-text/70">
              Completa el formulario y nos pondremos en contacto contigo.
            </p>

            {sent ? (
              <div className="py-20 text-center">
                <p className="font-playfair text-lg text-primary">
                  ¡Solicitud enviada! Te contactaremos pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Nombre completo" value={form.name} onChange={handleChange} required className={inputClass} />
                <input name="company" placeholder="Empresa" value={form.company} onChange={handleChange} className={inputClass} />
                <div className="grid gap-4 md:grid-cols-2">
                  <input name="phone" type="tel" placeholder="Teléfono" value={form.phone} onChange={handleChange} required className={inputClass} />
                  <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className={inputClass} />
                </div>
                <input name="city" placeholder="Ciudad" value={form.city} onChange={handleChange} required className={inputClass} />
                <textarea name="message" placeholder="Mensaje" value={form.message} onChange={handleChange} rows={5} className={`${inputClass} resize-none`} />
                <button
                  type="submit"
                  className="w-full rounded-btn bg-primary py-3 font-playfair text-sm font-semibold text-white transition-all hover:bg-secondary"
                >
                  Enviar solicitud
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
