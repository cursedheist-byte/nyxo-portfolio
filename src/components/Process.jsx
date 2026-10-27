import { Hammer, Palette, Rocket, Search } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const STEPS = [
  {
    title: 'Decode',
    copy: 'Understand the product, the people and the one job the interface has to do.',
    icon: Search,
    label: 'The brief',
  },
  {
    title: 'Design',
    copy: 'Find the direction, build the system and sweat the details until it feels inevitable.',
    icon: Palette,
    label: 'The feel',
  },
  {
    title: 'Build',
    copy: 'React, TypeScript, Python, APIs and motion. Fast, accessible and responsive by default.',
    icon: Hammer,
    label: 'The system',
  },
  {
    title: 'Ship',
    copy: 'Deploy, measure and refine. Shipped beats perfect every single time.',
    icon: Rocket,
    label: 'The launch',
  },
]

export default function Process() {
  return (
    <section id="process" className="section pt-0">
      <div className="container-nyxo">
        <SectionHeading
          index="04"
          label="Process"
          title={
            <>
              From idea to{' '}
              <span className="text-iridescent">shipped.</span>
            </>
          }
          description="No mystery, no endless meetings. A tight loop that turns a rough idea into something you can actually click."
        />

        <div className="relative mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="process-line hidden xl:block" aria-hidden="true" />

          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} delay={index * 0.06}>
                <article className="glass glass-card relative h-full overflow-hidden rounded-[var(--radius-card)] p-6 transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <div className="ghost-number">0{index + 1}</div>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.045] text-white/60">
                      <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </div>

                  <div className="mt-5 font-code text-[0.55rem] uppercase tracking-[0.2em] text-violet-300/60">
                    {step.label}
                  </div>
                  <h3 className="mt-2 font-display text-[1.3rem] font-medium tracking-[-0.03em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.88rem] leading-relaxed text-[var(--color-muted-fg)]">
                    {step.copy}
                  </p>

                  <div className="mt-6 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
