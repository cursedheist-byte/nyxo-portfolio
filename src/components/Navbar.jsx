import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Logo from './Logo'
import GithubIcon from './icons/GithubIcon'
import { scrollToId } from '../hooks/useSmoothScroll'

const NAV_ITEMS = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'work', label: 'Work', index: '02' },
  { id: 'stack', label: 'Stack', index: '03' },
  { id: 'process', label: 'Process', index: '04' },
  { id: 'github', label: 'GitHub', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined

    document.body.classList.add('is-locked')
    window.__lenis?.stop()

    const menu = menuRef.current
    const focusables = menu
      ? [...menu.querySelectorAll('button, a[href]')].filter(
          (el) => el.offsetParent !== null,
        )
      : []
    focusables[0]?.focus()

    function handleKey(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.classList.remove('is-locked')
      window.__lenis?.start()
      window.removeEventListener('keydown', handleKey)
      toggleRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 48rem)')
    function handleChange(event) {
      if (event.matches) setOpen(false)
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  function goTo(id) {
    setOpen(false)
    window.setTimeout(() => scrollToId(id), 70)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="container-nyxo">
          <div
            className={`mt-3 flex items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ${
              scrolled
                ? 'glass border-white/10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]'
                : 'border-transparent bg-transparent'
            }`}
          >
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-full focus-ring"
              aria-label="NYXO — back to top"
            >
              <Logo />
            </button>

            <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  className={`relative rounded-full px-3.5 py-2 font-display text-[0.82rem] transition-colors duration-300 focus-ring ${
                    active === item.id
                      ? 'text-white'
                      : 'text-white/55 hover:text-white'
                  }`}
                  aria-current={active === item.id ? 'page' : undefined}
                >
                  {item.label}
                  {active === item.id ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent"
                      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    />
                  ) : null}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/cursedheist-byte/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost !min-h-9 !px-3.5 !py-2 text-[0.78rem]"
              >
                <GithubIcon size={15} />
                <span className="hidden sm:inline">GitHub</span>
                <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </a>

              <button
                type="button"
                ref={toggleRef}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white md:hidden"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {open ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="fixed inset-0 z-40 overflow-y-auto bg-[#05060a]/80 px-5 pb-10 pt-24 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mx-auto flex max-w-md flex-col">
              <div className="mb-6 flex items-center gap-2 font-code text-[0.62rem] uppercase tracking-[0.24em] text-white/40">
                <span className="status-dot" />
                Navigation
              </div>

              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  className="group flex items-center justify-between border-b border-white/10 py-5 text-left"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + index * 0.05, duration: 0.4 }}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-code text-[0.6rem] text-white/30">{item.index}</span>
                    <span className="font-display text-[2rem] font-medium tracking-[-0.04em] text-white/90 transition-colors group-hover:text-white">
                      {item.label}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-white/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden="true"
                  />
                </motion.button>
              ))}

              <a
                href="https://github.com/cursedheist-byte/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary mt-8 w-full"
              >
                <GithubIcon size={17} />
                github.com/cursedheist-byte
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>

              <p className="mt-6 text-center font-code text-[0.62rem] uppercase tracking-[0.2em] text-white/35">
                Varun / NYXO — high school builder
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
