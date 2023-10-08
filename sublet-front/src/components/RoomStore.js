import { create } from 'zustand';

const useStore = create((set) => ({
    likes: {},
    setLikes: (room) => set((state) => ({ likes: { ...state.likes, [room.id]: room } })),
    removeLikes: (roomId) => set((state) => {
      let newLikes = {}
      Object.keys(state.likes).map(newItem => {
          if(state.likes[newItem].id !== roomId){
              newLikes = {...newLikes, [newItem] : state.likes[newItem]}
          }
      })
      return { likes: newLikes }
    }),
}));

export default useStore;
  