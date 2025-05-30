import { createSlice } from "@reduxjs/toolkit";

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: { payload: AuthUser | null }) => {
      state.user = action.payload;
      state.loading = false;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.isLoading = false;
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
