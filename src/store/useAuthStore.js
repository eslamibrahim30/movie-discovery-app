import { create } from "zustand";
import { SESSION_KEY } from "@/lib/constants";

export const useAuthStore = create((set) => ({
  // Initialize state from localStorage immediately
  user: JSON.parse(localStorage.getItem(SESSION_KEY)) || null,
  isAuthenticated: !!localStorage.getItem(SESSION_KEY),

  login: (userData) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
    set({ user: null, isAuthenticated: false });
  },

  // loadUser is now technically redundant but kept for safety
  loadUser: () => {
    const storedUser = localStorage.getItem(SESSION_KEY);
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isAuthenticated: true });
    }
  },
}));