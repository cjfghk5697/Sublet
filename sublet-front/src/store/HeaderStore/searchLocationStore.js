import { create } from "zustand";

export const useSearchLocationStore = create((set) => ({
  searchLocation: [37.574583, 126.994143],
  setSearchLocation: (posx, posy) =>
    set({
        searchLocation: [posx, posy],
    }),
}));
