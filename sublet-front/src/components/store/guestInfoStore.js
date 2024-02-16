import { create } from "zustand";

export const guestInfoPopUpStore = create((set) => ({
  imagePopUpState: false,
  phonePopUpState: false,
  emailPopUpState: false,
  postPopUpState: false,
  setImagePopUpState: () => set((state) => ({
    imagePopUpState: !state.imagePopUpState
  })),
  setEmailPopUpState: () => set((state) => ({
    emailPopUpState: !state.emailPopUpState
  })),
  setPhonePopUpState: () => set((state) => ({
    phonePopUpState: !state.phonePopUpState
  })),
  setPostPopUpState: () => set((state) => ({
    postPopUpState: !state.postPopUpState
  })),

}))

