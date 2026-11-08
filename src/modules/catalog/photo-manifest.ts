import { requestJson } from '../../shared/api-client'

export interface ProductPhoto {
  id: string
  image: string
  alt: string
  author: string
  source: string
  license: string
  licenseUrl: string
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isText = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

function parsePhoto(value: unknown): ProductPhoto {
  if (
    !isRecord(value) ||
    !isText(value.id) ||
    !/^[1-9]\d*$/.test(value.id) ||
    !isText(value.image) ||
    !/^photos\/[a-z0-9-]+\.jpg$/.test(value.image) ||
    !isText(value.alt) ||
    !isText(value.author) ||
    !isText(value.source) ||
    (!value.source.startsWith('https://commons.wikimedia.org/wiki/File:') &&
      !value.source.startsWith('https://www.flickr.com/photos/')) ||
    !isText(value.license) ||
    !isText(value.licenseUrl) ||
    !value.licenseUrl.startsWith('https://creativecommons.org/')
  ) {
    throw new Error('The photo manifest contains an invalid entry.')
  }
  return {
    id: value.id,
    image: value.image,
    alt: value.alt,
    author: value.author,
    source: value.source,
    license: value.license,
    licenseUrl: value.licenseUrl,
  }
}

export function parsePhotoManifest(value: unknown): Map<string, ProductPhoto> {
  if (!isRecord(value) || !Array.isArray(value.items))
    throw new Error('The photo manifest is invalid.')
  const photos = new Map<string, ProductPhoto>()
  for (const entry of value.items) {
    const photo = parsePhoto(entry)
    if (photos.has(photo.id)) throw new Error('Duplicate photo product ID.')
    photos.set(photo.id, photo)
  }
  return photos
}

export async function fetchPhotoManifest(
  fetcher: typeof fetch = fetch,
): Promise<Map<string, ProductPhoto>> {
  return parsePhotoManifest(
    await requestJson('data/product-photos.json', { fetcher }),
  )
}
