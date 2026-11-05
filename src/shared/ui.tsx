import { useEffect, useRef, useState, type ReactNode } from 'react'
import { assetUrl } from './api'
export function ProductImage({
  path,
  alt,
  className,
}: {
  path: string
  alt: string
  className?: string
}) {
  const [failedPath, setFailedPath] = useState<string | null>(null)
  return failedPath === path ? (
    <div className={className} role="img" aria-label={alt}>
      Photo unavailable
    </div>
  ) : (
    <img
      className={className}
      src={assetUrl(path)}
      alt={alt}
      loading="lazy"
      onError={() => setFailedPath(path)}
    />
  )
}
export function WindowBar({ children }: { children: ReactNode }) {
  return (
    <div className="window-bar">
      <span>{children}</span>
      <span className="window-controls" aria-hidden="true">
        ▁ □ ×
      </span>
    </div>
  )
}
export function Modal({
  title,
  closeLabel,
  onClose,
  children,
  drawer = false,
}: {
  title: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
  drawer?: boolean
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const previous = document.activeElement
    dialog.showModal()
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = old
      dialog.close()
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [])
  return (
    <dialog
      ref={ref}
      className={drawer ? 'cart-dialog' : 'product-dialog'}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="dialog-header">
        <h2 className={drawer ? undefined : 'product-title'}>{title}</h2>
        <button
          className="dialog-close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="dialog-body">{children}</div>
    </dialog>
  )
}
