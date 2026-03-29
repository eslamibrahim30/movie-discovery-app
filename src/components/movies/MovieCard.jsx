import { Heart, Star, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useNavigate } from "react-router-dom";


const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

   console.log(movie.id);

  if (!movie || !movie.id) return null;

  const inWishlist = isInWishlist(movie.id);
 

  return (
    
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)} // 👈 ضغط على الكارد كله
      className="group relative overflow-hidden border-none bg-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-muted shadow-md">
        
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition-all duration-300">
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
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(movie);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            inWishlist
              ? "bg-red-500 text-white"
              : "bg-black/30 text-white hover:bg-white hover:text-red-500"
          }`}
        >
          <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
        </button>

        {/* Rating */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-secondary/90 text-black font-bold flex items-center gap-1">
            <Star size={12} className="fill-current" />
            {movie.vote_average?.toFixed(1) || "0.0"}
          </Badge>
        </div>
      </div>

      {/* 🟢 تحسين الاسم */}
      <CardContent className="pt-4 px-2 space-y-1">
        <h3 className="font-bold text-base md:text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
          <span>•</span>
          <span>{movie.original_language?.toUpperCase() || "EN"}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;