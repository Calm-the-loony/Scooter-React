import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Импорт контекста корзины
import "../style/CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price); // Преобразуем в число
      const itemQuantity = parseInt(item.quantity, 10); // Преобразуем в целое число
      return acc + (itemPrice * itemQuantity || 0); // Считаем общую стоимость товара
    }, 0).toFixed(2); // Округление до 2 знаков
  };

  const totalPrice = calculateTotal();

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Корзина</h2>
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
                  <img src={item.image} alt={item.name} className="cart-product-image" />
                </td>
                <td>{item.name}</td>
                <td>{item.price} ₽</td>
                <td>
                  <div className="quantity-container">
                    <button className="quantity-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span className="quantity">{item.quantity}</span>
                    <button className="quantity-button" onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </td>
                <td>
                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>Удалить</button>
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
        <p>
          Итого: <span id="total-price">{totalPrice} ₽</span>
        </p>
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
