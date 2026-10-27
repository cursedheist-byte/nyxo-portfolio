import { useRef } from 'react'

export default function SpotlightCard({ children, className = '', ...props }) {
  const ref = useRef(null)

  function handleMove(event) {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    node.style.setProperty('--mx', `${x}%`)
    node.style.setProperty('--my', `${y}%`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`spotlight ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
