import { categories, type Product } from '../modules/catalog/catalog.types'
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`
const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null
const text = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0
export function parseProducts(data: unknown): Product[] {
  if (!Array.isArray(data))
    throw new Error('The product catalog must be a JSON array.')
  const ids = new Set<string>()
  for (const p of data) {
    if (
      !record(p) ||
      !text(p.id) ||
      ids.has(p.id) ||
      !text(p.name) ||
      !text(p.description) ||
      !text(p.alt) ||
      !categories.some((c) => c === p.category) ||
      !Number.isSafeInteger(p.priceCents) ||
      Number(p.priceCents) < 0 ||
      !text(p.image) ||
      !/^photos\/[a-z0-9-]+\.(?:jpe?g|png|webp)$/.test(p.image) ||
      !Array.isArray(p.specs) ||
      !p.specs.length ||
      !p.specs.every((s) => record(s) && text(s.label) && text(s.value))
    )
      throw new Error(
        'The product catalog contains an invalid or duplicate product.',
      )
    ids.add(p.id)
  }
  return data as Product[]
}
export async function fetchProducts(
  signal?: AbortSignal,
  fetcher: typeof fetch = fetch,
): Promise<Product[]> {
  const response = await fetcher(assetUrl('data/products.json'), { signal })
  if (!response.ok)
    throw new Error(`Catalog request failed (${response.status}).`)
  return parseProducts(await response.json())
}
