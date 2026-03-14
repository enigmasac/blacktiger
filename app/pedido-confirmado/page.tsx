import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedido confirmado - BlackTiger",
};

export default function PedidoConfirmadoPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="font-playfair text-3xl font-semibold text-primary">
            ¡Pedido confirmado!
          </h1>

          {searchParams.order && (
            <p className="mt-4 font-roboto text-lg text-text/70">
              Número de pedido:{" "}
              <span className="font-semibold text-primary">
                #{searchParams.order}
              </span>
            </p>
          )}

          <p className="mt-4 font-roboto text-sm text-text/60">
            Recibirás un correo de confirmación con los detalles de tu pedido.
          </p>

          <Link
            href="/tienda"
            className="mt-8 inline-block rounded-btn bg-primary px-7 py-3 font-playfair text-sm font-semibold text-white transition-all hover:bg-secondary"
          >
            Seguir comprando
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
