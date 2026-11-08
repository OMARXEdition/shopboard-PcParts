import { expect, it, vi } from 'vitest'
import { act, render, screen, waitFor } from '@testing-library/react'
import App from '../src/app/App'

it('keeps the layout visible while the catalog waits for the API', async () => {
  window.location.hash = '#/products'
  let finish: ((value: unknown) => void) | undefined
  const fetcher = vi.fn((url: string) =>
    url.endsWith('/product-photos.json')
      ? Promise.resolve({ ok: true, json: async () => ({ items: [] }) })
      : new Promise((resolve) => {
          finish = resolve
        }),
  )
  vi.stubGlobal('fetch', fetcher)
  render(<App />)
  expect(screen.getByRole('banner')).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  expect(await screen.findByRole('status')).toHaveTextContent(
    'Loading this page',
  )
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2))
  await act(async () => {
    finish?.({ ok: true, json: async () => ({ items: [], total: 0 }) })
  })
  expect(await screen.findByText('No products available.')).toBeInTheDocument()
})
