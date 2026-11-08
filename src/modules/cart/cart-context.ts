import { createContext } from 'react'
import type { CartLine } from './cart.state'
export interface CartContextValue {
  lines: CartLine[]
  count: number
  add: (id: string) => boolean
  decrease: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}
export const CartContext = createContext<CartContextValue | null>(null)
