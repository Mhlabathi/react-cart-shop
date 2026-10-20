import { Link } from "react-router";
import Nav from "./nav";
import heroImage from "../assets/hero.png";

function Home() {
  return (
    <>
      <Nav />
      <main className="page-shell home-page">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">A little something for you</span>
            <h1>Good finds.<br /><span>Good feelings.</span></h1>
            <p>Thoughtful picks for everyday living, all in one happy place.</p>
            <Link to="/shop" className="button button-dark">Explore the shop <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-art">
            <img src={heroImage} alt="A curated selection from the shop" />
            <span className="hero-stamp">made for<br />every day</span>
          </div>
        </section>

        <section className="home-note">
          <div>
            <span className="eyebrow">The good stuff</span>
            <h2>Small joys, picked just for you.</h2>
          </div>
          <p>From useful essentials to little treats, find something worth bringing home.</p>
          <Link to="/shop" className="text-link">See everything <span aria-hidden="true">↗</span></Link>
        </section>

        <section className="home-categories" aria-label="Shop categories">
          <Link to="/shop" className="category-card category-sun"><span>01 / Everyday finds</span><strong>Made for your<br />daily rhythm</strong><span className="category-arrow">↗</span></Link>
          <Link to="/shop" className="category-card category-lilac"><span>02 / Little treats</span><strong>A good day<br />starts here</strong><span className="category-arrow">↗</span></Link>
          <Link to="/shop" className="category-card category-mint"><span>03 / Just because</span><strong>Something nice<br />for someone</strong><span className="category-arrow">↗</span></Link>
        </section>
      </main>
      <footer className="site-footer"><span>GOOD THINGS, RIGHT THIS WAY.</span><span>Made for everyday moments <span aria-hidden="true">✳</span></span></footer>
    </>
  );
}

export default Home;
