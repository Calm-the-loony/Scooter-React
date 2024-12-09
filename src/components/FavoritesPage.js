import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../style/FavoritesPage.scss";

const FavoritesPage = () => {
  const [favoriteItems, setFavoriteItems] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const { addToCart } = useContext(CartContext);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteItems.filter((item) => item.id !== id);
    setFavoriteItems(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
   
  };

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Избранное</h2>
      {favoriteItems.length ? (
        <div className="favorites-list">
          {favoriteItems.map((item) => (
            <div key={item.id} className="favorite-item">
              <img src={item.image} alt={item.name} className="favorite-image" />
              <div className="favorite-details">
                <p className="favorite-name">{item.name}</p>
                <p className="favorite-price">{item.price} ₽</p>
                <p className="favorite-stock">
                  {item.stock > 0 ? `В наличии (${item.stock} шт)` : "Нет в наличии"}
                </p>
              </div>
              <div className="favorite-actions">
                <button className="favorite-remove" onClick={() => removeFromFavorites(item.id)}>
                  Удалить
                </button>
                {item.stock > 0 && (
                  <button className="favorite-add-to-cart" onClick={() => handleAddToCart(item)}>
                    В корзину
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="favorites-empty">Ваш список избранного пуст.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
