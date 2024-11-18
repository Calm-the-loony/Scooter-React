import React from "react";
import "./MainSection.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "font-awesome/css/font-awesome.min.css";
import ProductCard from './ProductCard';

// Изображения
import parkingImage from "../image/parking_main_1.jpg";
import engineIcon from "../image/free-icon-car-engine-2061956.png";
import suspensionIcon from "../image/free-icon-suspension-8547240.png";
import fuelSystemIcon from "../image/free-icon-gas-fuel-7667386.png";
import drivetrainIcon from "../image/free-icon-drivetrain-7642544.png";
import electricalServiceIcon from "../image/free-icon-electrical-service-3098405.png";
import brakeDiscIcon from "../image/free-icon-brake-disc-2052424.png";
import carPartsIcon from "../image/free-icon-car-parts-11195192.png";
import mufflerIcon from "../image/free-icon-muffler-2783764.png";
import sparePartsIcon from "../image/free-icon-spare-parts-12622092.png";
import tuningIcon from "../image/free-icon-tuning-4749061.png";
import bodyPartsIcon from "../image/free.png";
import configurationIcon from "../image/free-icon-configuration-7978264.png";
import coilImage from "../image/product/coil.webp";
import coil2Image from "../image/product/coil2.webp";
import banner1 from '../image/шапка-мп-14.png';
import banner2 from '../image/шапка-мп-13.png';
import banner3 from '../image/Group 36.png';
import smileyIcon from '../image/free-icon-smiley-142310.png';
import thumbsUpIcon from '../image/free-icon-thumb-up-like-13578170.png';
import airplaneIcon from '../image/free-icon-airplane-31069.png';
import dollarIcon from '../image/free-icon-dollar-symbol-126179.png';

// Подключаем данные
// import products from "../data/products.json";  

