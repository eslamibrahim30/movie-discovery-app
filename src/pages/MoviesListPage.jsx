import { useEffect, useState } from "react";
import {
  fetchNowPlaying,
  fetchMoviesWithFilters,
  fetchGenres,
} from "../services/movieService";
import MovieCard from "../components/movies/MovieCard";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MoviesListPage() {
  const [movieList, setMovieList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const genreId = searchParams.get("genre") || "";
  const sortBy = searchParams.get("sort") || "popularity.desc";


  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(null);

        const data =
          genreId || sortBy !== "popularity.desc"
            ? await fetchMoviesWithFilters({ page, genreId, sortBy })
            : await fetchNowPlaying(page);

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
  }, [page, genreId, sortBy]);

 
  useEffect(() => {
    async function loadGenres() {
      try {
        const data = await fetchGenres();
        setGenres(data?.genres || []);
      } catch (err) {
        console.error(err);
      }
    }

    loadGenres();
  }, []);


  const updateParams = (newParams) => {
    setSearchParams({
      page,
      genre: genreId,
      sort: sortBy,
      ...newParams,
    });
  };

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    updateParams({ page: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGenreChange = (e) => {
    updateParams({ genre: e.target.value, page: 1 });
  };

  const handleSortChange = (e) => {
    updateParams({ sort: e.target.value, page: 1 });
  };

 
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


  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center px-4">
        <div className="text-4xl mb-4">⚠️</div>
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
    <div className="container mx-auto p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black">
            Now Playing Movies
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover the latest movies
          </p>
        </div>
      </div>

  
      <div className="flex flex-wrap gap-4 mb-6">
   
        <select
          value={genreId}
          onChange={handleGenreChange}
          className="px-3 py-2 rounded-md bg-muted"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

       
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="px-3 py-2 rounded-md bg-muted"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="release_date.desc">Newest</option>
        </select>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-4">
                <div className="aspect-[2/3] bg-muted animate-pulse rounded-2xl" />
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              </div>
            ))
          : movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
      </div>

   
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
    </div>
  );
}
