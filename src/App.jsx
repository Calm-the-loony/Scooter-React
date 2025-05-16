import React from "react";
import { RouterProvider } from "react-router-dom";

import CartProvider from "./context/CartContext";
import { router } from "./router/router";
import "./App.css";
import { Provider } from "react-redux";
import scooterStore from "./state/store/configureStore";

const App = () => {
  return (
    <Provider store={scooterStore}>
      <CartProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartProvider>
    </Provider>
  );
};

export default App;
