import type { ReactNode } from 'react'
export interface WindowBarProps {
  children: ReactNode
}
export function WindowBar({ children }: WindowBarProps) {
  return (
    <div className="window-bar">
      <span>{children}</span>
      <span className="window-controls" aria-hidden="true">
        ▁ □ ×
      </span>
    </div>
  )
}
