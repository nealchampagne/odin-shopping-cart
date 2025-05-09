import { useState, useContext } from 'react';
import styles from '../styles/ShopItem.module.css'
import { CartContext } from '../App';


const ShopItem = ({id, title, price, image, description, rating}) => {
  
  const [count, setCount] = useState(0);
  const { cartArray, setCartArray }  = useContext(CartContext);

  const handleUpdateCount = num => {
    if (num > 0) {
      setCount(parseInt(count) + num);
    } else if (count > 0) {
      setCount(parseInt(count) + num);
    };
  };

  const handleAddItem = () => {
    let cartCopy = [...cartArray];
    if (count !== 0) {
      if (cartCopy.length === 0 || !cartCopy.find(e => e.id === id)) {
        cartCopy.splice(0, 0, { id: id, count: count, cost: price * count })
        setCartArray(cartCopy);
        setCount(0);
      } else {
        let oldElement = cartCopy.find(e => e.id === id);
        cartCopy.splice(cartCopy.indexOf(oldElement), 1, { id: oldElement.id, count: oldElement.count + count, cost: oldElement.cost + (price * count)})
        setCartArray(cartCopy);
        setCount(0);
      }
    }
  };

  return (
    <div className={styles.shopCard}>
      <div className={styles.cardtop}>
        <p tabIndex="0" aria-label="title" className={styles.title}>{title}</p>
        <p tabIndex="0" aria-label="price" className={styles.price}>${parseFloat(price).toFixed(2)}</p>
      </div>
      <img tabIndex="0" alt={title} className={styles.image} src={image} />
      <div className={styles.cardbottom}>
        <div className={styles.quantity}>
          <button aria-label="decrement item"className={styles.decrement} onClick={() => handleUpdateCount(-1)}>-</button>
          <input aria-label="quantity" className={styles.input} type="number" value={count} onChange={e => (e.target.value >= 0 && e.target.value !== '') ? setCount(Number(e.target.value).toString()) : setCount(0)}/>
          <button aria-label="increment item" className={styles.increment} onClick={() => handleUpdateCount(1)}>+</button>
        </div>
        <button className={styles.addtocart} onClick={handleAddItem}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ShopItem;