import type { Product } from '../catalog/catalog.types'
import { Modal } from '../../shared/Modal'
import { ProductImage } from '../../shared/ProductImage'
import { formatPrice } from '../../shared/format'
export interface ProductDetailsProps {
  product: Product
  onClose: () => void
  onAdd: (p: Product) => void
}
export function ProductDetails({
  product,
  onClose,
  onAdd,
}: ProductDetailsProps) {
  return (
    <Modal
      title={product.name}
      closeLabel="Close product details"
      onClose={onClose}
    >
      <div className="detail-grid">
        <ProductImage
          path={product.image}
          alt={product.alt}
          className="detail-image"
        />
        <div>
          <p className="category-label">{product.category}</p>
          <p>{product.description}</p>
          <dl className="spec-list">
            {product.specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="price numeric">{formatPrice(product.priceCents)}</p>
          <button className="primary-button" onClick={() => onAdd(product)}>
            + Add to cart
          </button>
          <p className="muted">
            Representative category photo. Specifications and prices are sample
            data; the photographed model may differ. No checkout or real
            purchase.
          </p>
        </div>
      </div>
    </Modal>
  )
}
