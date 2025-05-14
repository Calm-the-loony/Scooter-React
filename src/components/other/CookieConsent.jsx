import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaCookieBite } from "react-icons/fa";
import "../../style/CookieConsent.scss";

const CookieConsent = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent");
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const handleLearnMore = () => {
    navigate("/legal");
  };

  return (
    isVisible && (
      <div className="cookie-consent">
        <div className="cookie-content">
          <div className="cookie-icon">
            <FaCookieBite />
          </div>
          <div className="cookie-text">
            <p>
              Мы используем{" "}
              <button onClick={handleLearnMore} className="cookie-link">
                файлы cookies <FaChevronRight className="link-arrow" />
              </button>{" "}
              и обрабатываем персональные данные для улучшения вашего опыта на
              нашем сайте. Продолжая использовать наш сайт, вы соглашаетесь с
              этим.
            </p>
          </div>
        </div>
        <div className="cookie-actions">
          <button className="cookie-btn accept-btn" onClick={handleAccept}>
            Принять
          </button>
          <button className="cookie-btn learn-btn" onClick={handleLearnMore}>
            Подробнее
          </button>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
