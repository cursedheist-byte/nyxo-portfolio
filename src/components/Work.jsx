import {
  ArrowUpRight,
  CircleDollarSign,
  Play,
  Sparkles,
  Trophy,
  Wand2,
} from 'lucide-react'
import GithubIcon from './icons/GithubIcon'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'
import TiltCard from './ui/TiltCard'

const PROJECTS = [
  {
    title: 'AI YouTube Auto Publisher',
    repo: 'ai-youtube-auto-publisher',
    language: 'Python',
    languageColor: '#3572A5',
    year: '2026',
    description:
      'An AI-powered pipeline that automates the research, writing and publishing loop for YouTube content.',
    tags: ['Python', 'AI', 'Automation'],
    link: 'https://github.com/cursedheist-byte/ai-youtube-auto-publisher',
    visual: 'publisher',
    span: 'lg:col-span-7',
  },
  {
    title: 'ThumbPrompt',
    repo: 'ThumbPrompt',
    language: 'Python',
    languageColor: '#3572A5',
    year: '2026',
    description:
      'A prompt engine for generating scroll-stopping YouTube thumbnail concepts with AI.',
    tags: ['Python', 'GenAI', 'Prompting'],
    link: 'https://github.com/cursedheist-byte/ThumbPrompt',
    visual: 'thumb',
    span: 'lg:col-span-5',
  },
  {
    title: 'Grocery App',
    repo: 'grocery_app',
    language: 'TypeScript',
    languageColor: '#3178C6',
    year: '2026',
    description:
      'A fast, frictionless grocery shopping app built in TypeScript — browse, cart, checkout.',
    tags: ['TypeScript', 'App', 'UI'],
    link: 'https://github.com/cursedheist-byte/grocery_app',
    visual: 'grocery',
    span: 'lg:col-span-5',
  },
  {
    title: 'Football Tournament',
    repo: 'Football-Tournament',
    language: 'JavaScript',
    languageColor: '#F1E05A',
    year: '2026',
    description:
      'A tournament hub for fixtures, teams and scores — built for the love of the game.',
    tags: ['JavaScript', 'Web', 'Data'],
    link: 'https://github.com/cursedheist-byte/Football-Tournament',
    visual: 'football',
    span: 'lg:col-span-7',
  },
]

function PublisherVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(120%_100%_at_18%_0%,rgba(139,92,246,0.32),transparent_56%),radial-gradient(100%_90%_at_90%_100%,rgba(34,211,238,0.2),transparent_52%),#080910]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:34px_34px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_80%)]" />
      <div className="absolute inset-x-4 top-3 flex items-center justify-between">
        <div className="flex gap-1.5 window-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="font-code text-[0.52rem] uppercase tracking-[0.16em] text-white/30">
          flow.nyxo / v1
        </span>
      </div>

      <div className="absolute inset-x-5 top-[22%]">
        <div className="absolute left-[15%] right-[15%] top-1/2 h-px bg-gradient-to-r from-violet-400/40 via-cyan-300/50 to-pink-400/40" />
        <div className="relative grid grid-cols-3 gap-2">
          {[
            { label: 'Research', icon: Sparkles },
            { label: 'Generate', icon: Wand2 },
            { label: 'Publish', icon: Play },
          ].map((node) => {
            const Icon = node.icon
            return (
              <div
                key={node.label}
                className="rounded-lg border border-white/12 bg-white/[0.06] p-2.5 backdrop-blur-md"
              >
                <span className="grid h-6 w-6 place-items-center rounded-md border border-white/10 bg-white/[0.05]">
                  <Icon size={11} className="text-white/70" aria-hidden="true" />
                </span>
                <div className="mt-2 font-display text-[0.62rem] text-white/80">
                  {node.label}
                </div>
                <div className="mt-1 h-1 w-8 rounded-full bg-white/12" />
              </div>
            )
          })}
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-4 rounded-xl border border-white/10 bg-black/25 p-3 backdrop-blur-md">
        <div className="flex items-center justify-between font-code text-[0.52rem] uppercase tracking-[0.14em]">
          <span className="text-white/40">Pipeline</span>
          <span className="text-emerald-300/90">Running</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300" />
        </div>
      </div>
    </div>
  )
}

