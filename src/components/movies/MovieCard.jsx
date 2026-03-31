import { Heart, Star, Play, CalendarDays, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import { notify } from "@/services/notification";
import { useLangStore } from "@/store/useLangStore";

const MovieCard = ({ movie }) => {
	const navigate = useNavigate();
	const { toggleWishlist, usersWishlists } = useWishlistStore();
	const { user } = useAuthStore();
	const { lang } = useLangStore();

	const t = {
		en: { watchNow: "Watch Now", added: "Added to wishlist ❤️", removed: "Removed from wishlist ❌" },
		ar: { watchNow: "شاهد الآن", added: "أُضيف إلى المفضلة ❤️", removed: "أُزيل من المفضلة ❌" },
		fr: { watchNow: "Regarder", added: "Ajouté aux favoris ❤️", removed: "Supprimé des favoris ❌" },
		zh: { watchNow: "立即观看", added: "已添加到收藏夹 ❤️", removed: "已从收藏夹中移除 ❌" },
	}[lang];

	if (!movie || !movie.id) return null;

	const userWishlist = user ? (usersWishlists[user.email] || []) : [];
	const inWishlist = userWishlist.some((m) => m.id === movie.id);

	const handleWishlistClick = (e) => {
		e.stopPropagation();

		if (!user) {
			navigate("/login");
			return;
		}

		const isAdded = toggleWishlist(movie, user.email);

		if (!isAdded) {
			notify.error(`${movie.title} ${t.removed}`);
		} else {
			notify.success(`${movie.title} ${t.added}`);
		}
	};

	return (
		<Card
			onClick={() => navigate(`/movie/${movie.id}`)}
			className="group relative overflow-hidden border-none bg-transparent transition-all duration-500 hover:-translate-y-2.5 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
		>
			{/* Poster */}
			<div className="relative aspect-2/3 overflow-hidden rounded-2xl bg-muted shadow-lg ring-1 ring-white/10 transition-all duration-500 group-hover:ring-primary/40">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
					className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
					loading="lazy"
				/>

				{/* Overlay */}
				<div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition-all duration-300">
					<Button
						aria-label={`Watch ${movie.title}`}
						title={`Watch ${movie.title}`}
						size="sm"
						onClick={(e) => {
							e.stopPropagation();
							navigate(`/movie/${movie.id}`);
						}}
						className="w-full gap-2 font-bold shadow-lg"
					>
						<Play size={16} />
						{t.watchNow}
					</Button>
				</div>

				<button
					aria-label="Add to wishlist"
					title="Add to wishlist"
					onClick={handleWishlistClick}
					className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-20 active:scale-90 ${inWishlist
							? "bg-primary text-primary-foreground shadow-primary/40"
							: "bg-black/30 text-white hover:bg-primary hover:text-primary-foreground"
						}`}
				>
					<Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
				</button>

				<div className="absolute top-3 left-3 pointer-events-none">
					<Badge className="bg-yellow-500/90 text-black font-bold flex items-center gap-1 px-2 py-1 rounded-md">
						<Star size={12} className="fill-current" />
						{movie.vote_average?.toFixed(1) || "N/A"}
					</Badge>
				</div>
			</div>

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