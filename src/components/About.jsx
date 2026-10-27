import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react'
import GithubIcon from './icons/GithubIcon'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { LogoMark } from './Logo'

const ID_DETAILS = [
  ['Focus', 'AI × Web × App'],
  ['Status', 'Shipping & learning'],
  ['Base', 'The internet'],
  ['Since', '2026'],
]

const STATS = [
  ['04', 'Public repos'],
  ['02', 'AI builds'],
  ['06+', 'Tools used'],
  ['01', 'Person team'],
]

const VALUES = [
  'Taste over templates',
  'Motion with meaning',
  'Ship, then refine',
  'AI as a tool, not a crutch',
]

export default function About() {
  const reduce = useReducedMotion()

  return (
    <section id="about" className="section">
      <div className="container-nyxo">
        <SectionHeading
          index="01"
          label="About"
          title={
            <>
              The human behind{' '}
              <span className="text-iridescent">the glass.</span>
            </>
          }
          description="I'm Varun — a high school student who got obsessed with making the internet feel less boring. NYXO is the name I build under."
        />

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass glass-strong identity-card relative overflow-hidden rounded-[var(--radius-panel)] p-6 sm:p-7">
              <div className="flex items-center justify-between font-code text-[0.58rem] uppercase tracking-[0.22em] text-white/35">
                <span>NYXO ID / 001</span>
                <span className="flex items-center gap-2 text-white/55">
                  <span className="status-dot" />
                  High school
                </span>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="avatar-orb">
                  <LogoMark className="h-8 w-8" strokeWidth={5.5} />
                </div>
                <div>
                  <div className="font-display text-[1.6rem] font-medium tracking-[-0.03em] text-white">
                    Varun
                  </div>
                  <a
                    href="https://github.com/cursedheist-byte/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 font-code text-[0.7rem] text-white/45 transition-colors hover:text-white"
                  >
                    <GithubIcon size={12} />
                    @cursedheist-byte
                  </a>
                </div>
              </div>

              <div className="mt-7">
                <div className="font-signature text-[2.4rem] leading-none text-white/85">
                  Varun
                </div>
                <div className="mt-1 font-code text-[0.55rem] uppercase tracking-[0.24em] text-white/30">
                  Founder / builder / NYXO
                </div>
              </div>

              <div className="mt-7 space-y-0 border-t border-white/10">
                {ID_DETAILS.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-white/[0.06] py-3"
                  >
                    <span className="font-code text-[0.57rem] uppercase tracking-[0.18em] text-white/35">
                      {label}
                    </span>
                    <span className="font-display text-[0.82rem] text-white/80">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-end justify-between gap-5">
                <div className="flex items-center gap-2 font-code text-[0.55rem] uppercase tracking-[0.16em] text-white/30">
                  <MapPin size={11} aria-hidden="true" />
                  Online
                </div>
                <div className="identity-lines h-8 w-28 opacity-40" aria-hidden="true" />
              </div>

              <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.28),transparent_68%)] blur-2xl" />
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.05}>
              <p className="display-md text-pretty text-white/90">
                I build at the intersection of{' '}
                <span className="text-white">AI, interfaces and motion</span> — the place
                where a product stops feeling like software and starts feeling like an
                experience.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-7 space-y-5 text-pretty text-[0.98rem] leading-relaxed text-[var(--color-muted-fg)] sm:text-base">
                <p>
                  I'm Varun. By day I'm a high school student; the rest of the time I'm
                  designing and shipping AI-powered websites and apps under NYXO. What
                  started as curiosity turned into an obsession with making things that
                  look sharp, move well and actually work.
                </p>
                <p>
                  I care about the details most people never name: the weight of a click,
                  the easing on a panel, the half-second before a page loads. That's where
                  products go from "nice" to "oh, that's clean."
                </p>
                <p className="text-white/70">
                  Right now: turning ideas into shipped interfaces, learning in public,
                  and pushing pixels until they behave.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {STATS.map(([value, label]) => (
                  <div
                    key={label}
                    className="glass glass-card rounded-2xl px-4 py-4"
                  >
                    <div className="font-display text-[1.55rem] font-medium tracking-[-0.04em] text-white">
                      {value}
                    </div>
                    <div className="mt-1 font-code text-[0.55rem] uppercase tracking-[0.16em] text-white/35">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2">
                {VALUES.map((value) => (
                  <span key={value} className="tag">
                    <Sparkles size={10} className="text-violet-300/70" aria-hidden="true" />
                    {value}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <a
                href="https://github.com/cursedheist-byte/"
                target="_blank"
                rel="noreferrer"
                className="link-arrow mt-9"
              >
                Follow the build on GitHub
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
