import { create } from "zustand"

export const SubletPostStore = create((set) => ({
  post: [],
  postExist: false,
  setPost: (post) => set(() => ({ post: [...post], postExist: true })),
  clearPost: () => set(() => ({ post: [], postExist: false })),
  asyncGetPost: async () => {
    const json = await (
      await fetch(
        process.env.REACT_APP_BACKEND_URL + "/post"
      )
    ).json();
    console.log("jihwanki store json=", json);
    set(() => ({ post: [...json], postExist: true }))
  }
}))