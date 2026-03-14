import Link from "next/link";
import { getPosts } from "@/lib/wordpress";
import BlogGrid from "./BlogGrid";

export default async function BlogPreview() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts({ per_page: "3" });
  } catch {
    posts = [];
  }

  return (
    <section className="mt-16 mb-28 px-6">
      <div className="mx-auto max-w-site">
        <div className="mb-10 text-center">
          <span className="font-raleway text-xs font-medium uppercase tracking-[0.3em] text-peach">
            Inspiración & Consejos
          </span>
          <h2 className="mt-2 font-playfair text-3xl font-semibold text-primary">
            TIGER BLOG
          </h2>
          <p className="mt-3 font-playfair text-base text-text/70">
            ¿Tienes dudas, preguntas o necesitas inspiración para tu tatuaje?
            ¡Pasa y lee!
          </p>
        </div>

        {posts.length > 0 ? (
          <BlogGrid posts={posts} />
        ) : (
          <p className="py-10 text-center font-playfair text-gray-400">
            Blog no disponible en este momento.
          </p>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="btn-shine group flex items-center gap-3 rounded-btn border-2 border-primary bg-primary px-8 py-3.5 font-playfair text-base font-semibold text-white transition-all hover:scale-105 hover:bg-white hover:text-primary"
          >
            <span>Más artículos del blog</span>
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
