import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },

  register: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },

  loadUser: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  },
}));