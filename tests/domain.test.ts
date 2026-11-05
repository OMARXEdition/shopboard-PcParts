import type { Product } from '../src/modules/catalog/catalog.types'
import { describe, it, expect, vi } from 'vitest'
import { parseProducts, fetchProducts, assetUrl } from '../src/shared/api'
import { selectProducts } from '../src/modules/catalog/catalog.logic'
import {
  cartReducer,
  restoreCart,
  cartTotals,
} from '../src/modules/cart/cart.state'
const item: Product = {
  id: 'cpu-1',
  name: 'Retro Core 8',
  category: 'CPU',
  description: 'Demo processor',
  priceCents: 25000,
  image: 'photos/cpu.jpg',
  alt: 'Processor photograph',
  specs: [{ label: 'Cores', value: '8' }],
}
describe('catalog boundary', () => {
  it('validates products and paths', () => {
    expect(parseProducts([item])).toEqual([item])
    expect(assetUrl('photos/cpu.jpg')).toBe('/Shopboard-PcParts/photos/cpu.jpg')
  })
  it('rejects malformed, duplicate and unsafe data', () => {
    for (const data of [
      {},
      [item, item],
      [{ ...item, priceCents: -1 }],
      [{ ...item, image: '../secret' }],
      [{ ...item, specs: [] }],
      [{ ...item, category: 'Other' }],
    ])
      expect(() => parseProducts(data)).toThrow()
  })
  it('fetches JSON over HTTP and rejects HTTP failures', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => [item] })
    expect(await fetchProducts(undefined, fetcher)).toEqual([item])
    expect(fetcher.mock.calls[0][0]).toBe(
      '/Shopboard-PcParts/data/products.json',
    )
    await expect(
      fetchProducts(
        undefined,
        vi.fn().mockResolvedValue({ ok: false, status: 404 }),
      ),
    ).rejects.toThrow()
  })
  it('accepts an empty catalog and surfaces invalid JSON', async () => {
    expect(parseProducts([])).toEqual([])
    await expect(
      fetchProducts(
        undefined,
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => {
            throw new Error('bad JSON')
          },
        }),
      ),
    ).rejects.toThrow()
  })
  it('composes search category and sort without mutating', () => {
    const list = [item, { ...item, id: 'cpu-2', priceCents: 10000 }]
    expect(
      selectProducts(list, 'retro', 'CPU', 'price-asc').map((p) => p.id),
    ).toEqual(['cpu-2', 'cpu-1'])
    expect(selectProducts(list, '', 'all', 'default')).toEqual(list)
    expect(list[0].id).toBe('cpu-1')
    expect(selectProducts(list, 'absent', 'all', 'default')).toEqual([])
  })
})
it('accepts local photographs while rejecting traversal and remote image URLs', () => {
  for (const image of [
    'photos/cpu.jpg',
    'photos/cpu.jpeg',
    'photos/cpu.png',
    'photos/cpu.webp',
  ])
    expect(parseProducts([{ ...item, image }])[0].image).toBe(image)
  for (const image of [
    'photos/../cpu.jpg',
    'https://example.com/cpu.jpg',
    'photos/cpu.svg',
    'photos/x.jpg?track=1',
  ])
    expect(() => parseProducts([{ ...item, image }])).toThrow()
})
describe('cart', () => {
  it('merges, decreases, removes and clears', () => {
    let state = cartReducer([], { type: 'add', id: item.id })
    state = cartReducer(state, { type: 'add', id: item.id })
    expect(state[0].quantity).toBe(2)
    state = cartReducer(state, { type: 'decrease', id: item.id })
    expect(state[0].quantity).toBe(1)
    expect(cartReducer(state, { type: 'decrease', id: item.id })).toEqual([])
    expect(cartReducer(state, { type: 'remove', id: item.id })).toEqual([])
    expect(cartReducer(state, { type: 'clear' })).toEqual([])
  })
  it('restores only unique known ids and positive safe integers', () => {
    expect(
      restoreCart(
        JSON.stringify([
          { id: item.id, quantity: 2 },
          { id: 'bad', quantity: 1 },
          { id: item.id, quantity: 3 },
        ]),
        [item],
      ),
    ).toEqual([{ id: item.id, quantity: 2 }])
    expect(restoreCart('bad', [item])).toEqual([])
    expect(
      restoreCart(JSON.stringify([{ id: item.id, quantity: 1.5 }]), [item]),
    ).toEqual([])
  })
  it('totals in cents without rounding drift', () => {
    expect(
      cartTotals(
        [{ id: item.id, quantity: 3 }],
        [{ ...item, priceCents: 1999 }],
      ),
    ).toEqual({ count: 3, totalCents: 5997 })
  })
})
