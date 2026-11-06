import { describe, expect, it, vi } from 'vitest'
import { requestJson, ApiRequestError } from '../src/shared/api-client'

describe('shared API client', () => {
  it('resolves paths against Vite base and returns untrusted JSON', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'response' }),
    })

    await expect(
      requestJson('data/example.json', { fetcher }),
    ).resolves.toEqual({ message: 'response' })
    expect(fetcher).toHaveBeenCalledWith(
      '/Shopboard-PcParts/data/example.json',
      {
        signal: undefined,
      },
    )
  })

  it('reports HTTP status through a shared error type', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false, status: 503 })

    await expect(requestJson('data/example.json', { fetcher })).rejects.toEqual(
      new ApiRequestError(503),
    )
  })
})
