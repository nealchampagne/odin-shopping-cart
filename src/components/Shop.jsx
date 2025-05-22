import { useState, useEffect } from "react";
import ShopItem from "./ShopItem";
import styles from "../styles/Shop.module.css";
import ShimmerCard from "./ShimmerCard";
import { v4 as uuidv4 } from "uuid";
import ErrorPage from "./ErrorPage";

const Shop = () => {

  // Initialize state variables
  const [catalog, setCatalog] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch catalog data and store in catalog state
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
  const shimmerArray = new Array(20);
  shimmerArray.fill(0);

  return (
    <div data-testid="shop">
      {/* If there's an error, show the error page */}
      {error ? (
        <ErrorPage error={error} />
      ) : (
        // Otherwise, show the shop page
        <div data-testid="shopcards" className={styles.shop}>
          {/* While loading, show the shimmer cards */}
          {loading
            ? shimmerArray.map((item) => (
                <ShimmerCard key={uuidv4()} type="shop" />
              ))
            // Once done loading, render the real shop items
            : catalog.map((item) => (
                <ShopItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
