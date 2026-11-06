export interface ToastProps {
  message: string
}
export function Toast({ message }: ToastProps) {
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {message && <div className="toast">✦ {message}</div>}
    </div>
  )
}
