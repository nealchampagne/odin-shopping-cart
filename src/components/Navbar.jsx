import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import cart from "../assets/cart.svg";
import styles from '../styles/Navbar.module.css';
import { CartContext } from '../App';

const Navbar = () => {

  const { cartArray, setCartArray } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let newCartArray = cartArray;
    let newCartCount = cartArray.length;
    setCartCount(newCartCount);
  }, [cartArray]);

  return (
    <header>
      <div className={styles.accentbar}></div>
      <div className={styles.main}>
        <div className={styles.namecontainer}>
          <h1 className={styles.name}>KON·SUMP·SHON</h1>
          <img className={styles.logo} href={null} />
        </div>
        <nav>
          <Link to="/" className={styles.pagelink}>Home</Link>
          <Link to="/shop" className={styles.pagelink}>Shop</Link>
        </nav>
        <div className={styles.cartcontainer}>
          <Link to="/cart" className={styles.carticon}><img src={cart}/></Link>
          <div className={styles.cartcount}>{cartCount}</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;