import type { ReactNode } from 'react'

export interface EmptyStateProps {
  title?: string
  message: string
  children?: ReactNode
}

export function EmptyState({ title, message, children }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {title && <h2>{title}</h2>}
      <p>{message}</p>
      {children}
    </div>
  )
}
