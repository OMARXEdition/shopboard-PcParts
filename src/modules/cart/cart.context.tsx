import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import type { Product } from '../catalog/catalog.types'
import {
  cartReducer,
  restoreCart,
  cartTotals,
  CART_KEY,
  type CartLine,
} from './cart.state'
interface CartContextValue {
  lines: CartLine[]
  count: number
  totalCents: number
  add: (id: string) => boolean
  decrease: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}
const Context = createContext<CartContextValue | null>(null)
export function CartProvider({
  products,
  children,
}: {
  products: Product[]
  children: ReactNode
}) {
  const [lines, dispatch] = useReducer(cartReducer, [], () => {
    try {
      return restoreCart(localStorage.getItem(CART_KEY), products)
    } catch {
      return []
    }
  })
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines))
    } catch {
      /* Cart remains usable if browser storage is blocked. */
    }
  }, [lines])
  const value = {
    lines,
    ...cartTotals(lines, products),
    add: (id: string) => {
      if (
        !products.some((p) => p.id === id) ||
        lines.some((line) => line.id === id && line.quantity >= 999)
      )
        return false
      dispatch({ type: 'add', id })
      return true
    },
    decrease: (id: string) => dispatch({ type: 'decrease', id }),
    remove: (id: string) => dispatch({ type: 'remove', id }),
    clear: () => dispatch({ type: 'clear' }),
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useCart() {
  const value = useContext(Context)
  if (!value) throw new Error('CartProvider missing')
  return value
}
