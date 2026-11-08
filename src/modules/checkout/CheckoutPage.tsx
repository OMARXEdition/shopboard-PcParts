import { Link } from 'react-router-dom'
import { useCart } from '../cart/useCart'
import { CheckoutForm } from './CheckoutForm'
import { EmptyState } from '../../components/ui/EmptyState'
import { PageHeading } from '../../components/ui/PageHeading'

export default function CheckoutPage() {
  const cart = useCart()
  return (
    <div className="container page-shell">
      <PageHeading
        title="Demo checkout"
        description="No payment is taken and no real order is created."
      />
      {cart.count === 0 ? (
        <EmptyState message="Your cart is empty.">
          <Link to="/products">Browse products</Link>
        </EmptyState>
      ) : (
        <>
          <p>
            {cart.count} items in your cart. <Link to="/cart">Review cart</Link>
          </p>
          <CheckoutForm />
        </>
      )}
    </div>
  )
}
