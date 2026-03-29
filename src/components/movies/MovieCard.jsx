import React from "react";
import { Heart, Star, Play, CalendarDays, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/useWishlistStore";
import { notify } from "@/services/notification";

const MovieCard = ({ movie }) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(movie.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    toggleWishlist(movie);
    if (inWishlist) {
      notify.error(`${movie.title} Removed from wishlist ❌`);
    } else {
      notify.success(`${movie.title} Added to wishlist ❤️`);
    }
  };

  return (
    <Card className="group relative overflow-hidden border-none bg-transparent transition-all duration-500 hover:-translate-y-2.5">
      {/* 1. Poster Container with Glassmorphism Border */}
      <div className="relative aspect-2/3 overflow-hidden rounded-2xl bg-muted shadow-lg ring-1 ring-white/10 transition-all duration-500 group-hover:shadow-primary/30 group-hover:ring-primary/40">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:blur-[1.5px]"
          loading="lazy"
        />

        {/* 2. Advanced Hover Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100 flex flex-col justify-end p-5">
          <Button
            size="sm"
            className="w-full gap-2 font-bold shadow-xl translate-y-8 group-hover:translate-y-0 transition-transform duration-500 cursor-pointer rounded-xl bg-primary hover:bg-primary/90 active:scale-95"
          >
            <Play size={16} fill="currentColor" /> Watch Now
          </Button>
        </div>

        {/* 3. Wishlist Button (Glassmorphism) */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-lg transition-all duration-300 z-20 cursor-pointer active:scale-90 shadow-md ${
            inWishlist
              ? "bg-red-500 text-white shadow-red-500/50"
              : "bg-black/30 text-white hover:bg-white hover:text-red-600 ring-1 ring-white/10"
          }`}
        >
          <Heart
            size={18}
            className={`${inWishlist ? "fill-current animate-pulse" : ""}`}
          />
        </button>

        {/* 4. Rating Badge (Glassmorphism + Yellow Accent) */}
        <div className="absolute top-3 left-3 pointer-events-none transition-transform duration-300 group-hover:scale-110">
          <Badge className="bg-yellow-500/90 text-black font-extrabold flex items-center gap-1.5 shadow-md border-none px-2.5 py-1 rounded-lg backdrop-blur-sm">
            <Star size={13} className="fill-current text-black" />
            <span className="text-[13px] leading-none">
              {movie.vote_average?.toFixed(1) || "N/A"}
            </span>
          </Badge>
        </div>
      </div>

      {/* 5. Movie Info with Proper Spacing */}
      <CardContent className="pt-4 px-1 pb-1">
        <h3 className="font-bold text-base md:text-lg leading-tight truncate group-hover:text-primary transition-colors duration-300 mb-2">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CalendarDays size={13} className="opacity-70" />
            <span className="text-[11px] font-semibold tracking-wide">
              {movie.release_date?.split("-")[0] || "N/A"}
            </span>
          </div>
          
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          
          <div className="flex items-center gap-1.5">
            <Globe size={13} className="opacity-70" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              {movie.original_language || "EN"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;