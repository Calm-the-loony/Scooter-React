import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Для перехода
import { CartContext } from "../context/CartContext";
import "../style/CartPage.scss";

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate(); // Для навигации

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => {
        const itemPrice = parseFloat(item.price.replace(' ₽', '').replace(',', '.'));
        const itemQuantity = parseInt(item.quantity, 10);
        return acc + (itemPrice * itemQuantity || 0);
      }, 0)
      .toFixed(2);
  };

  const totalPrice = calculateTotal();

  const handlePurchase = () => {
    // Переход на страницу оформления заказа
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Корзина</h2>
      </div>

      <div className="cart-list">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-product-image" />
              <div className="cart-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">{item.price}</p>
                <div className="quantity-container">
                  <button
                    className="quantity-button"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Удалить
              </button>
            </div>
          ))
        ) : (
          <p className="empty-cart">Ваша корзина пуста</p>
        )}
      </div>

      <div className="cart-total">
        <p>
          Итого: <span id="total-price">{totalPrice} ₽</span>
        </p>
        {cartItems.length > 0 && (
          <button className="buy-button" onClick={handlePurchase}>
            Купить
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
