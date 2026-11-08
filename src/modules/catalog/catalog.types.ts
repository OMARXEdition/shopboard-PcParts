export interface Product {
  id: string
  name: string
  category: string
  priceCents: number
  inStock: boolean
}
export type SortOrder = 'default' | 'price-asc' | 'price-desc'
