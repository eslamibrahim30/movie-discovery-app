import { tmdbApi } from "./tmdbApi";
import { handleApiError } from "../utils/errorHandler";

export async function fetchNowPlaying(page = 1, language = "en") {
  try {
    const response = await tmdbApi.get("/movie/now_playing", {
      params: { page, language },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error); 
  }
}

export async function fetchMovieDetails(id, language = "en") {
  try {
    const response = await tmdbApi.get(`/movie/${id}`, {
      params: { language },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function fetchMovieRecommendations(movieId, language = "en") {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/recommendations`, {
      params: { language },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function fetchMovieVideos(movieId) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}