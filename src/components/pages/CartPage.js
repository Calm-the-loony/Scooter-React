import React, { useEffect, useState } from "react";
import "../../style/CartPage.scss";
import { UserApiService } from "../../service/api/user/UserApiService";
import { useDispatch } from "react-redux";
import {exitUser} from "../../state/actions/authAction";


const CartPage = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [orderProducts, setOrderProduct] = useState(false);
  const [selectedOption, setSelectedOption] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  const handlePurchase = () => {
    setModalOpen(true);
  };

  const handleConfirm = () => {

    const newOrder = {
      id: orderProducts.length + 1,
      date: new Date().toLocaleString(),
      status: "Ожидает обработки",
      items: orderProducts,
      total: 1000,
      deliveryMethod: selectedOption === "delivery" ? "Доставка" : "Самовывоз",
      paymentMethod: paymentMethod === "card" ? "Карта" : "Наличные",
    };


    alert(`Ваш заказ успешно оформлен! 
    Способ доставки: ${newOrder.deliveryMethod}
    Способ оплаты: ${newOrder.paymentMethod}
    Сумма: ${1000} ₽`);

    setModalOpen(false);
    // clearCart();
  };

  const plusProduct = (id_order) => {
    const newOrderData = orderProducts.map((el, indx) => {
      if (el.order_data.id_order === id_order) {
        orderProducts[indx].order_data.quantity += 1;
      }
      return el
    });

    setOrderProduct(newOrderData);
    sumResultPrice();
  }

  const minusProduct = (id_order) => {
    const newOrderData = orderProducts.map((el, indx) => {
      if (el.order_data.id_order === id_order) {
        if (orderProducts[indx].order_data.quantity !== 0) {
          orderProducts[indx].order_data.quantity -= 1;
        }
      }
      return el
    });

    setOrderProduct(newOrderData);
    sumResultPrice();
  }

  const sumResultPrice = () => {
    if (orderProducts) {
      orderProducts.forEach((el) => {
        setTotalPrice(el.order_data.price_result * el.order_data.quantity);
      })
    }
  }

  const deleteProduct = async (id_product) => {
    await UserApiService.deleteUserOrder(id_product);
  }

  useEffect(() => {
    const req = async () => {
      const userOrders = await UserApiService.userOrders();
      if (userOrders) {
        setOrderProduct(userOrders.orders);
        sumResultPrice();
      } else {
        dispatch(exitUser());
      }
    }
    
    req();
  }, []);

  
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Корзина</h2>
      </div>

      <div className="cart-list">
        {orderProducts.length > 0 ? (
          orderProducts.map((item) => (
            <div key={item.order_data.id} className="cart-item">
              <img src={item.product_data.photos?.[0]} alt={item.product_data.name_product} className="cart-product-image" />
              <div className="cart-details">
                <p className="cart-item-name">{item.product_data.name_product}</p>
                <p className="cart-item-price">{item.order_data.price_result}</p>
                <div className="quantity-container">
                  <button
                    className="quantity-button"
                    onClick={() => minusProduct(item.order_data.id_order)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.order_data.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => plusProduct(item.order_data.id_order)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => deleteProduct(item.order_data.id_order)}
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
        {orderProducts.length > 0 && (
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
