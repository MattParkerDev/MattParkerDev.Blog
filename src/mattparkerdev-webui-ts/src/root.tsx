import bricolageFont from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url'
import sourceSerifFont from '@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2?url'
import '@fontsource-variable/bricolage-grotesque/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import '@fontsource-variable/source-serif-4/wght.css'
import '@fontsource-variable/source-serif-4/wght-italic.css'
import type { ReactNode } from 'react'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import type { Route } from './+types/root'
import { Analytics } from './components/Analytics'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { SITE_NAME } from './lib/site'
import { THEME_INIT_SCRIPT } from './lib/theme'
import './app.css'

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'alternate', type: 'application/rss+xml', title: `${SITE_NAME}'s Blog`, href: '/feed.xml' },
  { rel: 'preload', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous', href: bricolageFont },
  { rel: 'preload', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous', href: sourceSerifFont },
]

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <Meta />
        <Links />
      </head>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return (
    <>
      <Outlet />
      <Analytics />
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404
  const title = notFound ? 'Page not found' : 'Something went wrong'

  return (
    <div className="wrap page">
      <title>{`${title} | ${SITE_NAME}`}</title>
      <meta name="robots" content="noindex" />
      <p className="eyebrow">{notFound ? 'Error 404' : 'Unhandled exception'}</p>
      <h1 className="page-title">{title}</h1>
      <p className="page-intro">
        {notFound
          ? "This address doesn't point to anything on the site."
          : 'Refreshing the page may help.'}
      </p>
      <p>
        <a className="text-link" href="/">
          Back to the home page
        </a>
      </p>
    </div>
  )
}
