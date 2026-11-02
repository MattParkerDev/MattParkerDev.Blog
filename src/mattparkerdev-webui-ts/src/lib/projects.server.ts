import { FEATURED_PROJECTS, OTHER_PROJECTS, type Project } from './projects'
import { GITHUB_USER } from './site'

type GitHubRepo = { name: string; stargazers_count: number }

let starsByRepo: Promise<Map<string, number>> | undefined

async function fetchStars() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) throw new Error(`GitHub responded with ${response.status}`)

    const repos: GitHubRepo[] = await response.json()
    return new Map(repos.map((repo) => [repo.name.toLowerCase(), repo.stargazers_count]))
  } catch (error) {
    console.warn('Using fallback GitHub star counts:', error)
    return new Map<string, number>()
  }
}

async function withLiveStars(project: Project): Promise<Project> {
  starsByRepo ??= fetchStars()
  const stars = (await starsByRepo).get(project.repo.toLowerCase())
  return stars === undefined ? project : { ...project, stars }
}

export async function getFeaturedProjects() {
  const [sharpIde, sharpDbg] = await Promise.all([
    withLiveStars(FEATURED_PROJECTS.sharpIde),
    withLiveStars(FEATURED_PROJECTS.sharpDbg),
  ])
  return { sharpIde, sharpDbg }
}

export function getOtherProjects() {
  return Promise.all(OTHER_PROJECTS.map(withLiveStars))
}
