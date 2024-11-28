import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";  // Хук для навигации

const ProductCard = ({ id, stock, type, brand, model, category, image, name, price }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();  // Инициализация хука для навигации

  // Функция для добавления товара в избранное
  const handleAddToFavorites = (event) => {
    event.stopPropagation(); // Останавливаем всплытие события
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favorites.some((item) => item.id === id);
  
    if (!isFavorite) {
      // Добавляем товар в избранное с учетом stock
      favorites.push({ id, name, price, image, stock });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Товар добавлен в избранное!");
    } else {
      alert("Товар уже в избранном!");
    }
  };
  

  // Функция для добавления товара в корзину
  const handleAddToCart = (event) => {
    event.stopPropagation();  // Останавливаем всплытие события
    addToCart({ id, name, price, image });
    alert("Товар добавлен в корзину!");
  };

  // Функция для открытия карточки товара
  const handleCardClick = () => {
    navigate(`/product/${id}`);  // Переход на страницу с подробной информацией о товаре
  };

  return (
    <div className="product-card" data-id={id} onClick={handleCardClick}>
      <img src={image} alt={name} />
      <div className="details">
        <p className="category">{category}</p>
        <p className="name ellipsis">{name}</p>
        <div className="price">
          <div className="original-price-wrapper no-discount">
            <span className="original-prices">{price} ₽</span>
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>
            <i className="fas fa-shopping-cart"></i>
          </button>
        </div>
        <button className="add-to-favorites" onClick={handleAddToFavorites}>
          <i className="fas fa-heart"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
