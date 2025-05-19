import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDelayedLoader } from "./components/hooks/useDelayedLoader";
import type { RootState } from "./redux/store";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import useAuthListener from "./components/hooks/useAuthListener";
import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./ProtectedRoute";
import "./App.scss";

function App() {
  useAuthListener();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const showLoader = useDelayedLoader(isLoading, 700);

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
