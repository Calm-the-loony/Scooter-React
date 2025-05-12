// src/tests/NotFoundPage.test.js
import React from "react";
import {render, screen} from "@testing-library/react";
import NotFoundPage from "../components/NotFoundPage"; // Убедитесь, что путь правильный

describe("NotFoundPage", () => {
  it("should render 404 message and description", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Страница не найдена")).toBeInTheDocument();
    expect(screen.getByText("Вернуться на главную")).toBeInTheDocument();
  });
});
