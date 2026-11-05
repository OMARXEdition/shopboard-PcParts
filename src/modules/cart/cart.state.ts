import type { Product } from '../catalog/catalog.types'
export interface CartLine {
  id: string
  quantity: number
}
export type CartAction =
  | { type: 'add' | 'decrease' | 'remove'; id: string }
  | { type: 'clear' }
  | { type: 'restore'; lines: CartLine[] }
export const CART_KEY = 'shopboard-pcparts:cart:v1'
export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  if (action.type === 'restore') return action.lines
  if (action.type === 'clear') return []
  if (action.type === 'remove') return state.filter((l) => l.id !== action.id)
  const line = state.find((l) => l.id === action.id)
  if (action.type === 'add') {
    if (!line) return [...state, { id: action.id, quantity: 1 }]
    if (line.quantity >= 999) return state
    return state.map((l) =>
      l.id === action.id ? { ...l, quantity: l.quantity + 1 } : l,
    )
  }
  return state.flatMap((l) =>
    l.id !== action.id
      ? [l]
      : l.quantity > 1
        ? [{ ...l, quantity: l.quantity - 1 }]
        : [],
  )
}
export function restoreCart(
  raw: string | null,
  products: readonly Product[],
): CartLine[] {
  try {
    const data: unknown = JSON.parse(raw ?? '[]')
    if (!Array.isArray(data)) return []
    const seen = new Set<string>()
    return data.filter((line): line is CartLine => {
      if (
        typeof line !== 'object' ||
        line === null ||
        !('id' in line) ||
        typeof line.id !== 'string' ||
        seen.has(line.id) ||
        !products.some((p) => p.id === line.id) ||
        !('quantity' in line) ||
        typeof line.quantity !== 'number' ||
        !Number.isSafeInteger(line.quantity) ||
        line.quantity < 1 ||
        line.quantity > 999
      )
        return false
      seen.add(line.id)
      return true
    })
  } catch {
    return []
  }
}
export function cartTotals(
  lines: readonly CartLine[],
  products: readonly Product[],
) {
  return lines.reduce(
    (total, line) => {
      const p = products.find((p) => p.id === line.id)
      return p
        ? {
            count: total.count + line.quantity,
            totalCents: total.totalCents + p.priceCents * line.quantity,
          }
        : total
    },
    { count: 0, totalCents: 0 },
  )
}
