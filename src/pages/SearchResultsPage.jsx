import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "@/services/movieService";
import MovieCard from "@/components/movies/MovieCard";
import SearchBar from "@/components/movies/SearchBar";
import GenreFilter from "@/components/movies/GenreFilter";
import { ChevronLeft, ChevronRight, SearchX, Filter } from "lucide-react";

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query, page);
      setResults(data?.results || []);
      setTotalPages(Math.min(data?.total_pages || 1, 500)); // TMDB caps at 500
      setTotalResults(data?.total_results || 0);
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // Reset page when query changes
  useEffect(() => {
    if (query) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", "1");
        return next;
      });
    }
    // Only trigger on query change, not page change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    setSearchParams({ query, page: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Client-side genre filter applied on top of search results
  const filteredResults =
    selectedGenres.length > 0
      ? results.filter((movie) =>
          movie.genre_ids?.some((id) => selectedGenres.includes(id))
        )
      : results;

  // Pagination helpers
  const maxVisible = 5;
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="container mx-auto p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Search Results
        </h1>
        {query && !isLoading && (
          <p className="text-muted-foreground font-medium">
            {totalResults > 0 ? (
              <>
                Found{" "}
                <span className="text-primary font-bold">
                  {totalResults.toLocaleString()}
                </span>{" "}
                results for{" "}
                <span className="text-foreground font-semibold">
                  &ldquo;{query}&rdquo;
                </span>
              </>
            ) : (
              <>
                No results found for{" "}
                <span className="text-foreground font-semibold">
                  &ldquo;{query}&rdquo;
                </span>
              </>
            )}
          </p>
        )}
      </div>

      {/* Search Bar */}
      <SearchBar
        placeholder="Search movies..."
        className="max-w-xl"
      />

      {/* Genre Filter Toggle */}
      <div>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200
            ${showFilters
              ? "bg-primary/10 border-primary/40 text-primary"
              : "bg-muted/60 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
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
          <div className="mt-4 p-4 rounded-2xl bg-muted/40 border border-border">
            <GenreFilter
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
            />
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <span className="text-5xl">⚠️</span>
          <p className="text-lg font-bold">{error}</p>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* No Results */}
      {!isLoading && !error && query && filteredResults.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <SearchX size={64} className="text-muted-foreground/40" />
          <h2 className="text-2xl font-bold">No movies found</h2>
          <p className="text-muted-foreground max-w-sm">
            {selectedGenres.length > 0
              ? "No results match the selected genres. Try removing some filters."
              : `We couldn't find any movies matching "${query}". Try a different search.`}
          </p>
        </div>
      )}

      {/* Movie Grid */}
      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-4">
                  <div className="aspect-[2/3] w-full bg-muted animate-pulse rounded-2xl ring-1 ring-white/5" />
                  <div className="space-y-2 px-1">
                    <div className="h-5 w-3/4 bg-muted animate-pulse rounded-md" />
                    <div className="h-3 w-1/2 bg-muted animate-pulse rounded-md opacity-60" />
                  </div>
                </div>
              ))
            : filteredResults
                .filter((m) => m && m.id)
                .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !error && totalPages > 1 && filteredResults.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-white disabled:opacity-50 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {pages.map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
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
            className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-white disabled:opacity-50 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
