import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartProduct = {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
};

export type AppliedCoupon = {
  code: string;
  discount_type: "percent" | "fixed_cart" | "fixed_product";
  amount: string;
  discount: number;
};

type CartState = {
  items: CartProduct[];
  coupon: AppliedCoupon | null;
  addItem: (product: Omit<CartProduct, "quantity">, qty?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (product, qty = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: qty }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },

      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),
      clearCart: () => set({ items: [], coupon: null }),
    }),
    { name: "blacktiger-cart" }
  )
);
