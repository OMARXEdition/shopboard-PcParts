import { PhotoCredits } from '../shared/PhotoCredits'
import { ReactiveBackground } from '../shared/ReactiveBackground'
import { Toast, useToast } from '../shared/Toast'
import { useEffect, useState } from 'react'
import type { Product } from '../modules/catalog/catalog.types'
import { fetchProducts, assetUrl } from '../shared/api'
import { CartProvider, useCart } from '../modules/cart/cart.context'
import { Catalog } from '../modules/catalog/Catalog'
import { CartDrawer } from '../modules/cart/CartDrawer'
import { ProductDetails } from '../modules/product-detail/ProductDetails'
function Header({ openCart }: { openCart: () => void }) {
  const cart = useCart()
  return (
    <header className="site-header">
      <div className="container">
        <a href="#home" className="brand" aria-label="Shopboard PC Parts home">
          <img className="brand-icon" src={assetUrl('art/logo.svg')} alt="" />
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
function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <ReactiveBackground />
        <div className="container">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true">✦</span> YOUR NEXT BUILD STARTS HERE
            </p>
            <h1 className="hero-title">
              MODERN PARTS.
              <br />
              <span>
                OLD-SCHOOL
                <br />
                SOUL.
              </span>
            </h1>
            <p>
              Big ideas. Little pixels. All the parts for your next great PC
              adventure.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#catalog">
                ✦ Browse parts
              </a>
              <a className="secondary-button" href="#about">
                Our story ↗
              </a>
            </div>
            <p className="hero-caption">
              <span className="numeric">100%</span> pixel personality. Zero
              floppy disks required.
            </p>
          </div>
          <div className="hero-art-wrap">
            <span className="hero-spark spark-one" aria-hidden="true">
              ✦
            </span>
            <img
              className="hero-art"
              src={assetUrl('photos/hero.jpg')}
              alt="Photograph of the internal components of an assembled ATX desktop computer"
            />
            <div className="hero-tag">
              BUILT FOR YOUR
              <br />
              <strong>NEXT LEVEL</strong>
            </div>
          </div>
        </div>
      </section>
      <div className="intro-strip">
        <div className="container">
          <div className="intro-greeting">
            <span aria-hidden="true">☺</span>
            <strong>HELLO, BUILDER!</strong>
          </div>
          <p>
            A fresh start.
            <br />
            One good part at a time.
          </p>
          <div className="benefits">
            <div className="benefit">
              ◇<span>REAL POSSIBILITIES</span>
            </div>
            <div className="benefit">
              ▧<span>PIXEL PERFECT</span>
            </div>
            <div className="benefit">
              ✦<span>BUILD YOUR WAY</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={assetUrl('art/logo.svg')} alt="" />
          <h2>
            LET'S BUILD
            <br />
            SOMETHING RAD.
          </h2>
        </div>
        <div>
          <h3>A little about us</h3>
          <p>
            Shopboard-PcParts is a learning project celebrating modern hardware
            and the playful early web.
          </p>
        </div>
        <div className="footer-links">
          <h3>Good to know</h3>
          <a href="#catalog">Explore the parts ↑</a>
          <p>
            Photos represent hardware categories; specifications and USD prices
            are sample data. No real orders.
          </p>
        </div>
      </div>
      <PhotoCredits />
      <div className="footer-bottom container">
        MADE WITH CURIOSITY <span aria-hidden="true">♥</span> AND PIXELS ·
        SHOPBOARD-PCPARTS
      </div>
    </footer>
  )
}
function Store({ products }: { products: Product[] }) {
  const cart = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)
  const toast = useToast()
  function add(p: Product) {
    if (cart.add(p.id)) toast.notify(p.name + ' added to your cart.')
    else toast.notify('The demo cart limit is 999 of each part.')
  }
  return (
    <>
      <Header openCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Catalog products={products} onView={setSelected} onAdd={add} />
      </main>
      <Footer />
      {selected && (
        <ProductDetails
          product={selected}
          onClose={() => setSelected(null)}
          onAdd={add}
        />
      )}
      {cartOpen && (
        <CartDrawer products={products} onClose={() => setCartOpen(false)} />
      )}
      <Toast message={toast.message} />
    </>
  )
}
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
