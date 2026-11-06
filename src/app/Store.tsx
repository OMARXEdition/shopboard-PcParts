import { useState } from 'react'
import type { Product } from '../modules/catalog/catalog.types'
import { useCart } from '../modules/cart/useCart'
import { Catalog } from '../modules/catalog/Catalog'
import { CartDrawer } from '../modules/cart/CartDrawer'
import { ProductDetails } from '../modules/product-detail/ProductDetails'
import { useProductDetails } from '../modules/product-detail/useProductDetails'
import { Toast } from '../components/notification/Toast'
import { useToast } from '../components/notification/useToast'
import { Header } from '../components/layout/Header'
import { Hero } from '../components/home/Hero'
import { Footer } from '../components/layout/Footer'
export interface StoreProps {
  products: Product[]
}
export function Store({ products }: StoreProps) {
  const cart = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const details = useProductDetails()
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
        <Catalog products={products} onView={details.open} onAdd={add} />
      </main>
      <Footer />
      {details.product && (
        <ProductDetails
          product={details.product}
          onClose={details.close}
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
