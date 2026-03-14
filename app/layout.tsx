import type { Metadata } from "next";
import { Playfair_Display, Roboto_Slab, Raleway } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBottomNav from "@/components/MobileBottomNav";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BlackTiger - Productos para el cuidado de tatuajes",
  description:
    "La mejor línea de productos para el cuidado de tu tatuaje. Sin siliconas, sin parabenos, ingredientes naturales.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "BlackTiger",
    description: "Productos para el cuidado de tatuajes",
    url: "https://blacktiger.pe",
    siteName: "BlackTiger",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://blacktiger.pe/og-image.png",
        width: 1200,
        height: 630,
        alt: "BlackTiger - Tattoo Care Products",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${robotoSlab.variable} ${raleway.variable} font-roboto antialiased`}
      >
        <AuthProvider>
          {children}
          <WhatsAppButton />
          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
