import { useEffect, useState } from "react";
import { fetchGenres } from "@/services/movieService";
import { Tag } from "lucide-react";
import { useLangStore } from "@/store/useLangStore"; 

const GenreFilter = ({ selectedGenres = [], onGenreToggle }) => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useLangStore(); 

  
  const t = {
    en: { label: "Filter by genre", clear: "Clear all" },
    ar: { label: "تصفية حسب النوع", clear: "مسح الكل" },
    fr: { label: "Filtrer par genre", clear: "Tout effacer" },
    zh: { label: "按类型筛选", clear: "全部清除" },
  }[lang];

  useEffect(() => {
    async function loadGenres() {
      try {
        setIsLoading(true); 
        const data = await fetchGenres(lang); 
        setGenres(data);
      } catch (err) {
        console.error("Failed to load genres:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadGenres();
  }, [lang]); 

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 rounded-full bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Tag size={14} className="rtl:scale-x-[-1]" /> 
        <span>{t.label}</span>
        {selectedGenres.length > 0 && (
          <button
            onClick={() => onGenreToggle(null)}
            className="ml-auto rtl:mr-auto rtl:ml-0 text-xs text-primary hover:underline"
          >
            {t.clear}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const isActive = selectedGenres.includes(genre.id);
          return (
            <button
              key={genre.id}
              onClick={() => onGenreToggle(genre.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30 scale-105"
                    : "bg-muted/60 text-muted-foreground border-transparent hover:border-primary/40 hover:text-foreground hover:bg-muted"
                }
              `}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GenreFilter;