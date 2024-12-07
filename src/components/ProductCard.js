import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, stock, type, brand, model, category, image, name, price }) => {
  const { addToCart } = useContext(CartContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // Проверка при монтировании компонента, находится ли товар в избранном
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favorites.some((item) => item.id === id);
    setIsFavorite(isAlreadyFavorite);
  }, [id]);

  // Функция для добавления товара в избранное
  const handleAddToFavorites = (event) => {
    event.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favorites.some((item) => item.id === id);

    if (!isAlreadyFavorite) {
      favorites.push({ id, name, price, image, stock });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    } else {
      // Если товар уже в избранном, можно добавить логику для его удаления
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    }
  };

  // Функция для добавления товара в корзину
  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart({ id, name, price, image });
   
  };

  // Функция для открытия карточки товара
  const handleCardClick = () => {
    navigate(`/product/${id}`);
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
        <button
          className={`add-to-favorites ${isFavorite ? "active" : ""}`}
          onClick={handleAddToFavorites}
        >
          <i className="fas fa-heart"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
