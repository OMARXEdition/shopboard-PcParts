import { useEffect, useState } from 'react'
import type { Product } from './catalog.types'
import { fetchProducts } from './api'

export interface CatalogState {
  products: Product[] | null
  error: boolean
  retry: () => void
}

export function useCatalog(): CatalogState {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetchProducts(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setProducts(data)
          setError(false)
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true)
      })
    return () => controller.abort()
  }, [attempt])

  return {
    products,
    error,
    retry: () => {
      setError(false)
      setAttempt((current) => current + 1)
    },
  }
}
