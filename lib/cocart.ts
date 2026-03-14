const WC_URL = process.env.NEXT_PUBLIC_WC_URL || process.env.WC_URL!;

export type CartItem = {
  item_key: string;
  id: number;
  name: string;
  title: string;
  price: string;
  quantity: { value: number };
  totals: { total: number };
  featured_image: string;
};

export type Cart = {
  items: CartItem[];
  totals: {
    subtotal: string;
    total: string;
  };
  item_count: number;
};

async function cocartFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${WC_URL}/wp-json/cocart/v2${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`CoCart API error: ${res.status}`);
  }

  return res.json();
}

export async function getCart() {
  return cocartFetch<Cart>("/cart");
}

export async function addToCart(productId: number, quantity: number = 1) {
  return cocartFetch<Cart>("/cart/add-item", {
    method: "POST",
    body: JSON.stringify({ id: String(productId), quantity: String(quantity) }),
  });
}

export async function updateCartItem(itemKey: string, quantity: number) {
  return cocartFetch<Cart>(`/cart/item/${itemKey}`, {
    method: "PUT",
    body: JSON.stringify({ quantity: String(quantity) }),
  });
}

export async function removeCartItem(itemKey: string) {
  return cocartFetch<Cart>(`/cart/item/${itemKey}`, {
    method: "DELETE",
  });
}
