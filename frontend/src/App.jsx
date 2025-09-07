import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";


export default function App() {
  const {theme} = useThemeStore();

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-base-200 transition-colors duration-300"
    >
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}
