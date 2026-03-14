"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      className="relative flex min-h-[822px] items-center justify-center overflow-hidden bg-primary bg-cover bg-center max-md:min-h-[670px]"
      style={{ backgroundImage: "url('/images/hero-banner.webp')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(255,188,125,0.3) 12px, rgba(255,188,125,0.3) 14px)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span
          className={`mb-4 font-raleway text-xs font-medium uppercase tracking-[0.4em] text-peach transition-all duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
          }`}
        >
          Tattoo Care Products
        </span>

        <h1
          className={`font-playfair text-8xl font-semibold uppercase text-white transition-all duration-1000 delay-200 max-md:text-5xl ${
            loaded
              ? "translate-y-0 opacity-100"
              : "translate-y-8 scale-[0.98] opacity-0"
          }`}
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
        >
          Black Tiger
        </h1>

        <div
          className={`mt-2 h-[2px] bg-peach transition-all duration-700 delay-500 ${
            loaded ? "w-20" : "w-0"
          }`}
        />

        <h2
          className={`mt-4 font-playfair text-lg font-semibold uppercase text-white/90 transition-all duration-1000 delay-700 max-md:px-8 max-md:text-base ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ textShadow: "0 2px 15px rgba(0,0,0,0.3)" }}
        >
          Bravazo es que siempre esté como nuevo
        </h2>

        <Link
          href="/conocenos"
          className={`btn-shine mt-10 rounded-btn border-2 border-white bg-white px-8 py-3.5 font-playfair text-base font-semibold text-secondary transition-all duration-500 delay-1000 hover:border-peach hover:bg-transparent hover:text-white ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Sobre nosotros
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div
          className={`flex flex-col items-center gap-2 transition-all duration-1000 delay-[1.5s] ${
            loaded ? "opacity-60" : "opacity-0"
          }`}
        >
          <span className="font-raleway text-[10px] uppercase tracking-[0.3em] text-white">
            Scroll
          </span>
          <div className="h-8 w-[1px] animate-pulse bg-white/50" />
        </div>
      </div>
    </section>
  );
}
