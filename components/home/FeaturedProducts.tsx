import Link from "next/link";
import { getProducts } from "@/lib/woocommerce";
import ProductGrid from "./ProductGrid";

export default async function FeaturedProducts() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts({ per_page: "4", featured: "true" });
  } catch {
    products = [];
  }

  return (
    <section className="mt-16 mb-10 px-6">
      <div className="mx-auto max-w-site">
        <div className="mb-10 text-center">
          <span className="font-raleway text-xs font-medium uppercase tracking-[0.3em] text-peach">
            Selección especial
          </span>
          <h2 className="mt-2 font-playfair text-3xl font-semibold text-primary">
            PRODUCTOS DESTACADOS
          </h2>
        </div>

        <ProductGrid products={products} />

        <div className="mt-12 flex justify-center">
          <Link
            href="/tienda"
            className="btn-shine group flex items-center gap-3 rounded-btn border-2 border-primary bg-primary px-8 py-3.5 font-playfair text-base font-semibold text-white transition-all hover:scale-105 hover:bg-white hover:text-primary"
          >
            <span>Verlos todos</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
