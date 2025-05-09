import { useState, useEffect, useContext } from 'react';
import CartItem from './CartItem';
import styles from '../styles/Cart.module.css'
import { CartContext } from '../App';
import ShimmerCard from './ShimmerCard';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const Cart = () => {
  
  const [catalog, setCatalog] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cartArray, setCartArray } = useContext(CartContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products', { mode: "cors" },)
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

  const shimmerArray = new Array(4);
  shimmerArray.fill(0);

  return (
    <div className={styles.cart}>
      <div className={styles.main}>
        {error ? <ErrorPage error={`${error}`}/> : loading ? shimmerArray.map(item => <ShimmerCard key={uuidv4()} type='cart'/>)
        : cartArray.length === 0 ? <div className={styles.emptyCart}>Looks like your cart is empty! 
        <br></br><Link className={styles.returnButton} to="../shop">Return to store</Link></div> : cartArray.map(item => { 
          let catItem = catalog.find(e => e.id === item.id)
          if (catItem)   
          return <CartItem key={item.id} id={item.id} title={catItem.title}
          totalCost={catItem.price * item.count} image={catItem.image} price={catItem.price} quantity={item.count}/>
        })}
      </div>
      <div className={styles.subtotal}>
        <p tabIndex="0">Subtotal:</p>
        <p tabIndex="0" >
          ${parseFloat(catalog.length ? cartArray.reduce((acc, curr) => acc + curr.cost, 0) : 0).toFixed(2)}
        </p>
      </div>
      <button className={cartArray.length === 0 ? (styles.checkout + ' ' + styles.disabled) : styles.checkout}>Proceed to checkout</button>
    </div>
  );
};

export default Cart;