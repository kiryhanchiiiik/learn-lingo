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

const saveToLocalStorage = (email: string, items: Teacher[]) => {
  try {
    localStorage.setItem(`favorites_${email}`, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save favorites", e);
  }
};

const initialState: FavoritesState = {
  items: [],
};

interface AddFavoritePayload {
  teacher: Teacher;
  email: string;
}

interface RemoveFavoritePayload {
  teacher: Teacher;
  email: string;
}

interface SetFavoritesPayload {
  items: Teacher[];
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<SetFavoritesPayload>) {
      state.items = action.payload.items;
    },
    clearFavorites(state) {
      state.items = [];
    },
    addFavorite(state, action: PayloadAction<AddFavoritePayload>) {
      const { teacher, email } = action.payload;
      const exists = state.items.find(
        (t) => t.name === teacher.name && t.surname === teacher.surname
      );
      if (!exists) {
        state.items.push(teacher);
        saveToLocalStorage(email, state.items);
      }
    },
    removeFavorite(state, action: PayloadAction<RemoveFavoritePayload>) {
      const { teacher, email } = action.payload;
      state.items = state.items.filter(
        (t) => !(t.name === teacher.name && t.surname === teacher.surname)
      );
      saveToLocalStorage(email, state.items);
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
