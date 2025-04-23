import React from "react";
import { RouterProvider } from "react-router-dom";

import CartProvider from "./context/CartContext";
import { router } from "./router/router";
import "./App.css";

const App = () => {
  
  return (
    <CartProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </CartProvider>
  );
};

export default App;