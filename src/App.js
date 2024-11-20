import React from "react";
import Header from "./components/Header"; // Шапка сайта
import Footer from "./components/Footer"; // Подвал сайта
import MainSection from "./components/MainSection"; // Основной контент
import PayPage from "./components/PayPage"; // Страница оплаты
import ShippingPage from "./components/ShippingPage"; 
import ReturnsPage from "./components/ReturnsPage"; 
import SalesroomPage from "./components/SalesroomPage"; // Fixed line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
