"use client";

import ProductCard from "@/components/ProductCard";
import type { WCProduct } from "@/lib/woocommerce";
import { useRevealChildren } from "@/hooks/useReveal";

export default function ProductGrid({ products }: { products: WCProduct[] }) {
  const gridRef = useRevealChildren();

  if (!products.length) {
    return (
      <p className="py-20 text-center font-playfair text-lg text-gray-400">
        Productos no disponibles en este momento.
      </p>
    );
  }

  return (
    <div ref={gridRef} className="grid grid-cols-2 gap-5 md:gap-8 lg:grid-cols-4">
      {products.map((product, i) => (
        <div key={product.id} className={`reveal stagger-${i + 1}`}>
          <ProductCard
            id={product.id}
            name={product.name}
            slug={product.slug}
            price={product.price}
            regularPrice={product.regular_price}
            salePrice={product.sale_price}
            onSale={product.on_sale}
            image={product.images[0]?.src || "/images/placeholder.webp"}
            imageAlt={product.images[0]?.alt}
          />
        </div>
      ))}
    </div>
  );
}
