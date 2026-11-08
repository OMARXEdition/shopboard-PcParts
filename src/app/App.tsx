import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from '../modules/cart/CartProvider'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { RetryBoundary } from '../components/ui/RetryBoundary'
import { clearCatalogRequests } from '../modules/catalog/catalog-resource'

const HomePage = lazy(() => import('./pages/HomePage'))
const CatalogPage = lazy(() => import('../modules/catalog/CatalogPage'))
const ProductPage = lazy(() => import('../modules/product-detail/ProductPage'))
const CartPage = lazy(() => import('../modules/cart/CartPage'))
const CheckoutPage = lazy(() => import('../modules/checkout/CheckoutPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <Header />
        <main id="main-content">
          <RetryBoundary onRetry={clearCatalogRequests}>
            <Suspense
              fallback={
                <div className="container status-panel" role="status">
                  Loading this page...
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<CatalogPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </RetryBoundary>
        </main>
        <Footer />
      </CartProvider>
    </HashRouter>
  )
}
