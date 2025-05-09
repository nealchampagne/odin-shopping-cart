import { useState, useContext } from 'react';
import styles from '../styles/CartItem.module.css'
import { CartContext } from '../App';
import trash from '../assets/trash.svg';

const CartItem = ({id, title, totalCost, image, price, quantity}) => {

  const { cartArray, setCartArray }  = useContext(CartContext);

  let cartCopy = [...cartArray];
  let oldElement = cartCopy.find(e => e.id === id);

  const handleEditItem = num => {
    cartCopy.splice(cartCopy.indexOf(oldElement), 1, { id: oldElement.id, count: oldElement.count + num, cost: oldElement.cost + (num * price)})
    setCartArray(cartCopy);
  };
  
  const handleDelete = () => {
    cartCopy.splice(cartCopy.indexOf(oldElement), 1)
    setCartArray(cartCopy);
  }

  return (
    <div className={styles.cartCard}>
      <img className={styles.image} src={image} />
      <div className={styles.info}>
        <div className={styles.cardtop}>
          <p className={styles.title}>{title}</p>
          <p className={styles.cost}>${parseFloat(totalCost).toFixed(2)}</p>
        </div>
        <div className={styles.cardbottom}>
          <div className={styles.quantitycontainer}>
            <button className={quantity === 1
              ? styles.trash : styles.decrement}
              aria-label={quantity === 1 ? "delete item" : "decrement quantity"}
              onClick={quantity === 1 ? () => handleDelete()
              : () => handleEditItem(-1)}>{quantity === 1 
              ? <img src={trash}/> : "-"}
            </button>
            <p tabIndex="0" aria-label={`quantity ${quantity}`} className="quantity">{quantity}</p>
            <button aria-label="increment quantity" className={styles.increment} onClick={() => handleEditItem(1)}>+</button>
          </div>
          <button className={styles.delete} onClick={() => handleDelete()}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;