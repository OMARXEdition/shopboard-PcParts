import { expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/app/App'

it('distinguishes no matches from an empty API catalog', async () => {
  window.history.replaceState(null, '', '/#/')
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => ({
      ok: true,
      json: async () =>
        url.endsWith('/product-photos.json')
          ? { items: [] }
          : {
              items: [
                {
                  id: 1,
                  title: 'Leather Tote Bag',
                  category_name: 'Bags',
                  price_cents: 8900,
                  in_stock: true,
                },
              ],
              total: 1,
            },
    })),
  )
  render(<App />)
  await userEvent.click(await screen.findByRole('link', { name: 'Catalog' }))
  await screen.findByText('Leather Tote Bag')
  await userEvent.type(screen.getByRole('searchbox'), 'not-here')
  expect(screen.getByText('No matching products.')).toBeInTheDocument()
})
