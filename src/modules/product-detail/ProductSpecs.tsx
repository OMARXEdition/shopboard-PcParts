import type { ProductSpecsProps } from './product-detail.types'

export function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <dl className="spec-list">
      {specs.map((spec) => (
        <div key={spec.label}>
          <dt>{spec.label}</dt>
          <dd>{spec.value}</dd>
        </div>
      ))}
    </dl>
  )
}
