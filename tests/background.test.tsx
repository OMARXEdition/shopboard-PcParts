import { StrictMode } from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ReactiveBackground } from '../src/shared/ReactiveBackground'
describe('reactive decorative background', () => {
  it('coalesces pointer work and resets on leave with Strict Mode cleanup', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }))
    let frame: FrameRequestCallback | undefined
    const request = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb) => {
        frame = cb
        return 7
      })
    const cancel = vi
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation(() => {})
    const view = render(
      <StrictMode>
        <ReactiveBackground />
      </StrictMode>,
    )
    const layer = view.container.querySelector('.reactive-background')
    if (!(layer instanceof HTMLElement))
      throw new Error('Missing background element')
    expect(layer).toHaveAttribute('aria-hidden', 'true')
    fireEvent(
      document,
      new MouseEvent('pointermove', { clientX: 250, clientY: 150 }),
    )
    fireEvent(
      document,
      new MouseEvent('pointermove', { clientX: 300, clientY: 200 }),
    )
    expect(request).toHaveBeenCalledTimes(1)
    act(() => frame?.(0))
    expect(layer.style.getPropertyValue('--pointer-x')).toBe('300px')
    fireEvent(document.documentElement, new MouseEvent('pointerleave'))
    expect(layer.style.getPropertyValue('--pointer-active')).toBe('0')
    fireEvent(
      document,
      new MouseEvent('pointermove', { clientX: 100, clientY: 100 }),
    )
    view.unmount()
    expect(cancel).toHaveBeenCalledWith(7)
    request.mockRestore()
    cancel.mockRestore()
  })
  it('avoids movement listeners when reduced motion or coarse pointer is requested', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    const request = vi.spyOn(window, 'requestAnimationFrame')
    const view = render(<ReactiveBackground />)
    fireEvent(
      document,
      new MouseEvent('pointermove', { clientX: 200, clientY: 100 }),
    )
    expect(request).not.toHaveBeenCalled()
    view.unmount()
    request.mockRestore()
  })
})
