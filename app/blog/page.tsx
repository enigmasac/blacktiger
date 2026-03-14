import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/wordpress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - BlackTiger",
  description: "Artículos sobre tatuajes, cuidado y tendencias.",
};

export const revalidate = 1800;

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts({ per_page: "12" });
  } catch {
    posts = [];
  }

  return (
    <>
      <Header />
      <main>
        <PageBanner title="Blog" />
        <section className="px-6 py-16">
          <div className="mx-auto max-w-site">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                  const featuredImage =
                    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 160);

                  return (
                    <article
                      key={post.id}
                      className="group overflow-hidden rounded-btn bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      {featuredImage && (
                        <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                          <div className="relative aspect-[3/2]">
                            <Image
                              src={featuredImage}
                              alt={stripHtml(post.title.rendered)}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-all group-hover:saturate-[1.24]"
                            />
                            <span className="absolute right-5 top-5 rounded bg-accent px-3 py-1 font-playfair text-xs font-bold text-white">
                              Blog
                            </span>
                          </div>
                        </Link>
                      )}
                      <div className="p-5">
                        <h3 className="font-playfair text-lg font-semibold text-secondary">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="transition-colors hover:text-peach"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                          />
                        </h3>
                        <p className="mt-3 font-roboto text-sm leading-relaxed text-text/80">
                          {excerpt}...
                        </p>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-4 inline-block font-playfair text-sm font-bold text-accent transition-colors hover:text-peach"
                        >
                          Seguir leyendo »
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="py-20 text-center font-playfair text-lg text-gray-400">
                No hay artículos disponibles.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
