import { create } from "zustand";

export const useWishlistStore = create((set, get) => ({
  wishlist: [],

  addToWishlist: (movie) => {
    const exists = get().wishlist.some((m) => m.id === movie.id);
    if (exists) return;

    set((state) => ({
      wishlist: [...state.wishlist, movie],
    }));
  },

  removeFromWishlist: (id) => {
    set((state) => ({
      wishlist: state.wishlist.filter((m) => m.id !== id),
    }));
  },

  toggleWishlist: (movie) => {
    const exists = get().wishlist.some((m) => m.id === movie.id);

    if (exists) {
      get().removeFromWishlist(movie.id);
    } else {
      get().addToWishlist(movie);
    }
  },

  isInWishlist: (id) => {
    return get().wishlist.some((m) => m.id === id);
  },
}));