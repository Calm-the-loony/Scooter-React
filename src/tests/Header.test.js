// src/tests/Header.test.js
import {render, screen} from "@testing-library/react";
import Header from "../components/Header"; // корректный путь к компоненту
import {CartProvider} from "../context/CartProvider"; // корректный путь к CartProvider

// Мокаем CartContext для теста, если необходимо
const mockCartContext = {
  cartItems: [], // или добавить тестовые элементы в корзину, если нужно
};

test("renders Header with the correct city and button", () => {
  // Используем CartProvider с mock контекстом
  render(
    <CartProvider value={mockCartContext}>
      <Header />
    </CartProvider>,
  );

  // Проверяем, что текст "Ваш город" отображается
  const cityText = screen.getByText(/Ваш город/i);
  expect(cityText).toBeInTheDocument();

  // Проверяем, что кнопка смены города отображается
  const changeCityButton = screen.getByText(/Сменить/i);
  expect(changeCityButton).toBeInTheDocument();
});
