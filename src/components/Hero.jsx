import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Code2,
  FileCode2,
  Sparkles,
} from 'lucide-react'
import { LogoMark } from './Logo'
import GithubIcon from './icons/GithubIcon'
import { scrollToId } from '../hooks/useSmoothScroll'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE },
  },
}

const lineVariants = {
  hidden: { y: '115%', opacity: 0, filter: 'blur(12px)' },
  show: (index) => ({
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, delay: 0.16 + index * 0.1, ease: EASE },
  }),
}

const STATS = [
  { value: '04', label: 'Public repos' },
  { value: 'AI × WEB', label: 'Build focus' },
  { value: '∞', label: 'Curiosity' },
]

export default function Hero({ ready = true }) {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 70, damping: 18, mass: 0.5 })
  const springY = useSpring(pointerY, { stiffness: 70, damping: 18, mass: 0.5 })
  const { scrollY } = useScroll()
  const orbScrollY = useTransform(scrollY, [0, 760], [0, 110])

  function handlePointerMove(event) {
    if (reduce) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    pointerX.set(x * 22)
    pointerY.set(y * 22)
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 sm:pt-36"
    >
      <div className="container-nyxo grid items-center gap-16 lg:grid-cols-[1.06fr_0.94fr] lg:gap-8">
        <motion.div
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="relative z-10"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <span className="pill">
              <span className="status-dot" />
              Open for collabs
            </span>
            <span className="font-code text-[0.62rem] uppercase tracking-[0.24em] text-white/35">
              Varun / NYXO
            </span>
          </motion.div>

          <h1 className="display-xl mt-7 text-white">
            <span className="sr-only">I build AI-powered experiences.</span>
            <span aria-hidden="true">
              {['I build', 'AI-powered', 'experiences.'].map((line, index) => (
                <span key={line} className="block overflow-hidden py-[0.02em]">
                  <motion.span
                    custom={index}
                    variants={lineVariants}
                    className={`block ${
                      index === 1 ? 'text-iridescent' : ''
                    }`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-pretty text-[1.02rem] leading-relaxed text-[var(--color-muted-fg)] sm:text-[1.08rem]"
          >
            High school student. AI product builder. I turn ideas into interfaces
            that feel alive — websites, apps and the intelligent systems behind
            them.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => scrollToId('work')} className="btn btn-primary">
              Explore the work
              <ArrowUpRight size={17} strokeWidth={1.9} aria-hidden="true" />
            </button>
            <a
              href="https://github.com/cursedheist-byte/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <GithubIcon size={17} />
              GitHub
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-white/10 pt-6"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[1.35rem] font-medium tracking-[-0.03em] text-white">
                  {stat.value}
                </div>
                <div className="mt-1 font-code text-[0.58rem] uppercase tracking-[0.2em] text-white/35">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(18px)' }}
          animate={ready ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.15, delay: 0.24, ease: EASE }}
          style={{ y: reduce ? 0 : orbScrollY }}
          className="relative"
        >
          <motion.div
            style={{ x: reduce ? 0 : springX, y: reduce ? 0 : springY }}
            className="hero-visual"
          >
            <div className="orb-halo" />
            <div className="orb-ring orb-ring-1" />
            <div className="orb-ring orb-ring-2" />

            <div className="orb">
              <div className="orb-core">
                <LogoMark className="h-12 w-12" strokeWidth={5} />
                <span className="mt-2 font-code text-[0.5rem] uppercase tracking-[0.28em] text-white/40">
                  Core
                </span>
              </div>
            </div>

            <div className="orb-tag orb-tag-1">
              <Code2 size={12} aria-hidden="true" /> React
            </div>
            <div className="orb-tag orb-tag-2">
              <Sparkles size={12} aria-hidden="true" /> AI / ML
            </div>
            <div className="orb-tag orb-tag-3">
              <FileCode2 size={12} aria-hidden="true" /> TypeScript
            </div>
            <div className="orb-tag orb-tag-4">
              <Activity size={12} aria-hidden="true" /> Motion
            </div>

            <div className="orb-caption">NYXO / Liquid Core — 2026</div>
          </motion.div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId('about')}
        className="hero-scroll absolute bottom-6 left-1/2 hidden -translate-x-1/2 focus-ring md:flex"
        aria-label="Scroll to the about section"
      >
        <span>Scroll</span>
        <span aria-hidden="true" />
        <ArrowDown size={13} aria-hidden="true" />
      </button>
    </section>
  )
}
