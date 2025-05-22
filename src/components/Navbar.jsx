import { Link } from "react-router-dom";
import { useContext } from "react";
import cart from "../assets/cart.svg";
import styles from "../styles/Navbar.module.css";
import CartContext from "./CartContext";

const Navbar = () => {

  // Use CartContext to show items in cart
  const { cartArray, setCartArray } = useContext(CartContext);

  // Calculate number of items in cart
  let cartCount = cartArray.reduce(
    (acc, curr) => parseInt(acc) + parseInt(curr.count),
    0,
  )

  return (
    <header>
      <div className={styles.accentbar}></div>
      <div className={styles.main}>
        <div className={styles.namecontainer}>
          <h1 className={styles.name}>KON·SUMP·SHON</h1>
          <img className={styles.logo} href={null} />
        </div>
        <nav>
          <Link to="/" className={styles.pagelink}>
            Home
          </Link>
          <Link to="/shop" className={styles.pagelink}>
            Shop
          </Link>
        </nav>
        <div className={styles.cartcontainer}>
          <Link to="/cart" className={styles.carticon}>
            <img src={cart} />
          </Link>
          {/* Over 99 items, just show "99+" */}
          <div data-testid="cartcount" className={styles.cartcount}>
            {cartCount < 100 ? cartCount : '99+'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
