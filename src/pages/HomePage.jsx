import { useEffect, useState } from "react";
import { fetchNowPlaying } from "../services/movieService";
import MovieCard from "../components/movies/MovieCard";
import SearchBar from "../components/movies/SearchBar";
import GenreFilter from "../components/movies/GenreFilter";
import { Link } from "react-router-dom";
import { ChevronRight, Filter, Sparkles } from "lucide-react";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await fetchNowPlaying(1);
        setMovies(data?.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
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
      ? movies.filter((m) =>
          m.genre_ids?.some((id) => selectedGenres.includes(id))
        )
      : movies;

  return (
    <div className="container mx-auto p-6 md:p-10 space-y-10">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background border border-border p-8 md:p-14 space-y-6">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <Sparkles size={16} />
          <span>Trending Now</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          Discover Your <br />
          <span className="text-primary">Next Favourite</span> Film
        </h1>
        <p className="text-muted-foreground max-w-lg text-base md:text-lg">
          Explore thousands of movies, filter by genre, and find exactly what
          you want to watch tonight.
        </p>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search for a movie..."
          className="max-w-lg"
        />
      </div>

      {/* Genre Filter */}
      <div>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200
            ${
              showFilters
                ? "bg-primary/10 border-primary/40 text-primary"
                : "bg-muted/60 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
        >
          <Filter size={15} />
          Filter by Genre
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

      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Now Playing</h2>
          <p className="text-muted-foreground text-sm mt-1">Latest releases in cinemas</p>
        </div>
        <Link
          to="/movies"
          className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          See all <ChevronRight size={16} />
        </Link>
      </div>

      {/* No genre match */}
      {!isLoading && filteredMovies.length === 0 && selectedGenres.length > 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-semibold">No movies match the selected genres.</p>
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
                <div className="aspect-[2/3] w-full bg-muted animate-pulse rounded-2xl ring-1 ring-white/5" />
                <div className="space-y-2 px-1">
                  <div className="h-5 w-3/4 bg-muted animate-pulse rounded-md" />
                  <div className="h-3 w-1/2 bg-muted animate-pulse rounded-md opacity-60" />
                </div>
              </div>
            ))
          : filteredMovies
              .filter((m) => m && m.id)
              .map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}
