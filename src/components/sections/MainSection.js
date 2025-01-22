import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../style/MainSection.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "font-awesome/css/font-awesome.min.css";
import ProductCard from '../cards/ProductCard';
import products from "../../data/products";  
import categories from "../../data/categories"; 


// Изображения
import parkingImage from "../../image/parking_main_1.jpg";
import engineIcon from "../../image/free-icon-battery-4549259.png";
import suspensionIcon from "../../image/free-icon-shock-4549308.png";
import fuelSystemIcon from "../../image/free-icon-petrol-station-4549325.png";
import drivetrainIcon from "../../image/free-icon-sprocket-4549247.png";
import electricalServiceIcon from "../../image/free-icon-screw-driver-4549322.png";
import brakeDiscIcon from "../../image/free-icon-tire-4549255.png";
import carPartsIcon from "../../image/free-icon-bike-4549271.png";
import mufflerIcon from "../../image/free-icon-muffler-4549252.png";
import sparePartsIcon from "../../image/free-icon-helmet-4549230.png";
import tuningIcon from "../../image/free-icon-tuning-4749061.png";
import bodyPartsIcon from "../../image/free-icon-motorbike-4549313.png";
import configurationIcon from "../../image/free-icon-wrench-4549320.png";
import coilImage from "../../image/product/coil.webp";
import coil2Image from "../../image/product/coil2.webp";
import banner1 from '../../image/шапка-мп-14.png';
import banner2 from '../../image/шапка-мп-13.png';
import banner3 from '../../image/Group 36.png';
import smileyIcon from '../../image/free-icon-smiley-142310.png';
import thumbsUpIcon from '../../image/free-icon-thumb-up-like-13578170.png';
import airplaneIcon from '../../image/free-icon-airplane-31069.png';
import dollarIcon from '../../image/free-icon-dollar-symbol-126179.png';
import bannerImage1 from "../../image/banner3-1.png";
import bannerImage2 from "../../image/banner4-1.png";
import bannerImage3 from "../../image/Designer (1).jpeg";
import karbyurator4 from "../../image/product/karbyurator4.webp";
import "../../style/CategoryPage.scss";
import CatImage from '../../image/free-icon-black-cat-3704886.png';

// Подключаем данные
// import products from "../data/products.json";  

