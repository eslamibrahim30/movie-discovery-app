import React from "react";
import { Heart, Star, Play } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MovieCard = ({ movie }) => {
  return (
    <Card className="group relative overflow-hidden border-none bg-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
      
      <div className="relative aspect-2/3 overflow-hidden rounded-2xl">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
          <Button size="sm" className="w-full gap-2 font-bold shadow-lg">
            <Play size={16} fill="currentColor" /> Watch Now
          </Button>
        </div>

        <button className="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-primary hover:text-white transition-all">
          <Heart size={18} />
        </button>

        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-secondary/90 text-black font-black">
            <Star size={12} className="fill-current mr-1" /> {movie.rating}
          </Badge>
        </div>
      </div>

      <CardContent className="pt-4 px-1">
        <h3 className="font-bold text-lg leading-tight truncate group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">{movie.year} • {movie.genre}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;