import React from "react";
import { Twitter, Instagram, Github, Mail } from "lucide-react";
import logo from "@/assets/logo/logoNav.png";

const Footer = () => {
    return (
        <footer className="border-t border-border bg-muted/5 pt-12 pb-6 mt-auto">
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                    <div className="space-y-4 text-center md:text-start">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <img src={logo} alt="CineVibe" className="h-7 w-auto" />
                            <span className="text-xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">CineVibe</span>
                        </div>
                        <p className="text-sm text-muted-foreground">The best place to discover and track your cinematic journey.</p>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-sm mb-4 uppercase tracking-tighter">Movies</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li className="hover:text-primary cursor-pointer">Trending</li>
                            <li className="hover:text-primary cursor-pointer">Top Rated</li>
                            <li className="hover:text-primary cursor-pointer">Upcoming</li>
                        </ul>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-sm mb-4 uppercase tracking-tighter">Support</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li className="hover:text-primary cursor-pointer">Help Center</li>
                            <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
                        </ul>
                    </div>

                    <div className="text-center md:text-start">
                        <h4 className="font-bold text-sm mb-4 uppercase tracking-tighter">Connect</h4>
                        <div className="flex justify-center md:justify-start gap-4">
                            <SocialBtn icon={<Twitter size={18} />} />
                            <SocialBtn icon={<Instagram size={18} />} />
                            <SocialBtn icon={<Github size={18} />} />
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

const SocialBtn = ({ icon }) => (
    <button className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all cursor-pointer">
        {icon}
    </button>
);

export default Footer;