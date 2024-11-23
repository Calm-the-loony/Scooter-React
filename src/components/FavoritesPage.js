import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/FavoritesPage.css";

const FavoritesPage = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Получение данных избранного из localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteItems(storedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteItems.filter((item) => item.id !== id);
    setFavoriteItems(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const addToCart = (id) => {
    const itemToAdd = favoriteItems.find((item) => item.id === id);
    if (itemToAdd) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((cartItem) => cartItem.id === id);

      if (existingItem) {
        existingItem.quantity += 1; // Увеличиваем количество
      } else {
        cart.push({ ...itemToAdd, quantity: 1 }); // Добавляем новый товар
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Товар добавлен в корзину");
    }
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2 className="favorites-title">Избранное</h2>
        <div className="breadcrumbs">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Главная
          </a>{" "}
          &raquo; <span>Избранное</span>
        </div>
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
                  <img
                    src={item.image}
                    alt={item.name}
                    className="favorite-product-image"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price} ₽</td>
                <td>{item.stock > 0 ? "В наличии" : "Нет в наличии"}</td>
                <td>
                  <button
                    className="remove-from-favorites"
                    onClick={() => removeFromFavorites(item.id)}
                  >
                    Удалить
                  </button>
                  {item.stock > 0 && (
                    <button
                      className="add-to-cart"
                      onClick={() => addToCart(item.id)}
                    >
                      В корзину
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Ваш список избранного пуст.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FavoritesPage;
