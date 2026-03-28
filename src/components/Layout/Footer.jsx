import React from "react";
import { Link } from "react-router-dom"; 
import { Twitter, Instagram, Github, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import logo from "@/assets/logo/logoNav.png";

const Footer = ({ lang = "EN" }) => {
    const t = {
        EN: {
            desc: "The best place to discover and track your cinematic journey.",
            movies: "Movies",
            support: "Support",
            connect: "Connect",
            trending: "Trending",
            topRated: "Top Rated",
            upcoming: "Upcoming",
            help: "Help Center",
            privacy: "Privacy Policy",
            rights: "All rights reserved.",
            madeWith: "Designed with"
        },
        AR: {
            desc: "المكان الأفضل لاكتشاف وتتبع رحلتك السينمائية.",
            movies: "الأفلام",
            support: "الدعم",
            connect: "تواصل معنا",
            trending: "الأكثر رواجاً",
            topRated: "الأعلى تقييماً",
            upcoming: "قريباً",
            help: "مركز المساعدة",
            privacy: "سياسة الخصوصية",
            rights: "جميع الحقوق محفوظة.",
            madeWith: "صنع بـ"
        }
    }[lang];

    return (
        <footer className="border-t border-border bg-muted/30 pt-16 pb-8 mt-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">

                    <div className="space-y-5 text-center md:text-start flex flex-col items-center md:items-start">
                        <Link to="/" className="transition-opacity hover:opacity-80">
                            <img src={logo} alt="CineVibe" className="h-14 w-auto object-contain" />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            {t.desc}
                        </p>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-xs mb-6 uppercase tracking-[0.2em] text-foreground/70">
                            {t.movies}
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-3">
                            <FooterLink to="/trending">{t.trending}</FooterLink>
                            <FooterLink to="/top-rated">{t.topRated}</FooterLink>
                            <FooterLink to="/upcoming">{t.upcoming}</FooterLink>
                        </ul>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-xs mb-6 uppercase tracking-[0.2em] text-foreground/70">
                            {t.support}
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-3">
                            <FooterLink to="/help">{t.help}</FooterLink>
                            <FooterLink to="/privacy">{t.privacy}</FooterLink>
                        </ul>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-xs mb-6 uppercase tracking-[0.2em] text-foreground/70">
                            {t.connect}
                        </h4>
                        <div className="flex justify-center md:justify-start gap-3">
                            <SocialBtn icon={<Twitter size={18} />} href="https://twitter.com" />
                            <SocialBtn icon={<Instagram size={18} />} href="https://instagram.com" />
                            <SocialBtn icon={<Github size={18} />} href="https://github.com" />
                            <SocialBtn icon={<Mail size={18} />} href="mailto:contact@cinevibe.com" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] text-muted-foreground tracking-wide font-medium">
                        © 2026 CineVibe. {t.rights}
                    </p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                        {t.madeWith} <Heart size={12} className="text-red-500 fill-current animate-pulse" /> CineVibe Team
                    </p>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ to, children }) => (
    <li>
        <Link 
            to={to} 
            className="transition-all duration-300 hover:text-primary hover:ps-1 inline-block"
        >
            {children}
        </Link>
    </li>
);

const SocialBtn = ({ icon, href }) => (
    <Button 
        variant="secondary" 
        size="icon" 
        className="rounded-full w-9 h-9 bg-muted hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
        asChild
    >
        <a href={href} target="_blank" rel="noreferrer">
            {icon}
        </a>
    </Button>
);

export default Footer;