import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Sparkles } from 'lucide-react'
import GithubIcon from './icons/GithubIcon'
import Reveal from './ui/Reveal'

const HANDLE = 'cursedheist-byte'

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Clipboard API rejects when the document is unfocused or permission-gated.
  }
  try {
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand('copy')
    field.remove()
    return ok
  } catch {
    return false
  }
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyHandle() {
    const ok = await copyText(HANDLE)
    setCopied(ok)
    if (ok) window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="section pt-0">
      <div className="container-nyxo">
        <Reveal>
          <div className="glass glass-strong relative overflow-hidden rounded-[2.2rem] px-6 py-16 text-center sm:px-10 md:py-24">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.32),rgba(34,211,238,0.1)_48%,transparent_70%)] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.2),transparent_68%)] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-4xl">
              <div className="eyebrow justify-center">
                <span className="text-white/35">06</span>
                <span className="h-px w-4 bg-white/20" />
                Contact
              </div>

              <h2 className="display-xl mt-6 text-white">
                Let's build
                <br />
                <span className="text-iridescent">something unreal.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-pretty text-[0.98rem] leading-relaxed text-[var(--color-muted-fg)] sm:text-base">
                Got an idea, a project or a problem worth solving? I'm open to collabs,
                freelance work and ambitious experiments. The best way in is GitHub.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://github.com/cursedheist-byte/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-full sm:w-auto"
                >
                  <GithubIcon size={17} />
                  DM me on GitHub
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={copyHandle}
                  className="btn btn-ghost w-full sm:w-auto"
                  aria-label={`Copy GitHub handle @${HANDLE}`}
                >
                  {copied ? (
                    <Check size={16} className="text-emerald-300" aria-hidden="true" />
                  ) : (
                    <Copy size={16} aria-hidden="true" />
                  )}
                  {copied ? 'Handle copied' : `@${HANDLE}`}
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-code text-[0.58rem] uppercase tracking-[0.18em] text-white/30">
                <span className="inline-flex items-center gap-2">
                  <span className="status-dot" />
                  Available for collabs
                </span>
                <span className="hidden text-white/15 sm:inline">/</span>
                <span>Freelance</span>
                <span className="hidden text-white/15 sm:inline">/</span>
                <span>Internships</span>
              </div>

              <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 font-code text-[0.55rem] uppercase tracking-[0.18em] text-white/35">
                <Sparkles size={11} className="text-violet-300/70" aria-hidden="true" />
                Let's make the internet less boring
              </div>
            </div>

            <div
              className="pointer-events-none absolute -bottom-[9%] left-1/2 -translate-x-1/2 select-none font-display text-[28vw] font-semibold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.055)]"
              aria-hidden="true"
            >
              NYXO
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
