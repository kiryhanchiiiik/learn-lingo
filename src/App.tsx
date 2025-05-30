import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDelayedLoader } from "./hooks/useDelayedLoader";
import type { RootState } from "./redux/store";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import useAuthListener from "./hooks/useAuthListener";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./ProtectedRoute";
import "./App.scss";
import InitFavorites from "./components/InitFavorites/InitFavorites";

function App() {
  useAuthListener();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const showLoader = useDelayedLoader(isLoading, 700);

  const location = useLocation();

  useEffect(() => {
    const root = document.getElementById("root")!;

    if (location.pathname === "/teachers") {
      root.classList.add("teacher-bg");
    } else {
      root.classList.remove("teacher-bg");
    }
  }, [location.pathname]);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <div className="container">
      <InitFavorites />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute
              component={<FavoritesPage />}
              redirectTo="/"
            ></ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
