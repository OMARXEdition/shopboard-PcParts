import { describe, expect, it, vi } from 'vitest'
import {
  fetchProduct,
  fetchProducts,
  parseProduct,
  parseProducts,
} from '../src/modules/catalog/fashion-api'

const row = {
  id: 1,
  title: 'Leather Tote Bag',
  category_name: 'Bags',
  price_cents: 8900,
  in_stock: true,
}

describe('course fashion API', () => {
  it('validates and maps a catalog response', () => {
    expect(parseProducts({ items: [row], total: 1 })).toEqual([
      {
        id: '1',
        name: 'Leather Tote Bag',
        category: 'Bags',
        priceCents: 8900,
        inStock: true,
      },
    ])
    expect(parseProducts({ items: [], total: 0 })).toEqual([])
    expect(() =>
      parseProducts({ items: [{ ...row, price_cents: -1 }], total: 1 }),
    ).toThrow()
    expect(() => parseProducts({ items: [row, row], total: 2 })).toThrow()
  })

  it('loads an individual product by its id', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => row })
    expect(await fetchProduct('1', undefined, fetcher)).toEqual(
      parseProduct(row),
    )
    expect(fetcher).toHaveBeenCalledWith(
      'https://shopboard-api.vercel.app/api/products/1',
      { signal: undefined },
    )
    await expect(fetchProduct('../bad', undefined, fetcher)).rejects.toThrow()
  })

  it('uses the configured API mode and surfaces failed requests', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    await expect(
      fetchProducts(
        undefined,
        fetcher,
        'https://shopboard-api.vercel.app/fail/500',
      ),
    ).rejects.toThrow()
    expect(fetcher).toHaveBeenCalledWith(
      'https://shopboard-api.vercel.app/fail/500/api/products',
      { signal: undefined },
    )
  })
})
