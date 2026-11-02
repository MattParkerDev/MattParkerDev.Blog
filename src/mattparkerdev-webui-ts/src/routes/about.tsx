import { Link } from 'react-router'
import { FEATURED_PROJECTS } from '../lib/projects'
import { pageMeta } from '../lib/seo'
import { SITE_DESCRIPTION, SITE_NAME, SOCIALS } from '../lib/site'

export function meta() {
  return pageMeta({
    title: `About | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    path: '/about',
  })
}

export default function About() {
  return (
    <div className="wrap page about">
      <h1 className="page-title">About</h1>
      <div className="about-grid">
        <div className="about-copy">
          <p>I'm Matt Parker, a software engineer based in Brisbane, Australia.</p>
          <p>
            Most of my open source work is developer tooling for .NET. That includes{' '}
            <a href={FEATURED_PROJECTS.sharpIde.url}>SharpIDE</a>, a modern, cross-platform IDE built with
            .NET and Godot, and <a href={FEATURED_PROJECTS.sharpDbg.url}>SharpDbg</a>, a .NET debugger that
            implements the Debug Adapter Protocol and is written completely in C#.
          </p>
          <p>
            I work with C#, .NET, Blazor, TypeScript and React, and I{' '}
            <Link to="/blog" prefetch="intent">
              write about
            </Link>{' '}
            .NET, Azure and all things software. In November 2024 I presented at a .NET user group, with{' '}
            <a href="https://github.com/MattParkerDev/DirectoryStatistics.Photino">
              DirectoryStatistics.Photino
            </a>{' '}
            as the demo app.
          </p>
        </div>
        <aside className="about-links" aria-labelledby="elsewhere-heading">
          <h2 id="elsewhere-heading" className="eyebrow">
            Elsewhere
          </h2>
          <ul>
            {SOCIALS.map((social) => (
              <li key={social.href}>
                <a href={social.href} rel="me">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
