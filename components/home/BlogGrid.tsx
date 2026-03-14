"use client";

import Image from "next/image";
import Link from "next/link";
import { useRevealChildren } from "@/hooks/useReveal";
import type { WPPost } from "@/lib/wordpress";

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

type Props = {
  posts: WPPost[];
};

export default function BlogGrid({ posts }: Props) {
  const gridRef = useRevealChildren();

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => {
        const featuredImage =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        const excerpt = stripHtml(post.excerpt.rendered).slice(0, 160);

        return (
          <article
            key={post.id}
            className={`reveal stagger-${i + 1} card-glow group overflow-hidden rounded-btn bg-white shadow-sm`}
          >
            {featuredImage && (
              <Link href={`/blog/${post.slug}`} className="img-zoom block">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={featuredImage}
                    alt={post.title.rendered}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute right-4 top-4 rounded-full bg-peach px-3 py-1 font-playfair text-[10px] font-bold text-primary">
                    Blog
                  </span>
                </div>
              </Link>
            )}

            <div className="p-6">
              <h3 className="font-playfair text-lg font-semibold text-secondary">
                <Link
                  href={`/blog/${post.slug}`}
                  className="link-draw transition-colors hover:text-peach"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </h3>
              <p className="mt-3 font-roboto text-sm leading-relaxed text-text/70">
                {excerpt}...
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-2 font-playfair text-sm font-bold text-primary transition-colors hover:text-peach"
              >
                Seguir leyendo
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                </svg>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
