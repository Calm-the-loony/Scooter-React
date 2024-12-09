import React, { useState, useEffect } from "react";
import "../style/CookieConsent.scss"; // Создайте стиль для плашки

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем наличие согласия в localStorage
    const consentGiven = localStorage.getItem("cookieConsent");
    if (!consentGiven) {
      setIsVisible(true); // Показываем плашку, если согласие еще не дано
    }
  }, []);

  const handleAccept = () => {
    // Сохраняем согласие в localStorage
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false); // Скрываем плашку
  };

  return (
    isVisible && (
      <div className="cookie-consent">
        <p>
          Мы используем cookies и обрабатываем персональные данные для улучшения
          вашего опыта на нашем сайте. Продолжая использовать наш сайт, вы
          соглашаетесь с этим.
        </p>
        <button className="cookie-btn" onClick={handleAccept}>
          Принять
        </button>
      </div>
    )
  );
};

export default CookieConsent;
