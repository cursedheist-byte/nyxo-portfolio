import { Boxes, Code2, Orbit, Sparkles, Wand2 } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'

const STACKS = [
  {
    title: 'Frontend',
    icon: Code2,
    note: 'Interfaces that feel fast, responsive and intentional.',
    items: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Vite'],
    accent: 'rgba(139, 92, 246, 0.3)',
  },
  {
    title: 'AI + Automation',
    icon: Sparkles,
    note: 'Turning models and prompts into products people can use.',
    items: ['Python', 'OpenAI API', 'Gemini', 'Prompt engineering', 'Workflows'],
    accent: 'rgba(34, 211, 238, 0.26)',
  },
  {
    title: 'Apps + Backend',
    icon: Boxes,
    note: 'The unglamorous plumbing that makes the magic hold up.',
    items: ['Node.js', 'REST APIs', 'Supabase', 'Git', 'GitHub'],
    accent: 'rgba(244, 114, 182, 0.24)',
  },
  {
    title: 'Design + Motion',
    icon: Wand2,
    note: 'Every transition earns its place. Nothing moves for no reason.',
    items: ['Figma', 'Motion', 'CSS / WebGL', 'Lenis', 'Design systems'],
    accent: 'rgba(52, 211, 153, 0.22)',
  },
]

export default function Stack() {
  return (
    <section id="stack" className="section pt-0">
      <div className="container-nyxo">
        <SectionHeading
          index="03"
          label="Stack"
          title={
            <>
              Tools I bend{' '}
              <span className="text-iridescent">to my will.</span>
            </>
          }
          description="A focused stack, chosen for speed, feel and shipping. If a project needs something new, I learn it — that's the job."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STACKS.map((stack, index) => {
            const Icon = stack.icon
            return (
              <Reveal key={stack.title} delay={index * 0.05}>
                <SpotlightCard className="glass glass-card stack-card relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] p-6">
                  <div
                    className="stack-glow"
                    style={{ background: `radial-gradient(circle, ${stack.accent}, transparent 68%)` }}
                    aria-hidden="true"
                  />
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/[0.06] text-white/85">
                      <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="font-code text-[0.55rem] uppercase tracking-[0.2em] text-white/25">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-[1.25rem] font-medium tracking-[-0.03em] text-white">
                    {stack.title}
                  </h3>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-[var(--color-muted-fg)]">
                    {stack.note}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {stack.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="glass mt-4 flex flex-col items-start justify-between gap-4 rounded-[var(--radius-card)] px-6 py-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                <Orbit size={16} className="text-cyan-300/80" aria-hidden="true" />
              </span>
              <div>
                <div className="font-code text-[0.56rem] uppercase tracking-[0.2em] text-white/35">
                  Currently exploring
                </div>
                <div className="mt-0.5 font-display text-[0.92rem] text-white/80">
                  WebGL shaders · AI agents · SwiftUI
                </div>
              </div>
            </div>
            <span className="font-code text-[0.58rem] uppercase tracking-[0.2em] text-white/30">
              Always compiling
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
