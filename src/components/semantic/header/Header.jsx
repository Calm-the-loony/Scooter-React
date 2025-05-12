import React, {useEffect, useState} from "react";
import "../../../style/Header.scss";
import "font-awesome/css/font-awesome.min.css";
import logoImage from "../../../image/Дизайн.png";
import favoriteIcon from "../../../image/favorite.png";
import scooterIcon from "../../../image/scooter.png";
import cartIcon from "../../../image/cart.png";
import userIcon from "../../../image/free-icon-user-2603906.png";
import {useNavigate} from "react-router-dom";
import {UserApiService} from "../../../service/api/user/UserApiService";
import ProductApiService from "../../../service/api/product/ProductService";
import {Search} from "lucide-react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [cntOrder, setOrders] = useState(0);

  // Обработчик изменения текста в поле поиска
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  // Обработчик клика на иконку поиска
  const handleSearchClick = () => {
    // Получаем продукты по фильтру (Title)
    ProductApiService.filterProducts(searchQuery).then((data) => {
      navigate("/search-results", { state: { results: data } });
    });
  };

  // Обработчики для других кнопок в хедере
  const handleCartClick = () => navigate("/cart");
  const handleFavoriteClick = () => navigate("/favorites");
  const handleGarageClick = () => navigate("/garage");

  // Модальное окно для смены города
  const openCityModal = () => setIsModalOpen(true);
  const closeCityModal = () => setIsModalOpen(false);
  const selectCity = (city) => {
    document.getElementById("city-name").textContent = city;
    closeCityModal();
  };
  const enterCityManually = () => {
    const manualCity = prompt("Введите название вашего города:");
    if (manualCity) selectCity(manualCity);
  };

  useEffect(() => {
    const header = document.getElementById("header");
    const submenu = document.querySelector(".submenu");
    const locationContainer = document.getElementById("location-container");

    const updateClasses = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos < 100) {
        header.style.height = "100px";
        header.classList.remove("collapsed");
        header.classList.add("expanded");
        submenu?.classList.add("visible");
        locationContainer?.classList.remove("hidden");
        locationContainer?.classList.add("visible");
      } else {
        header.style.height = "50px";
        header.classList.remove("expanded");
        header.classList.add("collapsed");
        submenu?.classList.remove("visible");
        locationContainer?.classList.remove("visible");
        locationContainer?.classList.add("hidden");
      }
    };

    const userOrders = async () => {
      try {
        let orders = await UserApiService.userOrders();
        if (orders) {
          setOrders(orders.orders.length);
        }
      } catch {
        setOrders(0);
      }
    };

    updateClasses(); // Инициализация при загрузке страницы
    window.addEventListener("scroll", updateClasses);

    // Получение города пользователя
    fetch("http://ip-api.com/json/?lang=ru")
      .then((response) => response.json())
      .then((data) => {
        const city = data.city || "Неизвестно";
        document.getElementById("city-name").textContent = city;
      })
      .catch((error) => {
        console.error("Ошибка получения города:", error);
        document.getElementById("city-name").textContent = "Неизвестно";
      });

    userOrders();

    return () => {
      window.removeEventListener("scroll", updateClasses);
    };
  }, []);

  return (
    <>
      <header className="header" id="header">
        <div id="parallelogram" onClick={() => navigate("/")}>
          <img src={logoImage} alt="Логотип" className="logo-image" />
        </div>

        <div className="action-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-button" onClick={handleSearchClick}>
              <Search
                size={20}
                strokeWidth={2}
                color="white"
                className="flipped-icon"
              />
            </button>
          </div>

          <div className="user-actions">
            <button onClick={handleFavoriteClick}>
              <img src={favoriteIcon} alt="Избранное" />
            </button>
            <button onClick={handleGarageClick}>
              <img src={scooterIcon} alt="Модель скутера" />
            </button>
            <button onClick={handleCartClick}>
              <img src={cartIcon} alt="Корзина" />
              <span>{cntOrder}</span>
            </button>
            <button onClick={() => navigate("/account")}>
              <img src={userIcon} alt="Личный кабинет" />
            </button>
          </div>
        </div>

        <div id="location-container">
          <span className="location-text">
            Ваш город: <span id="city-name">...</span>
          </span>
          <button id="change-city-button" onClick={openCityModal}>
            Сменить
          </button>
        </div>

        <div className={`submenu ${isMenuOpen ? "visible" : ""}`}>
          <ul>
            <li>
              <a href="/salesroom">Самовывоз</a>
            </li>
            <li>
              <a href="/return">Возвраты</a>
            </li>
            <li>
              <a href="/shipping">Доставка</a>
            </li>
            <li>
              <a href="/legal">Защита</a>
            </li>
            <li>
              <a href="/">Главная</a>
            </li>
          </ul>
        </div>

        <div className="contact-number">
          <a href="tel:+1234567890">+7(973)345-53-14</a>
        </div>
      </header>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeCityModal}>
              &times;
            </span>
            <h2>Выберите ваш город</h2>
            <ul>
              <li onClick={() => selectCity("Москва")}>Москва</li>
              <li onClick={() => selectCity("Санкт-Петербург")}>
                Санкт-Петербург
              </li>
              <li onClick={() => selectCity("Новосибирск")}>Новосибирск</li>
            </ul>
            <button onClick={enterCityManually}>Ввести вручную</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
