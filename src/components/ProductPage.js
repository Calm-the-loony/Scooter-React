import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Импорт CartContext
import products from "../data/products";
import "../style/ProductPage.css";

// Компонент аккордеона
const Accordion = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="accordion-container">
      <section className="accordion">
        {/* Детали */}
        <div className={`accordion-item ${activeIndex === 0 ? 'open' : ''}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(0)}>
            <span>Детали</span>
            <i className={`fas fa-chevron-${activeIndex === 0 ? 'up' : 'down'}`}></i>
          </div>
          {activeIndex === 0 && (
            <div className="accordion-content">
              <p>Вес: Не указан</p>
              <p>Габариты: Не указаны</p>
            </div>
          )}
        </div>

        {/* Описание */}
        <div className={`accordion-item ${activeIndex === 1 ? 'open' : ''}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(1)}>
            <span>Описание</span>
            <i className={`fas fa-chevron-${activeIndex === 1 ? 'up' : 'down'}`}></i>
          </div>
          {activeIndex === 1 && (
            <div className="accordion-content">
              <p>Описание товара не указано.</p>
            </div>
          )}
        </div>

        {/* Отзывы */}
        <div className={`accordion-item ${activeIndex === 2 ? 'open' : ''}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(2)}>
            <span>Отзывы</span>
            <i className={`fas fa-chevron-${activeIndex === 2 ? 'up' : 'down'}`}></i>
          </div>
          {activeIndex === 2 && (
            <div className="accordion-content">
              <p>Отзывов пока нет.</p>
              <h3>Будьте первым, кто оставил отзыв на “{product.name}”</h3>
              <form>
                <label>Имя *</label>
                <input type="text" required />
                <label>Email *</label>
                <input type="email" required />
                <label>Ваша оценка *</label>
                <select required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <label>Ваш отзыв *</label>
                <textarea required></textarea>
                <button type="submit">Отправить</button>
              </form>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return storedFavorites;
  });

  useEffect(() => {
    const fetchedProduct = products.find((product) => product.id === id);
    setProduct(fetchedProduct);
  }, [id]);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddToFavorites = () => {
    const isAlreadyFavorite = favorites.some(item => item.id === product.id);
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, product];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("");
    } else {
      alert("Этот товар уже в избранном!");
    }
  };

  return (
    <div className="product-page">
      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-price">
            <p><strong>Цена:</strong> {product.price}</p>
          </div>
          <div className="product-stock">
            <p><strong>На складе:</strong> {product.stock > 0 ? "В наличии" : "Не в наличии"}</p>
          </div>
          <div className="product-buttons">
            <button className="btn-cart" onClick={handleAddToCart}>Добавить в корзину</button>
            <button className="btn-favorite" onClick={handleAddToFavorites}>Добавить в избранное</button>
          </div>
          <div className="info-panel">
            <p><strong>Доп. комплект:</strong> {product.extra || "Нет данных"}</p>
            <p><strong>Артикул:</strong> {product.article}</p>
            <p><strong>Категория:</strong> {product.category}</p>
            <p><strong>Метки:</strong> {product.tags}</p>
          </div>
        </div>
      </div>

      <div className="accordion-wrapper">
        <Accordion product={product} />
      </div>
    </div>
  );
};

export default ProductPage;
