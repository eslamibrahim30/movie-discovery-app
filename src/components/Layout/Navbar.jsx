import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home, Clapperboard, Heart, User, Menu, X, ChevronRight, Moon, Sun, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo/logoNav.png";
import { useThemeStore } from "@/store/useThemeStore";
import { useWishlistStore } from "@/store/useWishlistStore";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [lang, setLang] = useState("EN");
	const { theme, toggleTheme } = useThemeStore();
	const wishlist = useWishlistStore((state) => state.wishlist);
	const wishlistCount = wishlist.length;

	const toggleLang = () => {
		const newLang = lang === "EN" ? "AR" : "EN";
		setLang(newLang);
		document.documentElement.dir = newLang === "AR" ? "rtl" : "ltr";
	};

	const t = {
		EN: { home: "Home", movies: "Movies", wishlist: "Wishlist", account: "Account" },
		AR: { home: "الرئيسية", movies: "الأفلام", wishlist: "المفضلة", account: "الحساب" }
	}[lang];

	return (
		<>
			<nav className="sticky top-0 z-40 flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-md">
				<Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src={logo} alt="CineVibe" className="h-12 w-auto" />
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
					<Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full cursor-pointer">
						{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
					</Button>

					<Button variant="ghost" size="sm" onClick={toggleLang} className="gap-1 font-bold cursor-pointer">
						<Languages size={18} /> {lang}
					</Button>

					<Button asChild className="hidden sm:flex rounded-full px-6 shadow-md shadow-primary/20 cursor-pointer">
						<Link to="/account">
							<User size={18} className="me-2" /> {t.account}
						</Link>
					</Button>

					<Button variant="ghost" size="icon" className="md:hidden cursor-pointer" onClick={() => setIsOpen(true)}>
						<Menu size={24} />
					</Button>
				</div>
			</nav>

			<div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsOpen(false)} />

			{/* Sidebar (Mobile) */}
			<aside className={`fixed top-0 ${lang === 'EN' ? 'right-0' : 'left-0'} h-full w-72 bg-background z-50 transition-transform duration-300 shadow-2xl ${isOpen ? "translate-x-0" : lang === 'EN' ? "translate-x-full" : "-translate-x-full"}`}>
				<div className="p-5 border-b border-border flex justify-between items-center">
					<span className="font-bold uppercase tracking-widest text-sm">Menu</span>
					<Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => setIsOpen(false)}>
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

					<div className="mt-4 pt-4 border-t sm:hidden">
						<Button asChild className="w-full justify-start rounded-xl cursor-pointer" onClick={() => setIsOpen(false)}>
							<Link to="/account"><User size={20} className="me-2" /> {t.account}</Link>
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
					<span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm border border-background">
						{badgeCount}
					</span>
				)}
			</div>
			<span className="text-sm font-medium">{label}</span>
		</NavLink>
	</li>
);

const MobileNavItem = ({ to, icon, label, lang, badgeCount, closeMenu }) => (
	<NavLink
		to={to}
		onClick={closeMenu}
		className={({ isActive }) => `
            flex items-center justify-between p-3 rounded-xl transition-colors group
            ${isActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}
        `}
	>
		<div className="flex items-center gap-3">
			{icon}
			<span className="font-medium">{label}</span>
		</div>

		<div className="flex items-center gap-2">
			{badgeCount > 0 ? (
				<span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
					{badgeCount}
				</span>
			) : (
				<ChevronRight size={16} className={`${lang === 'AR' ? 'rotate-180' : ''} opacity-30 group-hover:opacity-100 transition-opacity`} />
			)}
		</div>
	</NavLink>
);

export default Navbar;
