import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import "./App.scss";
import useAuthListener from "./components/hooks/useAuthListener";
import { useSelector } from "react-redux";
import type { RootState } from "./components/redux/store";

function App() {
  useAuthListener();

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
      </Routes>
    </div>
  );
}

export default App;
