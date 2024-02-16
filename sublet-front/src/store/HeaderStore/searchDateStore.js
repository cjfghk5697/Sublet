import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchDateStore = create(
  persist(
    (set, get) => ({
      searchDate: [
        new Date(),
        new Date(new Date().setMonth(new Date().getMonth() + 1)),
      ],
      setSearchDate: (startDate, endDate) =>
        set({
          searchDate: [startDate, endDate],
        }),
    }),
    {
      name: "useSearchDateStore-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
