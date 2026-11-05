import type { Product, SortOrder } from './catalog.types'
export function selectProducts(
  products: readonly Product[],
  search: string,
  category: string,
  sort: SortOrder,
): Product[] {
  const result = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.trim().toLowerCase()) &&
      (category === 'all' || p.category === category),
  )
  if (sort !== 'default')
    result.sort((a, b) =>
      sort === 'price-asc'
        ? a.priceCents - b.priceCents
        : b.priceCents - a.priceCents,
    )
  return result
}
