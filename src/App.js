import React from "react";
import { render, screen } from '@testing-library/react';
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
import AccountPage from "./components/AccountPage";
import LoginPage from "./components/LoginPage"; // Страница авторизации
import RegistrationPage from "./components/RegistrationPage"; // Страница регистрации
import CookieConsent from "./components/CookieConsent"; // Новый компонент
import ProductPage from "./components/ProductPage";  // Импортируем компонент страницы товара
import SearchResults from "./components/SearchResults";
import CheckoutPage from "./components/CheckoutPage"; // Импортируйте компонент CheckoutPage
import PaymentPage from "./components/PaymentPage";

// import PaymentPage from "./components/PaymentPage";
// import FeaturedProducts from "./components/FeaturedProducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext"; // Провайдер контекста корзины
import ConfirmCode from "./components/ConfirmCode"; // Правильный относительный путь


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
              <Route path="/login" element={<LoginPage />} /> 
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/product/:id" element={<ProductPage />} /> 
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/checkout" element={<CheckoutPage />} /> 
              <Route path="/payp" element={<PaymentPage />} />
              {/* <Route path="/paym" element={<PaymentPage />}  */}
              {/* Маршруты для категорий */}
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/confirm-code" element={<ConfirmCode />} />

              {/* Страница 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {/* <FeaturedProducts />  */}
          </main>
          <Footer />
          <CookieConsent /> 
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
