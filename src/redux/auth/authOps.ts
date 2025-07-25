import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../api/firebase";
import type { AppDispatch, RootState } from "../store";
import { setUser, setLoading, clearUser } from "./authSlice";
import { clearFavorites } from "../favorites/favoritesSlice";

export const registerUser =
  (email: string, password: string, name: string) =>
  async (dispatch: AppDispatch) => {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }

    const user = userCred.user;

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    };

    dispatch(setUser(userData));

    return userData;
  };

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
    };

    localStorage.setItem("user", JSON.stringify(userData));

    dispatch(setUser(userData));

    return userData;
  };

export const logoutUser =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setLoading(true));

      await signOut(auth);

      const state = getState();
      const userEmail = state.auth.user?.email;
      if (userEmail) {
        localStorage.removeItem(`favorites_${userEmail}`);
      }

      localStorage.removeItem("user");
      dispatch(clearUser());
      dispatch(clearFavorites());
    } finally {
      dispatch(setLoading(false));
    }
  };
