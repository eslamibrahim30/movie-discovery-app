import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
	persist(
		(set, get) => ({
			usersWishlists: {},

			addToWishlist: (movie, userEmail) => {
				const currentList = get().usersWishlists[userEmail] || [];
				const exists = currentList.some((m) => m.id === movie.id);
				if (exists) return;

				set((state) => ({
					usersWishlists: {
						...state.usersWishlists,
						[userEmail]: [...currentList, movie],
					},
				}));
			},

			removeFromWishlist: (id, userEmail) => {
				const currentList = get().usersWishlists[userEmail] || [];
				set((state) => ({
					usersWishlists: {
						...state.usersWishlists,
						[userEmail]: currentList.filter((m) => m.id !== id),
					},
				}));
			},

			toggleWishlist: (movie, userEmail) => {
				const currentList = get().usersWishlists[userEmail] || [];
				const exists = currentList.some((m) => m.id === movie.id);

				if (exists) {
					get().removeFromWishlist(movie.id, userEmail);
					return false;
				} else {
					get().addToWishlist(movie, userEmail);
					return true;
				}
			},

			isInWishlist: (id, userEmail) => {
				if (!userEmail) return false;
				const currentList = get().usersWishlists[userEmail] || [];
				return currentList.some((m) => m.id === id);
			},
		}),
		{
			name: "wishlist-storage",
		}
	)
);