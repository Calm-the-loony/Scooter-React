import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Импорт контекста корзины
import "../style/FavoritesPage.css";

const FavoritesPage = () => {
  const [favoriteItems, setFavoriteItems] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return storedFavorites;
  });

  const { addToCart } = useContext(CartContext); // Использование контекста корзины

  // Функция для удаления товара из избранного
  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteItems.filter((item) => item.id !== id);
    setFavoriteItems(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Функция для добавления товара в корзину
  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 }); // Добавляем товар в корзину через контекст
    alert("Товар добавлен в корзину!");
  };

  // Функция для добавления товара в избранное
  const handleAddToFavorites = (item) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    if (!isFavorite) {
      favorites.push(item);
      setFavoriteItems(favorites);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Товар добавлен в избранное!");
    } else {
      alert("Товар уже в избранном!");
    }
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2 className="favorites-title">Избранное</h2>
      </div>
      <table id="favorite-list" className="favorites-table">
        <thead>
          <tr>
            <th>Изображение</th>
            <th>Название товара</th>
            <th>Цена за штуку</th>
            <th>Наличие на складе</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {favoriteItems.length ? (
            favoriteItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.name} className="favorite-product-image" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.stock > 0 ? `В наличии (${item.stock} шт)` : "Нет в наличии"}</td>
                <td>
                  <button className="remove-from-favoritess" onClick={() => removeFromFavorites(item.id)}>Удалить</button>
                  {item.stock > 0 && (
                    <button
                      className="add-to-cart-fav"
                      onClick={() => handleAddToCart(item)} // Передаем весь объект товара
                    >
                      В корзину
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>Ваш список избранного пуст.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FavoritesPage;
