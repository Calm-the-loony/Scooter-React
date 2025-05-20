import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserApiService } from "../../service/api/user/UserApiService";
import "../../style/CheckoutPage.scss";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(
    JSON.parse(localStorage.getItem("productBuy"))["resultPrice"],
  );
  const [deliveryCost, setDeliveryCost] = useState(300); // начальная стоимость доставки
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Russia",
    paymentMethod: "creditCard",
    deliveryMethod: "standard",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Получаем данные пользователя из localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      setFormData({
        ...formData,
        name: userData.name || "",
        email: userData.email_user || "",
        phone: userData.phone || "",
        address: userData.address || "",
        city: userData.address_city || "",
      });
    }

    // Загрузка данных корзины из localStorage
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  const deliveryCosts = {
    standard: 300,
    express: 500,
    pickup: 0,
  };

  const cityDistances = {
    "Ростов-на-Дону": 0,
    Москва: 1000,
    "Санкт-Петербург": 1300,
    Краснодар: 200,
    Волгоград: 400,
    "Белая Калитва": 80,
    Воронеж: 500,
    Новороссийск: 150,
    Сочи: 700,
    Астрахань: 600,
  };

  useEffect(() => {
    // Функция для пересчета стоимости доставки
    const calculateDeliveryCost = () => {
      const cityDistance = cityDistances[formData.city] || 0;
      const baseDeliveryCost = deliveryCosts[formData.deliveryMethod] || 0;
      const calculatedCost = baseDeliveryCost + cityDistance * 2; // добавляем стоимость на основе расстояния
      setDeliveryCost(calculatedCost);
    };
    calculateDeliveryCost();
  }, [formData.city, formData.deliveryMethod]); // обновляем, когда меняется город или способ доставки

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.address
    ) {
      alert("Пожалуйста, заполните все обязательные поля.");
    } else {
      UserApiService.buyOrder({
        products: JSON.parse(localStorage.getItem("productBuy"))["products"],
        id_orders: JSON.parse(localStorage.getItem("productBuy"))["orderList"],
        username: formData.name,
        email: formData.email,
        telephone: formData.phone,
        address: formData.address,
        type_delivery: formData.deliveryMethod,
        type_buy: formData.paymentMethod,
        price_delivery: totalAmount + deliveryCost,
      })
        .then((data) => {
          window.location.href = data.data.redirect_url;
        })
        .finally(() => {
          localStorage.removeItem("productBuy");
        });
      // navigate('/payp');
    }
  };

  return (
    <div className="checkout-page-container">
      <h2>Оформление заказа</h2>

      <div className="checkout-page-content">
        <div className="checkout-page-form">
          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label>Имя</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Телефон</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Город</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Адрес</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Способ доставки</label>
              <select
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={handleChange}
              >
                <option value="standard">Стандартный</option>
                <option value="express">Экспресс</option>
                <option value="pickup">Самовывоз</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              Перейти к оплате
            </button>
          </form>
        </div>

        <div className="checkout-page-summary">
          <h3>Итоги заказа</h3>
          <div className="checkout-page-cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-page-cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>
                    ₽{item.price} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-page-summary-details">
            <p className="summary-item">
              <span>Сумма товаров:</span>
              <strong>₽{totalAmount.toFixed(2)}</strong>
            </p>
            <p className="summary-item">
              <span>Стоимость доставки:</span>
              <strong>₽{deliveryCost.toFixed(2)}</strong>
            </p>
            <p className="checkout-page-summary-final">
              <span>Итого:</span>
              <strong>₽{(totalAmount + deliveryCost).toFixed(2)}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
