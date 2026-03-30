import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieRecommendations,
  fetchMovieVideos,
} from "../services/movieService";
import MovieCard from "../components/movies/MovieCard";
import { useLangStore } from "@/store/useLangStore"; 
import { Loader2, Star, Clock, Calendar } from "lucide-react";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const { lang } = useLangStore(); 

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const t = {
    en: {
      min: "min",
      trailer: "Official Trailer",
      recommendations: "Recommended Movies",
      noRecs: "No recommendations found",
      loading: "Loading movie details...",
    },
    ar: {
      min: "دقيقة",
      trailer: "الإعلان الرسمي",
      recommendations: "أفلام مقترحة",
      noRecs: "لا توجد مقترحات حالياً",
      loading: "جاري تحميل تفاصيل الفيلم...",
    },
    fr: {
      min: "min",
      trailer: "Bande-annonce officielle",
      recommendations: "Films recommandés",
      noRecs: "Aucune recommandation trouvée",
      loading: "Chargement des détails...",
    },
    zh: {
      min: "分钟",
      trailer: "官方预告片",
      recommendations: "推荐电影",
      noRecs: "暂无推荐",
      loading: "正在加载电影详情...",
    }
  }[lang];

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const movieData = await fetchMovieDetails(id, lang);
        setMovie(movieData);

        const recData = await fetchMovieRecommendations(id, lang);
        setRecommendations(recData?.results || []);

        const videoData = await fetchMovieVideos(id, lang);
        const trailerVideo = videoData?.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(trailerVideo);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
    window.scrollTo(0, 0);
  }, [id, lang]); 

  if (isLoading || !movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      
      {/* 🎬 HERO SECTION */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Backdrop Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />

        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute z-20 bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto flex flex-col md:flex-row gap-8 items-center md:items-end">
            
            {/* Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-40 md:w-64 rounded-2xl shadow-2xl border-4 border-background/20 hidden md:block"
            />

            {/* Info */}
            <div className="space-y-4 text-center md:text-start flex-1">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium text-gray-200">
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="text-primary" />
                  <span>{movie.release_date?.split("-")[0]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-primary" />
                  <span>{movie.runtime} {t.min}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-white font-bold">{movie.vote_average?.toFixed(1)}</span>
                </div>
              </div>

              <p className="max-w-3xl text-gray-300 text-base md:text-lg leading-relaxed line-clamp-3 md:line-clamp-none">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-12 space-y-16">
        
        {/* 🎥 TRAILER */}
        {trailer && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight border-l-4 border-primary pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pr-4">
              {t.trailer}
            </h2>
            <div className="relative aspect-video w-full max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0&showinfo=0`}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* 🎯 RECOMMENDATIONS */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight border-l-4 border-primary pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pr-4">
            {t.recommendations}
          </h2>

          {recommendations.length === 0 ? (
            <div className="bg-muted/30 rounded-2xl p-8 text-center border border-dashed border-border">
              <p className="text-muted-foreground">{t.noRecs}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {recommendations.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}