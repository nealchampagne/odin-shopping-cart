import { useState, useEffect, useContext } from 'react';
import ShopItem from './ShopItem';
import styles from '../styles/Shop.module.css'
import { CartContext } from '../App';
import ShimmerCard from './ShimmerCard';
import { v4 as uuidv4 } from 'uuid';
import ErrorPage from './ErrorPage';

const Shop = () => {
  
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
    .then(setTimeout(() => {}, 1000))
    .then((response) => setCatalog(response))
    .catch((error) => setError(error))
    .finally(() => setLoading(false));
  }, []);

  const shimmerArray = new Array(20);
  shimmerArray.fill(0);

  return (
    <>
      {error ? <ErrorPage error={error}/> : <div className={styles.shop}>
        {loading ? shimmerArray.map(item => <ShimmerCard key={uuidv4()} type='shop'/>)
        : catalog.map(item => <ShopItem key={item.id} id={item.id} title={item.title}
          price={item.price} image={item.image} rating={item.rating} />
        )}
      </div>}
    </>
  );
};

export default Shop;