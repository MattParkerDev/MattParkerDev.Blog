export const SITE_URL = 'https://mattparker.dev'
export const SITE_NAME = 'MattParkerDev'
export const AUTHOR = 'Matt Parker'

// Cloudflare Pages redirects pre-rendered pages to their trailing slash URL
export function pageUrl(path: string) {
  return `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`
}

export const SITE_DESCRIPTION =
  'Matt Parker is a software engineer in Brisbane, Australia, and the creator of SharpIDE and SharpDbg. He writes about .NET, Azure and all things software.'

export const GA_MEASUREMENT_ID = 'G-S63E8336J4'
export const GITHUB_USER = 'MattParkerDev'

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/MattParkerDev' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mattparkerdev' },
  { label: 'Twitter', href: 'https://twitter.com/MattParkerDev' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/mattparker.dev' },
]
