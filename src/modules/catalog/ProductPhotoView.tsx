import { apiUrl } from '../../shared/api-client'
import type { ProductPhoto } from './photo-manifest'

export interface ProductPhotoViewProps {
  photo: ProductPhoto
  loading?: 'eager' | 'lazy'
}

export function ProductPhotoView({
  photo,
  loading = 'lazy',
}: ProductPhotoViewProps) {
  return (
    <figure className="product-photo">
      <img
        src={apiUrl(photo.image)}
        alt={photo.alt}
        loading={loading}
        decoding="async"
      />
      <figcaption>
        Photo: <a href={photo.source}>{photo.author}</a> ·{' '}
        <a href={photo.licenseUrl}>{photo.license}</a>
      </figcaption>
    </figure>
  )
}
