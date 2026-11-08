import { expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/app/App'

it('shares one cart across routes and restores it after a remount', async () => {
  window.history.replaceState(null, '', '/#/products/1')
  localStorage.clear()
  const product = {
    id: 1,
    title: 'Leather Tote Bag',
    category_name: 'Bags',
    price_cents: 8900,
    in_stock: true,
  }
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => ({
      ok: true,
      json: async () =>
        url.endsWith('/product-photos.json')
          ? { items: [] }
          : url.endsWith('/1')
            ? product
            : { items: [product], total: 1 },
    })),
  )
  const first = render(<App />)
  await userEvent.click(
    await screen.findByRole('button', { name: 'Add to cart' }),
  )
  expect(
    screen.getByRole('link', { name: /cart, 1 items/i }),
  ).toBeInTheDocument()
  await userEvent.click(screen.getByRole('link', { name: /cart, 1 items/i }))
  expect(
    await screen.findByRole('heading', { name: 'Your cart' }),
  ).toBeInTheDocument()
  await waitFor(() =>
    expect(localStorage.getItem('shopboard-fashion:cart:v1')).toContain(
      '"quantity":1',
    ),
  )
  first.unmount()
  render(<App />)
  expect(
    await screen.findByRole('link', { name: /cart, 1 items/i }),
  ).toBeInTheDocument()
})
