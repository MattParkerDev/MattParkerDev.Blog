import { Link } from 'react-router'
import type { Route } from './+types/home'
import { FeaturedProjects } from '../components/FeaturedProjects'
import { PostList } from '../components/PostList'
import { getFeaturedProjects } from '../lib/projects.server'
import { getPostSummaries } from '../lib/posts.server'
import { pageMeta } from '../lib/seo'
import { AUTHOR, SITE_DESCRIPTION, SOCIALS } from '../lib/site'

export async function loader() {
  return {
    posts: getPostSummaries().slice(0, 4),
    projects: await getFeaturedProjects(),
  }
}

export function meta() {
  return pageMeta({
    title: `${AUTHOR} | Software engineer, creator of SharpIDE and SharpDbg`,
    description: SITE_DESCRIPTION,
    path: '/',
  })
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, projects } = loaderData

  return (
    <div className="wrap">
      <section className="hero">
        <p className="eyebrow">{AUTHOR} &middot; Software engineer &middot; Brisbane, Australia</p>
        <h1>I build developer tools for .NET.</h1>
        <p className="hero-intro">
          I created <a href={projects.sharpIde.url}>SharpIDE</a>, a cross-platform IDE for .NET, and{' '}
          <a href={projects.sharpDbg.url}>SharpDbg</a>, a .NET debugger written completely in C#. I also
          write about .NET, Azure and all things software.
        </p>
        <ul className="social-links">
          {SOCIALS.map((social) => (
            <li key={social.href}>
              <a href={social.href} rel="me">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="projects-heading">
        <div className="section-heading">
          <h2 id="projects-heading">Projects</h2>
          <Link className="text-link" to="/portfolio" prefetch="intent">
            All projects
          </Link>
        </div>
        <FeaturedProjects sharpIde={projects.sharpIde} sharpDbg={projects.sharpDbg} />
      </section>

      <section className="section" aria-labelledby="writing-heading">
        <div className="section-heading">
          <h2 id="writing-heading">Latest writing</h2>
          <Link className="text-link" to="/blog" prefetch="intent">
            All posts
          </Link>
        </div>
        <PostList posts={posts} />
      </section>
    </div>
  )
}
