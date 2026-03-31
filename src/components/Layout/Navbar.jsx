import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import {
	Home,
	Clapperboard,
	Heart,
	User,
	Menu,
	X,
	ChevronRight,
	Moon,
	Sun,
	Languages
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo/logoNav.png";
import { useThemeStore } from "@/store/useThemeStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useLangStore } from "@/store/useLangStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { lang, setLang } = useLangStore();
	const { theme, toggleTheme } = useThemeStore();
	const { user } = useAuthStore();
	const usersWishlists = useWishlistStore((state) => state.usersWishlists);

	const wishlist = user ? (usersWishlists[user.email] || []) : [];
	const wishlistCount = wishlist.length;

	const languages = [
		{ id: "en", label: "English", flag: "🇺🇸" },
		{ id: "ar", label: "العربية", flag: "🇪🇬" },
		{ id: "fr", label: "Français", flag: "🇫🇷" },
		{ id: "zh", label: "中国", flag: "🇨🇳" }
	];

	const t = {
		en: { home: "Home", movies: "Movies", wishlist: "Wishlist", account: "Account", menu: "Menu" },
		ar: { home: "الرئيسية", movies: "الأفلام", wishlist: "المفضلة", account: "الحساب", menu: "القائمة" },
		fr: { home: "Accueil", movies: "Films", wishlist: "Favoris", account: "Compte", menu: "Menu" },
		zh: { home: "首页", movies: "电影", wishlist: "收藏夹", account: "账户", menu: "菜单" }
	}[lang];

	return (
		<>
			<nav className="sticky top-0 z-40 flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-md">
				<Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src={logo} alt="CineVibe" className="h-12 w-auto object-contain" />
				</Link>

				<ul className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
					<NavItem to="/" icon={<Home size={18} />} label={t.home} />
					<NavItem to="/movies" icon={<Clapperboard size={18} />} label={t.movies} />
					<NavItem
						to="/wishlist"
						icon={<Heart size={18} fill={wishlistCount > 0 ? "currentColor" : "none"} />}
						label={t.wishlist}
						badgeCount={wishlistCount}
					/>
				</ul>

				<div className="flex items-center gap-2">
					<Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full cursor-pointer transition-transform hover:rotate-12">
						{theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-500" />}
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm" className="gap-2 font-bold cursor-pointer uppercase border border-transparent hover:border-border rounded-xl">
								<Languages size={18} className="text-primary" /> {lang}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-37.5 rounded-2xl p-1 shadow-2xl z-50 bg-muted">
							{languages.map((l) => (
								<DropdownMenuItem
									key={l.id}
									onClick={() => setLang(l.id)}
									className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-colors ${lang === l.id ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted'
										}`}
								>
									<span className="text-lg">{l.flag}</span>
									<span className="text-sm">{l.label}</span>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					<Button asChild className="hidden sm:flex rounded-full px-6 shadow-md shadow-primary/20 cursor-pointer active:scale-95 transition-all">
						<Link to="/account">
							<User size={18} className="me-2" /> {t.account}
						</Link>
					</Button>

					<Button variant="ghost" size="icon" className="md:hidden cursor-pointer" onClick={() => setIsOpen(true)}>
						<Menu size={24} />
					</Button>
				</div>
			</nav>

			{/* Mobile Overlay */}
			<div
				className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
				onClick={() => setIsOpen(false)}
			/>

			<aside
				className={`fixed top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} h-full w-72 bg-background z-50 transition-transform duration-300 ease-in-out shadow-2xl 
                ${isOpen ? "translate-x-0" : lang === 'ar' ? "-translate-x-full" : "translate-x-full"}`}
			>
				<div className="p-5 border-b border-border flex justify-between items-center">
					<span className="font-bold uppercase tracking-widest text-xs text-muted-foreground">{t.menu}</span>
					<Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setIsOpen(false)}>
						<X size={20} />
					</Button>
				</div>

				<div className="p-4 flex flex-col gap-2">
					<MobileNavItem to="/" icon={<Home size={20} />} label={t.home} lang={lang} closeMenu={() => setIsOpen(false)} />
					<MobileNavItem to="/movies" icon={<Clapperboard size={20} />} label={t.movies} lang={lang} closeMenu={() => setIsOpen(false)} />
					<MobileNavItem
						to="/wishlist"
						icon={<Heart size={20} fill={wishlistCount > 0 ? "currentColor" : "none"} />}
						label={t.wishlist}
						lang={lang}
						badgeCount={wishlistCount}
						closeMenu={() => setIsOpen(false)}
					/>

					<div className="mt-6 pt-6 border-t">
						<Button asChild className="w-full justify-start rounded-xl h-12 shadow-lg shadow-primary/10" onClick={() => setIsOpen(false)}>
							<Link to="/account">
								<User size={20} className="me-3" /> {t.account}
							</Link>
						</Button>
					</div>
				</div>
			</aside>
		</>
	);
};

const NavItem = ({ to, icon, label, badgeCount }) => (
	<li>
		<NavLink
			to={to}
			className={({ isActive }) => `
                relative flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl transition-all group
                ${isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted hover:text-foreground"}
            `}
		>
			<div className="relative">
				{icon}
				{badgeCount > 0 && (
					<span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm border-2 border-background animate-in zoom-in">
						{badgeCount}
					</span>
				)}
			</div>
			<span className="text-sm font-semibold">{label}</span>
		</NavLink>
	</li>
);

const MobileNavItem = ({ to, icon, label, lang, badgeCount, closeMenu }) => (
	<NavLink
		to={to}
		onClick={closeMenu}
		className={({ isActive }) => `
            flex items-center justify-between p-4 rounded-2xl transition-all group
            ${isActive ? "bg-primary/10 text-primary shadow-sm" : "hover:bg-muted text-foreground"}
        `}
	>
		<div className="flex items-center gap-4">
			<div className={`${badgeCount > 0 ? 'text-primary' : ''}`}>{icon}</div>
			<span className="font-semibold text-sm">{label}</span>
		</div>

		<div className="flex items-center gap-2">
			{badgeCount > 0 ? (
				<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
					{badgeCount}
				</span>
			) : (
				<ChevronRight size={18} className={`${lang === 'ar' ? 'rotate-180' : ''} opacity-20 group-hover:opacity-100 transition-all`} />
			)}
		</div>
	</NavLink>
);

export default Navbar;
