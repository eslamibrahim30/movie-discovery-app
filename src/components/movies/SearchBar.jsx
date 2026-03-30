import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, X, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

const SearchBar = ({ placeholder = "Search movies...", className = "" }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [inputValue, setInputValue] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const debouncedQuery = useDebounce(inputValue, 500);

  // When the debounced value changes, navigate to search results
  useEffect(() => {
    if (debouncedQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(debouncedQuery.trim())}`);
    }
  }, [debouncedQuery, navigate]);

  // Sync input when navigating back
  useEffect(() => {
    const q = searchParams.get("query") || "";
    if (q !== inputValue) {
      setInputValue(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleClear = () => {
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClear();
      inputRef.current?.blur();
    }
    if (e.key === "Enter" && inputValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const isDebouncing = inputValue !== debouncedQuery && inputValue.trim().length > 0;

  return (
    <div
      className={`relative flex items-center transition-all duration-300 ${className}`}
    >
      {/* Search Icon */}
      <div className="absolute left-3 flex items-center pointer-events-none">
        {isDebouncing ? (
          <Loader2
            size={16}
            className="text-primary animate-spin"
          />
        ) : (
          <Search
            size={16}
            className={`transition-colors duration-200 ${
              isFocused ? "text-primary" : "text-muted-foreground"
            }`}
          />
        )}
      </div>

      {/* Input */}
      <input
        id="global-search-input"
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        autoComplete="off"
        className={`
          w-full pl-9 pr-9 py-2 text-sm rounded-xl
          bg-muted/60 border border-transparent
          text-foreground placeholder:text-muted-foreground
          transition-all duration-300 outline-none
          focus:bg-muted focus:border-primary/40 focus:ring-2 focus:ring-primary/20
          ${isFocused ? "shadow-lg shadow-primary/10" : ""}
        `}
      />

      {/* Clear Button */}
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
