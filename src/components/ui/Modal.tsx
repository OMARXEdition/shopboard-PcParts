import { useEffect, useRef, type ReactNode } from 'react'
export interface ModalProps {
  title: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
  drawer?: boolean
}
export function Modal({
  title,
  closeLabel,
  onClose,
  children,
  drawer = false,
}: ModalProps) {
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
