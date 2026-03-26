import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
            <Navbar />

            <main className="grow container mx-auto px-4 py-8 md:px-8 lg:px-12">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;