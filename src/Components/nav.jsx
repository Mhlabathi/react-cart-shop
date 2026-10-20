import { Link, NavLink, useOutletContext } from "react-router";

function Nav() {
  const { cartItems } = useOutletContext();
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/" className="brand"><span className="brand-mark">#</span> little<span>goods</span></Link>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
        </div>
        <NavLink to="/cart" className="cart-link"><span>Bag</span><span className="cart-count">{cartQuantity}</span></NavLink>
      </nav>
    </header>
  );
}

export default Nav;
