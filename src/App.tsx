import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { HomePage } from "./components/HomePage/HomePage";
import { CatalogPage } from "./components/CatalogPage/CatalogPage";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { RegisterPage } from "./components/RegisterPage/RegisterPage";
import { ProductPage } from "./components/ProductPage/ProductPage";
import { CartPage } from "./components/CartPage/CartPage";
import { AdminPage } from "./components/AdminPage/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
