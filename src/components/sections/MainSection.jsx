import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/MainSection.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "font-awesome/css/font-awesome.min.css";
import ProductCard from "../cards/ProductCard";


// Изображения
import parkingImage from "../../image/parking_main_1.jpg";
import smileyIcon from "../../image/free-icon-smiley-142310.png";
import thumbsUpIcon from "../../image/free-icon-thumb-up-like-13578170.png";
import airplaneIcon from "../../image/free-icon-airplane-31069.png";
import dollarIcon from "../../image/free-icon-dollar-symbol-126179.png";
import bannerImage1 from "../../image/banner3-1.png";
import bannerImage2 from "../../image/banner4-1.png";
import bannerImage3 from "../../image/Designer (1).jpeg";
import { FiShield, FiTag, FiTruck, FiRefreshCw } from "react-icons/fi";
import "../../style/CategoryPage.scss";

// API Сервисы
import CategoryApiService from "../../service/api/product/CategoryService";
import MarkApiService from "../../service/api/product/MarkService";
import ProductApiService from "../../service/api/product/ProductService";

const MainSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const redirectToWhatsApp = () => {
    window.location.href = "https://wa.me/1234567890";
  };

  const redirectToTelegram = () => {
    window.location.href = "https://t.me/yourchannel";
  };

  const makePhoneCall = () => {
    window.location.href = "tel:+1234567890";
  };

  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState({
    name_model: "",
    id_model: null,
  });
  const [selectedMark, setSelectedMark] = useState({
    name_mark: "",
    id_mark: null,
  });

  // Сторонние данные
  const [categoryData, setCategoryData] = useState(null);
  const [marks, setMarks] = useState(null);
  const [recProduct, setRecProduct] = useState([]);
  const [lastSellsProduct, setLastSellsProduct] = useState([]);
  const navigate = useNavigate();

  // Настройки для карусели
  const carouselSettings = {
    dots: true,
    infinite: lastSellsProduct.length >= 4,
    speed: 400,
    slidesToShow: Math.min(lastSellsProduct.length, 4),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(lastSellsProduct.length, 2),
          slidesToScroll: 1,
          infinite: lastSellsProduct.length > 1,
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

  /**
   * Установка значений при выборе марки
   * @param {*} e
   */
  const selectMark = (e, type) => {
    if (type === "mark") {
      setSelectedMark({
        name_mark: e.target.value,
        id_mark:
          e.target.options[e.target.selectedIndex].getAttribute("data-mark-id"),
      });
      // Получение всех моделей по марке
      ProductApiService.findModelByMark(
        Number(
          e.target.options[e.target.selectedIndex].getAttribute("data-mark-id"),
        ),
      )
        .then((data) => {
          setModels(data?.all_models ? data.all_models : []);
        })
        .catch(() => {});
    } else if (type === "model") {
      setSelectedModels({
        name_model: e.target.value,
        id_model:
          e.target.options[e.target.selectedIndex].getAttribute(
            "data-model-id",
          ),
      });
    }
  };

  const handleSearch = () => {
    if (selectedModels.id_model === null || selectedMark.id_mark === null) {
      navigate("/category");
    } else {
      ProductApiService.searchProduct(
        Number(selectedMark.id_mark),
        Number(selectedModels.id_model),
      ).then((data) => {
        navigate("/search-results", { state: { results: data.products } });
      });
    }
  };

  useEffect(() => {
    const reqCategories = async () => {
      const categories = await CategoryApiService.allCategories();
      if (categories) {
        setCategoryData(categories);
      }
    };

    const reqModels = async () => {
      const models = await ProductApiService.allModels();

      if (models) {
        setModels(models.all_models ? models.all_models : []);
      } else {
        setModels([]);
      }
    };

    const reqMarks = async () => {
      const marks = await MarkApiService.allMarks();
      if (marks) {
        setMarks(marks);
      }
    };

    const reqRecommendedProducts = async () => {
      const recommendedProducts = await ProductApiService.recommendsProduct();
      if (recommendedProducts) {
        setRecProduct(recommendedProducts.products);
      }
    };

    const reqSellsProducts = async () => {
      const sellsProducts = await ProductApiService.allSalledProducts();
      if (sellsProducts) {
        if (sellsProducts.products.length > 0) {
          setLastSellsProduct(sellsProducts.products);
        }
      }
    };

    reqModels();
    reqCategories();
    reqMarks();
    reqRecommendedProducts();
    reqSellsProducts();
  }, []);

  return (
    <div>
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
              {marks ? (
                <select
                  name="brand"
                  id="brand"
                  value={selectedMark.name_mark}
                  onChange={(e) => selectMark(e, "mark")}
                >
                  <option value="" disabled hidden>
                    Марка
                  </option>
                  {marks.marks.map((mark, index) => {
                    return (
                      <option
                        key={index}
                        value={mark.name_mark}
                        data-mark-id={mark.id_mark}
                      >
                        {mark.name_mark}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <select
                  name="brand"
                  id="brand"
                  value={selectedMark.name_mark}
                  onChange={(e) => selectMark(e, "mark")}
                >
                  <option value="" disabled hidden>
                    Марка
                  </option>
                </select>
              )}
              <select
                name="models"
                id="models"
                value={selectedModels.name_model}
                onChange={(e) => selectMark(e, "model")}
              >
                <option value="Модель" data-id-model={null}>
                  Модель
                </option>
                {models.map((model, index) => {
                  return (
                    <option
                      key={index}
                      value={model.name_model}
                      data-model-id={model.id_model}
                    >
                      {model.name_model}
                    </option>
                  );
                })}
              </select>
              <button onClick={handleSearch}>Поиск</button>
            </div>
          </div>
        </div>
      </section>
     {categoryData ? (
  <section className="categories-section">
    {categoryData.categories.map((category) => (
      <Link
        to={`/category/${category.id_category}`}
        state={{ categoryId: category.id_category }}
        className="category-card"
        key={category.id_category}
        aria-label={`Перейти в категорию ${category.name_category}`}
      >
        <div className="category-icon">
          {category.icon_category?.includes("http") ? (
            <img src={category.icon_category} alt="" />
          ) : (
            <i
              className={
                !["icon", "", null].includes(category.icon_category)
                  ? category.icon_category
                  : "fa fa-spinner"
              }
            />
          )}
        </div>
        <p className="category-name">{category.name_category}</p>
      </Link>
    ))}
  </section>
) : null}

<section className="trust-track">
      <div className="track-wrapper">
        <h2 className="track-title">Почему нам доверяют?</h2>
        <div className="track">
          <div className="track-line"></div>

          <div className="track-point">
            <div className="icon">
              <FiShield size={40} />
            </div>
            <div className="content">
              <h3>100% Надёжность</h3>
              <p>1000+ довольных клиентов и 5 лет на рынке</p>
            </div>
          </div>

          <div className="track-point">
            <div className="icon">
              <FiTag size={40} />
            </div>
            <div className="content">
              <h3>Скидка 10%</h3>
              <p>При оплате через СБП и постоянным клиентам</p>
            </div>
          </div>

          <div className="track-point">
            <div className="icon">
              <FiTruck size={40} />
            </div>
            <div className="content">
              <h3>Быстрая доставка</h3>
              <p>1–3 дня по всей России и СНГ</p>
            </div>
          </div>

          <div className="track-point">
            <div className="icon">
              <FiRefreshCw size={40} />
            </div>
            <div className="content">
              <h3>14 дней на возврат</h3>
              <p>Без лишних вопросов и ожидания</p>
            </div>
          </div>

        </div>
      </div>
    </section>


      <section className="featured-products">
        <h2 className="as">Рекомендуемые товары</h2>
        <div className="red-line"></div>
        <div className="product-grid">
          {recProduct.length
            ? recProduct.map((product) => {
                return (
                  <ProductCard
                    id={product.id_product}
                    key={product.id_product}
                    stock={product.quantity_product}
                    type={product.type_pr}
                    brand={product.brand_mark}
                    category={product.id_sub_category}
                    model={product.models}
                    image={product.photo[0] ? product.photo[0].photo_url : ""}
                    name={product.title_product}
                    price={product.price_product}
                    article={product.article_product}
                    extra={product.explanation_product}
                    dimensions={product.weight_product}
                    tags={product.label_product}
                  />
                );
              })
            : "Упс-с, а где рекомендованные товары?"}
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
        <div>
          {lastSellsProduct.length ? (
            <Slider {...carouselSettings}>
              {lastSellsProduct.map((product) => (
                <ProductCard
                  id={product.id_product}
                  key={product.id_product}
                  stock={product.quantity_product}
                  type={product.type_pr}
                  brand={product.brand_mark}
                  category={product.id_sub_category}
                  model={product.models}
                  image={product.photo[0] ? product.photo[0].photo_url : ""}
                  name={product.title_product}
                  price={product.price_product}
                  article={product.article_product}
                  extra={product.explanation_product}
                  dimensions={product.weight_product}
                  tags={product.label_product}
                />
              ))}
            </Slider>
          ) : (
            <p>К сожалению пока продаж нету. Станьте первым!</p>
          )}
        </div>
      </section>
      <section>
        <div className="banner-container">
          <img
            src={bannerImage3}
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
