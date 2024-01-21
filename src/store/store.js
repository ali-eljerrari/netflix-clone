import { create } from "zustand";

const examples = [
  "Avatar",
  "Avengers",
  "Titanic",
  "StarWars",
  "Avengers",
  "Jurassic World",
  "The Lion King",
  "The Avengers",
  "Avengers",
  "The Incredibles",
  "Beauty and the Beast",
  "Frozen",
  "The Fate of the Furious",
  "Iron Man",
  "Minions",
  "Spider man",
  "Black Panther",
  "Star Wars",
  "Aquaman",
  "The Lord of the Rings",
];

// eslint-disable-next-line no-unused-vars
const randomIndex = Math.floor(Math.random() * examples.length);

const useStore = create((set) => ({
  term: examples[randomIndex],
  setTerm: (term) => set({ term }),

  movies: [],
  setMovies: (movies) => set({ movies }),
  page: 1,
  setpage: (page) => set({ page }),
}));

export default useStore;

//? Note that we can use this: const { count, inc } = useStore()
