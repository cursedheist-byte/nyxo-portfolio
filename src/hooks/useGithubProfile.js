import { useEffect, useState } from 'react'

const FALLBACK = {
  login: 'cursedheist-byte',
  name: 'Varun',
  avatar_url: '',
  html_url: 'https://github.com/cursedheist-byte',
  public_repos: 4,
  followers: 0,
  following: 0,
  created_at: '2026-08-30T05:33:55Z',
}

const FALLBACK_REPOS = [
  { name: 'ai-youtube-auto-publisher', language: 'Python', html_url: 'https://github.com/cursedheist-byte/ai-youtube-auto-publisher', stargazers_count: 0, pushed_at: null },
  { name: 'ThumbPrompt', language: 'Python', html_url: 'https://github.com/cursedheist-byte/ThumbPrompt', stargazers_count: 0, pushed_at: null },
  { name: 'grocery_app', language: 'TypeScript', html_url: 'https://github.com/cursedheist-byte/grocery_app', stargazers_count: 0, pushed_at: null },
  { name: 'Football-Tournament', language: 'JavaScript', html_url: 'https://github.com/cursedheist-byte/Football-Tournament', stargazers_count: 0, pushed_at: null },
]

export function useGithubProfile(username = 'cursedheist-byte') {
  const [state, setState] = useState({
    status: 'loading',
    profile: null,
    repos: [],
  })

  useEffect(() => {
    const controller = new AbortController()
    const headers = { Accept: 'application/vnd.github+json' }

    async function load() {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
            headers,
          }),
          fetch(
            `https://api.github.com/users/${username}/repos?sort=pushed&per_page=6&type=owner`,
            { signal: controller.signal, headers },
          ),
        ])

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error('GitHub API unavailable')
        }

        const profile = await profileResponse.json()
        const repos = await reposResponse.json()

        setState({
          status: 'ready',
          profile,
          repos: Array.isArray(repos) ? repos : [],
        })
      } catch (error) {
        if (error.name === 'AbortError') return
        setState({
          status: 'fallback',
          profile: FALLBACK,
          repos: FALLBACK_REPOS,
        })
      }
    }

    load()
    return () => controller.abort()
  }, [username])

  return state
}

export function languageColor(language) {
  const colors = {
    Python: '#3572A5',
    TypeScript: '#3178C6',
    JavaScript: '#F1E05A',
    HTML: '#E34C26',
    CSS: '#563D7C',
    React: '#61DAFB',
  }
  return colors[language] || '#94A3B8'
}

export function relativeTime(value) {
  if (!value) return 'recently'
  const diff = Date.now() - new Date(value).getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}
