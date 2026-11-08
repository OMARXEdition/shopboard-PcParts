import { Link } from 'react-router-dom'
export function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h2>SHOPBOARD</h2>
          <p>Everyday style, explored one find at a time.</p>
        </div>
        <div>
          <h3>About this demo</h3>
          <p>
            A course storefront using the ShopBoard fashion API. Product data is
            provided for practice.
          </p>
        </div>
        <div className="footer-links">
          <h3>Explore</h3>
          <Link to="/products">Browse the catalog</Link>
          <p>No payment or real order is taken.</p>
        </div>
      </div>
      <div className="footer-bottom container">SHOPBOARD · DEMO STORE</div>
    </footer>
  )
}
