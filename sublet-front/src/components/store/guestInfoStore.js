import { create } from "zustand";

export const imagePopUpStore = create((set) => ({
  imagePopUpState: false,
  setImagePopUpState: () => set((state) => ({
    imagePopUpState: !state.imagePopUpState
  })),
}))
