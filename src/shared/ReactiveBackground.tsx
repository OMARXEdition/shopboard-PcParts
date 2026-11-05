import { useEffect, useRef } from 'react'
/** Decorative, event-driven motion: never schedules a perpetual animation loop. */
export function ReactiveBackground() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const layer = ref.current
    if (!layer || !window.matchMedia) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarse = window.matchMedia('(pointer: coarse)')
    let frame: number | null = null
    let x = 0,
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
        localY = y - bounds.top
      const width = bounds.width || window.innerWidth,
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
      layer.style.setProperty(
        '--pointer-active',
        localX >= 0 && localX <= width && localY >= 0 && localY <= height
          ? '1'
          : '0',
      )
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
  }, [])
  return (
    <div className="reactive-background" aria-hidden="true" ref={ref}>
      <div className="reactive-grid" />
      <div className="reactive-glow" />
      <div className="reactive-pixels">
        {Array.from({ length: 18 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37 + 9) % 100}%`,
              top: `${(i * 23 + 13) % 95}%`,
              width: i % 3 === 0 ? 8 : 4,
              height: i % 3 === 0 ? 8 : 4,
            }}
          />
        ))}
      </div>
    </div>
  )
}
