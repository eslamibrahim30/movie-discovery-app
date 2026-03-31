import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", 
        });
    };

    if (!isVisible) return null;

    return (
        <Button
            size="icon"
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg animate-in fade-in zoom-in duration-300 bg-primary hover:scale-110 active:scale-95 transition-all"
            aria-label="Back to top"
        >
            <ChevronUp size={24} />
        </Button>
    );
};

export default BackToTop;