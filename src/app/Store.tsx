import { useState } from 'react'
import type { Product } from '../modules/catalog/catalog.types'
import { useCart } from '../modules/cart/useCart'
import { Catalog } from '../modules/catalog/Catalog'
import { CartDrawer } from '../modules/cart/CartDrawer'
import { ProductDetails } from '../modules/product-detail/ProductDetails'
import { Toast } from '../shared/Toast'
import { useToast } from '../shared/useToast'
import { Header } from './Header'
import { Hero } from './Hero'
import { Footer } from './Footer'
export interface StoreProps {
  products: Product[]
}
export function Store({ products }: StoreProps) {
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
