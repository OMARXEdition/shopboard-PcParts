import { StrictMode } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/app/App'
const product = {
  id: 'cpu-1',
  name: 'Retro Core 8',
  category: 'CPU',
  description: 'Demo CPU',
  priceCents: 25000,
  image: 'photos/cpu.jpg',
  alt: 'Processor photograph',
  specs: [{ label: 'Cores', value: '8' }],
}
beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
})
describe('storefront', () => {
  it('loads products, opens details, and adds exactly once', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => [product] }),
    )
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    expect(screen.getByText(/loading the parts/i)).toBeInTheDocument()
    await screen.findByRole('button', { name: 'View Retro Core 8' })
    fireEvent.click(screen.getByRole('button', { name: 'View Retro Core 8' }))
    expect(
      screen.getByRole('dialog', { name: 'Retro Core 8' }),
    ).toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('button', { name: 'Close product details' }),
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Add Retro Core 8 to cart' }),
    )
    fireEvent.click(screen.getByRole('button', { name: /open cart/i }))
    expect(
      screen.getByRole('button', { name: 'Decrease Retro Core 8 quantity' }),
    ).toBeInTheDocument()
    await waitFor(() =>
      expect(localStorage.getItem('shopboard-pcparts:cart:v1')).toContain(
        '"quantity":1',
      ),
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Decrease Retro Core 8 quantity' }),
    )
    expect(screen.getByText('Your cart is waiting.')).toBeInTheDocument()
  })
  it('shows failure and retries', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockRejectedValueOnce(new Error('offline'))
        .mockRejectedValueOnce(new Error('offline'))
        .mockResolvedValue({ ok: true, json: async () => [product] }),
    )
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    fireEvent.click(await screen.findByRole('button', { name: 'Try again' }))
    expect(
      await screen.findByRole('button', { name: 'View Retro Core 8' }),
    ).toBeInTheDocument()
  })
  it('distinguishes empty catalog and no matching search', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => [] }),
    )
    const emptyView = render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    expect(
      await screen.findByText('No parts on the shelf yet.'),
    ).toBeInTheDocument()
    emptyView.unmount()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => [product] }),
    )
    render(<App />)
    await screen.findByRole('button', { name: 'View Retro Core 8' })
    await userEvent.type(screen.getByRole('searchbox'), 'no-such-part')
    expect(screen.getByText('No matching parts.')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }))
    expect(
      screen.getByRole('button', { name: 'View Retro Core 8' }),
    ).toBeInTheDocument()
  })
})

it('restores saved carts and survives blocked storage', async () => {
  localStorage.setItem(
    'shopboard-pcparts:cart:v1',
    JSON.stringify([{ id: 'cpu-1', quantity: 2 }]),
  )
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: true, json: async () => [product] }),
  )
  const view = render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  expect(
    await screen.findByRole('button', { name: 'Open cart, 2 items' }),
  ).toBeInTheDocument()
  view.unmount()
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('blocked')
  })
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('blocked')
  })
  render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  fireEvent.click(
    await screen.findByRole('button', { name: 'Add Retro Core 8 to cart' }),
  )
  expect(
    screen.getByRole('button', { name: 'Open cart, 1 items' }),
  ).toBeInTheDocument()
})
