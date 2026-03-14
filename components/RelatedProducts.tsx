"use client";

import ProductCard from "@/components/ProductCard";
import type { WCProduct } from "@/lib/woocommerce";
import { useRevealChildren } from "@/hooks/useReveal";

export default function RelatedProducts({ products }: { products: WCProduct[] }) {
  const ref = useRevealChildren();

  if (!products.length) return null;

  return (
    <section className="mt-20 border-t border-gray-100 pt-16">
      <div className="mb-10 text-center">
        <span className="font-raleway text-xs font-medium uppercase tracking-[0.3em] text-peach">
          También te puede interesar
        </span>
        <h2 className="mt-2 font-playfair text-2xl font-semibold text-primary">
          PRODUCTOS RELACIONADOS
        </h2>
      </div>
      <div ref={ref} className="grid grid-cols-2 gap-5 md:gap-8 lg:grid-cols-4">
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
    </section>
  );
}
