import { useEffect, useState } from "react";
import { fetchNowPlaying } from "../services/movieService";
import MovieCard from "../components/movies/MovieCard";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MoviesListPage() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        const data = await fetchNowPlaying(page);

        setMovieList(data?.results || []);
        setTotalPages(data?.total_pages || 1);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [page]);

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
    setSearchParams({ page: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Now Playing Movies</h1>

      {}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-60 bg-gray-300 animate-pulse rounded" />
            ))
          : movieList
              .filter((movie) => movie && movie.id)
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
      </div>

      
      <div className="flex justify-center items-center gap-2 mt-8">

        
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-white disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>

      
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-1 rounded-lg font-medium transition ${
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
          className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-white disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}