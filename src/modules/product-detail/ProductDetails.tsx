import { Modal } from '../../components/ui/Modal'
import { ProductImage } from '../catalog/ProductImage'
import { formatPrice } from '../../shared/format'
import type { ProductDetailsProps } from './product-detail.types'
import { ProductSpecs } from './ProductSpecs'
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
          <ProductSpecs specs={product.specs} />
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
