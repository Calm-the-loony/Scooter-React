import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";
import PayPage from "./components/PayPage";
import ShippingPage from "./components/ShippingPage"; 
import ReturnsPage from "./components/ReturnsPage"; 
import SalesroomPage from "./components/SalesroomPage"; 
import LegalPage from "./components/LegalPage"; 
import RightOfWithdrawalPage from "./components/RightOfWithdrawalPage"; 
import JobsPage from "./components/JobsPage"; 
import TechTipsPage from "./components/TechTipsPage"; 
import BrandsPage from "./components/BrandsPage"; 
import CategoryPage from "./components/CategoryPage"; 
import NotFoundPage from "./components/NotFoundPage";
import CartPage from "./components/CartPage";
import FavoritesPage from "./components/FavoritesPage"; 
import GaragePage from "./components/GaragePage"; 
import AccountPage from './components/AccountPage';
import LoginPage from './components/LoginPage'; // Добавлен импорт для страницы авторизации
import RegistrationPage from './components/RegistrationPage'; // Добавлен импорт для страницы регистрации
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext"; // Импорт провайдера контекста

import "./App.css";

const App = () => {
  return (
    <CartProvider> {/* Обернули приложение в CartProvider */}
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<MainSection />} />
              <Route path="/pay" element={<PayPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/return" element={<ReturnsPage />} />
              <Route path="/salesroom" element={<SalesroomPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/right" element={<RightOfWithdrawalPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/tech" element={<TechTipsPage />} />
              <Route path="/brand" element={<BrandsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/garage" element={<GaragePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<LoginPage />} /> {/* Маршрут для страницы авторизации */}
              <Route path="/register" element={<RegistrationPage />} /> {/* Маршрут для страницы регистрации */}

              {/* Маршруты для категорий */}
              <Route path="/category/:categoryId" element={<CategoryPage />} />

              {/* Страница 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
