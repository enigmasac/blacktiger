import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getPostBySlug, getPosts } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 1800;

export async function generateStaticParams() {
  try {
    const posts = await getPosts({ per_page: "50" });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: `${stripHtml(post.title.rendered)} - BlackTiger Blog`,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <>
      <Header />
      <main className="px-6 py-16">
        <article className="mx-auto max-w-3xl">
          <h1
            className="font-playfair text-4xl font-semibold leading-tight text-primary max-md:text-2xl"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <time className="mt-4 block font-roboto text-sm text-text/50">
            {new Date(post.date).toLocaleDateString("es-PE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          {featuredImage && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-btn">
              <Image
                src={featuredImage}
                alt={stripHtml(post.title.rendered)}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div
            className="prose prose-lg mt-10 max-w-none font-roboto text-text/80 prose-headings:font-playfair prose-headings:text-primary prose-a:text-primary prose-a:underline hover:prose-a:text-peach"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
