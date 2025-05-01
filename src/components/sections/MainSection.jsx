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
          setModels(data.all_models);
        })
        .catch((er) => {});
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
        setModels(models.all_models);
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
                  <option value="" disabled selected hidden>
                    Марка
                  </option>
                  {marks.marks.map((mark) => {
                    return (
                      <option
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
                  <option value="" disabled selected hidden>
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
                {models.map((model) => {
                  return (
                    <option
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
          {categoryData.categories.map((category) => {
            return (
              <div className="category">
                <Link
                  to={{
                    pathname: "/category/" + category.id_category,
                  }}
                  state={{ categoryId: category.id_category }}
                  className="category-container"
                >
                  {category.icon_category ? (
                    <img src={category.icon_category} alt="Категория" />
                  ) : (
                    <i
                      className={
                        !["icon", "", null].includes(category.icon_category)
                          ? category.icon_category
                          : "fa fa-spinner"
                      }
                    ></i>
                  )}
                  <p>{category.name_category}</p>
                </Link>
              </div>
            );
          })}
        </section>
      ) : (
        ""
      )}
    <section className="transparent-guarantees">
  <div className="guarantees-container">
    <div className="guarantee-card">
      <div className="card-icon">
        <img src={smileyIcon} alt="Надежность" />
      </div>
      <h3 className="card-title">100% Надежность</h3>
      <p className="card-desc">Более 1000 отзывов</p>
      <div className="card-highlight"></div>
    </div>

    <div className="guarantee-card">
      <div className="card-icon">
        <img src={thumbsUpIcon} alt="Скидка" />
      </div>
      <h3 className="card-title">Скидка 10%</h3>
      <p className="card-desc">при оплате СБП от Сбера</p>
      <div className="card-highlight"></div>
    </div>

    <div className="guarantee-card">
      <div className="card-icon">
        <img src={airplaneIcon} alt="Доставка" />
      </div>
      <h3 className="card-title">Быстрая доставка</h3>
      <p className="card-desc">по всей России</p>
      <div className="card-highlight"></div>
    </div>

    <div className="guarantee-card">
      <div className="card-icon">
        <img src={dollarIcon} alt="Возврат" />
      </div>
      <h3 className="card-title">14 дней на возврат</h3>
      <p className="card-desc">независимо от причин</p>
      <div className="card-highlight"></div>
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
