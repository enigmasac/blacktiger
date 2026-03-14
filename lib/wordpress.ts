const WP_URL = process.env.WC_URL!;

export type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
  };
};

async function wpFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2${endpoint}`, {
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getPosts(params?: Record<string, string>) {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  return wpFetch<WPPost[]>(`/posts${query}&_embed`);
}

export async function getPostBySlug(slug: string) {
  const posts = await wpFetch<WPPost[]>(`/posts?slug=${slug}&_embed`);
  return posts[0] || null;
}
