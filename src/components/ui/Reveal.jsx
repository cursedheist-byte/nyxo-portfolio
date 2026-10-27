import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = 10,
  duration = 0.85,
  className = '',
  once = true,
  amount = 0.2,
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
