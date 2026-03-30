import { Heart, Trash2, Star, CalendarDays, Globe, Clapperboard } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notify } from "@/services/notification";

export default function WishlistPage() {
	const { wishlist, removeFromWishlist } = useWishlistStore();
	const navigate = useNavigate();

	const handleRemove = (e, movie) => {
		e.stopPropagation();
		removeFromWishlist(movie.id);
		notify.error(`${movie.title} removed from wishlist ❌`);
	};

	// Empty State 
	if (wishlist.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-6">
				<div className="relative">
					<div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20 animate-pulse">
						<Heart size={52} className="text-primary" />
					</div>
				</div>
				<div className="space-y-2">
					<h2 className="text-3xl font-black text-foreground">Your wishlist is empty</h2>
					<p className="text-muted-foreground max-w-sm">
						Start adding movies you love by tapping the&nbsp;
						<Heart size={14} className="inline text-primary" fill="currentColor" />
						&nbsp;on any movie card.
					</p>
				</div>
				<Button
					onClick={() => navigate("/movies")}
					className="rounded-full px-8 shadow-md shadow-primary/20 gap-2"
				>
					<Clapperboard size={18} />
					Browse Movies
				</Button>
			</div>
		);
	}

	// Filled State 
	return (
		<div className="container mx-auto p-6 md:p-10">
			{/* Header */}
			<div className="flex items-center justify-between mb-10">
				<div>
					<h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
						My Wishlist
						<span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary text-primary-foreground text-base font-bold shadow-md shadow-primary/30">
							{wishlist.length}
						</span>
					</h1>
					<p className="text-muted-foreground mt-2 font-medium">
						All the movies you've saved for later
					</p>
				</div>
				<div className="h-1 w-20 bg-primary rounded-full hidden md:block" />
			</div>

			{/* Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
				{wishlist.map((movie) => (
					<WishlistCard
						key={movie.id}
						movie={movie}
						onRemove={handleRemove}
						onNavigate={() => navigate(`/movie/${movie.id}`)}
					/>
				))}
			</div>
		</div>
	);
}

// Wishlist Card 
function WishlistCard({ movie, onRemove, onNavigate }) {
	return (
		<div
			onClick={onNavigate}
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
						onClick={(e) => { e.stopPropagation(); onNavigate(); }}
						className="w-full gap-2 font-bold shadow-lg"
					>
						View Details
					</Button>
				</div>

				{/* Remove button */}
				<button
					onClick={(e) => onRemove(e, movie)}
					className="absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md bg-primary text-primary-foreground shadow-md shadow-primary/40 transition-all duration-300 z-20 active:scale-90 hover:bg-destructive hover:shadow-destructive/40"
					title="Remove from wishlist"
				>
					<Trash2 size={16} />
				</button>

				{/* Filled heart badge (top-left) */}
				<div className="absolute top-3 left-3 pointer-events-none">
					<span className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/90 text-primary-foreground text-[11px] font-bold">
						<Heart size={11} fill="currentColor" />
						Saved
					</span>
				</div>

				{/* Rating */}
				<div className="absolute bottom-16 left-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<Badge className="bg-yellow-500/90 text-black font-bold flex items-center gap-1 px-2 py-1 rounded-md">
						<Star size={12} className="fill-current" />
						{movie.vote_average?.toFixed(1) || "N/A"}
					</Badge>
				</div>
			</div>

			{/* Info */}
			<div className="pt-4 px-2 space-y-2">
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
			</div>
		</div>
	);
}
