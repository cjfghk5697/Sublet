import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSearchLocationStore = create(
  persist(
    (set, get) => ({
      searchLocation: [37.574583, 126.994143],
      setSearchLocation: (posx, posy) =>
        set({
          searchLocation: [posx, posy],
        }),
    }),
    {
      name: 'searchLocation-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
