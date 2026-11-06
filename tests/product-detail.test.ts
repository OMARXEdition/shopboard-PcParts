import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useProductDetails } from '../src/modules/product-detail/useProductDetails'
import type { Product } from '../src/modules/catalog/catalog.types'

const product: Product = {
  id: 'cpu-1',
  name: 'Retro Core 8',
  category: 'CPU',
  description: 'Demo processor',
  priceCents: 25000,
  image: 'photos/cpu.jpg',
  alt: 'Processor photograph',
  specs: [{ label: 'Cores', value: '8' }],
}

describe('product detail selection', () => {
  it('opens the selected product and clears selection on close', () => {
    const { result } = renderHook(() => useProductDetails())

    act(() => result.current.open(product))
    expect(result.current.product).toBe(product)

    act(() => result.current.close())
    expect(result.current.product).toBeNull()
  })
})
