export class ApiRequestError extends Error {
  constructor(public readonly status: number) {
    super(`Request failed (${status}).`)
    this.name = 'ApiRequestError'
  }
}

export interface RequestJsonOptions {
  signal?: AbortSignal
  fetcher?: typeof fetch
}

export const apiUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export async function requestJson(
  path: string,
  { signal, fetcher = fetch }: RequestJsonOptions = {},
): Promise<unknown> {
  const response = await fetcher(
    path.startsWith('https://') ? path : apiUrl(path),
    { signal },
  )
  if (!response.ok) throw new ApiRequestError(response.status)
  return response.json()
}
