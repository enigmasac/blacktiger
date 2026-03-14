"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";

const NAV_LINKS = [
  { label: "Productos", href: "/tienda" },
  { label: "Conócenos", href: "/conocenos" },
  { label: "Blog", href: "/blog" },
  { label: "Contáctanos", href: "/contactanos" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.quantity, 0)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-gray-100 bg-white/95 shadow-md shadow-black/5 backdrop-blur-sm"
          : "border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-site items-center px-6 py-3 justify-center lg:justify-between">
        <Link href="/" className="shrink-0 transition-transform hover:scale-105">
          <Image
            src="/images/logo.webp"
            alt="BlackTiger"
            width={85}
            height={66}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-draw font-playfair text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:text-peach"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="h-6 w-px bg-gray-200" />

          <Link href="/carrito" className="group relative text-primary transition-colors hover:text-peach">
            <svg
              className="h-6 w-6 transition-transform group-hover:scale-110"
              viewBox="0 0 1000 1000"
              fill="currentColor"
            >
              <path d="M188 167H938C943 167 949 169 953 174 957 178 959 184 958 190L926 450C919 502 875 542 823 542H263L271 583C281 631 324 667 373 667H854C866 667 875 676 875 687S866 708 854 708H373C304 708 244 659 230 591L129 83H21C9 83 0 74 0 62S9 42 21 42H146C156 42 164 49 166 58L188 167ZM771 750C828 750 875 797 875 854S828 958 771 958 667 912 667 854 713 750 771 750ZM354 750C412 750 458 797 458 854S412 958 354 958 250 912 250 854 297 750 354 750Z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-peach text-xs font-bold text-primary">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
