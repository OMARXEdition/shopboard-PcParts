import { fetchProduct, fetchProducts } from './fashion-api'
import { fetchPhotoManifest } from './photo-manifest'

let catalogRequest: ReturnType<typeof fetchProducts> | undefined
let photoRequest: ReturnType<typeof fetchPhotoManifest> | undefined
const productRequests = new Map<string, ReturnType<typeof fetchProduct>>()

export function catalogPromise(): ReturnType<typeof fetchProducts> {
  catalogRequest ??= fetchProducts()
  return catalogRequest
}

export function photoManifestPromise(): ReturnType<typeof fetchPhotoManifest> {
  photoRequest ??= fetchPhotoManifest()
  return photoRequest
}

export function productPromise(id: string): ReturnType<typeof fetchProduct> {
  let request = productRequests.get(id)
  if (!request) {
    request = fetchProduct(id)
    productRequests.set(id, request)
  }
  return request
}

export function clearCatalogRequests(): void {
  catalogRequest = undefined
  photoRequest = undefined
  productRequests.clear()
}
