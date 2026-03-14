"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import { useState } from "react";

export default function ContactanosPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
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
        <PageBanner title="Contáctanos" />

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-site gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-playfair text-2xl font-semibold text-primary">
                ¿ALGUNA DUDA O CONSULTA?
              </h2>
              <p className="mt-4 font-roboto text-sm leading-relaxed text-text/70">
                Cualquier comentario, saludo, sugerencia o nueva idea de qué necesitas para el cuidado de tu tatuaje es bienvenida.
              </p>

              <ul className="mt-8 space-y-4 text-sm text-text">
                <li className="flex items-center gap-3">
                  <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z" />
                  </svg>
                  Lima, Perú
                </li>
                <li>
                  <a href="tel:+51972185187" className="flex items-center gap-3 transition-colors hover:text-peach">
                    <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
                    </svg>
                    +51 972 185 187
                  </a>
                </li>
                <li>
                  <a href="mailto:info@blacktiger.pe" className="flex items-center gap-3 transition-colors hover:text-peach">
                    <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
                    </svg>
                    info@blacktiger.pe
                  </a>
                </li>
              </ul>

              <div className="mt-10">
                <h3 className="font-playfair text-lg font-semibold text-primary">
                  ¿Quieres ser distribuidor de la marca?
                </h3>
                <Link
                  href="/distribuidores"
                  className="mt-4 inline-block rounded-btn border-2 border-primary bg-primary px-6 py-2 font-playfair text-xs font-semibold text-white transition-all hover:bg-white hover:text-primary"
                >
                  Formulario de contacto - Distribuidores
                </Link>
              </div>
            </div>

            <div>
              {sent ? (
                <div className="flex h-full items-center justify-center">
                  <p className="font-playfair text-lg text-primary">
                    ¡Mensaje enviado! Te responderemos pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required className={inputClass} />
                  <input name="phone" type="tel" placeholder="Teléfono" value={form.phone} onChange={handleChange} className={inputClass} />
                  <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className={inputClass} />
                  <textarea name="message" placeholder="Mensaje" value={form.message} onChange={handleChange} required rows={5} className={`${inputClass} resize-none`} />
                  <button
                    type="submit"
                    className="w-full rounded-btn bg-primary py-3 font-playfair text-sm font-semibold text-white transition-all hover:bg-secondary"
                  >
                    Enviar
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
