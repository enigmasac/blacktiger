import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conócenos - BlackTiger",
  description: "Conoce la historia de BlackTiger, marca 100% peruana para el cuidado de tatuajes.",
};

const FEATURES = [
  {
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 512 512" fill="currentColor">
        <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" />
      </svg>
    ),
    title: "TENGO TATUAJES, PERO ME LOS HICE HACE AÑOS …",
    text: "¡BUENAS NOTICIAS! EL USO DE LOS PRODUCTOS DE BLACK TIGER PUEDEN MEJORAR HASTA EN UN 60% EL ASPECTO DE TUS TATUAJES ANTIGUOS.",
  },
  {
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 496 512" fill="currentColor">
        <path d="M225.38 233.37c-12.5 12.5-12.5 32.76 0 45.25 12.49 12.5 32.76 12.5 45.25 0 12.5-12.5 12.5-32.76 0-45.25-12.5-12.49-32.76-12.49-45.25 0zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm126.14 148.05L308.17 300.4a31.938 31.938 0 0 1-15.77 15.77l-144.34 65.97c-16.65 7.61-33.81-9.55-26.2-26.2l65.98-144.35a31.938 31.938 0 0 1 15.77-15.77l144.34-65.97c16.65-7.6 33.8 9.55 26.19 26.2z" />
      </svg>
    ),
    title: "¿Y DE DÓNDE ES BLACK TIGER?",
    text: "BLACK TIGER ES UNA MARCA 100% PERUANA, CON LA CALIDAD Y EXPERIENCIA DE MÁS DE 15 AÑOS DE UNIBELL, EXPERTOS EN FABRICAR Y DISTRIBUIR PRODUCTOS PARA EL CUIDADO PERSONAL.",
  },
  {
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 640 512" fill="currentColor">
        <path d="M18.32 255.78L192 223.96l-91.28 68.69c-10.08 10.08-2.94 27.31 11.31 27.31h222.7c-9.44-26.4-14.73-54.47-14.73-83.38v-42.27l-119.73-87.6c-23.82-15.88-55.29-14.01-77.06 4.59L5.81 227.64c-12.38 10.33-3.45 30.42 12.51 28.14zm556.87 34.1l-100.66-50.31A47.992 47.992 0 0 1 448 196.65v-36.69h64l28.09 22.63c6 6 14.14 9.37 22.63 9.37h30.97a32 32 0 0 0 28.62-17.69l14.31-28.62a32.005 32.005 0 0 0-3.02-33.51l-74.53-99.38C553.02 4.7 543.54 0 533.47 0H296.02c-7.13 0-10.7 8.57-5.66 13.61L352 63.96 292.42 88.8c-5.9 2.95-5.9 11.36 0 14.31L352 127.96v108.62c0 72.08 36.03 139.39 96 179.38-195.59 6.81-344.56 41.01-434.1 60.91C5.78 478.67 0 485.88 0 494.2 0 504 7.95 512 17.76 512h499.08c63.29.01 119.61-47.56 122.99-110.76 2.52-47.28-22.73-90.4-64.64-111.36zM489.18 66.25l45.65 11.41c-2.75 10.91-12.47 18.89-24.13 18.26-12.96-.71-25.85-12.53-21.52-29.67z" />
      </svg>
    ),
    title: "NUESTRA MISIÓN",
    text: "CUIDAR TU TATUAJE CON PRODUCTOS ESPECÍFICAMENTE CREADOS PARA LA CICATRIZACIÓN, HUMECTACIÓN Y LUMINOSIDAD DE LA TINTA EN TU PIEL.",
  },
];

export default function ConocenosPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner title="Conócenos" />

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="font-playfair text-lg leading-relaxed text-text">
              Un buen tatuaje no solo depende de la calidad de la tinta o la mano del artista que te tatúe, importa también lo que uses para <strong>mantenerlo.</strong>
            </p>
            <p className="font-playfair text-lg leading-relaxed text-text">
              El mejor secreto para que tu tatuaje dure toda la vida es cuidarlo <strong>antes, durante y después de pasar por la aguja.</strong>
            </p>
            <p className="font-playfair text-lg leading-relaxed text-text">
              <strong>Black Tiger</strong> nace pensando en esa necesidad: cuidar tu tatuaje con productos específicamente creados para la cicatrización, <strong>humectación y luminosidad de la tinta en tu piel.</strong>
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto grid max-w-site gap-8 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center rounded-btn p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 text-primary">{f.icon}</div>
                <h4 className="mb-4 font-playfair text-base font-semibold text-primary">
                  {f.title}
                </h4>
                <p className="mb-6 font-roboto text-sm leading-relaxed text-text/70">
                  {f.text}
                </p>
                <Link
                  href="/tienda"
                  className="mt-auto rounded-btn border-2 border-primary bg-primary px-6 py-2 font-playfair text-xs font-semibold text-white transition-all hover:bg-white hover:text-primary"
                >
                  Comprar ahora
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
