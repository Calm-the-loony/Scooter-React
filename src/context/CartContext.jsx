import React, {createContext} from "react";
import {useDispatch} from "react-redux";

import {checkAuthUser} from "../state/middleware/auth_user";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkAuthUser());
  }, []);

  return children;
};

export default CartProvider;
