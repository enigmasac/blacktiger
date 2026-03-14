"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const INITIAL_FORM = {
  name: "",
  documentType: "DNI",
  documentNumber: "",
  address: "",
  phone: "",
  email: "",
  isMinor: false,
  guardianName: "",
  type: "reclamo" as "reclamo" | "queja",
  serviceDescription: "",
  amountClaimed: "",
  detail: "",
  consumerRequest: "",
};

type FormState = typeof INITIAL_FORM;

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-roboto text-sm text-text outline-none transition-colors placeholder:text-gray-300 focus:border-peach";

const selectClass =
  "w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-10 font-roboto text-sm text-text outline-none transition-colors focus:border-peach";

function InputField({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  ...props
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block font-roboto text-sm font-medium text-text/80">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClass}
        {...props}
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  required = false,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block font-roboto text-sm font-medium text-text/80">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        className={`${inputClass} resize-none`}
      />
    </div>
  );
}

export default function LibroReclamaciones() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [complaintId, setComplaintId] = useState<number | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const target = e.target;
    const { name, value } = target;
    const isCheckbox = target instanceof HTMLInputElement && target.type === "checkbox";
    setForm((prev) => ({
      ...prev,
      [name]: isCheckbox ? (target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const payload = {
        ...form,
        amountClaimed: form.amountClaimed ? Number(form.amountClaimed) : null,
      };

      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al enviar");

      const data = await res.json();
      setComplaintId(data.id);
      setStatus("sent");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }

  const typeLabel = form.type === "reclamo" ? "reclamo" : "queja";

  return (
    <>
      <Header />
      <main className="px-6 py-10">
        <div className="mx-auto max-w-site">
          <nav className="mb-6 font-roboto text-sm text-text/50">
            <Link href="/" className="transition-colors hover:text-peach">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-text/80">Libro de Reclamaciones</span>
          </nav>

          <div className="mb-10 text-center">
            <h1 className="font-playfair text-4xl font-semibold text-primary">
              Libro de Reclamaciones
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-roboto text-sm leading-relaxed text-text/60">
              Conforme al Artículo 150° de la Ley N° 29571, Código de Protección y Defensa del Consumidor.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 flex items-center gap-3 font-playfair text-lg font-semibold text-primary">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary font-roboto text-xs font-bold text-white">1</span>
                Datos del consumidor
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <InputField label="Nombre completo" name="name" required value={form.name} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="documentType" className="mb-1.5 block font-roboto text-sm font-medium text-text/80">
                    Tipo de documento <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="documentType"
                      name="documentType"
                      value={form.documentType}
                      onChange={handleChange}
                      required
                      className={selectClass}
                    >
                      <option value="DNI">DNI</option>
                      <option value="CE">Carné de extranjería</option>
                      <option value="PASSPORT">Pasaporte</option>
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
                <InputField label="Número de documento" name="documentNumber" required value={form.documentNumber} onChange={handleChange} />
                <div className="sm:col-span-2">
                  <InputField label="Domicilio" name="address" required value={form.address} onChange={handleChange} />
                </div>
                <InputField label="Teléfono" name="phone" type="tel" required value={form.phone} onChange={handleChange} />
                <InputField label="Email" name="email" type="email" required value={form.email} onChange={handleChange} />
              </div>

              <div className="mt-5">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="isMinor"
                    checked={form.isMinor}
                    onChange={handleChange}
                    className="h-4 w-4 accent-peach"
                  />
                  <span className="font-roboto text-sm text-text/70">Soy menor de edad</span>
                </label>
              </div>

              {form.isMinor && (
                <div className="mt-4">
                  <InputField label="Nombre del padre, madre o tutor" name="guardianName" required value={form.guardianName} onChange={handleChange} />
                </div>
              )}

              <hr className="my-8 border-gray-100" />

              <h2 className="mb-4 flex items-center gap-3 font-playfair text-lg font-semibold text-primary">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary font-roboto text-xs font-bold text-white">2</span>
                Tipo de registro
              </h2>

              <div className="mb-6 flex gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: "reclamo" }))}
                  className={`flex-1 rounded-lg py-2.5 font-roboto text-sm font-semibold transition-all duration-200 ${
                    form.type === "reclamo"
                      ? "bg-primary text-white shadow-sm"
                      : "text-text/50 hover:text-text/70"
                  }`}
                >
                  Reclamo
                </button>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: "queja" }))}
                  className={`flex-1 rounded-lg py-2.5 font-roboto text-sm font-semibold transition-all duration-200 ${
                    form.type === "queja"
                      ? "bg-primary text-white shadow-sm"
                      : "text-text/50 hover:text-text/70"
                  }`}
                >
                  Queja
                </button>
              </div>

              <p className="mb-6 font-roboto text-xs text-text/50">
                {form.type === "reclamo"
                  ? "Reclamo: disconformidad relacionada con los productos o servicios."
                  : "Queja: disconformidad con la atención recibida, no relacionada con el producto o servicio."}
              </p>

              <hr className="my-8 border-gray-100" />

              <h2 className="mb-6 flex items-center gap-3 font-playfair text-lg font-semibold text-primary">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary font-roboto text-xs font-bold text-white">3</span>
                Detalle del bien o servicio
              </h2>

              <div className="space-y-5">
                <TextAreaField label="Descripción del producto o servicio" name="serviceDescription" required value={form.serviceDescription} onChange={handleChange} />
                <InputField label="Monto reclamado (S/)" name="amountClaimed" type="number" value={form.amountClaimed} onChange={handleChange} />
              </div>

              <hr className="my-8 border-gray-100" />

              <h2 className="mb-6 flex items-center gap-3 font-playfair text-lg font-semibold text-primary">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary font-roboto text-xs font-bold text-white">4</span>
                Detalle del {typeLabel}
              </h2>

              <div className="space-y-5">
                <TextAreaField label={`Descripción del ${typeLabel}`} name="detail" required value={form.detail} onChange={handleChange} />
                <TextAreaField label="Pedido del consumidor (resolución esperada)" name="consumerRequest" required value={form.consumerRequest} onChange={handleChange} />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-shine mt-8 w-full rounded-xl bg-primary py-4 font-playfair text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:shadow-none"
              >
                {status === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  `Registrar ${typeLabel}`
                )}
              </button>

              {status === "sent" && (
                <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-center font-roboto text-sm text-green-700">
                  <p className="font-semibold">Registro enviado correctamente.</p>
                  <p className="mt-1">
                    Tu número de {typeLabel} es <strong>#{complaintId}</strong>. Recibirás una confirmación por email.
                    El plazo máximo de respuesta es de 30 días calendario.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-center font-roboto text-sm text-red-600">
                  Hubo un error al enviar. Intenta de nuevo o contáctanos directamente por WhatsApp.
                </div>
              )}
            </form>

            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-playfair text-lg font-semibold text-primary">Datos del proveedor</h3>
                <ul className="space-y-3 font-roboto text-sm text-text/70">
                  <li><strong className="text-text">Razón social:</strong> SAHNE LAB S.A.C.</li>
                  <li><strong className="text-text">RUC:</strong> 20606356251</li>
                  <li><strong className="text-text">Domicilio:</strong> Av. Malecón Almendariz Nro. 111 Dpto. 401, Miraflores - Lima, 150122</li>
                  <li><strong className="text-text">País:</strong> Perú</li>
                  <li><strong className="text-text">Email:</strong> info@blacktiger.pe</li>
                  <li><strong className="text-text">Web:</strong> blacktiger.pe</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-playfair text-lg font-semibold text-primary">Plazo de respuesta</h3>
                <p className="font-roboto text-sm leading-relaxed text-text/70">
                  De acuerdo con el Artículo 24° del D.S. N° 011-2011-PCM, el proveedor dará respuesta al reclamo o queja en un plazo máximo de <strong className="text-text">30 días calendario</strong>, contados desde la fecha de registro.
                </p>
              </div>

              <div className="rounded-2xl border border-peach/20 bg-peach/5 p-6">
                <h3 className="mb-4 font-playfair text-lg font-semibold text-primary">Reclamo vs. Queja</h3>
                <div className="space-y-4 font-roboto text-sm leading-relaxed text-text/70">
                  <div>
                    <strong className="text-text">Reclamo:</strong> Disconformidad relacionada con los productos o servicios adquiridos o contratados con el proveedor.
                  </div>
                  <div>
                    <strong className="text-text">Queja:</strong> Disconformidad no relacionada con el producto o servicio, sino con la atención al público por parte del proveedor.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