function ThumbVisual() {
  const tiles = [
    { label: 'HOOK', className: 'from-violet-500/70 via-fuchsia-500/30 to-transparent' },
    { label: 'PROOF', className: 'from-cyan-400/60 via-sky-500/20 to-transparent' },
    { label: 'CTA', className: 'from-pink-400/60 via-rose-500/20 to-transparent' },
    { label: 'AI', className: 'from-amber-300/50 via-orange-500/20 to-transparent' },
  ]

  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(110%_100%_at_80%_0%,rgba(34,211,238,0.26),transparent_55%),radial-gradient(100%_90%_at_10%_100%,rgba(244,114,182,0.2),transparent_55%),#080910]">
      <div className="absolute inset-x-4 top-3 flex items-center justify-between">
        <div className="flex gap-1.5 window-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="font-code text-[0.52rem] uppercase tracking-[0.16em] text-white/30">
          thumbprompt / studio
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-[18%] top-[20%] grid grid-cols-2 grid-rows-2 gap-2">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className={`relative h-full overflow-hidden rounded-lg border border-white/12 bg-gradient-to-br ${tile.className}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.16)_50%,transparent_70%)]" />
            <span className="absolute bottom-1.5 left-2 font-display text-[0.55rem] font-semibold tracking-[0.12em] text-white/80">
              {tile.label}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-5 bottom-4 flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3 py-2 backdrop-blur-md">
        <Sparkles size={11} className="shrink-0 text-cyan-300/80" aria-hidden="true" />
        <span className="truncate font-code text-[0.52rem] text-white/45">
          prompt: make it impossible to scroll past
        </span>
        <span className="ml-auto h-3 w-px animate-pulse bg-white/60" aria-hidden="true" />
      </div>
    </div>
  )
}

function GroceryVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(100%_100%_at_50%_0%,rgba(52,211,153,0.18),transparent_55%),radial-gradient(90%_80%_at_100%_100%,rgba(34,211,238,0.2),transparent_55%),#080910]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_80%)]" />

      <div className="absolute left-1/2 top-7 w-[48%] min-w-[9.5rem] -translate-x-1/2 rotate-[-5deg] rounded-[1.6rem] border border-white/20 bg-[#0a0b12] p-2 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
        <div className="mx-auto h-1 w-8 rounded-full bg-white/20" />
        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-[0.55rem] font-medium text-white/85">Fresh</span>
          <span className="font-code text-[0.4rem] uppercase tracking-[0.1em] text-emerald-300/80">
            Today
          </span>
        </div>
        <div className="mt-2 flex h-5 items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1 w-10 rounded-full bg-white/12" />
        </div>
        <div className="mt-2 space-y-1.5">
          {[
            ['Avocado', '04.20', 'bg-emerald-400/60'],
            ['Oat milk', '03.80', 'bg-amber-300/60'],
            ['Blueberries', '05.10', 'bg-violet-400/60'],
            ['Sourdough', '02.90', 'bg-orange-300/60'],
          ].map(([name, price, color]) => (
            <div
              key={name}
              className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-1.5 py-1"
            >
              <span className={`h-3.5 w-3.5 rounded-full ${color}`} />
              <div className="flex-1">
                <div className="font-display text-[0.43rem] text-white/70">{name}</div>
                <div className="h-0.5 w-5 rounded-full bg-white/10" />
              </div>
              <span className="font-code text-[0.4rem] text-white/45">${price}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-2 py-1">
          <span className="font-display text-[0.43rem] font-semibold text-[#05100c]">Cart</span>
          <span className="font-code text-[0.4rem] font-semibold text-[#05100c]">$16.00</span>
        </div>
      </div>

      <div className="absolute right-4 top-[22%] flex items-center gap-1.5 rounded-full border border-white/12 bg-black/35 px-2.5 py-1.5 backdrop-blur-md">
        <CircleDollarSign size={11} className="text-emerald-300/80" aria-hidden="true" />
        <span className="font-code text-[0.48rem] uppercase tracking-[0.12em] text-white/55">
          Checkout
        </span>
      </div>
    </div>
  )
}

function FootballVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(120%_100%_at_15%_100%,rgba(251,191,36,0.18),transparent_55%),radial-gradient(100%_90%_at_85%_0%,rgba(139,92,246,0.24),transparent_55%),#080910]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="absolute inset-x-5 top-4 flex items-center justify-between">
        <span className="font-code text-[0.52rem] uppercase tracking-[0.18em] text-white/35">
          Matchday / Final
        </span>
        <Trophy size={13} className="text-amber-300/70" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-5 top-[24%] rounded-xl border border-white/10 bg-black/25 p-3 backdrop-blur-md">
        {[
          { name: 'NYX United', score: '3', color: 'from-violet-400 to-fuchsia-400' },
          { name: 'Cyber FC', score: '2', color: 'from-cyan-300 to-sky-400' },
        ].map((team) => (
          <div
            key={team.name}
            className="flex items-center justify-between border-b border-white/[0.06] py-1.5 last:border-b-0"
          >
            <div className="flex items-center gap-2">
              <span className={`h-5 w-5 rounded-full bg-gradient-to-br ${team.color}`} />
              <span className="font-display text-[0.58rem] text-white/80">{team.name}</span>
            </div>
            <span className="font-display text-[0.9rem] font-semibold text-white">
              {team.score}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
        {['68%', '12', '5'].map((value, index) => (
          <div key={value} className="flex-1 px-1">
            <div className="font-code text-[0.4rem] uppercase tracking-[0.12em] text-white/30">
              {['Possession', 'Shots', 'Corners'][index]}
            </div>
            <div className="mt-1 font-display text-[0.62rem] text-white/75">{value}</div>
            <div className="mt-1 h-0.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
                style={{ width: value }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectVisual({ variant }) {
  if (variant === 'publisher') return <PublisherVisual />
  if (variant === 'thumb') return <ThumbVisual />
  if (variant === 'grocery') return <GroceryVisual />
  return <FootballVisual />
}

export default function Work() {
  return (
    <section id="work" className="section pt-0">
      <div className="container-nyxo">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            index="02"
            label="Selected work"
            title={
              <>
                Built in public.{' '}
                <span className="text-iridescent">Shipped with intent.</span>
              </>
            }
            description="Real repositories from my GitHub — AI tools, apps and web experiments. No fake renders; the code is one click away."
          />
          <Reveal delay={0.1}>
            <a
              href="https://github.com/cursedheist-byte/?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="link-arrow shrink-0"
            >
              All repositories
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.repo} className={project.span} delay={index * 0.06}>
              <TiltCard className="h-full">
                <SpotlightCard
                  className="project-card glass glass-card flex h-full flex-col rounded-[var(--radius-panel)] p-2.5"
                  data-cursor="hover"
                >
                  <div className="project-visual aspect-[16/10] w-full lg:aspect-auto lg:h-[22rem]">
                    <ProjectVisual variant={project.visual} />
                  </div>

                  <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex min-w-0 items-center gap-2 font-code text-[0.56rem] uppercase tracking-[0.14em] text-white/35">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: project.languageColor }}
                        />
                        {project.language}
                        <span className="text-white/15">/</span>
                        <span className="truncate">{project.repo}</span>
                      </span>
                      <span className="font-code text-[0.56rem] text-white/25">{project.year}</span>
                    </div>

                    <h3 className="mt-3 font-display text-[1.3rem] font-medium tracking-[-0.03em] text-white sm:text-[1.45rem]">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-violet-200"
                      >
                        {project.title}
                      </a>
                    </h3>

                    <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-[var(--color-muted-fg)]">
                      {project.description}
                    </p>

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} on GitHub`}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-white/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.1] hover:text-white"
                      >
                        <GithubIcon size={16} />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
