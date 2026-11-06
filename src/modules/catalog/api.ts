import { categories } from './catalog.types'
import type { Product } from './catalog.types'
import { requestJson } from '../../shared/api-client'

const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null
const text = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

function isProduct(value: unknown): value is Product {
  if (!record(value)) return false
  return (
    text(value.id) &&
    text(value.name) &&
    text(value.description) &&
    text(value.alt) &&
    categories.some((category) => category === value.category) &&
    typeof value.priceCents === 'number' &&
    Number.isSafeInteger(value.priceCents) &&
    value.priceCents >= 0 &&
    text(value.image) &&
    /^photos\/[a-z0-9-]+\.(?:jpe?g|png|webp)$/.test(value.image) &&
    Array.isArray(value.specs) &&
    value.specs.length > 0 &&
    value.specs.every(
      (spec: unknown) => record(spec) && text(spec.label) && text(spec.value),
    )
  )
}

export function parseProducts(data: unknown): Product[] {
  if (!Array.isArray(data))
    throw new Error('The product catalog must be a JSON array.')
  const rows: unknown[] = data
  const products: Product[] = []
  const ids = new Set<string>()
  for (const value of rows) {
    if (!isProduct(value) || ids.has(value.id))
      throw new Error(
        'The product catalog contains an invalid or duplicate product.',
      )
    ids.add(value.id)
    products.push(value)
  }
  return products
}

export async function fetchProducts(
  signal?: AbortSignal,
  fetcher: typeof fetch = fetch,
): Promise<Product[]> {
  return parseProducts(
    await requestJson('data/products.json', { signal, fetcher }),
  )
}
