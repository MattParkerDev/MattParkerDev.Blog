import { AUTHOR, SOCIALS } from '../lib/site'

export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <p>
        {AUTHOR} &middot; Brisbane, Australia
      </p>
      <ul>
        {SOCIALS.map((social) => (
          <li key={social.href}>
            <a href={social.href} rel="me">
              {social.label}
            </a>
          </li>
        ))}
        <li>
          <a href="/feed.xml">RSS</a>
        </li>
      </ul>
    </footer>
  )
}
