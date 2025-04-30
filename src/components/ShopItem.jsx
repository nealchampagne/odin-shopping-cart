import { useState, useContext } from 'react';
import styles from '../styles/ShopItem.module.css'
import { CartContext } from '../App';


const ShopItem = ({id, title, price, image, rating}) => {
  
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
    let cartCopy = cartArray;
    if (count !== 0) {
      if (cartCopy.length === 0 || !cartCopy.find(e => e.id === id)) {
        cartCopy.splice(0, 0, { id:id, count: count })
        setCartArray(cartCopy);
      } else {
        let oldElement = cartCopy.find(e => e.id === id);
        cartCopy.splice(cartCopy.indexOf(oldElement), 1, { id: oldElement.id, count: oldElement.count + count})
        setCartArray(cartCopy);
      }
    }
  };

  return (
    <div className={styles.shopcard}>
      <div className={styles.cardtop}>
        <div className={styles.title}>{title}</div>
        <div className={styles.price}>${parseFloat(price).toFixed(2)}</div>
      </div>
      <img className={styles.image} src={image} />
      <div className={styles.cardbottom}>
        <div className={styles.quantity}>
          <div className={styles.decrement} onClick={() => handleUpdateCount(-1)}>-</div>
          <input className={styles.input} type="number" value={count} onChange={e => (e.target.value >= 0 && e.target.value !== '') ? setCount(Number(e.target.value).toString()) : setCount(0)}/>
          <div className={styles.increment} onClick={() => handleUpdateCount(1)}>+</div>
        </div>
        <div className={styles.addtocart} onClick={handleAddItem}>Add to Cart</div>
      </div>
    </div>
  );
};

export default ShopItem;