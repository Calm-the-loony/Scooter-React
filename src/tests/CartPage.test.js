import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CartContext } from "../context/CartContext";
import CartPage from "../components/CartPage";

const mockCartItems = [
  {
    id: 1,
    name: "Катушка зажигания Катушка зажигания Катушка зажигания",
    price: "1027,00",
    quantity: 2,
    image: "image1.jpg",
  },
  {
    id: 2,
    name: "Катушка зажигания Yamaha Jog",
    price: "1200,00",
    quantity: 1,
    image: "image2.jpg",
  },
];

const mockContextValue = {
  cartItems: mockCartItems,
  removeFromCart: jest.fn(),
  increaseQuantity: jest.fn(),
  decreaseQuantity: jest.fn(),
  clearCart: jest.fn(),
};

describe("CartPage Component", () => {
  beforeAll(() => {
    // Мокаем alert
    global.alert = jest.fn();
  });

  afterAll(() => {
    // Восстанавливаем alert
    global.alert.mockRestore();
  });

  test("renders cart items correctly", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartPage />
      </CartContext.Provider>,
    );

    expect(screen.getByText("Корзина")).toBeInTheDocument();
    expect(
      screen.getByText("Катушка зажигания Катушка зажигания Катушка зажигания"),
    ).toBeInTheDocument();
    expect(screen.getByText("1027,00")).toBeInTheDocument();
    expect(
      screen.getByText("Катушка зажигания Yamaha Jog"),
    ).toBeInTheDocument();
    expect(screen.getByText("1200,00")).toBeInTheDocument();
  });

  test("calculates total price correctly", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartPage />
      </CartContext.Provider>,
    );

    const totalPrice = screen.getByText(/Итого:/);

    // Рассчитываем итоговую сумму вручную:
    const total =
      parseFloat(mockCartItems[0].price.replace(",", ".")) *
        mockCartItems[0].quantity +
      parseFloat(mockCartItems[1].price.replace(",", "."));

    // Проверяем, что цена отображается корректно с учетом форматирования
    expect(totalPrice).toHaveTextContent(
      `${total.toFixed(2).replace(",", ",")} ₽`,
    );
  });

  test("handles quantity increase and decrease", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartPage />
      </CartContext.Provider>,
    );

    const increaseButtons = screen.getAllByText("+");
    const decreaseButtons = screen.getAllByText("-");

    fireEvent.click(increaseButtons[0]);
    expect(mockContextValue.increaseQuantity).toHaveBeenCalledWith(1);

    fireEvent.click(decreaseButtons[0]);
    expect(mockContextValue.decreaseQuantity).toHaveBeenCalledWith(1);
  });

  test("removes item from cart", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartPage />
      </CartContext.Provider>,
    );

    const removeButtons = screen.getAllByText("Удалить");

    fireEvent.click(removeButtons[0]);
    expect(mockContextValue.removeFromCart).toHaveBeenCalledWith(1);
  });

  test("handles purchase and opens confirmation modal", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartPage />
      </CartContext.Provider>,
    );

    const buyButton = screen.getByText("Купить");

    fireEvent.click(buyButton);
    expect(screen.getByText("Подтверждение заказа")).toBeInTheDocument();
  });

  test("confirms order and clears cart", () => {
    render(
      <CartContext.Provider value={mockContextValue}>
        <CartPage />
      </CartContext.Provider>,
    );

    const buyButton = screen.getByText("Купить");
    fireEvent.click(buyButton);

    const confirmButton = screen.getByText("Подтвердить");
    fireEvent.click(confirmButton);

    expect(mockContextValue.clearCart).toHaveBeenCalled();
    expect(screen.queryByText("Подтверждение заказа")).not.toBeInTheDocument();
  });

  test("displays empty cart message when no items", () => {
    render(
      <CartContext.Provider value={{ ...mockContextValue, cartItems: [] }}>
        <CartPage />
      </CartContext.Provider>,
    );

    expect(screen.getByText("Ваша корзина пуста")).toBeInTheDocument();
  });
});
