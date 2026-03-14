import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import BannerSection from "@/components/home/BannerSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CtaSection from "@/components/home/CtaSection";
import BlogPreview from "@/components/home/BlogPreview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlackTiger - Productos para el cuidado de tatuajes",
  description:
    "La mejor línea de productos para el cuidado de tu tatuaje. Sin siliconas, sin parabenos, ingredientes naturales.",
};

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BannerSection />
        <FeaturedProducts />
        <CtaSection />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
