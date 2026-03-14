"use client";

import { useReveal } from "@/hooks/useReveal";

export default function CtaSection() {
  const textRef = useReveal();

  return (
    <section
      className="relative mt-24 flex min-h-[405px] items-center justify-center overflow-hidden bg-cover bg-center bg-fixed max-md:min-h-[271px] max-md:bg-scroll"
      style={{ backgroundImage: "url('/images/cta-bg.webp')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50" />

      <svg
        className="absolute left-0 top-0 w-full text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2600 131.1"
        preserveAspectRatio="none"
      >
        <path className="fill-white" d="M0 0L2600 0 2600 69.1 0 0z" />
        <path className="fill-white/50" d="M0 0L2600 0 2600 69.1 0 69.1z" />
        <path className="fill-white/25" d="M2600 0L0 0 0 130.1 2600 69.1z" />
      </svg>

      <svg
        className="absolute bottom-0 left-0 w-full rotate-180 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2600 131.1"
        preserveAspectRatio="none"
      >
        <path className="fill-white" d="M0 0L2600 0 2600 69.1 0 0z" />
        <path className="fill-white/50" d="M0 0L2600 0 2600 69.1 0 69.1z" />
        <path className="fill-white/25" d="M2600 0L0 0 0 130.1 2600 69.1z" />
      </svg>

      <div ref={textRef} className="reveal relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <span className="font-raleway text-xs font-medium uppercase tracking-[0.3em] text-peach">
          Nuestro lema
        </span>
        <h2
          className="font-playfair text-5xl font-bold text-white max-md:text-3xl"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
        >
          CÚRALO, CUÍDALO, MUÉSTRALO.
        </h2>
        <div className="mt-1 h-[2px] w-16 bg-peach" />
      </div>
    </section>
  );
}
