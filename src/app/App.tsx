import { useCatalog } from '../modules/catalog/useCatalog'
import { CartProvider } from '../modules/cart/CartProvider'
import { Store } from './Store'
export default function App() {
  const { products, error, retry } = useCatalog()
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
        <button className="primary-button" onClick={retry}>
          Try again
        </button>
      )}
    </main>
  )
}
