import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduce) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return undefined

    document.documentElement.classList.add('has-custom-cursor')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let frame = 0
    let visible = false

    function handleMove(event) {
      mouseX = event.clientX
      mouseY = event.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    function handleOver(event) {
      const interactive = event.target.closest(
        'a, button, [data-cursor="hover"], input, textarea, select',
      )
      ring.classList.toggle('is-hovering', Boolean(interactive))
    }

    function handleLeave() {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      visible = false
    }

    function tick() {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerover', handleOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerover', handleOver)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
