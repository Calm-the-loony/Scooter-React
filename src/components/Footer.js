import React, { useState } from "react";
import { Link } from "react-router-dom"; // Импорт Link
import '../style/Footer.css';
import 'font-awesome/css/font-awesome.min.css';
import wbImage from '../image/Wb.png';
import ozonImage from '../image/ozon.png';
import marketImage from '../image/market.png';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const redirectToWhatsApp = () => {
    window.location.href = 'https://wa.me/1234567890'; // Укажите номер для WhatsApp
  };

  const redirectToTelegram = () => {
    window.location.href = 'https://t.me/yourchannel'; // Укажите ссылку для Telegram
  };

  const makePhoneCall = () => {
    window.location.href = 'tel:+1234567890'; // Укажите телефон для звонка
  };

  return (
    <footer className="footer">
      <div className="footer-section">
        <h4 className="yellow-text">НОВОСТНАЯ РАССЫЛКА</h4>
        <p>
          Получайте последние новости, специальные предложения и купоны через
          <br />
          электронную почту! Вы можете отменить подписку в любое время.
        </p>
        <form action="#" className="subscribe-form">
          <input type="email" placeholder="Your email" />
          <button type="submit" className="subscribe-button">Подписаться</button>
        </form>
        <h4 className="yellow-text">КОД КУПОНОВ</h4>
        <p>
          Проверьте <span className="highlights">все текущие коды купонов</span> на странице.
        </p>
      </div>
      <div>
        <hr className="divider" />
      </div>
      <div className="footer-section">
        <h3 className="yellow-text">FAQ</h3>
        <h4>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault(); // Отключаем переход по ссылке
              showModal(); // Открываем модальное окно
            }}>
          
            Контакты
          </a>
        </h4>

        {isModalOpen && (
          <div className="modal" id="myModal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <button className="whatsapp-btn" onClick={redirectToWhatsApp}>
                WhatsApp
              </button>
              <button className="telegram-btn" onClick={redirectToTelegram}>
                Telegram
              </button>
              <button className="phone-btn" onClick={makePhoneCall}>
                Звонок
              </button>
            </div>
          </div>
        )}

        {/* Обновлённая ссылка на способы оплаты */}
        <h4><Link to="/pay">Способы оплаты</Link></h4> 
        <h4><Link to="/shipping">Доставка</Link></h4>
        <h4><Link to="/return">Возвраты</Link></h4>
        <h4><Link to="/salesroom">Торговое помещение</Link></h4>
      </div>
      <div>
        <hr className="divider" />
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      <div className="footer-section">
        <h3 className="yellow-text">INFO</h3>
        <h4><Link to="/legal">Защита данных</Link></h4>
        <h4><Link to="/right">Право отзыва</Link></h4>
        <h4><Link to="/jobs">Вакансии</Link></h4>
       < h4><Link to="/tech">Технические советы и руководства</Link></h4>
       <h4><Link to="/brand">Бренды</Link></h4>
        <h3 className="yellow-text">Social</h3>
        <div className="social-icons">
          <a href="https://telegram.example.com" className="social-icon">
            <i className="fab fa-telegram"></i>
          </a>
          <a href="https://whatsapp.example.com" className="social-icon">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://www.wildberries.ru/brands/scooters" className="social-icon">
            <img src={wbImage} alt="Wb" className="social-image" />
          </a>
          <a href="https://www.ozon.ru/seller/scooter24-462340/products/?miniapp=seller_462340" className="social-icon">
            <img src={ozonImage} alt="Ozon" className="social-image" />
          </a>
          <a href="https://market.yandex.ru/business--scooter-24/35256421" className="social-icon">
            <img src={marketImage} alt="Y.market" className="social-image" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
