import axios from "axios";
import { TMDB_BASE_URL, TMDB_API_KEY } from "../constants/api";
import { useLangStore } from "../store/useLangStore"; 

export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

tmdbApi.interceptors.request.use((config) => {
  const { lang } = useLangStore.getState(); 
  
  config.params = {
    ...config.params,
    language: lang, 
  };
  
  return config;
});