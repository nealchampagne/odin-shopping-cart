import { useState, createContext } from "react";

const CartContext = createContext([]);

export const CartContextProvider = ({ initialCart = [], children }) => {
  const [cartArray, setCartArray] = useState(initialCart);

  return (
    <CartContext.Provider value={{ cartArray, setCartArray }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
