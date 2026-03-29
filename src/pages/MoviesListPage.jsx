import { useEffect, useState } from "react";
import { fetchNowPlaying } from "../services/movieService"; 
import MovieCard from "../components/movies/MovieCard";    

export default function MoviesListPage() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        const data = await fetchNowPlaying();
        setMovieList(data.results);
      } catch (err) {
        setError(err.message || "Failed to fetch movies");
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center px-4">
        <div className="text-6-xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h2>
        <p className="text-muted-foreground">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-10">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Now Playing
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Discover the latest cinematic releases
          </p>
        </div>
        <div className="h-1 w-20 bg-primary rounded-full hidden md:block" />
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-4">
                {/* Poster Skeleton */}
                <div className="aspect-2/3 w-full bg-muted animate-pulse rounded-2xl ring-1 ring-white/5"></div>
                {/* Title & Info Skeleton */}
                <div className="space-y-2 px-1">
                  <div className="h-5 w-3/4 bg-muted animate-pulse rounded-md"></div>
                  <div className="h-3 w-1/2 bg-muted animate-pulse rounded-md opacity-60"></div>
                </div>
              </div>
            ))
          : movieList.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
      </div>
    </div>
  );
}