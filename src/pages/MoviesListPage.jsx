import { useEffect, useState } from "react";
import { fetchNowPlaying } from "../services/movieService";
import MovieCard from "../components/movies/MovieCard";
import SearchBar from "../components/movies/SearchBar";
import GenreFilter from "../components/movies/GenreFilter";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useLangStore } from "../store/useLangStore"; // استيراد الستور

export default function MoviesListPage() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { lang } = useLangStore(); 

  const t = {
    en: {
      title: "Now Playing",
      subtitle: "Discover the latest cinematic releases",
      search: "Search for a movie...",
      filter: "Filters",
      noMovies: "No movies match the selected genres.",
      clear: "Clear filters",
      error: "Something went wrong",
      retry: "Try Again",
      failLoad: "Failed to load movies. Please try again."
    },
    ar: {
      title: "يعرض الآن",
      subtitle: "اكتشف أحدث الإصدارات السينمائية",
      search: "ابحث عن فيلم...",
      filter: "الفلاتر",
      noMovies: "لا توجد أفلام تطابق الأنواع المختارة.",
      clear: "مسح الفلاتر",
      error: "حدث خطأ ما",
      retry: "إعادة المحاولة",
      failLoad: "فشل تحميل الأفلام. يرجى المحاولة مرة أخرى."
    },
    fr: {
      title: "En salle",
      subtitle: "Découvrez les dernières sorties cinématographiques",
      search: "Rechercher un film...",
      filter: "Filtres",
      noMovies: "Aucun film ne correspond aux genres sélectionnés.",
      clear: "Effacer les filtres",
      error: "Quelque chose s'est mal passé",
      retry: "Réessayer",
      failLoad: "Échec du chargement des films. Veuillez réessayer."
    },
    zh: {
      title: "正在上映",
      subtitle: "探索最新的影院发行",
      search: "搜索电影...",
      filter: "筛选",
      noMovies: "没有电影符合所选类型。",
      clear: "清除筛选",
      error: "出错了",
      retry: "重试",
      failLoad: "加载电影失败。请再试一次。"
    }
  }[lang];

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchNowPlaying(page, lang); 
        setMovieList(data?.results || []);
        setTotalPages(data?.total_pages > 500 ? 500 : data?.total_pages || 1); 
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(t.failLoad);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [page, lang, t.failLoad]); 

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
    if (i > 0) pages.push(i);
  }

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    setSearchParams({ page: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center px-4">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.error}</h2>
        <p className="text-muted-foreground">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-all"
        >
          {t.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            {t.title}
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            {t.subtitle}
          </p>
        </div>
        <div className="h-1 w-20 bg-primary rounded-full hidden md:block" />
      </div>

      
      <SearchBar placeholder={t.search} className="max-w-xl" />

      
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
          {t.filter}
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

      
      {!isLoading && filteredMovies.length === 0 && selectedGenres.length > 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-semibold">{t.noMovies}</p>
          <button
            onClick={() => setSelectedGenres([])}
            className="mt-3 text-sm text-primary hover:underline"
          >
            {t.clear}
          </button>
        </div>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-4">
                <div className="aspect-2/3 w-full bg-muted animate-pulse rounded-2xl ring-1 ring-white/5" />
                <div className="space-y-2 px-1">
                  <div className="h-5 w-3/4 bg-muted animate-pulse rounded-md" />
                  <div className="h-3 w-1/2 bg-muted animate-pulse rounded-md opacity-60" />
                </div>
              </div>
            ))
          : filteredMovies
              .filter((movie) => movie && movie.id)
              .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-white disabled:opacity-50 transition-colors"
          >
            <ChevronLeft size={18} className="rtl:rotate-180" />
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
            <ChevronRight size={18} className="rtl:rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
}