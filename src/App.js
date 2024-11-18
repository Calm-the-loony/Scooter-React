import React from "react";
import Header from "./components/Header"; // Шапка сайта
import Footer from "./components/Footer"; // Подвал сайта
import MainSection from "./components/MainSection"; // Основной контент
import "./App.css";

const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <MainSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
