import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const { theme } = useThemeStore();

  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser(); // Check localStorage for an active session on boot
  }, [loadUser]);

  return (
    <div
      className={`min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 ${theme === "dark" ? "dark" : ""}`}
    >
      <Toaster position="top-right" />
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
