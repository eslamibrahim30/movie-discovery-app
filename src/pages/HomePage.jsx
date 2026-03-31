import { useEffect, useState } from "react";
import { fetchNowPlaying } from "../services/movieService";
import MovieCard from "../components/movies/MovieCard";
import SearchBar from "../components/movies/SearchBar";
import GenreFilter from "../components/movies/GenreFilter";
import { Link } from "react-router-dom";
import { ChevronRight, Filter, Sparkles } from "lucide-react";
import { useLangStore } from "../store/useLangStore"; 

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const { lang } = useLangStore(); 

  const t = {
    en: {
      trending: "Trending Now",
      heroTitle: <>Discover Your <br /> <span className="text-primary">Next Favourite</span> Film</>,
      heroDesc: "Explore thousands of movies, filter by genre, and find exactly what you want to watch tonight.",
      searchPlaceholder: "Search for a movie...",
      filterBtn: "Filter by Genre",
      sectionTitle: "Now Playing",
      sectionDesc: "Latest releases in cinemas",
      seeAll: "See all",
      noMatch: "No movies match the selected genres.",
      clear: "Clear filters"
    },
    ar: {
      trending: "رائج الآن",
      heroTitle: <>اكتشف فيلمك <br /> <span className="text-primary">المفضل القادم</span></>,
      heroDesc: "استكشف آلاف الأفلام، استخدم الفلاتر، وجد بالضبط ما تود مشاهدته الليلة.",
      searchPlaceholder: "ابحث عن فيلم...",
      filterBtn: "تصفية حسب النوع",
      sectionTitle: "يعرض الآن",
      sectionDesc: "أحدث الإصدارات في السينما",
      seeAll: "عرض الكل",
      noMatch: "لا توجد أفلام تطابق الأنواع المختارة.",
      clear: "مسح الفلاتر"
    },
    fr: {
        trending: "En vogue",
        heroTitle: <>Découvrez votre <br /> <span className="text-primary">prochain film</span> préféré</>,
        heroDesc: "Explorez des milliers de films, filtrez par genre et trouvez exactement ce que vous voulez regarder ce soir.",
        searchPlaceholder: "Rechercher un film...",
        filterBtn: "Filtrer par genre",
        sectionTitle: "En salle",
        sectionDesc: "Dernières sorties au cinéma",
        seeAll: "Voir tout",
        noMatch: "Aucun film ne correspond aux genres sélectionnés.",
        clear: "Effacer les filtres"
    },
    zh: {
        trending: "正在流行",
        heroTitle: <>发现您的 <br /> <span className="text-primary">下一部最爱</span> 电影</>,
        heroDesc: "探索数千部电影，按类型筛选，准确找到今晚想看的内容。",
        searchPlaceholder: "搜索电影...",
        filterBtn: "按类型筛选条件",
        sectionTitle: "正在上映",
        sectionDesc: "影院最新上映",
        seeAll: "查看全部",
        noMatch: "没有电影符合所选类型。",
        clear: "清除筛选"
    }
  }[lang];

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await fetchNowPlaying(1, lang); 
        setMovies(data?.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [lang]);

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
      
      <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-primary/20 via-background to-background border border-border p-8 md:p-14 space-y-6">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <Sparkles size={16} />
          <span>{t.trending}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-muted-foreground max-w-lg text-base md:text-lg">
          {t.heroDesc}
        </p>

        <SearchBar
          placeholder={t.searchPlaceholder}
          className="max-w-lg"
        />
      </div>

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
          {t.filterBtn}
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

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">{t.sectionTitle}</h2>
          <p className="text-muted-foreground text-sm mt-1">{t.sectionDesc}</p>
        </div>
        <Link
          to="/movies"
          className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          {t.seeAll} <ChevronRight size={16} className="rtl:rotate-180" />
        </Link>
      </div>

      {!isLoading && filteredMovies.length === 0 && selectedGenres.length > 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-semibold">{t.noMatch}</p>
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
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-4">
                <div className="aspect-2/3 w-full bg-muted animate-pulse rounded-2xl ring-1 ring-white/5" />
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