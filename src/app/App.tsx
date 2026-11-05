import { useEffect, useState } from 'react'
import type { Product } from '../modules/catalog/catalog.types'
import { fetchProducts } from '../shared/api'
import { CartProvider } from '../modules/cart/CartProvider'
import { Store } from './Store'
export default function App() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    fetchProducts(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setProducts(data)
          setError(false)
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true)
      })
    return () => controller.abort()
  }, [attempt])
  if (products)
    return (
      <CartProvider products={products}>
        <Store products={products} />
      </CartProvider>
    )
  return (
    <main className="container status-panel">
      <a className="brand" href="#">
        SHOPBOARD / PC PARTS
      </a>
      <h1>{error ? 'Connection interrupted.' : 'Loading the parts...'}</h1>
      <p>
        {error
          ? 'The catalog could not be loaded. Check your connection and try again.'
          : 'Opening the hardware shelf. Hang tight, builder.'}
      </p>
      {error && (
        <button
          className="primary-button"
          onClick={() => {
            setError(false)
            setAttempt((a) => a + 1)
          }}
        >
          Try again
        </button>
      )}
    </main>
  )
}