const MainSection = () => {
    // Настройки для карусели
    const carouselSettings = {
      dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true,
              },
          },
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
              },
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: false,
              },
          },
      ],
  };
  
  
  
      const [isModalOpen, setIsModalOpen] = useState(false);

      const showModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
      const redirectToWhatsApp = () => {
        window.location.href = 'https://wa.me/1234567890'; 
      };
    
      const redirectToTelegram = () => {
        window.location.href = 'https://t.me/yourchannel'; 
      };
    
      const makePhoneCall = () => {
        window.location.href = 'tel:+1234567890'; 
      };
      

      const [searchModel, setSearchModel] = useState("");
      const [selectedBrand, setSelectedBrand] = useState("");
      const navigate = useNavigate();
    
      const handleSearch = () => {
        // Объединяем данные из файлов продуктов и категорий
        const allProducts = [
          ...products,
          ...categories.flatMap((category) =>
            category.subcategories.flatMap((subcategory) => subcategory.products)
          ),
        ];
    
        // Фильтрация по модели и бренду с проверкой на undefined
        const results = allProducts.filter((product) => {
          // Проверяем, что модель и бренд определены
          const modelMatch =
            product && product.model && product.model.toLowerCase().includes(searchModel.toLowerCase());
          const brandMatch =
            selectedBrand === "" || (product && product.brand && product.brand.toLowerCase() === selectedBrand.toLowerCase());
          return modelMatch && brandMatch;
        });
    
        navigate("/search-results", { state: { results } });
      };
    
      return (
        <div>
          <section className="parts-search">
            <div className="background-image" style={{ backgroundImage: `url(${parkingImage})` }}>
              <div className="content">
                <h2>
                  Найдите Свои <span className="highlight">Идеальные</span> Детали
                </h2>
                <div className="filters">
                  <select
                    name="brand"
                    id="brand"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="" disabled selected hidden>
                      Марка
                    </option>
                    <option value="Yamaha">Yamaha</option>
                    <option value="Honda">Honda</option>
                    <option value="Vespa">Vespa</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Kawasaki">Kawasaki</option>
                    <option value="SYM">SYM</option>
                    <option value="Kymco">Kymco</option>
                    <option value="Aprilia">Aprilia</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Модель"
                    value={searchModel}
                    onChange={(e) => setSearchModel(e.target.value)}
                  />
                  <button onClick={handleSearch}>Поиск</button>
                </div>
              </div>
            </div>
          </section>

     {/* Секция категорий */}
     {/* <section className="categories-section">
  <div className="category">
    <Link 
      to={{
        pathname: "/category/engine",
      }} 
      state={{ categoryId: "engine" }} 
      className="category-container"
    >
      <img src={engineIcon} alt="Двигатель" />
      <p>Двигатель</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/suspension",
      }} 
      state={{ categoryId: "suspension" }} 
      className="category-container"
    >
      <img src={suspensionIcon} alt="Подвеска" />
      <p>Подвеска</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/fuel-system",
      }} 
      state={{ categoryId: "fuel-system" }} 
      className="category-container"
    >
      <img src={fuelSystemIcon} alt="Топливная система" />
      <p>Топливная система</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/transmission",
      }} 
      state={{ categoryId: "transmission" }} 
      className="category-container"
    >
      <img src={drivetrainIcon} alt="Трансмиссия" />
      <p>Трансмиссия</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/electrics",
      }} 
      state={{ categoryId: "electrics" }} 
      className="category-container"
    >
      <img src={electricalServiceIcon} alt="Электрика" />
      <p>Электрика</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/brake-system",
      }} 
      state={{ categoryId: "brake-system" }} 
      className="category-container"
    >
      <img src={brakeDiscIcon} alt="Тормозная система" />
      <p>Тормозная система</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/gaskets-seals",
      }} 
      state={{ categoryId: "gaskets-seals" }} 
      className="category-container"
    >
      <img src={carPartsIcon} alt="Прокладки и сальники" />
      <p>Прокладки и сальники</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/mufflers",
      }} 
      state={{ categoryId: "mufflers" }} 
      className="category-container"
    >
      <img src={mufflerIcon} alt="Глушители" />
      <p>Глушители</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/accessories",
      }} 
      state={{ categoryId: "accessories" }} 
      className="category-container"
    >
      <img src={sparePartsIcon} alt="Расходники" />
      <p>Расходники</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/tuning",
      }} 
      state={{ categoryId: "tuning" }} 
      className="category-container"
    >
      <img src={tuningIcon} alt="Тюнинг" />
      <p>Тюнинг</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/body-parts",
      }} 
      state={{ categoryId: "body-parts" }} 
      className="category-container"
    >
      <img src={bodyPartsIcon} alt="Кузовные элементы" />
      <p>Кузовные элементы</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/uncategorized",
      }} 
      state={{ categoryId: "uncategorized" }} 
      className="category-container"
    >
      <img src={configurationIcon} alt="Разное" />
      <p>Разное</p>
    </Link>
  </div>
</section> */}

<section className="categories-section">
  <div className="category">
    <Link 
      to={{
        pathname: "/category/engine",
      }} 
      state={{ categoryId: "engine" }} 
      className="category-container"
    >
      <i className="fas fa-cogs"></i>
      <p>Двигатель</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/suspension",
      }} 
      state={{ categoryId: "suspension" }} 
      className="category-container"
    >
      <i className="fas fa-shield-alt"></i>
      <p>Подвеска</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/fuel-system",
      }} 
      state={{ categoryId: "fuel-system" }} 
      className="category-container"
    >
      <i className="fas fa-gas-pump"></i>
      <p>Топливная система</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/transmission",
      }} 
      state={{ categoryId: "transmission" }} 
      className="category-container"
    >
      <i className="fas fa-exchange-alt"></i>
      <p>Трансмиссия</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/electrics",
      }} 
      state={{ categoryId: "electrics" }} 
      className="category-container"
    >
      <i className="fas fa-bolt"></i>
      <p>Электрика</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/brake-system",
      }} 
      state={{ categoryId: "brake-system" }} 
      className="category-container"
    >
      <i className="fas fa-car-crash"></i>
      <p>Тормозная система</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/gaskets-seals",
      }} 
      state={{ categoryId: "gaskets-seals" }} 
      className="category-container"
    >
      <i className="fas fa-ring"></i>
      <p>Прокладки и сальники</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/mufflers",
      }} 
      state={{ categoryId: "mufflers" }} 
      className="category-container"
    >
      <i className="fas fa-headphones-alt"></i>
      <p>Глушители</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/accessories",
      }} 
      state={{ categoryId: "accessories" }} 
      className="category-container"
    >
      <i className="fas fa-tools"></i>
      <p>Расходники</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/tuning",
      }} 
      state={{ categoryId: "tuning" }} 
      className="category-container"
    >
      <i className="fas fa-tachometer-alt"></i>
      <p>Тюнинг</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/body-parts",
      }} 
      state={{ categoryId: "body-parts" }} 
      className="category-container"
    >
      <i className="fas fa-car-side"></i>
      <p>Кузовные элементы</p>
    </Link>
  </div>
  <div className="category">
    <Link 
      to={{
        pathname: "/category/uncategorized",
      }} 
      state={{ categoryId: "uncategorized" }} 
      className="category-container"
    >
      <i className="fas fa-ellipsis-h"></i>
      <p>Разное</p>
    </Link>
  </div>
