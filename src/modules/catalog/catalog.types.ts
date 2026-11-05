export const categories = [
  'CPU',
  'GPU',
  'Motherboard',
  'Memory',
  'Storage',
  'Power supply',
  'Case',
  'Cooling',
] as const
export type Category = (typeof categories)[number]
export interface Product {
  id: string
  name: string
  category: Category
  description: string
  priceCents: number
  image: string
  alt: string
  specs: { label: string; value: string }[]
}
export type SortOrder = 'default' | 'price-asc' | 'price-desc'
