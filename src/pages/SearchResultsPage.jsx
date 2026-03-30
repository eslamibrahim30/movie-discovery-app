import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "@/services/movieService";
import MovieCard from "@/components/movies/MovieCard";
import SearchBar from "@/components/movies/SearchBar";
import GenreFilter from "@/components/movies/GenreFilter";
import { useLangStore } from "@/store/useLangStore";
import { ChevronLeft, ChevronRight, SearchX, Filter, RotateCcw } from "lucide-react";

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;
  const { lang } = useLangStore();

  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const t = {
    en: {
      title: "Search Results",
      found: "Found",
      resultsFor: "results for",
      noResults: "No results found for",
      placeholder: "Search movies...",
      filters: "Filters",
      errorMsg: "Failed to fetch search results. Please try again.",
      tryAgain: "Try Again",
      noMovies: "No movies found",
      noMoviesDesc: "We couldn't find any movies matching",
      filterNoMatch: "No results match the selected genres. Try removing some filters.",
    },
    ar: {
      title: "نتائج البحث",
      found: "تم العثور على",
      resultsFor: "نتيجة لـ",
      noResults: "لم يتم العثور على نتائج لـ",
      placeholder: "ابحث عن أفلام...",
      filters: "الفلاتر",
      errorMsg: "فشل في جلب نتائج البحث. يرجى المحاولة مرة أخرى.",
      tryAgain: "إعادة المحاولة",
      noMovies: "لم يتم العثور على أفلام",
      noMoviesDesc: "لم نتمكن من العثور على أي أفلام تطابق",
      filterNoMatch: "لا توجد نتائج تطابق الفلاتر المختارة. جرب إزالة بعض الفلاتر.",
    },
    fr: {
      title: "Résultats de recherche",
      found: "Trouvé",
      resultsFor: "résultats pour",
      noResults: "Aucun résultat trouvé pour",
      placeholder: "Rechercher des films...",
      filters: "Filtres",
      errorMsg: "Échec de la récupération des résultats. Veuillez réessayer.",
      tryAgain: "Réessayer",
      noMovies: "Aucun film trouvé",
      noMoviesDesc: "Nous n'avons trouvé aucun film correspondant à",
      filterNoMatch: "Aucun résultat ne correspond aux genres sélectionnés.",
    },
    zh: {
      title: "搜索结果",
      found: "找到",
      resultsFor: "个结果，关键字为",
      noResults: "未找到相关结果",
      placeholder: "搜索电影...",
      filters: "筛选",
      errorMsg: "获取搜索结果失败。请稍后重试。",
      tryAgain: "重试",
      noMovies: "未找到电影",
      noMoviesDesc: "我们找不到任何电影符合",
      filterNoMatch: "没有结果符合所选流派。请尝试删除一些筛选条件。",
    }
  }[lang];

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query, page);
      setResults(data?.results || []);
      setTotalPages(Math.min(data?.total_pages || 1, 500));
      setTotalResults(data?.total_results || 0);
    } catch (err) {
      setError(t.errorMsg);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [query, page, t.errorMsg]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    if (query) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", "1");
        return next;
      });
    }
  }, [query, setSearchParams]);

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

  const filteredResults =
    selectedGenres.length > 0
      ? results.filter((movie) =>
          movie.genre_ids?.some((id) => selectedGenres.includes(id))
        )
      : results;

  const maxVisible = 5;
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="container mx-auto p-6 md:p-10 space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground rtl:tracking-normal">
          {t.title}
        </h1>
        {query && !isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground font-medium text-lg">
            {totalResults > 0 ? (
              <p>
                {t.found}{" "}
                <span className="text-primary font-black px-2 py-0.5 bg-primary/10 rounded-lg mx-1">
                  {totalResults.toLocaleString()}
                </span>{" "}
                {t.resultsFor}{" "}
                <span className="text-foreground font-bold italic underline decoration-primary/30">
                  &ldquo;{query}&rdquo;
                </span>
              </p>
            ) : (
              <p>
                {t.noResults}{" "}
                <span className="text-foreground font-bold italic">
                  &ldquo;{query}&rdquo;
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Action Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <SearchBar
          placeholder={t.placeholder}
          className="max-w-xl w-full"
        />

        <button
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-2 px-6 py-3 rounded-[1.2rem] text-sm font-black border transition-all duration-300
            ${showFilters
              ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "bg-muted/40 border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
            }`}
        >
          <Filter size={16} className={showFilters ? "animate-bounce" : ""} />
          {t.filters}
          {selectedGenres.length > 0 && (
            <span className={`ml-1 flex h-5 w-5 items-center justify-center rounded-full ${showFilters ? "bg-white text-primary" : "bg-primary text-white"} text-[10px] font-black`}>
              {selectedGenres.length}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="p-6 rounded-4xl bg-muted/20 border border-border/50 backdrop-blur-sm animate-in slide-in-from-top-4 duration-500">
          <GenreFilter
            selectedGenres={selectedGenres}
            onGenreToggle={handleGenreToggle}
          />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center gap-5 py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <RotateCcw size={40} className="text-destructive animate-spin-slow" />
          </div>
          <div className="space-y-2">
             <h2 className="text-2xl font-black">{t.errorMsg}</h2>
          </div>
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            {t.tryAgain}
          </button>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && !error && query && filteredResults.length === 0 && (
        <div className="flex flex-col items-center gap-6 py-32 text-center">
          <div className="relative">
            <SearchX size={80} className="text-muted-foreground/20" />
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black">{t.noMovies}</h2>
            <p className="text-muted-foreground max-w-md mx-auto text-lg">
              {selectedGenres.length > 0
                ? t.filterNoMatch
                : `${t.noMoviesDesc} "${query}".`}
            </p>
          </div>
        </div>
      )}

      {/* Movie Grid */}
      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="space-y-5">
                  <div className="aspect-2/3 w-full bg-muted/40 animate-pulse rounded-[2.5rem]" />
                  <div className="space-y-3 px-2">
                    <div className="h-6 w-3/4 bg-muted animate-pulse rounded-xl" />
                    <div className="h-4 w-1/2 bg-muted/60 animate-pulse rounded-lg" />
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
        <div className="flex justify-center items-center gap-3 mt-16 pb-10">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="p-3 rounded-2xl bg-muted/50 hover:bg-primary hover:text-primary-foreground disabled:opacity-30 transition-all hover:scale-110 active:scale-90"
          >
            <ChevronLeft size={20} className="rtl:rotate-180" />
          </button>

          <div className="flex items-center gap-2">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-12 h-12 rounded-2xl font-black transition-all ${
                  page === p
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
                    : "bg-muted/50 hover:bg-muted text-muted-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="p-3 rounded-2xl bg-muted/50 hover:bg-primary hover:text-primary-foreground disabled:opacity-30 transition-all hover:scale-110 active:scale-90"
          >
            <ChevronRight size={20} className="rtl:rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
}