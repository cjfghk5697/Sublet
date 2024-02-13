import { create } from 'zustand';

export const useSearchDateStore = create(set => ({
  searchDate: [new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1))],
  setSearchDate: (startDate, endDate) => set({ searchDate: [startDate, endDate] })
}));

