import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import JobsPage from "../components/JobsPage"; // Убедитесь, что путь правильный

describe("JobsPage Component", () => {
  test("filters job list based on search query", () => {
    render(<JobsPage />);

    // Ищем поле для ввода текста
    const searchInput = screen.getByPlaceholderText("Поиск вакансий");

    // Изначально все вакансии должны быть видимы
    const jobCards = screen.getAllByRole("heading", { level: 3 });
    expect(jobCards.length).toBe(10); // Проверяем, что на странице 10 вакансий

    // Вводим текст в поле поиска
    fireEvent.change(searchInput, { target: { value: "Кассир" } });

    // После ввода текста, список должен фильтроваться
    const filteredJobCards = screen.getAllByRole("heading", { level: 3 });
    expect(filteredJobCards.length).toBe(1); // Должна остаться только 1 вакансия (Кассир)

    // Проверяем, что текст вакансии "Кассир" отображается
    expect(filteredJobCards[0]).toHaveTextContent("Кассир");
  });
});