</section>

    
    <section className="featured-products">
    <h2 className="as">Топ продаж</h2>
    <div className="red-lines"></div>
    <Slider {...carouselSettings}>
    {products.map((product) => (
        <ProductCard
            key={product.id}
            id={product.id}
            stock={product.stock}
            type={product.type}
            brand={product.brand}
            category={product.category}
            model={product.model}
            image={product.image}
            name={product.name}
            price={product.price}
            article={product.article}
            extra={product.extra}
            dimensions={product.dimensions}
            tags={product.tags}
        />
    ))}
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

      <section className="featured-products">
        <h2 className="as">Рекомендуемые товары</h2>
        <div className="red-line"></div>
        <div className="product-grid">
        <ProductCard 
          id="1" 
          stock="23" 
          type="Скутер" 
          brand="Honda, Honling, Gryphon" 
          category="Электрика"
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
           category="Электрика"
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
           category="Электрика"
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
           category="Электрика"
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
          id="5" 
          stock="23" 
          type="Скутер" 
          brand="Honda, Honling, Gryphon" 
          category="Электрика"
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
          id="6" 
          stock="23" 
           category="Электрика"
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
          id="7" 
          stock="23" 
           category="Электрика"
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
           id= "8"
           name= "Карбюратор PZ22 на мопед альфа 110-125 кубов для 4Т двигателей 152FMI 152FMH"
           price= "2191,00 ₽"
           stock= "22"
           type="Мотоцикл"
           brand= "Alpha, Delta"
           model= "ABM, Baltmotors, Cyclone"
           category= "Топливная система"
           image= {karbyurator4}
           article= "SCOT240000000080"
           extra= "Доп. комплект: Карбюратор на мопед мотоцикл Alpha и Дельта PZ22 с подсосом"
           dimensions= "17.1 × 28.3 × 21.8 mm"
           tags= "30 дней"
        />
  </div>
</section>

<section className="dual-banner-container">
      <div className="dual-banner">
        {/* Первый баннер */}
        <div className="dual-banner-item">
          <a href="tel:+79991112233">
            <img src={bannerImage1} alt="Позвоните нам" />
            <div className="dual-banner-text">
              <p className="dual-banner-title">Позвоните нам</p>
              <p>И мы поможем подобрать</p>
              <p>комплект для ремонта</p>
              <p>для всех клиентов</p>
            </div>
          </a>
        </div>
        {/* Второй баннер */}
        <div className="dual-banner-item">
          <a href="mailto:example@example.com">
            <img src={bannerImage2} alt="Напишите нам" />
            <div className="dual-banner-text">
              <p className="dual-banner-title">Напишите нам</p>
              <p>мы подберем вам запчасти</p>
              <p>и решим ваши проблемы</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section className="featured-products">
      <h2 className="as">Топ продаж</h2>
      <div className="red-lines"></div>

      <Slider {...carouselSettings}>
        {products.map((product) => (
            <ProductCard
                key={product.id}
                id={product.id}
                stock={product.stock}
                type={product.type}
                brand={product.brand}
                category={product.category}
                model={product.model}
                image={product.image}  
                name={product.name}
                price={product.price}
                article={product.article}
                extra={product.extra}
                dimensions={product.dimensions}
                tags={product.tags}
            />
        ))}
    </Slider>
    </section>
    <section>
      <div className="banner-container">
      <img src={bannerImage3}
          alt="Banner5"
          className="banner-image"
          onClick={showModal}
        />
        <div className="banner-texts">
          <p className="banner-titles">Доставка тюнинга</p>
          <p>и стайлинга под заказ</p>
          <p>из Китая</p>
          <p>Доставка 10 дней!</p>
        </div>
      </div>

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
    </section>

    </div>
  );
};

export default MainSection;
