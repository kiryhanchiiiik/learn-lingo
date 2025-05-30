import type { RootState } from "../store";

export const selectFavorite = (state: RootState) => state.favorites.items;
