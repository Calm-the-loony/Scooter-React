import React from "react";
import { render } from "@testing-library/react";
import BrandsPage from "../components/BrandsPage"; // Убедитесь, что путь правильный

test("displays 'Koso' brand name", () => {
  render(<BrandsPage />);

  // Проверяем, что элемент с data-name="Koso" присутствует в документе
  const kosoBrand = document.querySelector('[data-name="Koso"]');
  expect(kosoBrand).toBeInTheDocument();
});
