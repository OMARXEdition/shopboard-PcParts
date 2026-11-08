import { expect, it } from 'vitest'
import { selectProducts } from '../src/modules/catalog/catalog.logic'
import type { Product } from '../src/modules/catalog/catalog.types'

const products: Product[] = [
  {
    id: '2',
    name: 'Canvas Backpack',
    category: 'Bags',
    priceCents: 4900,
    inStock: true,
  },
  {
    id: '1',
    name: 'Leather Tote Bag',
    category: 'Bags',
    priceCents: 8900,
    inStock: true,
  },
  {
    id: '4',
    name: 'White Sneakers',
    category: 'Shoes',
    priceCents: 7500,
    inStock: true,
  },
]

it('derives search, category and sort without changing API order', () => {
  expect(
    selectProducts(products, 'leather', 'Bags', 'default').map((p) => p.id),
  ).toEqual(['1'])
  expect(
    selectProducts(products, '', 'all', 'price-desc').map((p) => p.id),
  ).toEqual(['1', '4', '2'])
  expect(products.map((p) => p.id)).toEqual(['2', '1', '4'])
})
