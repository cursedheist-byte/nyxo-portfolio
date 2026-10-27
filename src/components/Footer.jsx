import { ArrowUp } from 'lucide-react'
import GithubIcon from './icons/GithubIcon'
import Logo from './Logo'
import { scrollToId } from '../hooks/useSmoothScroll'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#05060a]/40">
      <div className="container-nyxo py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-[0.82rem] leading-relaxed text-[var(--color-muted-fg)]">
              AI-powered web &amp; app experiences, built by Varun under NYXO.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToId(link.id)}
                className="font-display text-[0.82rem] text-white/45 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/cursedheist-byte/"
              target="_blank"
              rel="noreferrer"
              aria-label="Varun on GitHub"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
            >
              <GithubIcon size={16} />
            </a>
            <button
              type="button"
              onClick={() => {
                const lenis = window.__lenis
                if (lenis) lenis.scrollTo(0, { duration: 1.2 })
                else window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              aria-label="Back to top"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
            >
              <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.07] pt-6 font-code text-[0.55rem] uppercase tracking-[0.16em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 NYXO — Varun. All rights reserved.</span>
          <span>Built with React, WebGL &amp; too much curiosity.</span>
        </div>
      </div>
    </footer>
  )
}
