import React, { useState, useEffect } from 'react';
import '../style/Header.css';
import 'font-awesome/css/font-awesome.min.css';
import logoImage from '../image/Дизайн.png';
import searchIcon from '../image/free-icon-loupe-2482343.png';
import favoriteIcon from '../image/favorite.png';
import scooterIcon from '../image/scooter.png';
import cartIcon from '../image/cart.png';
import userIcon from '../image/free-icon-user-2603906.png';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для бургер-меню

  useEffect(() => {
    const header = document.getElementById("header");
    const submenu = document.querySelector('.submenu');
    const locationContainer = document.getElementById("location-container");
    let prevScrollPos = window.pageYOffset;

    const scrollHandler = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos < 100) {
        header.style.height = "100px";
        header.classList.remove('collapsed');
        header.classList.add('expanded');
        submenu.classList.add('visible');
        locationContainer.classList.remove('hidden');
        locationContainer.classList.add('visible');
      } else {
        header.style.height = "50px";
        header.classList.remove('expanded');
        header.classList.add('collapsed');
        submenu.classList.remove('visible');
        locationContainer.classList.remove('visible');
        locationContainer.classList.add('hidden');
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', scrollHandler);

    // Получение геопозиции
    fetch('http://ip-api.com/json/?lang=ru')
      .then(response => response.json())
      .then(data => {
        const city = data.city || "Неизвестно";
        document.getElementById("city-name").textContent = city;
      })
      .catch(error => {
        console.error("Ошибка получения города:", error);
        document.getElementById("city-name").textContent = "Неизвестно";
      });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const openCityModal = () => setIsModalOpen(true);
  const closeCityModal = () => setIsModalOpen(false);

  const selectCity = (city) => {
    document.getElementById("city-name").textContent = city;
    closeCityModal();
  };

  const enterCityManually = () => {
    const manualCity = prompt("Введите название вашего города:");
    if (manualCity) {
      selectCity(manualCity);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="header" id="header">
        <div id="parallelogram">
          <img src={logoImage} alt="Логотип" className="logo-image" />
        </div>

        <div className="action-container">
          <div className="search-bar">
            <input type="text" id="text-to-find" placeholder="Поиск..." />
            <img
              src={searchIcon}
              className="search-icon"
              alt="Поиск"
              onClick={() => console.log('Поиск')}
            />
          </div>

          <div className="user-actions">
            <button id="favorite-button" onClick={() => (window.location.href = 'favorites.html')}>
              <img src={favoriteIcon} alt="Избранное" />
            </button>
            <button id="scooter-button">
              <img src={scooterIcon} alt="Модель скутера" />
            </button>
            <button id="cart-button" onClick={() => (window.location.href = 'cart.html')}>
              <img src={cartIcon} alt="Корзина" />
              <span id="cart-count">0</span>
            </button>
            <button id="account-button" onClick={() => (window.location.href = 'account.html')}>
              <img src={userIcon} alt="Личный кабинет" />
            </button>
          </div>
        </div>

        <div id="location-container">
          <span id="current-city" className="location-text">
            Ваш город: <span id="city-name">...</span>
          </span>
          <button id="change-city-button" onClick={openCityModal}>
            Сменить
          </button>
        </div>

        {/* Бургер-меню кнопка */}
        <div className="burger-menu" onClick={toggleMenu}>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
        </div>

        {/* Меню, которое появляется при открытии бургер-меню */}
        <div className={`submenu ${isMenuOpen ? 'visible' : ''}`}>
          <ul>
            <li>
              <a href="/salesroom">Самовывоз</a>
            </li>
            <li>
              <a href="#" onClick={() => console.log('Контакты')}>
                Контакты
              </a>
            </li>
            <li>
              <a href="/delivery">Доставка</a>
            </li>
            <li>
              <a href="/parts">Запчасти</a>
            </li>
            <li>
              <a href="/accessories">Расходники</a>
            </li>
          </ul>
        </div>

        <div className="contact-number">
          <a href="tel:+1234567890">+7(973)345-53-14</a>
        </div>
      </header>

      {/* Модальное окно выбора города */}
      {isModalOpen && (
        <div id="city-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeCityModal}>&times;</span>
            <h2>Выберите ваш город</h2>
            <input
              type="text"
              id="city-input"
              placeholder="Введите название города"
            />
            <ul id="city-list">
              <li onClick={() => selectCity('Москва')}>Москва</li>
              <li onClick={() => selectCity('Санкт-Петербург')}>Санкт-Петербург</li>
              <li onClick={() => selectCity('Новосибирск')}>Новосибирск</li>
              <li onClick={() => selectCity('Екатеринбург')}>Екатеринбург</li>
            </ul>
            <button id="manual-city-button" onClick={enterCityManually}>
              Ввести город вручную
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
