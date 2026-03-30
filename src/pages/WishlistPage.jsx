import { Heart, Trash2, Star, CalendarDays, Globe, Clapperboard } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useNavigate } from "react-router-dom";
import { useLangStore } from "@/store/useLangStore"; 
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notify } from "@/services/notification";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlistStore();
    const navigate = useNavigate();
    const { lang } = useLangStore(); 
    const t = {
        en: {
            emptyTitle: "Your wishlist is empty",
            emptyDesc: "Start adding movies you love by tapping the",
            emptyDescSuffix: "on any movie card.",
            browseBtn: "Browse Movies",
            pageTitle: "My Wishlist",
            pageDesc: "All the movies you've saved for later",
            removeMsg: "removed from wishlist",
            viewDetails: "View Details",
            savedBadge: "Saved",
            removeTitle: "Remove from wishlist"
        },
        ar: {
            emptyTitle: "قائمة المفضلة فارغة",
            emptyDesc: "ابدأ بإضافة الأفلام التي تحبها من خلال الضغط على",
            emptyDescSuffix: "في أي كارت فيلم.",
            browseBtn: "تصفح الأفلام",
            pageTitle: "مفضلتي",
            pageDesc: "جميع الأفلام التي حفظتها لمشاهدتها لاحقاً",
            removeMsg: "تمت إزالته من المفضلة",
            viewDetails: "عرض التفاصيل",
            savedBadge: "محفوظ",
            removeTitle: "إزالة من المفضلة"
        },
        fr: {
            emptyTitle: "Votre liste est vide",
            emptyDesc: "Commencez à ajouter des films en appuyant sur le",
            emptyDescSuffix: "sur n'importe quelle carte.",
            browseBtn: "Parcourir les films",
            pageTitle: "Ma Liste",
            pageDesc: "Tous les films que vous avez enregistrés",
            removeMsg: "supprimé de la liste",
            viewDetails: "Voir les détails",
            savedBadge: "Enregistré",
            removeTitle: "Retirer de la liste"
        },
        zh: {
            emptyTitle: "您的收藏夹是空的",
            emptyDesc: "点击任何电影卡上的",
            emptyDescSuffix: "开始添加您喜欢的电影。",
            browseBtn: "浏览电影",
            pageTitle: "我的收藏",
            pageDesc: "您保存供以后观看的所有电影",
            removeMsg: "已从收藏夹中移除",
            viewDetails: "查看详情",
            savedBadge: "已保存",
            removeTitle: "从收藏夹中移除"
        }
    }[lang];

    const handleRemove = (e, movie) => {
        e.stopPropagation();
        removeFromWishlist(movie.id);
        notify.error(`${movie.title} ${t.removeMsg} ❌`);
    };

    if (wishlist.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-6">
                <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20 animate-pulse">
                        <Heart size={52} className="text-primary" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-foreground">{t.emptyTitle}</h2>
                    <p className="text-muted-foreground max-w-sm">
                        {t.emptyDesc}&nbsp;
                        <Heart size={14} className="inline text-primary" fill="currentColor" />
                        &nbsp;{t.emptyDescSuffix}
                    </p>
                </div>
                <button
                    onClick={() => navigate("/movies")}
                    className="flex items-center bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-full shadow-md shadow-primary/20 gap-2 transition-all active:scale-95 font-bold"
                >
                    <Clapperboard size={18} />
                    {t.browseBtn}
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 md:p-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground flex items-center gap-4">
                        {t.pageTitle}
                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-primary text-primary-foreground text-base font-black shadow-lg shadow-primary/30 rotate-3 group-hover:rotate-0 transition-transform">
                            {wishlist.length}
                        </span>
                    </h1>
                    <p className="text-muted-foreground font-medium italic opacity-80">
                        {t.pageDesc}
                    </p>
                </div>
                <div className="h-1.5 w-24 bg-linear-to-r from-primary to-transparent rounded-full hidden md:block" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {wishlist.map((movie) => (
                    <WishlistCard
                        key={movie.id}
                        movie={movie}
                        onRemove={handleRemove}
                        onNavigate={() => navigate(`/movie/${movie.id}`)}
                        t={t} 
                        lang={lang}
                    />
                ))}
            </div>
        </div>
    );
}

function WishlistCard({ movie, onRemove, onNavigate, t, lang }) {
    return (
        <div
            onClick={onNavigate}
            className="group relative overflow-hidden border-none bg-transparent transition-all duration-500 hover:-translate-y-2.5 cursor-pointer"
        >
            {/* Poster Section */}
            <div className="relative aspect-2/3 overflow-hidden rounded-4xl bg-muted shadow-xl ring-1 ring-black/5 transition-all duration-500 group-hover:shadow-primary/20 group-hover:ring-primary/30">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-5 transition-all duration-300">
                    <Button
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); onNavigate(); }}
                        className="w-full gap-2 font-black rounded-xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                        {t.viewDetails}
                    </Button>
                </div>

                {/* Remove button */}
                <button
                    onClick={(e) => onRemove(e, movie)}
                    className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} p-3 rounded-2xl backdrop-blur-md bg-destructive/90 text-white shadow-lg transition-all duration-300 z-20 active:scale-75 hover:bg-destructive hover:scale-110`}
                    title={t.removeTitle}
                >
                    <Trash2 size={18} />
                </button>

                {/* Saved badge */}
                <div className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} pointer-events-none`}>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-black uppercase tracking-wider">
                        <Heart size={10} fill="currentColor" />
                        {t.savedBadge}
                    </span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-20 left-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                    <Badge className="bg-yellow-400 text-black font-black flex items-center gap-1 px-2.5 py-1 rounded-lg border-none">
                        <Star size={12} className="fill-current" />
                        {movie.vote_average?.toFixed(1) || "0.0"}
                    </Badge>
                </div>
            </div>

            {/* Info Section */}
            <div className="pt-5 px-1 space-y-2">
                <h3 className="font-black text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {movie.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-bold opacity-70">
                    <div className="flex items-center gap-1">
                        <CalendarDays size={14} className="text-primary/60" />
                        <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                    </div>
                    <span className="text-primary/30">•</span>
                    <div className="flex items-center gap-1">
                        <Globe size={14} className="text-primary/60" />
                        <span className="uppercase">{movie.original_language || "en"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}