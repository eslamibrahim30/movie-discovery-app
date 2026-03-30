import { Heart, Star, Play, CalendarDays, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useNavigate } from "react-router-dom";
import { notify } from "@/services/notification";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  if (!movie || !movie.id) return null;

  const inWishlist = isInWishlist(movie.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(movie);

    if (inWishlist) {
      notify.error(`${movie.title} Removed from wishlist ❌`);
    } else {
      notify.success(`${movie.title} Added to wishlist ❤️`);
    }
  };

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="group relative overflow-hidden border-none bg-transparent transition-all duration-500 hover:-translate-y-2.5 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-muted shadow-lg ring-1 ring-white/10 transition-all duration-500 group-hover:ring-primary/40">
        
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition-all duration-300">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movie/${movie.id}`);
            }}
            className="w-full gap-2 font-bold shadow-lg"
          >
            <Play size={16} />
            Watch Now
          </Button>
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-20 active:scale-90 ${
            inWishlist
              ? "bg-primary text-primary-foreground shadow-primary/40"
              : "bg-black/30 text-white hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
        </button>

        {/* Rating */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <Badge className="bg-yellow-500/90 text-black font-bold flex items-center gap-1 px-2 py-1 rounded-md">
            <Star size={12} className="fill-current" />
            {movie.vote_average?.toFixed(1) || "N/A"}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <CardContent className="pt-4 px-2 space-y-2">
        <h3 className="font-bold text-base md:text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays size={12} />
            <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
          </div>

          <span>•</span>

          <div className="flex items-center gap-1">
            <Globe size={12} />
            <span>{movie.original_language?.toUpperCase() || "EN"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;