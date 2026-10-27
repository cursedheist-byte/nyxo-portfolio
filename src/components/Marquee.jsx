import { Sparkles } from 'lucide-react'

const ITEMS = [
  'AI websites',
  'Mobile apps',
  'Design systems',
  'Motion',
  'Liquid glass',
  'Ship fast',
]

function Track({ hidden = false }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <div key={item} className="flex items-center gap-8 sm:gap-12">
          <span
            className="font-display text-[1.9rem] font-medium uppercase leading-none tracking-[-0.04em] sm:text-[3rem]"
            style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.18)' }}
          >
            {item}
          </span>
          <Sparkles size={18} className="text-violet-300/50" aria-hidden="true" />
        </div>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee relative overflow-hidden border-y border-white/[0.07] bg-white/[0.015] py-5 mask-fade-x">
      <div className="marquee-track flex">
        <Track />
        <Track hidden />
      </div>
    </div>
  )
}
