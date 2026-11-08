import { expect, it } from 'vitest'
import {
  cartReducer,
  cartTotals,
  restoreCart,
} from '../src/modules/cart/cart.state'

it('restores only valid API product IDs and positive quantities', () => {
  expect(
    restoreCart(
      JSON.stringify([
        { id: '1', quantity: 2 },
        { id: '2', quantity: 0 },
        { id: '../3', quantity: 1 },
        { id: '1', quantity: 4 },
      ]),
    ),
  ).toEqual([{ id: '1', quantity: 2 }])
})

it('updates one cart line per action without mutating previous state', () => {
  const before = [{ id: '1', quantity: 1 }]
  expect(cartReducer(before, { type: 'add', id: '1' })).toEqual([
    { id: '1', quantity: 2 },
  ])
  expect(before).toEqual([{ id: '1', quantity: 1 }])
})

it('decreases one to removal, removes one line, and clears the whole cart', () => {
  const initial = [
    { id: '1', quantity: 2 },
    { id: '2', quantity: 1 },
  ]
  const decreased = cartReducer(initial, { type: 'decrease', id: '2' })
  expect(decreased).toEqual([{ id: '1', quantity: 2 }])
  expect(cartReducer(initial, { type: 'remove', id: '1' })).toEqual([
    { id: '2', quantity: 1 },
  ])
  expect(cartReducer(initial, { type: 'clear' })).toEqual([])
  expect(initial).toHaveLength(2)
})

it('calculates item count and cents from the current catalog', () => {
  const products = [
    { id: '1', name: 'Bag', category: 'Bags', priceCents: 8900, inStock: true },
    {
      id: '2',
      name: 'Scarf',
      category: 'Accessories',
      priceCents: 1500,
      inStock: true,
    },
  ]
  const lines = [
    { id: '1', quantity: 2 },
    { id: '2', quantity: 1 },
  ]
  expect(cartTotals(lines, products)).toEqual({ count: 3, totalCents: 19300 })
  expect(cartTotals([], products)).toEqual({ count: 0, totalCents: 0 })
})
