import { useRef } from 'react'
import { usePointerBackground } from './usePointerBackground'
const particles = Array.from({ length: 18 }, (_, position) => {
  const left = (position * 37 + 9) % 100,
    top = (position * 23 + 13) % 95
  return {
    id: 'pixel-' + left + '-' + top,
    style: {
      left: left + '%',
      top: top + '%',
      width: position % 3 === 0 ? 8 : 4,
      height: position % 3 === 0 ? 8 : 4,
    },
  }
})
export function ReactiveBackground() {
  const ref = useRef<HTMLDivElement>(null)
  usePointerBackground(ref)
  return (
    <div className="reactive-background" aria-hidden="true" ref={ref}>
      <div className="reactive-grid" />
      <div className="reactive-glow" />
      <div className="reactive-pixels">
        {particles.map((particle) => (
          <i key={particle.id} style={particle.style} />
        ))}
      </div>
    </div>
  )
}
