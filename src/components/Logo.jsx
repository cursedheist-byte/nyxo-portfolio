import { useId } from 'react'

export function LogoMark({ className = '', strokeWidth = 5.5 }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#C4B5FD" />
          <stop offset="0.45" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path
        d="M18 46V18l28 28V18"
        stroke={`url(#${id}-g)`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="18" r="3" fill="#F1F5F9" />
      <circle cx="46" cy="46" r="3" fill="#67E8F9" />
    </svg>
  )
}

export default function Logo({ className = '', markClassName = 'h-8 w-8' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="glass grid h-9 w-9 place-items-center rounded-xl border-white/15">
        <LogoMark className={markClassName} />
      </span>
      <span className="font-display text-[1.05rem] font-semibold tracking-[0.22em] text-white">
        NYXO
      </span>
    </span>
  )
}
