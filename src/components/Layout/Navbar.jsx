import React, { useState } from "react";
import { Search, Home, Clapperboard, Heart, User, Menu, X, ChevronRight, Moon, Sun, Languages } from "lucide-react";
import logo from "@/assets/logo/logoNav.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [lang, setLang] = useState("EN");

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle("dark");
    };

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
                <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                    <img src={logo} alt="CineVibe" className="h-12 w-auto" />
                </div>

                <ul className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
                    <NavItem icon={<Home size={18} />} label={t.home} active />
                    <NavItem icon={<Clapperboard size={18} />} label={t.movies} />
                    <NavItem icon={<Heart size={18} />} label={t.wishlist} />
                </ul>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted cursor-pointer">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={toggleLang} className="p-2 rounded-lg hover:bg-muted font-bold text-xs cursor-pointer flex items-center gap-1">
                        <Languages size={18} /> {lang}
                    </button>
                    <button className="hidden sm:flex items-center space-x-2 px-5 py-2 rounded-full bg-primary text-primary-foreground font-bold shadow-lg shadow-(--primary)/20">
                        <User size={18} /> <span>{t.account}</span>
                    </button>
                    <button onClick={() => setIsOpen(true)} className="p-2 md:hidden hover:bg-muted rounded-lg cursor-pointer">
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsOpen(false)} />
            <aside className={`fixed top-0 ${lang === 'EN' ? 'right-0' : 'left-0'} h-full w-72 bg-background z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : lang === 'EN' ? "translate-x-full" : "-translate-x-full"}`}>
                <div className="p-5 border-b border-border flex justify-between items-center">
                    <span className="font-bold">Menu</span>
                    <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
                </div>
                <div className="p-4 flex flex-col gap-2">
                    <MobileNavItem icon={<Home size={20} />} label={t.home} active lang={lang} />
                    <MobileNavItem icon={<Clapperboard size={20} />} label={t.movies} lang={lang} />
                    <MobileNavItem icon={<Heart size={20} />} label={t.wishlist} lang={lang} />
                </div>
            </aside>
        </>
    );
};

const NavItem = ({ icon, label, active }) => (
    <li className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl cursor-pointer ${active ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"}`}>
        {icon} <span className="text-sm font-medium">{label}</span>
    </li>
);

const MobileNavItem = ({ icon, label, active, lang }) => (
    <div className={`flex items-center justify-between p-3 rounded-xl ${active ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}>
        <div className="flex items-center gap-3">{icon} {label}</div>
        <ChevronRight size={16} className={lang === 'AR' ? 'rotate-180' : ''} />
    </div>
);

export default Navbar;