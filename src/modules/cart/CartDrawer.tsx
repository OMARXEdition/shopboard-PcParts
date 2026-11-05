import type { Product } from '../catalog/catalog.types'
import { useCart } from './useCart'
import { Modal } from '../../shared/Modal'
import { ProductImage } from '../../shared/ProductImage'
import { formatPrice } from '../../shared/format'
export interface CartDrawerProps {
  products: Product[]
  onClose: () => void
}
export function CartDrawer({ products, onClose }: CartDrawerProps) {
  const cart = useCart()
  return (
    <Modal
      title="Your inventory"
      closeLabel="Close cart"
      onClose={onClose}
      drawer
    >
      {cart.lines.length ? (
        <>
          <p className="muted">Good parts. Great possibilities.</p>
          <ul className="cart-list">
            {cart.lines.map((line) => {
              const p = products.find((p) => p.id === line.id)
              if (!p) return null
              return (
                <li className="cart-item" key={line.id}>
                  <ProductImage
                    path={p.image}
                    alt={p.alt}
                    className="cart-item-image"
                  />
                  <div>
                    <h3 className="product-title">{p.name}</h3>
                    <p className="price numeric">
                      {formatPrice(p.priceCents * line.quantity)}
                    </p>
                    <div className="quantity-control">
                      <button
                        aria-label={`Decrease ${p.name} quantity`}
                        onClick={() => cart.decrease(p.id)}
                      >
                        −
                      </button>
                      <span
                        className="numeric"
                        aria-label={`Quantity ${line.quantity}`}
                      >
                        {line.quantity}
                      </span>
                      <button
                        aria-label={`Increase ${p.name} quantity`}
                        onClick={() => cart.add(p.id)}
                        disabled={line.quantity >= 999}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-button"
                      onClick={() => cart.remove(p.id)}
                    >
                      Remove {p.name}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="cart-summary">
            <span>Subtotal</span>
            <strong className="numeric">{formatPrice(cart.totalCents)}</strong>
          </div>
          <button className="secondary-button" onClick={cart.clear}>
            Clear cart
          </button>
          <p className="muted">
            Demo mode: no payments, shipping, or checkout.
          </p>
        </>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">▧</span>
          <h3>Your cart is waiting.</h3>
          <p>Find the first piece of your next great build.</p>
          <button className="primary-button" onClick={onClose}>
            Keep exploring
          </button>
        </div>
      )}
    </Modal>
  )
}
