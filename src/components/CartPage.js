import React, { useState, useEffect } from "react";
import "../style/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Получение данных корзины из localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total.toFixed(2));
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Корзина</h2>
        <div className="breadcrumbs">
          <a href="/">Главная</a> &raquo; <span>Корзина</span>
        </div>
      </div>

      <table id="cart-list" className="cart-table">
        <thead>
          <tr>
            <th>Изображение</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-product-image"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price} ₽</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  />
                </td>
                <td>
                  <button onClick={() => removeItem(item.id)}>Удалить</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Ваша корзина пуста
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="cart-total">
        <p>Итого: <span id="total-price">{totalPrice} ₽</span></p>
        {cartItems.length > 0 && (
          <button className="buy-button" onClick={() => alert("Оформление покупки...")}>
            Купить
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
