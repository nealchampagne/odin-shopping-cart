import { useContext } from "react";
import styles from "../styles/CartItem.module.css";
import CartContext from "./CartContext";
import trash from "../assets/trash.svg";

const CartItem = ({ id, title, image, price }) => {

  // Use the CartContext
  const { cartArray, setCartArray } = useContext(CartContext);

  // Create a mutable copy of the cart array
  let cartCopy = [...cartArray];

  // Find the cart item in the old cart array in order to update
  let oldElement = cartCopy.find((e) => e.id === id);

  // Increment/decrement item quantity by the given amount
  const handleEditItem = (num) => {
    cartCopy.splice(cartCopy.indexOf(oldElement), 1, {
      id: oldElement.id,
      count: oldElement.count + num,
      cost: oldElement.cost + num * price,
    });
    setCartArray(cartCopy);
  };

  // Remove this element from the cart array
  const handleDelete = () => {
    cartCopy.splice(cartCopy.indexOf(oldElement), 1);
    setCartArray(cartCopy);
  };

  return (
    <div id={`item${id}`} className={styles.cartCard}>
      <img id={`image${id}`} className={styles.image} src={image} />
      <div className={styles.info}>
        <div className={styles.cardtop}>
          <p id={`title${id}`} className={styles.title}>
            {title}
          </p>
          <p id={`cost${id}`} className={styles.cost}>
            ${parseFloat(oldElement.cost).toFixed(2)}
          </p>
        </div>
        <div className={styles.cardbottom}>
          <div id={`item${id}`} className={styles.quantitycontainer}>
            {/* Change minus to delete button if quantity is 1 */}
            <button
              data-testid={`minus${id}`}
              className={
                oldElement.count === 1 ? styles.trash : styles.decrement
              }
              aria-label={
                oldElement.count === 1 ? "delete item" : "decrement quantity"
              }
              onClick={
                oldElement.count === 1
                  ? () => handleDelete()
                  : () => handleEditItem(-1)
              }
            >
              {oldElement.count === 1 ? <img src={trash} /> : "-"}
            </button>
            <p
              id={`quantity${id}`}
              tabIndex="0"
              aria-label={`quantity ${oldElement.count}`}
              className="quantity"
            >
              {oldElement.count}
            </p>
            <button
              data-testid={`plus${id}`}
              aria-label="increment quantity"
              className={styles.increment}
              onClick={() => handleEditItem(1)}
            >
              +
            </button>
          </div>
          <button className={styles.delete} onClick={() => handleDelete()}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
