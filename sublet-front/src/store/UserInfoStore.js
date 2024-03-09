import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserInfoStore = create(
  persist(
    (set) => ({
      id: "",
      user_id: "",
      image_id: "",
      username: "",
      email: "",
      phone: "",
      school: "",
      id_card: false,
      verify_school: false,
      verify_email: false,
      verify_phone: false,
      birth: "",
      student_id: 0,
      gender: "",

      setUserInfo: (userInfo) =>
        set({
          user_id: userInfo.user_id,
          image_id: userInfo.image_id,
          username: userInfo.username,
          email: userInfo.email,
          phone: userInfo.phone,
          school: userInfo.school,
          id_card: userInfo.id_card,
          verify_school: userInfo.verify_school,
          verify_email: userInfo.verify_email,
          verify_phone: userInfo.verify_phone,
          birth: userInfo.birth,
          student_id: userInfo.student_id,
          gender: userInfo.gender
        }),
    }),
    {
      name: "userInfoStore-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

