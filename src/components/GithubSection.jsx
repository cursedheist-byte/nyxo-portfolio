import { ArrowUpRight } from 'lucide-react'
import GithubIcon from './icons/GithubIcon'
import Reveal from './ui/Reveal'
import {
  languageColor,
  relativeTime,
  useGithubProfile,
} from '../hooks/useGithubProfile'

export default function GithubSection() {
  const { status, profile, repos } = useGithubProfile('cursedheist-byte')
  const loading = status === 'loading'
  const joinedYear = profile?.created_at
    ? new Date(profile.created_at).getFullYear()
    : 2026
  const visibleRepos = repos.slice(0, 4)

  return (
    <section id="github" className="section pt-0">
      <div className="container-nyxo">
        <Reveal>
          <div className="glass-border-gradient relative overflow-hidden rounded-[var(--radius-panel)] p-2">
            <div className="relative overflow-hidden rounded-[1.6rem] bg-[#07080f]/75 p-6 sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.25),transparent_68%)] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_68%)] blur-3xl" />

              <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="eyebrow">
                      <span className="text-white/35">05</span>
                      <span className="h-px w-4 bg-white/20" />
                      GitHub
                    </div>
                    <h2 className="display-lg mt-5 text-white">
                      The code is{' '}
                      <span className="text-iridescent">public.</span>
                    </h2>
                    <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-[var(--color-muted-fg)]">
                      Every project on this site lives in the open. Real repositories,
                      real commits, real work in progress — because building in public
                      is the fastest way to get better.
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/cursedheist-byte/"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                      >
                        <GithubIcon size={17} />
                        Open GitHub
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                      <div>
                        <div className="font-display text-[1.4rem] font-medium text-white">
                          {loading ? '—' : profile?.public_repos ?? 0}
                        </div>
                        <div className="mt-1 font-code text-[0.52rem] uppercase tracking-[0.16em] text-white/35">
                          Repos
                        </div>
                      </div>
                      <div>
                        <div className="font-display text-[1.4rem] font-medium text-white">
                          {loading ? '—' : profile?.followers ?? 0}
                        </div>
                        <div className="mt-1 font-code text-[0.52rem] uppercase tracking-[0.16em] text-white/35">
                          Followers
                        </div>
                      </div>
                      <div>
                        <div className="font-display text-[1.4rem] font-medium text-white">
                          {joinedYear}
                        </div>
                        <div className="mt-1 font-code text-[0.52rem] uppercase tracking-[0.16em] text-white/35">
                          Joined
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass glass-strong rounded-[1.35rem] p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-br from-violet-500/45 via-fuchsia-500/25 to-cyan-400/35 font-display text-sm text-white/80">
                        V
                        {profile?.avatar_url ? (
                          <img
                            src={profile.avatar_url}
                            alt="Varun's GitHub avatar"
                            width="44"
                            height="44"
                            className="absolute inset-0 h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-display text-[0.95rem] font-medium text-white">
                          {profile?.name || 'Varun'}
                        </div>
                        <div className="truncate font-code text-[0.62rem] text-white/40">
                          @{profile?.login || 'cursedheist-byte'}
                        </div>
                      </div>
                    </div>
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-code text-[0.5rem] uppercase tracking-[0.14em] text-white/45">
                      <span className="status-dot" />
                      {status === 'ready' ? 'Live' : loading ? 'Syncing' : 'Profile'}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1">
                    {loading
                      ? Array.from({ length: 4 }).map((_, index) => (
                          <div
                            key={index}
                            className="animate-loader flex items-center gap-3 rounded-xl border border-transparent px-3 py-3"
                          >
                            <span className="h-2 w-2 rounded-full bg-white/10" />
                            <span className="h-2 w-32 rounded-full bg-white/10" />
                            <span className="ml-auto h-2 w-12 rounded-full bg-white/[0.07]" />
                          </div>
                        ))
                      : visibleRepos.map((repo) => (
                          <a
                            key={repo.name}
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="repo-row flex items-center gap-3 rounded-xl border border-transparent px-3 py-3"
                          >
                            <span
                              className="h-2 w-2 shrink-0 rounded-full"
                              style={{ backgroundColor: languageColor(repo.language) }}
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-display text-[0.84rem] text-white/85">
                                {repo.name}
                              </span>
                              <span className="mt-0.5 flex items-center gap-1.5 font-code text-[0.52rem] uppercase tracking-[0.1em] text-white/30">
                                {repo.language || 'Code'}
                                <span className="text-white/15">/</span>
                                {relativeTime(repo.pushed_at)}
                              </span>
                            </span>
                            <ArrowUpRight
                              size={14}
                              className="shrink-0 text-white/25"
                              aria-hidden="true"
                            />
                          </a>
                        ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="font-code text-[0.52rem] uppercase tracking-[0.16em] text-white/25">
                      Latest repositories
                    </span>
                    <a
                      href="https://github.com/cursedheist-byte/?tab=repositories"
                      target="_blank"
                      rel="noreferrer"
                      className="font-code text-[0.52rem] uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-white"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
