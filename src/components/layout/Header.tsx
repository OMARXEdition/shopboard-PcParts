import { apiUrl } from '../../shared/api-client'
import { useCart } from '../../modules/cart/useCart'
export interface HeaderProps {
  openCart: () => void
}
export function Header({ openCart }: HeaderProps) {
  const cart = useCart()
  return (
    <header className="site-header">
      <div className="container">
        <a href="#home" className="brand" aria-label="Shopboard PC Parts home">
          <img className="brand-icon" src={apiUrl('art/logo.svg')} alt="" />
          <span>
            SHOPBOARD<small>PC PARTS & POSSIBILITIES</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#catalog">The parts</a>
          <a href="#about">About</a>
        </nav>
        <button
          className="cart-trigger"
          onClick={openCart}
          aria-label={`Open cart, ${cart.count} items`}
        >
          ▧ Cart <span className="numeric">{cart.count}</span>
        </button>
      </div>
    </header>
  )
}
