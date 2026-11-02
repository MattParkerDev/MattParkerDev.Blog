import { Link, NavLink } from 'react-router'
import { ThemeToggle } from './ThemeToggle'

const NAV_ITEMS = [
  { label: 'Blog', to: '/blog' },
  { label: 'Projects', to: '/portfolio' },
  { label: 'About', to: '/about' },
]

export function SiteHeader() {
  return (
    <header className="site-header wrap">
      <Link to="/" className="site-logo">
        <span className="breakpoint" aria-hidden="true" />
        mattparker.dev
      </Link>
      <nav aria-label="Main">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} prefetch="intent">
            {item.label}
          </NavLink>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  )
}
