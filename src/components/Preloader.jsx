import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { LogoMark } from './Logo'

export default function Preloader({ onComplete }) {
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.body.classList.add('is-locked')
    window.__lenis?.stop()

    if (reduce) {
      setProgress(100)
      const timeout = setTimeout(onComplete, 120)
      return () => {
        clearTimeout(timeout)
        document.body.classList.remove('is-locked')
        window.__lenis?.start()
      }
    }

    const started = performance.now()
    const interval = setInterval(() => {
      const elapsed = performance.now() - started
      const next = Math.min(100, Math.round((elapsed / 1250) * 100))
      setProgress(next)
      if (next >= 100) clearInterval(interval)
    }, 24)

    const timeout = setTimeout(onComplete, 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      document.body.classList.remove('is-locked')
      window.__lenis?.start()
    }
  }, [onComplete, reduce])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-[#05060a]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(14px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Loading NYXO portfolio"
      role="status"
    >
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.22),rgba(34,211,238,0.08)_45%,transparent_70%)] blur-3xl" />

      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass flex h-20 w-20 items-center justify-center rounded-[1.6rem] border-white/15">
          <LogoMark className="h-11 w-11" strokeWidth={5} />
        </div>
        <div className="mt-6 font-display text-[1.35rem] font-semibold tracking-[0.34em] text-white">
          NYXO
        </div>
        <div className="mt-2 font-code text-[0.6rem] uppercase tracking-[0.28em] text-white/35">
          Digital craft / Varun
        </div>
      </motion.div>

      <div className="relative mt-10 w-[min(18rem,68vw)]">
        <div className="h-px w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduce ? 0 : 1.3, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between font-code text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
          <span>Assembling the experience</span>
          <span className="tabular-nums text-white/70">{String(progress).padStart(3, '0')}</span>
        </div>
      </div>
    </motion.div>
  )
}
