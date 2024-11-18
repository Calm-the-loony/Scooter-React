import React from 'react';
import './Footer.css';
import 'font-awesome/css/font-awesome.min.css';
import wbImage from '../image/Wb.png';
import ozonImage from '../image/ozon.png';
import marketImage from '../image/market.png';

const Footer = () => {
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
        <h4 className="yellow-text">КОД КУПОНОА</h4>
        <p>
          Проверьте <span className="highlights">все текущие коды купонов</span> на странице.
        </p>
      </div>
      <div>
        <hr className="divider" />
      </div>
      <div className="footer-section">
        <h3 className="yellow-text">FAQ</h3>
        <h4><a href="contacts.html">Контакты</a></h4>
        <h4><a href="pay.html">Способы оплаты</a></h4>
        <h4><a href="delivery.html">Доставка</a></h4>
        <h4><a href="return.html">Возвраты</a></h4>
        <h4><a href="salesroom.html">Торговое помещение</a></h4>
      </div>
      <div>
        <hr className="divider" />
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      <div className="footer-section">
        <h3 className="yellow-text">INFO</h3>
        <h4><a href="dataprotection.html">Защита данных</a></h4>
        <h4><a href="revocation.html">Право отзыва</a></h4>
        <h4><a href="jobs.html">Работа</a></h4>
        <h4><a href="techtips.html">Технические советы и руководства</a></h4>
        <h4><a href="brands.html">Бренды</a></h4>
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
