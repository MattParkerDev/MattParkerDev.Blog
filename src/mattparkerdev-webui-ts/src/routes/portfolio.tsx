import type { Route } from './+types/portfolio'
import { FeaturedProjects } from '../components/FeaturedProjects'
import { getFeaturedProjects, getOtherProjects } from '../lib/projects.server'
import { formatStars } from '../lib/projects'
import { pageMeta } from '../lib/seo'
import { SITE_NAME, SOCIALS } from '../lib/site'

export async function loader() {
  const [featured, others] = await Promise.all([getFeaturedProjects(), getOtherProjects()])
  return { featured, others }
}

export function meta() {
  return pageMeta({
    title: `Projects | ${SITE_NAME}`,
    description: 'Open source projects by Matt Parker, including SharpIDE and SharpDbg.',
    path: '/portfolio',
  })
}

export default function Portfolio({ loaderData }: Route.ComponentProps) {
  const { featured, others } = loaderData
  const github = SOCIALS.find((social) => social.label === 'GitHub')

  return (
    <div className="wrap page">
      <h1 className="page-title">Projects</h1>
      <p className="page-intro">
        Open source, and mostly tooling for .NET developers. The rest is on{' '}
        <a href={github?.href}>GitHub</a>.
      </p>
      <FeaturedProjects sharpIde={featured.sharpIde} sharpDbg={featured.sharpDbg} />

      <section className="section" aria-labelledby="more-projects-heading">
        <div className="section-heading">
          <h2 id="more-projects-heading">More projects</h2>
        </div>
        <ol className="rows">
          {others.map((project) => (
            <li key={project.repo}>
              <a className="row" href={project.url}>
                <span className="row-body">
                  <span className="row-title">{project.name}</span>
                  <span className="row-description">{project.description}</span>
                </span>
                <span className="row-meta">
                  <span aria-hidden="true">★</span> {formatStars(project.stars)}
                  <span className="visually-hidden"> stars on GitHub</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
