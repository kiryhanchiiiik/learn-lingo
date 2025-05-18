import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../api/firebase.ts";
import type { AppDispatch } from "../store";
import { setUser, setLoading, setError, clearUser } from "./authSlice";

export const registerUser =
  (email: string, password: string, name: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

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
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      };

      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(setUser(userData));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    await signOut(auth);
    localStorage.removeItem("user");
    dispatch(clearUser());
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
