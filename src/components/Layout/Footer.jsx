import React from "react";
import { Link } from "react-router";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo/logoNav.png";
import { useLangStore } from "@/store/useLangStore";

const TwitterIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.95-5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const InstagramIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);

const GithubIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);

const Footer = () => {
    const { lang } = useLangStore();

    const t = {
        en: {
            desc: "The best place to discover and track your cinematic journey.",
            movies: "Movies",
            trending: "Trending",
            topRated: "Top Rated",
            upcoming: "Upcoming",
            support: "Support",
            help: "Help Center",
            privacy: "Privacy Policy",
            connect: "Connect",
            rights: "© 2026 CineVibe. Designed with ❤️ for Movie Lovers."
        },
        ar: {
            desc: "أفضل مكان لاكتشاف وتتبع رحلتك السينمائية.",
            movies: "الأفلام",
            trending: "الأكثر تداولاً",
            topRated: "الأعلى تقييماً",
            upcoming: "قادم قريباً",
            support: "الدعم",
            help: "مركز المساعدة",
            privacy: "سياسة الخصوصية",
            connect: "تواصل معنا",
            rights: "© 2026 CineVibe. صُمم بـ ❤️ لعشاق السينما."
        },
        fr: {
            desc: "Le meilleur endroit pour découvrir et suivre votre parcours cinématographique.",
            movies: "Films",
            trending: "Tendances",
            topRated: "Mieux notés",
            upcoming: "À venir",
            support: "Support",
            help: "Centre d'aide",
            privacy: "Confidentialité",
            connect: "Connecter",
            rights: "© 2026 CineVibe. Conçu avec ❤️ pour les cinéphiles."
        },
        zh: {
            desc: "探索和追踪您电影之旅的最佳场所。",
            movies: "电影",
            trending: "趋势",
            topRated: "最高评分",
            upcoming: "即将上映",
            support: "支持",
            help: "帮助中心",
            privacy: "隐私政策",
            connect: "联系我们",
            rights: "© 2026 CineVibe. 为影迷精心打造 ❤️"
        }
    }[lang];

    return (
        <footer className="border-t border-border bg-muted/5 pt-12 pb-6 mt-auto">
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                    <div className="space-y-4 text-center md:text-start">
                        <Link to="/" className="flex items-center justify-center md:justify-start gap-2">
                            <img src={logo} alt="CineVibe" className="h-14 w-auto object-contain" />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {t.desc}
                        </p>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-foreground">{t.movies}</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li><Link to="/trending" className="hover:text-primary transition-colors">{t.trending}</Link></li>
                            <li><Link to="/top-rated" className="hover:text-primary transition-colors">{t.topRated}</Link></li>
                            <li><Link to="/upcoming" className="hover:text-primary transition-colors">{t.upcoming}</Link></li>
                        </ul>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-foreground">{t.support}</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li><Link to="/help" className="hover:text-primary transition-colors">{t.help}</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">{t.privacy}</Link></li>
                        </ul>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-foreground">{t.connect}</h4>
                        <div className="flex justify-center md:justify-start gap-3">
                            <SocialBtn icon={<TwitterIcon size={18} />} href="https://twitter.com" />
                            <SocialBtn icon={<InstagramIcon size={18} />} href="https://instagram.com" />
                            <SocialBtn icon={<GithubIcon size={18} />} href="https://github.com" />
                            <SocialBtn icon={<Mail size={18} />} href="mailto:contact@cinevibe.com" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/50 pt-6 text-center">
                    <p className="text-xs text-muted-foreground tracking-wide">
                        {t.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
};

const SocialBtn = ({ icon, href }) => (
    <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary transition-all active:scale-90" asChild>
        <a href={href} target="_blank" rel="noreferrer">
            {icon}
        </a>
    </Button>
);

export default Footer;