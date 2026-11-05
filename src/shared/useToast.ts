import { useEffect, useRef, useState } from 'react'
export function useToast() {
  const [message, setMessage] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  function notify(text: string) {
    setMessage(text)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMessage(''), 3200)
  }
  return { message, notify }
}
