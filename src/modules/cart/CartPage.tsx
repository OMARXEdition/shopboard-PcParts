import { Link } from 'react-router-dom'
import { useCart } from './useCart'
import { CartContents } from './CartContents'
import { EmptyState } from '../../components/ui/EmptyState'
import { PageHeading } from '../../components/ui/PageHeading'

export default function CartPage() {
  const cart = useCart()
  return (
    <div className="container page-shell">
      <PageHeading title="Your cart" />
      {cart.lines.length === 0 ? (
        <EmptyState message="Your cart is empty.">
          <Link to="/products">Browse products</Link>
        </EmptyState>
      ) : (
        <CartContents />
      )}
    </div>
  )
}
