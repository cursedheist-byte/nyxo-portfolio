import { useEffect } from 'react'
import Lenis from 'lenis'

export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    window.__lenis = lenis
    let frame = 0

    function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      if (window.__lenis === lenis) delete window.__lenis
    }
  }, [])
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return

  const lenis = window.__lenis
  if (lenis) {
    lenis.scrollTo(el, { offset: -88, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
