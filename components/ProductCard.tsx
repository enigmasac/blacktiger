"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useCallback } from "react";
import AddToCartButton from "./AddToCartButton";

type Props = {
  id: number;
  name: string;
  slug: string;
  price: string;
  regularPrice?: string;
  salePrice?: string;
  onSale?: boolean;
  image: string;
  imageAlt?: string;
};

export default function ProductCard({
  id,
  name,
  slug,
  price,
  regularPrice,
  salePrice,
  onSale,
  image,
  imageAlt,
}: Props) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = useCallback(() => {
    addItem({
      id,
      name,
      slug,
      price: parseFloat(salePrice || price),
      image,
    });
  }, [addItem, id, name, slug, salePrice, price, image]);

  return (
    <div className="card-glow group flex flex-col items-center rounded-btn bg-white p-4 pb-8 shadow-sm">
      <Link href={`/producto/${slug}`} className="img-zoom relative w-full">
        {onSale && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-peach px-3 py-1 text-[10px] font-semibold text-primary">
            Oferta
          </span>
        )}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
          <Image
            src={image}
            alt={imageAlt || name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      </Link>

      <Link
        href={`/producto/${slug}`}
        className="link-draw mt-5 text-center font-playfair text-sm font-semibold text-primary"
      >
        {name}
      </Link>

      <div className="mt-4 flex flex-col items-center gap-1">
        {onSale && regularPrice ? (
          <>
            <span className="font-roboto text-xs text-gray-300 line-through">
              S/ {regularPrice}
            </span>
            <span className="text-gradient-peach font-playfair text-2xl font-bold tracking-tight">
              S/ {salePrice}
            </span>
          </>
        ) : (
          <span className="font-playfair text-2xl font-bold tracking-tight text-primary">
            S/ {price}
          </span>
        )}
      </div>

      <div className="mt-auto pt-6">
        <AddToCartButton onClick={handleAddToCart} />
      </div>
    </div>
  );
}
