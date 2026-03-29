import React from "react";
import { Heart, Star, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/useWishlistStore";

const MovieCard = ({ movie }) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(movie.id);

  return (
    <Card className="group relative overflow-hidden border-none bg-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
      
      <div className="relative aspect-2/3 overflow-hidden rounded-2xl bg-muted shadow-md">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
          <Button 
            size="sm" 
            className="w-full gap-2 font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 cursor-pointer active:scale-95"
          >
            <Play size={16} fill="currentColor" /> Watch Now
          </Button>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(movie);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 cursor-pointer active:scale-90 ${
            inWishlist
              ? "bg-red-500 text-white shadow-lg shadow-red-500/40"
              : "bg-black/20 text-white hover:bg-white hover:text-red-500"
          }`}
        >
          <Heart 
            size={18} 
            className={`${inWishlist ? "animate-in zoom-in duration-300" : ""}`}
            fill={inWishlist ? "currentColor" : "none"} 
          />
        </button>

        <div className="absolute top-3 left-3 pointer-events-none">
          <Badge variant="secondary" className="bg-secondary/90 text-black font-black flex items-center gap-1 shadow-sm border-none">
            <Star size={12} className="fill-current" /> {movie.vote_average?.toFixed(1)}
          </Badge>
        </div>
      </div>

      <CardContent className="pt-4 px-1 space-y-1">
        <h3 className="font-bold text-base md:text-lg leading-tight truncate group-hover:text-primary transition-colors duration-300">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              {movie.release_date?.split("-")[0] || "N/A"}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider truncate">
              {movie.original_language || "EN"}
            </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;