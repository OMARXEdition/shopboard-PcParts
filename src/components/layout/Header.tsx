import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../modules/cart/useCart'
export function Header() {
  const cart = useCart()
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand" aria-label="ShopBoard home">
          SHOPBOARD
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Catalog</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>
        <Link
          className="cart-trigger"
          to="/cart"
          aria-label={`Cart, ${cart.count} items`}
        >
          Cart <span className="numeric">{cart.count}</span>
        </Link>
      </div>
    </header>
  )
}
