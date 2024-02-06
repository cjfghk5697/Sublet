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

export const postPopUpStore = create((set) => ({
  detailPopUpState: false,
  reservationPopUpState: false,
  deletePopUpState: false,
  setDetailPopUpState: () => set((state) => ({
    detailPopUpState: !state.detailPopUpState
  })),
  setReservationPopUpState: () => set((state) => ({
    reservationPopUpState: !state.reservationPopUpState
  })),
  setDeletePopUpState: () => set((state) => ({
    deletePopUpState: !state.deletePopUpState
  })),
}))

