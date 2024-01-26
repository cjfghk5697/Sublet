import { create } from "zustand"

export const SubletPostStore = create((set) => ({
  post: [],
  postExist: false,
  page: 1,
  postAll: [],
  postMarker: false,
  setPostMarker: (flag) => set(() => ({ postMarker: flag })),
  //setPost: (post) => set(() => ({ post: [...post], postExist: true })),
  clearPost: () => set(() => ({ post: [], postExist: false })),
  asyncGetPost: async (page) => {
    const json = await (
      await fetch(
        process.env.REACT_APP_BACKEND_URL + `/post?maxPost=6&page=${page}`,
      )
    ).json();
    set(() => ({ post: [...json], postExist: true }))
  },
  asyncGetPostAll: async () => {
    let nowPage = 1;
    let tempPostAll = [];
    while (true) {
      const json = await (
        await fetch(
          process.env.REACT_APP_BACKEND_URL + `/post?maxPost=6&page=${nowPage}`,
        )
      ).json();

      if (json.length === 0) {
        set((state) => ({ postAll: [...state.postAll, ...tempPostAll], postExist: true }))
        break;
      }
      tempPostAll = [...tempPostAll, ...json];
      nowPage++;
    }
  },
}));