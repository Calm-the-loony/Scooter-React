import React from "react";
import "./MainSection.css";
import 'font-awesome/css/font-awesome.min.css';

//путь к изображению
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


const MainSection = () => {
  return (
    <div>
      {/* Секция поиска деталей */}
      <section className="parts-search">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${parkingImage})` }} // Добавляем картинку как фоновое изображение
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




    </div>
  );
};

export default MainSection;
