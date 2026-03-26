// services/tmdbApi.js
import axios from "axios";
import { TMDB_BASE_URL, TMDB_API_KEY } from "../constants/api";

export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});