import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { getProducts } from "@/lib/woocommerce";
import ProductGrid from "@/components/home/ProductGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda - BlackTiger",
  description: "Todos los productos BlackTiger para el cuidado de tatuajes.",
};

export const revalidate = 3600;

export default async function TiendaPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts({ per_page: "20" });
  } catch {
    products = [];
  }

  return (
    <>
      <Header />
      <main>
        <PageBanner title="Productos" />
        <section className="px-6 py-16">
          <div className="mx-auto max-w-site">
            <ProductGrid products={products} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
