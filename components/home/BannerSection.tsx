"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const BADGES = [
  { text: "Sin\u00a0siliconas", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { text: "Sin\u00a0parabenos", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { text: "Ingredientes\u00a0naturales", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
];

export default function BannerSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % BADGES.length);
        setAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="reveal mt-20 px-6">
      <div className="mx-auto max-w-site text-center">
        <h2 className="font-playfair text-[32px] font-semibold text-secondary max-md:text-2xl">
          LA MEJOR LÍNEA DE PRODUCTOS
          <br />
          PARA EL CUIDADO DE TU{" "}
          <span className="text-gradient-peach">TATUAJE</span>
        </h2>

        <div className="mt-10 flex h-16 items-center justify-center" style={{ perspective: "600px" }}>
          {BADGES.map((badge, i) => (
            <div
              key={badge.text}
              className="absolute flex items-center gap-3 transition-all duration-500"
              style={{
                opacity: i === activeIndex ? (animating ? 0 : 1) : 0,
                transform:
                  i === activeIndex
                    ? animating
                      ? "rotateX(-90deg) scale(0.8)"
                      : "rotateX(0deg) scale(1)"
                    : "rotateX(90deg) scale(0.8)",
              }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5">
                <svg
                  className="h-5 w-5 text-peach"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                </svg>
              </span>
              <span className="font-playfair text-2xl font-semibold text-secondary max-md:text-lg">
                {badge.text}
              </span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 flex items-center justify-center gap-2">
          {BADGES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-8 bg-peach"
                  : "w-1.5 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
