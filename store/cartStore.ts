import { create } from 'zustand';
import type { Dorm } from './favoriteStore';

type CartStore = {
  cart: Dorm[];
  addCart: (dorm: Dorm) => void;
  removeCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addCart: (dorm) => set((state) => ({
    cart: [...state.cart.filter((d) => d.id !== dorm.id), dorm],
  })),
  removeCart: (id) => set((state) => ({
    cart: state.cart.filter((d) => d.id !== id),
  })),
  clearCart: () => set({ cart: [] }),
})); 