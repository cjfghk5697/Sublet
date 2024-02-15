import { create } from "zustand";
// import { persist } from "zustand/middleware";

export const useSearchPriceStore = create((set) => ({
  priceRange: [0, 5000000],
  setPriceRange: (minPrice, maxPrice) =>
    set({
      priceRange: [minPrice, maxPrice],
    }),
}));
