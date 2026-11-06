import { useEffect, type RefObject } from 'react'
export function usePointerBackground(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const layer = ref.current
    if (!layer || !window.matchMedia) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)'),
      coarse = window.matchMedia('(pointer: coarse)')
    let frame: number | null = null,
      x = 0,
      y = 0
    const reset = () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      frame = null
      layer.style.setProperty('--pointer-active', '0')
      layer.style.setProperty('--parallax-x', '0px')
      layer.style.setProperty('--parallax-y', '0px')
    }
    const paint = () => {
      frame = null
      const bounds = layer.getBoundingClientRect()
      const localX = x - bounds.left,
        localY = y - bounds.top,
        width = bounds.width || window.innerWidth,
        height = bounds.height || window.innerHeight
      if (localX < 0 || localX > width || localY < 0 || localY > height) {
        reset()
        return
      }
      layer.style.setProperty('--pointer-x', `${localX}px`)
      layer.style.setProperty('--pointer-y', `${localY}px`)
      layer.style.setProperty(
        '--parallax-x',
        `${(localX / width - 0.5) * 20}px`,
      )
      layer.style.setProperty(
        '--parallax-y',
        `${(localY / height - 0.5) * 16}px`,
      )
      layer.style.setProperty('--pointer-active', '1')
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || reduced.matches || coarse.matches)
        return
      x = event.clientX
      y = event.clientY
      if (frame === null) frame = window.requestAnimationFrame(paint)
    }
    const configure = () => {
      reset()
      document.removeEventListener('pointermove', move)
      if (!reduced.matches && !coarse.matches)
        document.addEventListener('pointermove', move, { passive: true })
    }
    configure()
    document.documentElement.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)
    reduced.addEventListener?.('change', configure)
    coarse.addEventListener?.('change', configure)
    return () => {
      reset()
      document.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
      reduced.removeEventListener?.('change', configure)
      coarse.removeEventListener?.('change', configure)
    }
  }, [ref])
}
