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

export async function fetchMoviesWithFilters({
  page = 1,
  genreId,
  sortBy = "popularity.desc",
}) {
  try {
    const params = {
      page,
      sort_by: sortBy,
    };

    if (genreId) {
      params.with_genres = genreId;
    }

    const response = await tmdbApi.get("/discover/movie", { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function searchMovies(query, page = 1, language = "en") {
  try {
    const response = await tmdbApi.get("/search/movie", {
      params: { query, page, language },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function fetchGenres(language = "en") {
  try {
    const response = await tmdbApi.get("/genre/movie/list", {
      params: { language },
    });
    return response.data.genres;
  } catch (error) {
    throw handleApiError(error);
  }
}