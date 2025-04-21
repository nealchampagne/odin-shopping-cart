import { Link } from "react-router-dom";
import cart from "../assets/cart.svg";

const Navbar = () => {
  return (
    <>
      <div>
        <h1 className="title">Store</h1>
        <img />
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart"><img src={cart}/></Link>
      </nav>
    </>
  )
};

export default Navbar;