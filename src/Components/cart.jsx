import { Link, useOutletContext } from "react-router";
import Nav from "./nav";

function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity } = useOutletContext();
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <Nav />
      <main className="page-shell cart-page">
        <div className="page-heading cart-heading"><div><span className="eyebrow">Your picks</span><h1>Your bag<span className="heading-period">.</span></h1></div><span className="bag-item-count">{cartItems.reduce((total, item) => total + item.quantity, 0)} items</span></div>
        {cartItems.length === 0 ? (
          <section className="empty-cart"><span className="empty-cart-icon">♡</span><span className="eyebrow">A little room for something lovely</span><h2>Your bag is taking a break.</h2><p>When you find something you love, it’ll be waiting here.</p><Link to="/shop" className="button button-dark">Explore the shop <span aria-hidden="true">→</span></Link></section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-label="Items in your bag">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-item-image"><img src={item.imgUrl} alt={item.name} /></div>
                  <div className="cart-item-info"><span className="eyebrow">Little goods</span><h2>{item.name}</h2><span className="product-price">R {Number(item.price).toFixed(2)}</span></div>
                  <div className="quantity-control" aria-label={`Quantity for ${item.name}`}><button onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease ${item.name} quantity`}>−</button><span>{item.quantity}</span><button onClick={() => increaseQuantity(item.id)} aria-label={`Increase ${item.name} quantity`}>+</button></div>
                  <strong className="line-total">R {(item.price * item.quantity).toFixed(2)}</strong>
                </article>
              ))}
              <Link to="/shop" className="text-link continue-link">← Keep looking around</Link>
            </section>
            <aside className="order-summary"><span className="eyebrow">The little details</span><h2>Order summary</h2><div className="summary-line"><span>Subtotal</span><span>R {subtotal.toFixed(2)}</span></div><div className="summary-line"><span>Delivery</span><span>On us</span></div><div className="summary-total"><span>Total</span><strong>R {subtotal.toFixed(2)}</strong></div><button className="button button-dark checkout-button" type="button">Coming soon <span aria-hidden="true">→</span></button><p className="summary-note">A good choice, every time <span aria-hidden="true">✳</span></p></aside>
          </div>
        )}
      </main>
      <footer className="site-footer"><span>GOOD THINGS, RIGHT THIS WAY.</span><span>Made for everyday moments <span aria-hidden="true">✳</span></span></footer>
    </>
  );
}

export default Cart;