const MainSection = () => {
    // Настройки для карусели
    const carouselSettings = {
        dots: true, // Показывать точки навигации
        infinite: true, // Бесконечный слайдер
        speed: 500, // Скорость прокрутки
        slidesToShow: 4, // Показывать 4 карточки одновременно
        slidesToScroll: 2, // Прокручивать 1 карточку за раз
        responsive: [
          {
            breakpoint: 1024, // На устройствах с шириной экрана до 1024px
            settings: {
              slidesToShow: 3, // Показывать 3 карточки
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 768, // На устройствах с шириной экрана до 768px
            settings: {
              slidesToShow: 2, // Показывать 2 карточки
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480, // На мобильных устройствах
            settings: {
              slidesToShow: 1, // Показывать 1 карточку
              slidesToScroll: 1,
            },
          },
        ],
      };
      
  

  return (
    <div>
      {/* Секция поиска деталей */}
      <section className="parts-search">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${parkingImage})` }}
        >
          <div className="content">
            <h2>
              Найдите Свои <span className="highlight">Идеальные</span> Детали
            </h2>
            <div className="filters">
              <select name="brand" id="brand">
                <option value="" disabled selected hidden>
                  Марка
                </option>
                <option value="yamaha">Yamaha</option>
                <option value="honda">Honda</option>
                <option value="vespa">Vespa</option>
                <option value="suzuki">Suzuki</option>
                <option value="kawasaki">Kawasaki</option>
                <option value="sym">SYM</option>
                <option value="kymco">Kymco</option>
                <option value="aprilia">Aprilia</option>
              </select>
              <input type="text" placeholder="Модель" />
              <button>Поиск</button>
            </div>
          </div>
        </div>
      </section>

      {/* Секция категорий */}
      <section className="categories-section">
        <div className="category">
          <a href="engine.html" className="category-container">
            <img src={engineIcon} alt="Двигатель" />
            <p>Двигатель</p>
          </a>
        </div>
        <div className="category">
          <a href="suspension.html" className="category-container">
            <img src={suspensionIcon} alt="Подвеска" />
            <p>Подвеска</p>
          </a>
        </div>
        <div className="category">
          <a href="fuel-system.html" className="category-container">
            <img src={fuelSystemIcon} alt="Топливная система" />
            <p>Топливная система</p>
          </a>
        </div>
        <div className="category">
          <a href="transmission.html" className="category-container">
            <img src={drivetrainIcon} alt="Трансмиссия" />
            <p>Трансмиссия</p>
          </a>
        </div>
        <div className="category">
          <a href="electrics.html" className="category-container">
            <img src={electricalServiceIcon} alt="Электрика" />
            <p>Электрика</p>
          </a>
        </div>
        <div className="category">
          <a href="brake-system.html" className="category-container">
            <img src={brakeDiscIcon} alt="Тормозная система" />
            <p>Тормозная система</p>
          </a>
        </div>
        <div className="category">
          <a href="gaskets-seals.html" className="category-container">
            <img src={carPartsIcon} alt="Прокладки и сальники" />
            <p>Прокладки и сальники</p>
          </a>
        </div>
        <div className="category">
          <a href="mufflers.html" className="category-container">
            <img src={mufflerIcon} alt="Глушители" />
            <p>Глушители</p>
          </a>
        </div>
        <div className="category">
          <a href="accessories.html" className="category-container">
            <img src={sparePartsIcon} alt="Расходники" />
            <p>Расходники</p>
          </a>
        </div>
        <div className="category">
          <a href="tuning.html" className="category-container">
            <img src={tuningIcon} alt="Тюнинг" />
            <p>Тюнинг</p>
          </a>
        </div>
        <div className="category">
          <a href="body-parts.html" className="category-container">
            <img src={bodyPartsIcon} alt="Кузовные элементы" />
            <p>Кузовные элементы</p>
          </a>
        </div>
        <div className="category">
          <a href="uncategorized.html" className="category-container">
            <img src={configurationIcon} alt="Разное" />
            <p>Разное</p>
          </a>
        </div>
      </section>

      <section className="featured-products">
      <h2 className="as">Топ продаж</h2>
      <div className="red-lines"></div>
      <Slider {...carouselSettings}> {/* Применение настроек слайдера */}
        <ProductCard 
          id="1" 
          stock="23" 
          type="Скутер" 
          brand="Honda, Honling, Gryphon" 
          model="Dio (Honda)"
          image={coilImage}
          name="Катушка зажигания на скутер Хонда Дио (Af-18/27/34) и китайский скутер (139QMB/152QMI/157QMJ) Honda Dio / Tact"
          price="653,00 ₽"
          article="SCOT126723456120"
          extra="Плотная упаковка, Запчасть на скутер"
          dimensions="41 см"
          tags="1 год"
        />
        <ProductCard 
          id="2" 
          stock="23" 
          type="Скутер" 
          brand="Suzuki" 
          model="Address 50 (Suzuki), Address 110 (Suzuki), Address (Suzuki)"
          image={coil2Image}
          name="Катушка зажигания (коммутатор) на скутер Сузуки Адрес/Сепия 50 кубов (v50g) Suzuki Address / Sepia"
          price="1027,00 ₽"
          article="SCOT126723456122"
          extra="Плотная упаковка, Запчасть на скутер"
          dimensions="41.2 × 31.7 × 7.1 мм"
          tags="1 год"
        />
        <ProductCard 
          id="3" 
          stock="23" 
          type="Скутер" 
          brand="Honda, Honling, Gryphon" 
          model="Dio (Honda)"
          image={coilImage}
          name="Катушка зажигания на скутер Хонда Дио (Af-18/27/34) и китайский скутер (139QMB/152QMI/157QMJ) Honda Dio / Tact"
          price="653,00 ₽"
          article="SCOT126723456120"
          extra="Плотная упаковка, Запчасть на скутер"
          dimensions="41 см"
          tags="1 год"
        />
        <ProductCard 
          id="4" 
          stock="23" 
          type="Скутер" 
          brand="Suzuki" 
          model="Address 50 (Suzuki), Address 110 (Suzuki), Address (Suzuki)"
          image={coil2Image}
          name="Катушка зажигания (коммутатор) на скутер Сузуки Адрес/Сепия 50 кубов (v50g) Suzuki Address / Sepia"
          price="1027,00 ₽"
          article="SCOT126723456122"
          extra="Плотная упаковка, Запчасть на скутер"
          dimensions="41.2 × 31.7 × 7.1 мм"
          tags="1 год"
        />
        {/* Добавить другие карточки товара по аналогии */}
      </Slider>
    </section>

{/* Раздел баннеров */}
<section className="banner-container">
        <div className="contact-banner">
          <div className="banner-item">
            <a href="https://www.ozon.ru/seller/scooter24-462340/products/?miniapp=seller_462340">
              <img src={banner1} alt="Banner 1" />
              <div className="banner-text">
                <p className="banner-title">Оформить заказ</p>
                <p>на площадке Ozon</p>
                <p className="banner-description">Жми <span className="arrow">&#x2192;</span></p>
              </div>
            </a>
          </div>
          <div className="banner-item">
            <a href="https://market.yandex.ru/business--scooter-24/35256421">
              <img src={banner2} alt="Banner 2" />
              <div className="banner-text">
                <p className="banner-title">Оформить заказ</p>
                <p>на площадке Я.Маркет</p>
                <p className="banner-description">Жми <span className="arrow">&#x2192;</span></p>
              </div>
            </a>
          </div>
          <div className="banner-item">
            <a href="https://global.wildberries.ru/brands/756907-s24">
              <img src={banner3} alt="Banner 3" />
              <div className="banner-text">
                <p className="banner-title">Оформить заказ</p>
                <p>на площадке Wildberries</p>
                <p className="banner-description">Жми <span className="arrow">&#x2192;</span></p>
              </div>
            </a>
          </div>
        </div>
      </section>
      {/* Раздел гарантии */}
      <section className="guarantees">
        <div className="guarantee-item">
          <img src={smileyIcon} alt="Надежность" />
          <div className="guarantee-text">
            <h3>100% Надежность</h3>
            <p>Более 1000 отзывов</p>
          </div>
        </div>
        <div className="guarantee-item">
          <img src={thumbsUpIcon} alt="Скидка" />
          <div className="guarantee-text">
            <h3>Скидка 10% при</h3>
            <p>оплате СБП от Сбера</p>
          </div>
        </div>
        <div className="guarantee-item">
          <img src={airplaneIcon} alt="Быстрая доставка" />
          <div className="guarantee-text">
            <h3>Быстрая доставка </h3>
            <p>по всей России</p>
          </div>
        </div>
        <div className="guarantee-item">
          <img src={dollarIcon} alt="Возврат" />
          <div className="guarantee-text">
            <h3>14 дней на возврат</h3>
            <p>независимо от причин</p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default MainSection;
