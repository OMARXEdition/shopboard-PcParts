import { useState } from 'react'
import { apiUrl } from '../../shared/api-client'
export interface ProductImageProps {
  path: string
  alt: string
  className?: string
}
export function ProductImage({ path, alt, className }: ProductImageProps) {
  const [failedPath, setFailedPath] = useState<string | null>(null)
  return failedPath === path ? (
    <div className={className} role="img" aria-label={alt}>
      Photo unavailable
    </div>
  ) : (
    <img
      className={className}
      src={apiUrl(path)}
      alt={alt}
      loading="lazy"
      onError={() => setFailedPath(path)}
    />
  )
}
