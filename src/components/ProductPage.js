import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Импорт CartContext
import products from "../data/products";
import "../style/ProductPage.scss";

// Компонент аккордеона
const Accordion = ({ product, reviews, handleSubmit, handleChange, form }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="accordion-container">
      <section className="accordion">
        {/* Детали */}
        <div className={`accordion-item ${activeIndex === 0 ? "open" : ""}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(0)}>
            <span>Детали</span>
            <i
              className={`fas fa-chevron-${activeIndex === 0 ? "up" : "down"}`}
            ></i>
          </div>
          {activeIndex === 0 && (
            <div className="accordion-content">
              <p>
                <strong>Вес:</strong> {product.weight || "Не указан"}
              </p>
              <p>
                <strong>Габариты:</strong> {product.dimensions || "Не указаны"}
              </p>
            </div>
          )}
        </div>

        {/* Описание */}
        <div className={`accordion-item ${activeIndex === 1 ? "open" : ""}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(1)}>
            <span>Описание</span>
            <i
              className={`fas fa-chevron-${activeIndex === 1 ? "up" : "down"}`}
            ></i>
          </div>
          {activeIndex === 1 && (
            <div className="accordion-content">
              <p>{product.description || "Описание товара не указано."}</p>
            </div>
          )}
        </div>

        {/* Отзывы */}
        <div className={`accordion-item ${activeIndex === 2 ? "open" : ""}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(2)}>
            <span>Отзывы</span>
            <i className={`fas fa-chevron-${activeIndex === 2 ? "up" : "down"}`}></i>
          </div>
          {activeIndex === 2 && (
            <div className="accordion-content">
              {reviews.length > 0 ? (
                <div className="reviews-list">
                  {reviews.map((rev, index) => (
                    <div key={index} className="review">
                      <p>
                        <strong>{rev.name}</strong> ({rev.date})
                      </p>
                      <p>Оценка: {"⭐".repeat(rev.rating)}</p>
                      <p>{rev.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Отзывов пока нет.</p>
              )}
              
              {/* Убираем приглашение, если есть отзывы */}
              {reviews.length === 0 && (
                <h3>Будьте первым, кто оставил отзыв на “{product.name}”</h3>
              )}

              <div className="review-form-wrapper">
                <h3>Оставьте ваш отзыв</h3>
                <form onSubmit={handleSubmit}>
                  <label>Имя *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Имя *"
                  />
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Email *"
                  />
                  <label>Ваша оценка *</label>
                  <select
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    required
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <label>Ваш отзыв *</label>
                  <textarea
                    name="text"
                    value={form.text}
                    onChange={handleChange}
                    required
                    placeholder="Ваш отзыв *"
                  ></textarea>
                  <button type="submit">Отправить</button>
                </form>
              </div>
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

  const [viewedProducts, setViewedProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("viewedProducts")) || [];
  });

  // Состояние для отзывов
  const [reviews, setReviews] = useState([]);

  // Состояние формы
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: "",
    text: ""
  });

  // Обработчик изменения данных формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      name: form.name,
      date: new Date().toLocaleDateString(),
      rating: parseInt(form.rating),
      text: form.text
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);

    // Очистка формы после отправки
    setForm({
      name: "",
      email: "",
      rating: "",
      text: ""
    });
  };

  useEffect(() => {
    const fetchedProduct = products.find((product) => product.id === id);
    setProduct(fetchedProduct);

    if (fetchedProduct) {
      const updatedViewed = [
        ...viewedProducts.filter((p) => p.id !== fetchedProduct.id),
        fetchedProduct,
      ];
      setViewedProducts(updatedViewed);
      localStorage.setItem("viewedProducts", JSON.stringify(updatedViewed));
    }
  }, [id]);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddToFavorites = () => {
    const isAlreadyFavorite = favorites.some((item) => item.id === product.id);
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, product];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Добавлено в избранное.");
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
            <p>
              <strong>Цена:</strong>
              {product.discount ? (
                <>
                  <span
                    style={{ textDecoration: "line-through", marginRight: "10px" }}
                  >
                    {product.price}
                  </span>
                  {product.price - (product.price * product.discount) / 100} ₽
                </>
              ) : (
                product.price
              )}
            </p>
          </div>
          <div className="product-stock">
            <p>
              <strong>На складе:</strong> {product.stock > 0 ? "В наличии" : "Не в наличии"}
            </p>
          </div>
          <div className="product-buttons">
            <button className="btn-cart" onClick={handleAddToCart}>
              Добавить в корзину
            </button>
            <button className="btn-favorite" onClick={handleAddToFavorites}>
              Добавить в избранное
            </button>
          </div>
          <div className="info-panel">
            <p>
              <strong>Доп. комплект:</strong> {product.extra || "Нет данных"}
            </p>
            <p>
              <strong>Артикул:</strong> {product.article}
            </p>
            <p>
              <strong>Категория:</strong> {product.category}
            </p>
            <p>
              <strong>Метки:</strong> {product.tags}
            </p>
          </div>
        </div>
      </div>

      <div className="accordion-wrapper">
        <Accordion
          product={product}
          reviews={reviews}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          form={form}
        />
      </div>

      {/* Просмотренные товары */}
      <div className="viewed-products">
        <h2>Вы недавно смотрели</h2>
        <div className="viewed-list">
          {viewedProducts.map((item) => (
            <div key={item.id} className="viewed-item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.price} ₽</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
