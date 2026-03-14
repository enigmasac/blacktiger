const WC_URL = process.env.WC_URL!;
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY!;
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET!;

export type WCImage = {
  id: number;
  src: string;
  name: string;
  alt: string;
};

export type WCProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  images: WCImage[];
  categories: { id: number; name: string; slug: string }[];
  stock_status: string;
  sku: string;
};

export type WCOrderLineItem = {
  product_id: number;
  quantity: number;
  name?: string;
  total?: string;
};

export type WCOrderPayload = {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    state: string;
    country: string;
  };
  line_items: WCOrderLineItem[];
  shipping_lines?: { method_id: string; method_title: string; total: string }[];
  coupon_lines?: { code: string }[];
};

export type WCOrder = {
  id: number;
  number: string;
  status: string;
  total: string;
  line_items: WCOrderLineItem[];
};

async function wcFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${WC_URL}/wp-json/wc/v3${endpoint}${separator}consumer_key=${WC_CONSUMER_KEY}&consumer_secret=${WC_CONSUMER_SECRET}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`WooCommerce API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getProducts(params?: Record<string, string>) {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  return wcFetch<WCProduct[]>(`/products${query}`);
}

export async function getProductBySlug(slug: string) {
  const products = await wcFetch<WCProduct[]>(`/products?slug=${slug}`);
  return products[0] || null;
}

export async function createOrder(order: WCOrderPayload) {
  return wcFetch<WCOrder>("/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
}

export type WCCoupon = {
  id: number;
  code: string;
  amount: string;
  discount_type: "percent" | "fixed_cart" | "fixed_product";
  description: string;
  date_expires: string | null;
  minimum_amount: string;
  maximum_amount: string;
  usage_count: number;
  usage_limit: number | null;
};

export async function getCouponByCode(code: string) {
  const coupons = await wcFetch<WCCoupon[]>(`/coupons?code=${encodeURIComponent(code)}`);
  return coupons[0] || null;
}

export type WCCustomerBilling = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  state: string;
  country: string;
};

export type WCCustomer = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  billing: WCCustomerBilling;
};

export type WCOrderFull = {
  id: number;
  number: string;
  status: string;
  total: string;
  currency: string;
  date_created: string;
  line_items: { name: string; quantity: number; total: string }[];
};

export async function createCustomer(data: {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}) {
  return wcFetch<WCCustomer>("/customers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCustomerById(id: number) {
  return wcFetch<WCCustomer>(`/customers/${id}`);
}

export async function updateCustomer(
  id: number,
  data: Partial<Pick<WCCustomer, "first_name" | "last_name"> & { billing: Partial<WCCustomerBilling> }>
) {
  return wcFetch<WCCustomer>(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function getCustomerOrders(customerId: number) {
  return wcFetch<WCOrderFull[]>(`/orders?customer=${customerId}&per_page=20&orderby=date&order=desc`);
}
