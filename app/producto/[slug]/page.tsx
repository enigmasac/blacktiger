import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductBySlug, getProducts } from "@/lib/woocommerce";
import ProductDetail from "@/components/ProductDetail";
import RelatedProducts from "@/components/RelatedProducts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const products = await getProducts({ per_page: "50" });
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name} - BlackTiger`,
    description: product.short_description.replace(/<[^>]*>/g, "").slice(0, 160),
    openGraph: {
      images: product.images[0]?.src ? [product.images[0].src] : [],
    },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  let related: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    const categoryId = product.categories?.[0]?.id;
    if (categoryId) {
      const all = await getProducts({ per_page: "5", category: String(categoryId) });
      related = all.filter((p) => p.id !== product.id).slice(0, 4);
    }
    if (related.length === 0) {
      const all = await getProducts({ per_page: "5" });
      related = all.filter((p) => p.id !== product.id).slice(0, 4);
    }
  } catch {
    related = [];
  }

  return (
    <>
      <Header />
      <main className="px-6 py-10">
        <div className="mx-auto max-w-site">
          <ProductDetail product={product} />
          <RelatedProducts products={related} />
        </div>
      </main>
      <Footer />
    </>
  );
}
