import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productSlug: string;
  title: string;
  href: string;
  imageUrl?: string | null;
};

type CartState = {
  items: Record<string, CartItem>;
  hasHydrated: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productSlug: string) => void;
  clear: () => void;
  hasItem: (productSlug: string) => boolean;
  uniqueCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},
      hasHydrated: false,
      addItem: (item) =>
        set((state) => {
          if (!item?.productSlug) return state;
          if (state.items[item.productSlug]) return state;
          return { items: { ...state.items, [item.productSlug]: item } };
        }),
      removeItem: (productSlug) =>
        set((state) => {
          if (!state.items[productSlug]) return state;
          const next = { ...state.items };
          delete next[productSlug];
          return { items: next };
        }),
      clear: () => set({ items: {} }),
      hasItem: (productSlug) => Boolean(get().items[productSlug]),
      uniqueCount: () => Object.keys(get().items).length,
    }),
    {
      name: "sahil_cart_v1",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    }
  )
);

