import React, { useEffect, useState } from "react";
import "../../style/CartPage.scss";
import { UserApiService } from "../../service/api/user/UserApiService";
import { useDispatch } from "react-redux";
import { exitUser } from "../../state/actions/authAction";
import { useNavigate } from "react-router-dom";  // Импортируем useNavigate

const CartPage = () => {
  const [orderProducts, setOrderProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Инициализируем navigate

  const handlePurchase = () => {
    // Навигация на страницу оформления заказа при нажатии на кнопку
    navigate("/checkout");
  };

  const plusProduct = (id_order) => {
    setOrderProduct((prevOrderProducts) => {
      const newOrderData = prevOrderProducts.map((el) => {
        if (el.order_data.id_order === id_order) {
          el.order_data.quantity += 1;
        }
        return el;
      });

      sumResultPrice(newOrderData);
      return newOrderData;
    });
  };

  const minusProduct = (id_order) => {
    setOrderProduct((prevOrderProducts) => {
      const newOrderData = prevOrderProducts.map((el) => {
        if (el.order_data.id_order === id_order) {
          if (el.order_data.quantity > 0) {
            el.order_data.quantity -= 1;
          }
        }
        return el;
      });

      sumResultPrice(newOrderData);
      return newOrderData;
    });
  };

  const sumResultPrice = (orderProducts = null) => {
    let total = 0;
    const products = orderProducts || orderProducts;
    if (products) {
      products.forEach((el) => {
        total += el.order_data.price_result * el.order_data.quantity;
      });
    }
    setTotalPrice(total);
  };

  const deleteProduct = async (id_product) => {
    try {
      // Удаляем товар с сервера
      await UserApiService.deleteUserOrder(id_product);

      // Обновляем корзину
      setOrderProduct((prevOrderProducts) => {
        const updatedOrderProducts = prevOrderProducts.filter(
          (item) => item.order_data.id_order !== id_product
        );
        sumResultPrice(updatedOrderProducts);  // Пересчитываем итоговую сумму
        return updatedOrderProducts;
      });
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  useEffect(() => {
    const req = async () => {
      const userOrders = await UserApiService.userOrders();
      if (userOrders) {
        setOrderProduct(userOrders.orders);
        sumResultPrice(userOrders.orders);
      } else {
        dispatch(exitUser());
      }
    };

    req();
  }, [dispatch]);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Корзина</h2>
      </div>

      <div className="cart-list">
        {orderProducts.length > 0 ? (
          orderProducts.map((item) => (
            <div key={item.product_data.id} className="cart-item">
              <img
                src={item.product_data.photos[0] ? item.product_data.photos[0].photo_url : ""}
                alt={item.product_data.name_product}
                className="cart-product-image"
              />
              <div className="cart-details">
                <p className="cart-item-name">
                  {item.product_data.name_product}
                </p>
                <p className="cart-item-price">
                  {item.product_data.price_product}
                </p>
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
    </div>
  );
};

export default CartPage;
