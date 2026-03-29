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
        console.log(data);
        setMovieList(data.results);
      } catch (err) {
        setError(err.message || "Failed to fetch movies");
      } finally {
        setIsLoading(false);
        console.log("loading:", isLoading); //تقريبا API فيه مشكلمة
      }
    }

    getMovies();
  }, []);

  // 🟥 Error
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Now Playing Movies</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <div className="h-62.5 w-full bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
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