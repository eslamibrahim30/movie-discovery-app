import { tmdbApi } from "./tmdbApi";

export async function fetchNowPlaying(page = 1) {
  const response = await tmdbApi.get("/movie/now_playing", {
    params: { page },
  });
  return response.data;
}