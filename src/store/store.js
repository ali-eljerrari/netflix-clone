import { create } from "zustand";

// eslint-disable-next-line no-unused-vars
const useStore = create((set) => ({
  term: "spiderman",
  setTerm: (term) => set({ term }),

  movies: [],
  setMovies: (movies) => set({ movies }),
  page: 1,
  setpage: (page) => set({ page }),
}));

export default useStore;

//? Note that we can use this: const { count, inc } = useStore()
