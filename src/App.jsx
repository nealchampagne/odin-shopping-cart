import { CartContextProvider } from "./components/CartContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import "./App.css";

const App = ({ page }) => {
  let main;

  // Render different page components based on page prop
  if (page === "home") {
    main = <Home />;
  } else if (page === "shop") {
    main = <Shop />;
  } else if (page === "cart") {
    main = <Cart />;
  }

  return (
    // Pass the cart state variable and setter to context
    <CartContextProvider
      children={
        <>
          <Navbar />
          <div className="main">{main}</div>
        </>
      }
    />
  );
};

export default App;
