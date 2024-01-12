import { create } from "zustand";

// eslint-disable-next-line no-unused-vars
const useStore = create((set) => ({
  //   bears: 0,
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
}));

export default useStore;

//? Note that we can use this: const { count, inc } = useStore()
