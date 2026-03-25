import React from "react";
import { Link } from "react-router-dom"; 
import { Twitter, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import logo from "@/assets/logo/logoNav.png";

const Footer = () => {
    return (
        <footer className="border-t border-border bg-muted/5 pt-12 pb-6 mt-auto">
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                    <div className="space-y-4 text-center md:text-start">
                        <Link to="/" className="flex items-center justify-center md:justify-start gap-2">
                            <img src={logo} alt="CineVibe" className="h-18 w-auto" />
                            
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            The best place to discover and track your cinematic journey.
                        </p>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-sm mb-4 uppercase tracking-tighter">Movies</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li><Link title="Trending" to="/trending" className="hover:text-primary transition-colors">Trending</Link></li>
                            <li><Link title="Top Rated" to="/top-rated" className="hover:text-primary transition-colors">Top Rated</Link></li>
                            <li><Link title="Upcoming" to="/upcoming" className="hover:text-primary transition-colors">Upcoming</Link></li>
                        </ul>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-sm mb-4 uppercase tracking-tighter">Support</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-sm mb-4 uppercase tracking-tighter">Connect</h4>
                        <div className="flex justify-center md:justify-start gap-2">
                            <SocialBtn icon={<Twitter size={18} />} href="https://twitter.com" />
                            <SocialBtn icon={<Instagram size={18} />} href="https://instagram.com" />
                            <SocialBtn icon={<Github size={18} />} href="https://github.com" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/50 pt-6 text-center">
                    <p className="text-xs text-muted-foreground">© 2026 CineVibe. Designed with ❤️ for Movie Lovers.</p>
                </div>
            </div>
        </footer>
    );
};

const SocialBtn = ({ icon, href }) => (
    <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary transition-all" asChild>
        <a href={href} target="_blank" rel="noreferrer">
            {icon}
        </a>
    </Button>
);

export default Footer;