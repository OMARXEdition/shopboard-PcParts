import type { Product } from './catalog.types'
import { requestJson } from '../../shared/api-client'

export const DEFAULT_API_BASE = 'https://shopboard-api.vercel.app'

const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null
const nonempty = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

export function parseProduct(value: unknown): Product {
  if (
    !record(value) ||
    typeof value.id !== 'number' ||
    !Number.isSafeInteger(value.id) ||
    value.id < 1 ||
    !nonempty(value.title) ||
    !nonempty(value.category_name) ||
    typeof value.price_cents !== 'number' ||
    !Number.isSafeInteger(value.price_cents) ||
    value.price_cents < 0 ||
    typeof value.in_stock !== 'boolean'
  )
    throw new Error('The API returned an invalid product.')
  return {
    id: String(value.id),
    name: value.title,
    category: value.category_name,
    priceCents: value.price_cents,
    inStock: value.in_stock,
  }
}

export function parseProducts(value: unknown): Product[] {
  if (!record(value) || !Array.isArray(value.items))
    throw new Error('The API returned an invalid catalog.')
  const products = value.items.map(parseProduct)
  if (new Set(products.map((product) => product.id)).size !== products.length)
    throw new Error('The API returned duplicate product IDs.')
  return products
}

export function apiBase(): string {
  return (import.meta.env.VITE_SHOPBOARD_API_BASE || DEFAULT_API_BASE).replace(
    /\/$/,
    '',
  )
}

export async function fetchProducts(
  signal?: AbortSignal,
  fetcher: typeof fetch = fetch,
  base = apiBase(),
): Promise<Product[]> {
  return parseProducts(
    await requestJson(`${base}/api/products`, { signal, fetcher }),
  )
}

export async function fetchProduct(
  id: string,
  signal?: AbortSignal,
  fetcher: typeof fetch = fetch,
  base = apiBase(),
): Promise<Product> {
  if (!/^[1-9]\d*$/.test(id)) throw new Error('Invalid product ID.')
  const product = parseProduct(
    await requestJson(`${base}/api/products/${id}`, { signal, fetcher }),
  )
  if (product.id !== id) throw new Error('The API returned the wrong product.')
  return product
}
