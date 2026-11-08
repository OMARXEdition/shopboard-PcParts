import { useParams } from 'react-router-dom'
import { ProductContent } from './ProductContent'

export default function ProductPage() {
  const { id } = useParams()
  if (!id) throw new Error('Product ID missing.')
  return <ProductContent id={id} />
}
