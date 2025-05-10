import React, {createContext} from "react";
import {Provider} from "react-redux";
import scooterStore from "../state/store/configureStore";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  return <Provider store={scooterStore}>{children}</Provider>;
};

export default CartProvider;
