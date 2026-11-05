import type { Product } from './catalog.types'
import { WindowBar } from '../../shared/WindowBar'
import { ProductImage } from '../../shared/ProductImage'
import { formatPrice } from '../../shared/format'
export interface ProductCardProps {
  product: Product
  position: number
  onView: (product: Product) => void
  onAdd: (product: Product) => void
}
export function ProductCard({
  product: p,
  position,
  onView,
  onAdd,
}: ProductCardProps) {
  return (
    <article className="window product-card">
      <WindowBar>
        <span className="numeric">{String(position).padStart(2, '0')}</span> /{' '}
        {p.category.toUpperCase()}
      </WindowBar>
      <button
        className="product-image-button"
        aria-label={`View ${p.name}`}
        onClick={() => onView(p)}
      >
        <ProductImage path={p.image} alt={p.alt} className="product-art" />
      </button>
      <div className="product-info">
        <p className="category-label">{p.category} / category photo</p>
        <h3 className="product-title">{p.name}</h3>
        <p className="product-description">{p.specs[0].value}</p>
        <div className="product-bottom">
          <span className="price numeric">{formatPrice(p.priceCents)}</span>
          <button
            className="primary-button"
            aria-label={`Add ${p.name} to cart`}
            onClick={() => onAdd(p)}
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  )
}
