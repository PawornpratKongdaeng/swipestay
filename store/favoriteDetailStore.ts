import { create } from 'zustand';

export const useFavoriteDetailStore = create((set) => ({
  selectedDorm: null,
  setSelectedDorm: (dorm: any) => set({ selectedDorm: dorm }),
})); 