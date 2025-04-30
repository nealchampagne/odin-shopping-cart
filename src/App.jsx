import { useState, createContext } from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';
import './App.css'

export const CartContext = createContext([]);

function App({ page }) {

  const [cartArray, setCartArray] = useState([]);

  let main;

  if (page === "home") {
    main = <Home />
  } else if (page === "shop") {
    main = <Shop />
  } else if (page === "cart") {
    main = <Cart />
  }

  return (
    <CartContext.Provider value={{cartArray, setCartArray}}>
      <Navbar />
      <div className="main">
        { main }
      </div>
    </CartContext.Provider>
  );
};

export default App
