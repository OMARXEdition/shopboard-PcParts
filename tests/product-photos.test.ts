import { expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  fetchPhotoManifest,
  parsePhotoManifest,
} from '../src/modules/catalog/photo-manifest'

const photo = {
  id: '1',
  image: 'photos/leather-tote-bag.jpg',
  alt: 'Representative leather tote bag photograph',
  author: 'MOIBARDE',
  source:
    'https://commons.wikimedia.org/wiki/File:Bag_made_from_leather_product.jpg',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
}

it('validates local photo paths and rejects duplicate or unsafe entries', () => {
  expect(parsePhotoManifest({ items: [photo] })).toEqual(
    new Map([['1', photo]]),
  )
  const flickrPhoto = {
    ...photo,
    source: 'https://www.flickr.com/photos/7940758@N07/53108204286',
  }
  expect(parsePhotoManifest({ items: [flickrPhoto] })).toEqual(
    new Map([['1', flickrPhoto]]),
  )
  expect(() =>
    parsePhotoManifest({
      items: [{ ...photo, image: 'https://example.com/bag.jpg' }],
    }),
  ).toThrow()
  expect(() =>
    parsePhotoManifest({ items: [{ ...photo, image: 'photos/../bag.jpg' }] }),
  ).toThrow()
  expect(() => parsePhotoManifest({ items: [photo, photo] })).toThrow()
})

it('fetches the local JSON manifest through the base-aware API client', async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValue({ ok: true, json: async () => ({ items: [photo] }) })
  expect(await fetchPhotoManifest(fetcher)).toEqual(new Map([['1', photo]]))
  expect(fetcher).toHaveBeenCalledWith(
    '/Shopboard-PcParts/data/product-photos.json',
    { signal: undefined },
  )
})

it('ships one readable JPEG with attribution for every course product', () => {
  const raw: unknown = JSON.parse(
    readFileSync(
      join(process.cwd(), 'public/data/product-photos.json'),
      'utf8',
    ),
  )
  const photos = parsePhotoManifest(raw)
  expect([...photos.keys()]).toEqual(
    Array.from({ length: 12 }, (_, index) => String(index + 1)),
  )
  for (const photo of photos.values()) {
    const bytes = readFileSync(join(process.cwd(), 'public', photo.image))
    expect(bytes.length).toBeGreaterThan(1000)
    expect([...bytes.subarray(0, 2)]).toEqual([255, 216])
  }
})
