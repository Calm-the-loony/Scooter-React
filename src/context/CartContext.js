import React, { createContext, useState } from "react";

// Создаем контекст
export const CartContext = createContext();

// Провайдер для контекста корзины
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Функция для добавления товара в корзину
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  // Функция для удаления товара из корзины
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Очистка корзины
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
