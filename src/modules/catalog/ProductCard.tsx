import type { Product } from './catalog.types'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../shared/format'
import { ProductPhotoView } from './ProductPhotoView'
import type { ProductPhoto } from './photo-manifest'
export interface ProductCardProps {
  product: Product
  photo?: ProductPhoto
}
export function ProductCard({ product, photo }: ProductCardProps) {
  return (
    <article className="window product-card">
      <div className="window-bar">{product.category}</div>
      {photo && <ProductPhotoView photo={photo} />}
      <div className="product-info">
        <h2 className="product-title">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h2>
        <p>{product.inStock ? 'In stock' : 'Sold out'}</p>
        <div className="product-bottom">
          <span className="price numeric">
            {formatPrice(product.priceCents)}
          </span>
          <Link className="secondary-button" to={`/products/${product.id}`}>
            View product
          </Link>
        </div>
      </div>
    </article>
  )
}
