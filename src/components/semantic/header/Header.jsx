import React, { useEffect, useState } from "react";
import "../../../style/Header.scss";
import "font-awesome/css/font-awesome.min.css";
import logoImage from "../../../image/Дизайн.png";
import favoriteIcon from "../../../image/favorite.png";
import scooterIcon from "../../../image/scooter.png";
import cartIcon from "../../../image/cart.png";
import userIcon from "../../../image/free-icon-user-2603906.png";
import { useNavigate } from "react-router-dom";
import { UserApiService } from "../../../service/api/user/UserApiService";
import ProductApiService from "../../../service/api/product/ProductService";
import { Search, Menu, X } from "lucide-react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [cntOrder, setOrders] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileSearch(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleSearchClick = () => {
    ProductApiService.filterProducts(searchQuery).then((data) => {
      navigate("/search-results", { state: { results: data } });
      setShowMobileSearch(false);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleCartClick = () => navigate("/cart");
  const handleFavoriteClick = () => navigate("/favorites");
  const handleGarageClick = () => navigate("/garage");

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

  const useLocalStorageListener = (key) => {
    const [value, setValue] = useState(localStorage.getItem(key));

    useEffect(() => {
      const handleStorageChange = (e) => {
        if (e.key === key) {
          setValue(e.newValue);
        }
      };

      window.addEventListener("storage", handleStorageChange);
      const interval = setInterval(() => {
        const currentValue = localStorage.getItem(key);
        if (currentValue !== value) {
          setValue(currentValue);
        }
      }, 100);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        clearInterval(interval);
      };
    }, [key, value]);

    return value;
  };

  const localStorageHook = useLocalStorageListener("product");

  useEffect(() => {
    const header = document.getElementById("header");
    const submenu = document.querySelector(".submenu");
    const locationContainer = document.getElementById("location-container");

    const updateClasses = () => {
      if (isMobile) return;
      
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

    if (!isMobile) {
      updateClasses();
      window.addEventListener("scroll", updateClasses);
    }

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
      if (!isMobile) {
        window.removeEventListener("scroll", updateClasses);
      }
    };
  }, [localStorageHook, isMobile]);

  return (
    <>
      <header className="header" id="header">
        {isMobile ? (
          <div className="mobile-header-top">
            <button 
              className="menu-toggle" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="mobile-logo" onClick={() => navigate("/")}>
              <img src={logoImage} alt="Логотип" />
            </div>
            
            <div className="mobile-actions">
              <button 
                className="search-toggle" 
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                aria-label={showMobileSearch ? "Скрыть поиск" : "Показать поиск"}
              >
                <Search size={20} />
              </button>
              <button onClick={handleCartClick} className="cart-button">
                <img src={cartIcon} alt="Корзина" />
                {cntOrder > 0 && <span>{cntOrder}</span>}
              </button>
            </div>
          </div>
        ) : (
          <>
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
                  onKeyPress={handleKeyPress}
                />
                <button className="search-button" onClick={handleSearchClick}>
                  <Search size={20} strokeWidth={2} color="white" className="flipped-icon" />
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
          </>
        )}

        {(showMobileSearch || !isMobile) && (
          <div className={`search-bar-mobile ${showMobileSearch ? 'visible' : ''}`}>
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearchClick}>
              <Search size={20} strokeWidth={2} color="white" />
            </button>
          </div>
        )}

        {isMobile && (
          <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="mobile-menu-header">
              <button onClick={() => navigate("/account")} className="mobile-user">
                <img src={userIcon} alt="Личный кабинет" />
                <span>Личный кабинет</span>
              </button>
            </div>
            
            <div className="mobile-location">
              <span>Ваш город: <span id="city-name-mobile">...</span></span>
              <button onClick={openCityModal}>Сменить</button>
            </div>
            
            <nav className="mobile-nav">
              <ul>
                <li><button onClick={() => { navigate("/favorites"); setIsMenuOpen(false); }}>Избранное</button></li>
                <li><button onClick={() => { navigate("/garage"); setIsMenuOpen(false); }}>Мои модели</button></li>
                <li><button onClick={() => { navigate("/salesroom"); setIsMenuOpen(false); }}>Самовывоз</button></li>
                <li><button onClick={() => { navigate("/return"); setIsMenuOpen(false); }}>Возвраты</button></li>
                <li><button onClick={() => { navigate("/shipping"); setIsMenuOpen(false); }}>Доставка</button></li>
                <li><button onClick={() => { navigate("/legal"); setIsMenuOpen(false); }}>Защита</button></li>
              </ul>
            </nav>
            
            <div className="mobile-contact">
              <a href="tel:+79733455314">+7(973)345-53-14</a>
            </div>
          </div>
        )}

        {!isMobile && (
          <div className={`submenu ${isMenuOpen ? "visible" : ""}`}>
            <ul>
              <li><a href="/salesroom">Самовывоз</a></li>
              <li><a href="/return">Возвраты</a></li>
              <li><a href="/shipping">Доставка</a></li>
              <li><a href="/legal">Защита</a></li>
              <li><a href="/">Главная</a></li>
            </ul>
          </div>
        )}

        {!isMobile && (
          <div className="contact-number">
            <a href="tel:+79733455314">+7(973)345-53-14</a>
          </div>
        )}
      </header>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeCityModal}>&times;</span>
            <h2>Выберите ваш город</h2>
            <ul>
              <li onClick={() => selectCity("Москва")}>Москва</li>
              <li onClick={() => selectCity("Санкт-Петербург")}>Санкт-Петербург</li>
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