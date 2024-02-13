import { create } from 'zustand';

export const useSearchPriceStore = create(set => ({
  priceRange: [0, 5000000],
  setPriceRange: (minPrice, maxPrice) => set({ priceRange: [minPrice, maxPrice] })
}));

