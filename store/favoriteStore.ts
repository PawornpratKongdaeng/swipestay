import { create } from 'zustand';

export type Dorm = {
  id: string;
  name: string;
  image: string;
  price: number;
  bed: number;
  bath: number;
  kitchen: number;
  rating: number;
  distance: number;
  facilities: { icon: string; label: string }[];
  description: string;
  available: boolean;
  images: string[];
  type: string;
  address: string;
};

type Store = {
  favorites: Dorm[];
  addFavorite: (dorm: Dorm) => void;
};

export const useFavoriteStore = create<Store>((set) => ({
  favorites: [],
  addFavorite: (dorm) =>
    set((state) => ({
      favorites: [...state.favorites.filter((d) => d.id !== dorm.id), dorm],
    })),
}));
