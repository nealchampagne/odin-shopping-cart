import { useState, useEffect, useContext } from "react";
import CartItem from "./CartItem";
import styles from "../styles/Cart.module.css";
import CartContext from "./CartContext";
import ShimmerCard from "./ShimmerCard";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const Cart = () => {

  // Initialize state and use CartContext
  const [catalog, setCatalog] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cartArray, setCartArray } = useContext(CartContext);

  /**  Fetch catalog data again incase something changes between 
   *   adding to cart and checkout */
  useEffect(() => {
    fetch("https://fakestoreapi.com/products", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setCatalog(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Create array for shimmer cards
  const shimmerArray = new Array(4);
  shimmerArray.fill(0);

  return (
    <div data-testid="cart" className={styles.cart}>
      <div data-testid="cartcards" className={styles.main}>
        {/* If there's an error, render the error page */}
        {error ? (
          <ErrorPage error={`${error}`} />
        // If loading, show the shimmer cards
        ) : loading ? (
          shimmerArray.map((item) => <ShimmerCard key={uuidv4()} type="cart" />)
        // If cart array is empty, show empty cart message
        ) : cartArray.length === 0 ? (
          <div className={styles.emptyCart}>
            Looks like your cart is empty!
            <br></br>
            <Link className={styles.returnButton} to="../shop">
              Return to store
            </Link>
          </div>
        ) : (
          // Otherwise, render cart items
          cartArray.map((item) => {
            let catItem = catalog.find((e) => e.id === item.id);
            if (catItem)
              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={catItem.title}
                  image={catItem.image}
                  price={catItem.price}
                />
              );
          })
        )}
      </div>
      <div className={styles.subtotal}>
        <p tabIndex="0">Subtotal:</p>
        <p id="subtotal" tabIndex="0">
          $
          {parseFloat(
            catalog.length
              ? cartArray.reduce((acc, curr) => acc + curr.cost, 0)
              : 0,
          ).toFixed(2)}
        </p>
      </div>
      {/* Disable checkout button if there's nothing in the cart */}
      <button
        data-testid="checkout"
        className={
          cartArray.length === 0
            ? styles.checkout + " " + styles.disabled
            : styles.checkout
        }
      >
        Proceed to checkout
      </button>
    </div>
  );
};

export default Cart;
