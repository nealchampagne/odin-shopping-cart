import { useState, useContext } from "react";
import styles from "../styles/ShopItem.module.css";
import CartContext from "./CartContext";

const ShopItem = ({ id, title, price, image }) => {

  // Initialize state and use CartContext
  const [count, setCount] = useState(0);
  const { cartArray, setCartArray } = useContext(CartContext);

  // Update the count on the shop item
  const handleUpdateCount = (num) => {
    if (num > 0) {
      setCount(parseInt(count) + num);
    } else if (count > 0) {
      setCount(parseInt(count) + num);
    }
  };

  /** Add a new item of the given quantity to the cart array,
   *  or update the item count if the item already exists in the cart */
  const handleAddItem = () => {
    let cartCopy = [...cartArray];
    if (count !== 0) {
      if (cartCopy.length === 0 || !cartCopy.find((e) => e.id === id)) {
        cartCopy.splice(0, 0, { id: id, count: count, cost: price * count });
        setCartArray(cartCopy);
        setCount(0);
      } else {
        let oldElement = cartCopy.find((e) => e.id === id);
        cartCopy.splice(cartCopy.indexOf(oldElement), 1, {
          id: oldElement.id,
          count: oldElement.count + count,
          cost: oldElement.cost + price * count,
        });
        setCartArray(cartCopy);
        setCount(0);
      }
    }
  };

  return (
    <div className={styles.shopCard}>
      <div className={styles.cardtop}>
        <p
          id={`title${id}`}
          tabIndex="0"
          aria-label="title"
          className={styles.title}
        >
          {title}
        </p>
        <p
          id={`price${id}`}
          tabIndex="0"
          aria-label="price"
          className={styles.price}
        >
          ${parseFloat(price).toFixed(2)}
        </p>
      </div>
      <img
        id={`image${id}`}
        tabIndex="0"
        alt={title}
        className={styles.image}
        src={image}
      />
      <div className={styles.cardbottom}>
        <div className={styles.quantity}>
          <button
            data-testid={`minus${id}`}
            aria-label="decrement item"
            className={styles.decrement}
            onClick={() => handleUpdateCount(-1)}
          >
            -
          </button>
          <input
            id={`quantity${id}`}
            aria-label="quantity"
            className={styles.input}
            type="number"
            value={count}
            onChange={(e) =>
              e.target.value >= 0 && e.target.value !== ""
                ? setCount(Number(e.target.value).toString())
                : setCount(0)
            }
          />
          <button
            data-testid={`plus${id}`}
            aria-label="increment item"
            className={styles.increment}
            onClick={() => handleUpdateCount(1)}
          >
            +
          </button>
        </div>
        <button
          data-testid="addtocart"
          className={styles.addtocart}
          onClick={handleAddItem}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ShopItem;
