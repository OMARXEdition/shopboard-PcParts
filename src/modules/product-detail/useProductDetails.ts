import { useState } from 'react'
import type { Product } from '../catalog/catalog.types'
import type { ProductDetailsSelection } from './product-detail.types'

export function useProductDetails(): ProductDetailsSelection {
  const [product, setProduct] = useState<Product | null>(null)
  return {
    product,
    open: setProduct,
    close: () => setProduct(null),
  }
}
