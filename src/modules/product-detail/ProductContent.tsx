import { use } from 'react'
import { Link } from 'react-router-dom'
import {
  photoManifestPromise,
  productPromise,
} from '../catalog/catalog-resource'
import { ProductPhotoView } from '../catalog/ProductPhotoView'
import { useCart } from '../cart/useCart'
import { formatPrice } from '../../shared/format'

export interface ProductContentProps {
  id: string
}

export function ProductContent({ id }: ProductContentProps) {
  const productRequest = productPromise(id)
  const photoRequest = photoManifestPromise()
  const product = use(productRequest)
  const photos = use(photoRequest)
  const photo = photos.get(product.id)
  const cart = useCart()
  const quantity =
    cart.lines.find((line) => line.id === product.id)?.quantity ?? 0
  return (
    <div className="container page-shell">
      <Link to="/products">← Back to catalog</Link>
      <div className="product-page-panel">
        {photo && <ProductPhotoView photo={photo} loading="eager" />}
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price numeric">{formatPrice(product.priceCents)}</p>
        <p>{product.inStock ? 'In stock' : 'Sold out'}</p>
        <button
          className="primary-button"
          disabled={!product.inStock || quantity >= 999}
          onClick={() => cart.add(product.id)}
        >
          Add to cart
        </button>
      </div>
      <p className="muted">
        Product details and price come from the ShopBoard course API. No real
        purchase is made here.
      </p>
    </div>
  )
}
