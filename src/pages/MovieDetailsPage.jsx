import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieRecommendations,
  fetchMovieVideos,
} from "../services/movieService";
import MovieCard from "../components/movies/MovieCard";

export default function MovieDetailsPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);

        const recData = await fetchMovieRecommendations(id);
        setRecommendations(recData?.results || []);

        const videoData = await fetchMovieVideos(id);

        const trailerVideo = videoData?.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        setTrailer(trailerVideo);
      } catch (err) {
        console.error(err);
      }
    }

    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* 🎬 HERO SECTION */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/70 z-10" />

        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="w-full h-[400px] object-cover"
        />

        <div className="absolute z-20 bottom-6 left-6 right-6 flex flex-col md:flex-row gap-6 items-end">
          
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-40 md:w-52 rounded-xl shadow-lg"
          />

          <div className="space-y-3">
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              {movie.title}
            </h1>

            <div className="flex gap-3 text-sm text-gray-300">
              <span>{movie.release_date?.split("-")[0]}</span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            </div>

            <p className="max-w-2xl text-gray-200">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>

      {/* 🎥 TRAILER */}
      {trailer && (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Trailer</h2>

          <div className="w-full max-w-4xl mx-auto">
            <iframe
              className="w-full h-[250px] md:h-[400px] rounded-xl shadow-lg"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* 🎯 RECOMMENDATIONS */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Recommended Movies</h2>

        {recommendations.length === 0 ? (
          <p className="text-muted-foreground">No recommendations found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendations.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}