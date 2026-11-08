import { beforeEach, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/app/App'

const rows = {
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
}
const photoManifest = {
  items: [
    {
      id: '1',
      image: 'photos/leather-tote-bag.jpg',
      alt: 'Representative leather tote bag photograph',
      author: 'MOIBARDE',
      source:
        'https://commons.wikimedia.org/wiki/File:Bag_made_from_leather_product.jpg',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    },
  ],
}

beforeEach(() => {
  window.location.hash = '#/'
  localStorage.clear()
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => ({
      ok: true,
      json: async () =>
        url.endsWith('/product-photos.json')
          ? photoManifest
          : url.endsWith('/api/products/1')
            ? rows.items[0]
            : rows,
    })),
  )
})

it('navigates through lazy pages under one layout and loads a product by id', async () => {
  render(<App />)
  expect(
    await screen.findByRole('heading', { name: /shopboard/i }),
  ).toBeInTheDocument()
  await userEvent.click(screen.getByRole('link', { name: 'Catalog' }))
  expect(await screen.findByText('Leather Tote Bag')).toBeInTheDocument()
  expect(
    screen.getByRole('img', { name: photoManifest.items[0].alt }),
  ).toHaveAttribute('src', '/Shopboard-PcParts/photos/leather-tote-bag.jpg')
  await userEvent.click(screen.getByRole('link', { name: 'Leather Tote Bag' }))
  expect(
    await screen.findByRole('heading', { name: 'Leather Tote Bag', level: 1 }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('img', { name: photoManifest.items[0].alt }),
  ).toBeInTheDocument()
  expect(fetch).toHaveBeenCalledWith(
    'https://shopboard-api.vercel.app/api/products/1',
    expect.anything(),
  )
  await userEvent.click(screen.getByRole('link', { name: /cart, 0 items/i }))
  expect(
    await screen.findByRole('heading', { name: 'Your cart' }),
  ).toBeInTheDocument()
})
