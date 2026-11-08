export interface PageHeadingProps {
  title: string
  eyebrow?: string
  description?: string
}

export function PageHeading({ title, eyebrow, description }: PageHeadingProps) {
  return (
    <>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </>
  )
}
