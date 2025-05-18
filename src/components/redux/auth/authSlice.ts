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
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: { payload: AuthUser | null }) => {
      state.user = action.payload;
      state.loading = false;
      state.isLoading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
