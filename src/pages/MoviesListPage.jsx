import { useEffect, useState } from "react";
import {
  fetchNowPlaying,
  fetchMoviesWithFilters,
  fetchGenres,
} from "../services/movieService";
import MovieCard from "../components/movies/MovieCard";
import SearchBar from "../components/movies/SearchBar";
import GenreFilter from "../components/movies/GenreFilter";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

export default function MoviesListPage() {
  const [movieList, setMovieList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sort") || "popularity.desc";

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMoviesWithFilters({
          page,
          sortBy,
        });

        setMovieList(data?.results || []);
        setTotalPages(data?.total_pages || 1);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [page, sortBy]);

  useEffect(() => {
    async function loadGenres() {
      try {
        const data = await fetchGenres();
        setGenres(data || []);
      } catch (err) {
        console.error(err);
      }
    }

    loadGenres();
  }, []);

  const handleGenreToggle = (genreId) => {
    if (genreId === null) {
      setSelectedGenres([]);
      return;
    }

    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const filteredMovies =
    selectedGenres.length > 0
      ? movieList.filter((movie) =>
          movie.genre_ids?.some((id) => selectedGenres.includes(id))
        )
      : movieList;

  const maxVisible = 5;
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    setSearchParams({ page: p, sort: sortBy });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center px-4">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary/80"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black">
            Now Playing Movies
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover the latest movies
          </p>
        </div>

        {/* Sorting */}
        <select
          value={sortBy}
          onChange={(e) =>
            setSearchParams({ page: 1, sort: e.target.value })
          }
          className="px-3 py-2 rounded-md bg-muted"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="release_date.desc">Newest</option>
        </select>
      </div>

      {/* Search */}
      <SearchBar placeholder="Search for a movie..." className="max-w-xl" />

      {/* Filters */}
      <div>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all
          ${
            showFilters
              ? "bg-primary/10 border-primary/40 text-primary"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <Filter size={15} />
          Filters
          {selectedGenres.length > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {selectedGenres.length}
            </span>
          )}
        </button>

        {showFilters && (
          <div className="mt-4 p-4 rounded-2xl bg-muted/40 border">
            <GenreFilter
              genres={genres}
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
            />
          </div>
        )}
      </div>

      {/* No results */}
      {!isLoading && filteredMovies.length === 0 && selectedGenres.length > 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-semibold">
            No movies match the selected genres.
          </p>
          <button
            onClick={() => setSelectedGenres([])}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-4">
                <div className="aspect-[2/3] bg-muted animate-pulse rounded-2xl" />
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              </div>
            ))
          : filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="p-2 rounded bg-muted hover:bg-primary hover:text-white disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>

          {pages.map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`px-3 py-1 rounded ${
                page === p
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-primary hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="p-2 rounded bg-muted hover:bg-primary hover:text-white disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}