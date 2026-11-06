import type { Product } from '../catalog/catalog.types'

export interface ProductDetailsProps {
  product: Product
  onClose: () => void
  onAdd: (product: Product) => void
}

export interface ProductSpecsProps {
  specs: Product['specs']
}

export interface ProductDetailsSelection {
  product: Product | null
  open: (product: Product) => void
  close: () => void
}
