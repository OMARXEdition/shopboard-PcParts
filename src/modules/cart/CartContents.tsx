import { use } from 'react'
import { Link } from 'react-router-dom'
import { catalogPromise } from '../catalog/catalog-resource'
import { useCart } from './useCart'
import { cartTotals } from './cart.state'
import { formatPrice } from '../../shared/format'

export function CartContents() {
  const products = use(catalogPromise())
  const cart = useCart()
  const totals = cartTotals(cart.lines, products)
  return (
    <>
      <ul className="cart-list">
        {cart.lines.map((line) => {
          const product = products.find((item) => item.id === line.id)
          return (
            <li key={line.id} className="cart-item">
              <div>
                <h2 className="product-title">
                  {product ? (
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  ) : (
                    'Unavailable product'
                  )}
                </h2>
                <p>
                  {product
                    ? formatPrice(product.priceCents)
                    : 'Remove this unavailable item.'}
                </p>
                <div className="quantity-control">
                  <button
                    aria-label={`Decrease ${product?.name ?? 'product'} quantity`}
                    onClick={() => cart.decrease(line.id)}
                  >
                    −
                  </button>
                  <span aria-label={`Quantity ${line.quantity}`}>
                    {line.quantity}
                  </span>
                  <button
                    aria-label={`Increase ${product?.name ?? 'product'} quantity`}
                    onClick={() => cart.add(line.id)}
                    disabled={
                      !product || !product.inStock || line.quantity >= 999
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => cart.remove(line.id)}
                >
                  Remove
                </button>
              </div>
              <strong>
                {product
                  ? formatPrice(product.priceCents * line.quantity)
                  : '—'}
              </strong>
            </li>
          )
        })}
      </ul>
      <div className="cart-summary">
        <span>Subtotal</span>
        <strong>{formatPrice(totals.totalCents)}</strong>
      </div>
      <div className="page-actions">
        <button className="secondary-button" onClick={cart.clear}>
          Clear cart
        </button>
        <Link className="primary-button" to="/checkout">
          Continue to demo checkout
        </Link>
      </div>
    </>
  )
}
