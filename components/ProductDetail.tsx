"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import type { WCProduct } from "@/lib/woocommerce";
import { parseVCTabs } from "@/lib/parse-vc-tabs";
import AddToCartButton from "@/components/AddToCartButton";

const TRUST_BADGES = [
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    label: "Dermatológicamente testeado",
  },
  {
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    label: "Cruelty free",
  },
  {
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    label: "Ingredientes naturales",
  },
  {
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    label: "Vegano",
  },
];

export default function ProductDetail({ product }: { product: WCProduct }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const { tabs } = parseVCTabs(product.description || "");

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: parseFloat(product.sale_price || product.price),
        image: product.images[0]?.src || "",
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const currentPrice = parseFloat(product.sale_price || product.price);
  const regularPrice = product.regular_price ? parseFloat(product.regular_price) : null;
  const savings = product.on_sale && regularPrice ? regularPrice - currentPrice : 0;

  return (
    <>
      <nav className="mb-8 font-roboto text-sm text-text/50">
        <Link href="/" className="transition-colors hover:text-peach">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/tienda" className="transition-colors hover:text-peach">Productos</Link>
        <span className="mx-2">/</span>
        <span className="text-text/80">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div
            className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-gray-50"
            onClick={() => setLightbox(true)}
          >
            <Image
              src={product.images[selectedImage]?.src || "/images/placeholder.webp"}
              alt={product.images[selectedImage]?.alt || product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            {product.on_sale && (
              <div className="absolute left-4 top-4 z-10">
                <span className="rounded-full bg-peach px-4 py-1.5 text-xs font-bold text-primary shadow-md">
                  -{Math.round((savings / (regularPrice || 1)) * 100)}%
                </span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/10 group-hover:opacity-100">
              <svg className="h-10 w-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    i === selectedImage
                      ? "border-peach shadow-lg shadow-peach/20"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={img.src} alt={img.alt || product.name} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3">
            {product.stock_status === "instock" && (
              <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                En stock
              </span>
            )}
            {product.categories?.[0] && (
              <span className="rounded-full bg-gray-100 px-3 py-1 font-roboto text-[11px] font-medium text-text/60">
                {product.categories[0].name}
              </span>
            )}
          </div>

          <h1 className="mt-3 font-playfair text-4xl font-semibold leading-tight text-primary lg:text-[42px]">
            {product.name}
          </h1>

          <div className="mt-6 flex items-end gap-4">
            <span className="font-playfair text-4xl font-bold text-primary">
              S/ {currentPrice.toFixed(2)}
            </span>
            {product.on_sale && regularPrice && (
              <>
                <span className="mb-1 font-playfair text-lg text-gray-400 line-through">
                  S/ {regularPrice.toFixed(2)}
                </span>
                <span className="mb-1 rounded-full bg-peach/20 px-3 py-0.5 font-roboto text-xs font-bold text-peach">
                  Ahorras S/ {savings.toFixed(2)}
                </span>
              </>
            )}
          </div>

          {product.short_description && (
            <div
              className="mt-6 font-roboto text-[15px] leading-relaxed text-text/70 [&_strong]:font-semibold [&_strong]:text-text [&_li]:ml-4 [&_li]:list-disc"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-xl border-2 border-gray-200 bg-gray-50">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 py-3 font-playfair text-lg font-semibold text-primary transition-colors hover:text-peach"
              >
                −
              </button>
              <span className="w-10 text-center font-playfair text-lg font-bold">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-4 py-3 font-playfair text-lg font-semibold text-primary transition-colors hover:text-peach"
              >
                +
              </button>
            </div>

            <AddToCartButton onClick={handleAdd} className="flex-1" />
          </div>

          <div className="mt-4">
            <a
              href="https://api.whatsapp.com/send?phone=51972185187"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 py-3 font-playfair text-sm font-semibold text-text/70 transition-all hover:border-[#25D366] hover:text-[#25D366]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              ¿Tienes dudas? Escríbenos
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-2 rounded-xl bg-gray-50 px-3 py-4 text-center"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-peach/15">
                  <svg className="h-4 w-4 text-peach" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                  </svg>
                </span>
                <span className="font-roboto text-[10px] font-medium leading-tight text-text/60">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-6 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2 text-text/50">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <span className="font-roboto text-xs">Envío a todo el Perú</span>
            </div>
            <div className="flex items-center gap-2 text-text/50">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="font-roboto text-xs">Compra segura</span>
            </div>
          </div>

          {product.sku && (
            <p className="mt-4 font-roboto text-[11px] text-gray-300">SKU: {product.sku}</p>
          )}
        </div>
      </div>

      {tabs.length > 0 && (
        <div className="mt-16">
          <div className="flex gap-1 border-b border-gray-200">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`relative px-8 py-4 font-playfair text-sm font-semibold transition-all ${
                  i === activeTab
                    ? "text-primary"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.title}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] w-full rounded-t-full transition-all duration-300 ${
                    i === activeTab ? "bg-peach" : "bg-transparent"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="max-w-2xl py-8 font-roboto text-[15px] leading-relaxed text-text/70">
            {tabs[activeTab]?.content}
          </div>
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute right-6 top-6 text-white/70 transition-colors hover:text-white"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative h-[80vh] w-[80vh] max-w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={product.images[selectedImage]?.src || "/images/placeholder.webp"}
              alt={product.name}
              fill
              sizes="80vw"
              className="object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(i); }}
                  className={`h-2 rounded-full transition-all ${
                    i === selectedImage ? "w-8 bg-peach" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
