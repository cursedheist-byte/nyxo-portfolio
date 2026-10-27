import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

export default function TiltCard({ children, className = '', max = 5 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 160, damping: 20, mass: 0.4 })
  const springY = useSpring(rotateY, { stiffness: 160, damping: 20, mass: 0.4 })

  function handleMove(event) {
    if (reduce) return
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * max * 2)
    rotateX.set(-py * max * 2)
  }

  function reset() {
    rotateX.set(0)
    rotateY.set(0)
  }

  if (reduce) {
    return <div className={`h-full ${className}`}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1100 }}
      className={`h-full preserve-3d ${className}`}
    >
      {children}
    </motion.div>
  )
}
