"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "¿Cuántas veces al día debería usar los productos?",
    a: "Nuestro experto señala que Black Tiger jabón con PH neutro se puede usar a diario, gracias a sus propiedades hidratantes. También dice que Black Tiger bálsamo con efecto reparador lo puedes aplicar cada vez que sientas esas insoportables ganas de rascarte el tatuaje, así que llévalo contigo si sales. Sobre Black Tiger crema hidratante para pieles tatuadas comenta que lo puedes usar a diario, antes de salir a una fiesta o a una cita, así tu tatuaje se vuelve el tema para romper el hielo de la conversación.",
  },
  {
    q: "¿Puedo usar los productos si estoy embarazada?",
    a: "Sí, son productos sin parabenos, sin siliconas y con ingredientes naturales. ¡Hasta el bebé saldrá más radiante!",
  },
  {
    q: "¿Los productos tienen ingredientes naturales? ¿Los productos son eco-amigables?",
    a: "Sí, contienen vitaminas, extractos y aceites naturales. Eco-friendly, vegano, diet y hasta keto.",
  },
  {
    q: "¿Testean en animales?",
    a: "Definitivamente NO. Nuestro tigre se siente ofendido por esta pregunta…",
  },
  {
    q: "¿Los productos tienen componentes que puedan causar alergias o irritaciones?",
    a: "Nuestros productos están dermatológicamente testeados y aprobados. Sin embargo, como con cualquier producto para la piel, recomendamos hacer una prueba en una pequeña área antes de aplicarlo completamente.",
  },
];

export default function PreguntasFrecuentesPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <Header />
      <main>
        <PageBanner title="Preguntas frecuentes" />

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={i}
                open={i === openIndex}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === i ? -1 : i);
                }}
                className="group rounded-btn border border-gray-200 transition-shadow hover:shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-playfair text-sm font-semibold text-primary">
                  {item.q}
                  <span className="ml-4 shrink-0 text-primary">
                    {openIndex === i ? (
                      <svg className="h-4 w-4" viewBox="0 0 448 512" fill="currentColor">
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" viewBox="0 0 448 512" fill="currentColor">
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    )}
                  </span>
                </summary>
                {openIndex === i && (
                  <div className="px-6 pb-5 font-roboto text-sm leading-relaxed text-text/70">
                    {item.a}
                  </div>
                )}
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
