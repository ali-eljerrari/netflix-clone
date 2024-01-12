import axios from "axios";
import API_KEY from "./tmdb";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { Authorization: API_KEY },
});

export default instance;
