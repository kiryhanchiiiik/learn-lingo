import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDelayedLoader } from "./hooks/useDelayedLoader";
import type { RootState } from "./redux/store";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import useAuthListener from "./hooks/useAuthListener";
import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import "./App.scss";

function App() {
  useAuthListener();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const showLoader = useDelayedLoader(isLoading, 700);

  const location = useLocation();

  useEffect(() => {
    const root = document.getElementById("root");

    if (!root) return;

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
      </Routes>
    </div>
  );
}

export default App;
