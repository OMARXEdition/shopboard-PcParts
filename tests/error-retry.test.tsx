import { expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/app/App'

it('offers retry after an API error', async () => {
  window.history.replaceState(null, '', '/#/')
  let attempts = 0
  const fetcher = vi.fn(async (url: string) => {
    if (url.endsWith('/product-photos.json'))
      return { ok: true, json: async () => ({ items: [] }) }
    attempts += 1
    return attempts === 1
      ? { ok: false, status: 500 }
      : { ok: true, json: async () => ({ items: [], total: 0 }) }
  })
  vi.stubGlobal('fetch', fetcher)
  render(<App />)
  await userEvent.click(await screen.findByRole('link', { name: 'Catalog' }))
  const retry = await screen.findByRole('button', { name: 'Try again' })
  await act(async () => {
    fireEvent.click(retry)
  })
  expect(attempts).toBe(2)
  expect(await screen.findByText('No products available.')).toBeInTheDocument()
})
