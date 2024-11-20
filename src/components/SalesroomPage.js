import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "../style/SalesroomPage.css";

// Импорт изображений
import largeImage from "../image/stroitelstvo-skladov-zapchastey-rsholod-3.jpg";
import smallImage1 from "../image/sto_sklad.jpg";
import smallImage2 from "../image/sto_sklad2.jpg";

// Настроим иконку для маркера
const customIcon = new Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Red_dot.svg",
  iconSize: [25, 25],
});

// Компонент для обновления размера карты
const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

const SalesroomPage = () => {
  return (
    <main className="pay">
      <h1>Торговое Помещение/Самовывоз</h1>

      {/* Фотографии помещения */}
      <div className="salesroom-images">
        <div className="large-images">
          <img
            src={largeImage}
            alt="Большая фотография помещения"
            className="large-image"
          />
        </div>
        <div className="small-images">
          <img
            src={smallImage1}
            alt="Маленькая фотография помещения 1"
            className="small-image"
          />
          <img
            src={smallImage2}
            alt="Маленькая фотография помещения 2"
            className="small-image"
          />
        </div>
      </div>

      {/* График работы */}
      <div className="work-hours">
        <h2>График работы</h2>
        <ul className="list-group">
          <li className="list-group-item">Понедельник: 9:00 - 18:00</li>
          <li className="list-group-item">Вторник: 9:00 - 18:00</li>
          <li className="list-group-item">Среда: 9:00 - 18:00</li>
          <li className="list-group-item">Четверг: 9:00 - 18:00</li>
          <li className="list-group-item">Пятница: 9:00 - 18:00</li>
          <li className="list-group-item">Суббота: 10:00 - 16:00</li>
          <li className="list-group-item">Воскресенье: Закрыто</li>
        </ul>
      </div>

      {/* Способы оплаты */}
      <div className="payment-methods">
        <h2>Способы оплаты</h2>
        <ul className="list-group">
          <li className="list-group-item">Наличные</li>
          <li className="list-group-item">Наложенный платеж</li>
          <li className="list-group-item">Банковские карты</li>
          <li className="list-group-item">Электронные кошельки</li>
        </ul>
      </div>

      {/* Как получить товар */}
      <div className="payment-methods">
        <h2>Как получить товар:</h2>
        <ul className="list-group">
          <li className="list-group-item">
            Оформите заказ на сайте и выберите пункт "Самовывоз".
          </li>
          <li className="list-group-item">
            Дождитесь подтверждения заказа (мы свяжемся с вами по телефону или
            отправим письмо).
          </li>
          <li className="list-group-item">
            Приезжайте в наш магазин по адресу: Ростов-на-Дону, ул. Дранко, д.
            141, предъявите документ, удостоверяющий личность, и получите ваш
            заказ.
          </li>
          <li className="list-group-item">
            Самовывоз возможен только после подтверждения готовности заказа к
            выдаче.
          </li>
        </ul>
      </div>

      {/* Карта */}
      <section className="map-section">
        <h2>Наше местоположение</h2>
        <div className="map-container">
          <MapContainer
            center={[47.2228, 39.7206]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "600px", width: "800px" }}
          >
            <ResizeMap />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">участники OpenStreetMap</a>'
            />
            <Marker position={[47.2228, 39.7206]} icon={customIcon}>
              <Popup>
                Торговое помещение.
                <br />
                Ул. Дранко 141
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>

      {/* Ссылка на главную страницу */}
      <a href="/" className="back-to-main">
        Вернуться на главную страницу
      </a>
    </main>
  );
};

export default SalesroomPage;
