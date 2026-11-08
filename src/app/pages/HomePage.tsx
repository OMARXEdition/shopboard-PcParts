import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="container page-shell">
      <section className="fashion-hero">
        <p className="eyebrow">THE SHOPBOARD EDIT</p>
        <h1>ShopBoard: find your next favorite.</h1>
        <p>Explore a small collection of bags, shoes, and accessories.</p>
        <Link className="primary-button" to="/products">
          Browse all products
        </Link>
      </section>
      <section className="page-note" aria-labelledby="demo-title">
        <h2 id="demo-title">A storefront for learning</h2>
        <p>
          All prices are sample USD amounts. Checkout is a form demo; no order
          or payment is processed.
        </p>
      </section>
    </div>
  )
}
