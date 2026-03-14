"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { useState } from "react";

export default function PatrocinioPage() {
  const [form, setForm] = useState({
    name: "",
    artistName: "",
    instagram: "",
    phone: "",
    email: "",
    city: "",
    experience: "",
    whyBlackTiger: "",
    reference1: "",
    reference2: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Solicitud de patrocinio - " + form.name);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nNombre artístico: ${form.artistName}\nInstagram: ${form.instagram}\nTeléfono: ${form.phone}\nEmail: ${form.email}\nCiudad: ${form.city}\n\nExperiencia:\n${form.experience}\n\n¿Por qué Black Tiger?:\n${form.whyBlackTiger}\n\nReferencia 1: ${form.reference1}\nReferencia 2: ${form.reference2}`
    );
    window.open(`mailto:info@blacktiger.pe?subject=${subject}&body=${body}`);
    setSent(true);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-4 py-3 font-roboto text-sm text-text outline-none transition-colors focus:border-primary";

  return (
    <>
      <Header />
      <main>
        <PageBanner title="Solicitud de patrocinio" />

        <section className="px-6 py-16">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 space-y-4 font-roboto text-sm leading-relaxed text-text/80">
              <p>
                Estamos muy contentos de que quieras ser parte de nuestra familia
                y, desde ya, te agradecemos por ser embajador de{" "}
                <strong className="text-primary">Black Tiger</strong>.
              </p>
              <p>
                En <strong className="text-primary">Black Tiger</strong> nos llena
                de orgullo brindar apoyo a artistas como tú. Es gracias a ustedes
                que crecemos y que tenemos muchas ganas de seguir aportando en
                este hermoso mundo del tatuaje, además de siempre seguir creando
                productos de la mejor calidad que faciliten y potencien tu trabajo
                como artista.
              </p>

              <h3 className="font-playfair text-lg font-semibold text-primary">
                Algunos consejos
              </h3>
              <ul className="list-inside list-disc space-y-2 text-text/70">
                <li>
                  Te pedimos un poco de paciencia al esperar la respuesta, ya que
                  recibimos muchos formularios y evaluamos detenidamente cada uno.
                  Sea cual sea el caso, siempre recibirás una respuesta.
                </li>
                <li>
                  Lo que más valoraremos será la honestidad en tus respuestas.
                  ¡Cuéntanos toda tu historia con Black Tiger!
                </li>
                <li>
                  Es probable que nos comuniquemos con tus referencias, así que
                  por favor, coloca bien sus datos.
                </li>
                <li>
                  No te desanimes si a la primera no eres seleccionado, ¡siempre
                  habrá otras oportunidades!
                </li>
              </ul>
            </div>

            {sent ? (
              <div className="rounded-2xl border border-gray-100 bg-gray-50 py-20 text-center">
                <p className="font-playfair text-lg text-primary">
                  ¡Solicitud enviada! Evaluaremos tu perfil y te contactaremos.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="name"
                    placeholder="Nombre completo"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                  <input
                    name="artistName"
                    placeholder="Nombre artístico"
                    value={form.artistName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="instagram"
                    placeholder="Instagram (@usuario)"
                    value={form.instagram}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Teléfono"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                  <input
                    name="city"
                    placeholder="Ciudad"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <textarea
                  name="experience"
                  placeholder="Cuéntanos sobre tu experiencia como tatuador(a)"
                  value={form.experience}
                  onChange={handleChange}
                  rows={4}
                  required
                  className={`${inputClass} resize-none`}
                />
                <textarea
                  name="whyBlackTiger"
                  placeholder="¿Por qué quieres ser embajador de Black Tiger?"
                  value={form.whyBlackTiger}
                  onChange={handleChange}
                  rows={4}
                  required
                  className={`${inputClass} resize-none`}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="reference1"
                    placeholder="Referencia 1 (nombre y teléfono)"
                    value={form.reference1}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  <input
                    name="reference2"
                    placeholder="Referencia 2 (nombre y teléfono)"
                    value={form.reference2}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
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
