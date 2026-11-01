import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Layers, MousePointerClick } from 'lucide-react'
import Reveal from './ui/Reveal'

function GalleryFrame() {
  const frameRef = useRef(null)
  const [height, setHeight] = useState(1600)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return undefined

    let observer

    function measure() {
      const doc = frame.contentDocument
      if (!doc?.body) return
      const next = Math.ceil(doc.body.getBoundingClientRect().height)
      if (next > 200) {
        setHeight((previous) => (Math.abs(previous - next) > 1 ? next : previous))
      }
    }

    function connect() {
      measure()
      observer?.disconnect()
      const doc = frame.contentDocument
      if (!doc?.body || typeof ResizeObserver === 'undefined') return
      observer = new ResizeObserver(measure)
      observer.observe(doc.body)
    }

    frame.addEventListener('load', connect)
    if (frame.contentDocument?.readyState === 'complete') connect()

    return () => {
      frame.removeEventListener('load', connect)
      observer?.disconnect()
    }
  }, [])

  return (
    <iframe
      ref={frameRef}
      src="/style-lab/gallery.html"
      title="Live UI/UX style samples — ten clickable demo websites"
      className="block w-full border-0 bg-[#08090c]"
      style={{ height }}
      scrolling="no"
    />
  )
}

export default function StyleLab() {
  return (
    <section className="section pt-0">
      <div className="container-nyxo">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl">
            <div className="eyebrow">
              <span className="text-white/35">Style lab</span>
              <span className="h-px w-4 bg-white/20" />
              Ten living interfaces
            </div>
            <h2 className="display-lg mt-5 text-balance text-white">
              CONFUSED IN UI/UX STYLES ?{' '}
              <span className="text-iridescent">
                HERE ARE SAMPLES OF ALL STYLES
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-[var(--color-muted-fg)] sm:text-base">
              Ten separate sites, not ten tabs. Every card opens a real sample
              website built in its own design language — switch until one feels
              like your brand, then tell me the name.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="shrink-0">
            <div className="flex flex-wrap gap-2">
              {['10 live demos', '40 palettes', 'Web + app'].map((item) => (
                <span key={item} className="pill">
                  <Layers size={11} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
            <a
              href="/style-lab/index.html"
              target="_blank"
              rel="noreferrer"
              className="link-arrow mt-5"
            >
              Open the full gallery
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12">
          <div className="overflow-hidden rounded-[var(--radius-panel)] border border-white/10 bg-[#08090c] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.95)]">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex gap-1.5 window-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="truncate font-code text-[0.58rem] uppercase tracking-[0.16em] text-white/35">
                  style-lab / live gallery
                </span>
              </div>
              <span className="hidden items-center gap-1.5 font-code text-[0.55rem] uppercase tracking-[0.12em] text-white/30 sm:flex">
                <MousePointerClick size={12} aria-hidden="true" />
                Click a card to open its site
              </span>
            </div>

            <GalleryFrame />
          </div>
        </div>
      </div>
    </section>
  )
}
