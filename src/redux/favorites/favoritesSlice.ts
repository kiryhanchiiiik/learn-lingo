import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Teacher {
  avatar_url: string;
  name: string;
  surname: string;
  lessons_done: number;
  rating: number;
  price_per_hour: number;
  languages: string;
  lesson_info: string;
  conditions: string;
  moreInfo: string;
  reviews: Review[];
  levels: string[];
}

interface FavoritesState {
  items: Teacher[];
}

const loadFromLocalStorage = (): Teacher[] => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

const saveToLocalStorage = (items: Teacher[]) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save favorites", e);
  }
};

const initialState: FavoritesState = {
  items: loadFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Teacher>) {
      const exists = state.items.find(
        (t) =>
          t.name === action.payload.name && t.surname === action.payload.surname
      );
      if (!exists) {
        state.items.push(action.payload);
        saveToLocalStorage(state.items);
      }
    },
    removeFavorite(state, action: PayloadAction<Teacher>) {
      state.items = state.items.filter(
        (t) =>
          !(
            t.name === action.payload.name &&
            t.surname === action.payload.surname
          )
      );
      saveToLocalStorage(state.items);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
