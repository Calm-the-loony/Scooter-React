import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "../style/CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => {
        const itemPrice = parseFloat(item.price);
        const itemQuantity = parseInt(item.quantity, 10);
        return acc + (itemPrice * itemQuantity || 0);
      }, 0)
      .toFixed(2);
  };

  const totalPrice = calculateTotal();

  const handlePurchase = () => {
    setModalOpen(true);
  };

  const handleConfirm = () => {
    const user = JSON.parse(localStorage.getItem("userData")) || {};
    const orders = user.orders || [];

    const newOrder = {
      id: orders.length + 1,
      date: new Date().toLocaleString(),
      status: "Ожидает обработки",
      items: cartItems,
      total: totalPrice,
      deliveryMethod: selectedOption === "delivery" ? "Доставка" : "Самовывоз",
      paymentMethod: paymentMethod === "card" ? "Карта" : "Наличные",
    };

    user.orders = [...orders, newOrder];
    localStorage.setItem("userData", JSON.stringify(user));

    alert(`Ваш заказ успешно оформлен! 
    Способ доставки: ${newOrder.deliveryMethod}
    Способ оплаты: ${newOrder.paymentMethod}
    Сумма: ${totalPrice} ₽`);

    setModalOpen(false);
    clearCart();
  };

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
                <td>{item.price} </td>
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
              <td colSpan="5" style={{ textAlign: "center" }}>Ваша корзина пуста</td>
            </tr>
          )}
        </tbody>
      </table>

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

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Подтверждение заказа</h3>
            <p>Выберите способ доставки:</p>
            <div>
              <label>
                <input
                  type="radio"
                  value="delivery"
                  checked={selectedOption === "delivery"}
                  onChange={() => setSelectedOption("delivery")}
                />
                Доставка
              </label>
              <label>
                <input
                  type="radio"
                  value="pickup"
                  checked={selectedOption === "pickup"}
                  onChange={() => setSelectedOption("pickup")}
                />
                Самовывоз
              </label>
            </div>

            <p>Выберите способ оплаты:</p>
            <div>
              <label>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Карта
              </label>
              <label>
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                Наличные
              </label>
            </div>

            <div className="modal-actions">
              <button className="confirm-button" onClick={handleConfirm}>
                Подтвердить
              </button>
              <button className="cancel-button" onClick={() => setModalOpen(false)}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
