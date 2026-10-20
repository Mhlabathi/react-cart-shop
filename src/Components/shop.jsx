import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";
import Nav from "./nav";
import Item from "./item";

function Shop() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { addToCart } = useOutletContext();

  useEffect(() => {
    let isMounted = true;
    async function fetchItems() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Could not load products");
        const data = await response.json();
        if (isMounted) setItems(data);
      } catch {
        if (isMounted) setError(true);
      }
    }
    fetchItems();
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <Nav />
      <main className="page-shell shop-page">
        <div className="page-heading">
          <div><span className="eyebrow">The collection</span><h1>Find your good thing.</h1></div>
          <p>Useful, lovely, and ready to make your day.</p>
        </div>
        {error ? (
          <div className="state-card"><span className="state-icon">↻</span><h2>We couldn't load the good stuff.</h2><p>Check your connection and try again.</p><button className="button button-dark" onClick={() => window.location.reload()}>Try again</button></div>
        ) : items.length === 0 ? (
          <div className="loading-state"><span className="loading-dot" /> Finding the good stuff...</div>
        ) : (
          <div className="product-grid">
            {items.map((item) => <Item key={item.id} id={item.id} name={item.title} price={item.price} imgUrl={item.image} onAdd={addToCart} quantity={1} />)}
          </div>
        )}
      </main>
      <footer className="site-footer"><span>GOOD THINGS, RIGHT THIS WAY.</span><Link to="/cart">Your bag is waiting <span aria-hidden="true">↗</span></Link></footer>
    </>
  );
}

export default Shop;
