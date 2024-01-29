import { create } from "zustand";

export const usePopUpStore = create((set) => ({
  popUpState: false,
  setPopUpState: () => set((state) => ({
    popUpState: !state.popUpState
  })),
}))

