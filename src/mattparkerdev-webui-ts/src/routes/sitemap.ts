import { getPostSummaries } from '../lib/posts.server'
import { pageUrl } from '../lib/site'

const STATIC_PATHS = ['/', '/blog', '/portfolio', '/about']

export function loader() {
  const urls = [
    ...STATIC_PATHS.map((path) => `  <url><loc>${pageUrl(path)}</loc></url>`),
    ...getPostSummaries().map(
      (post) =>
        `  <url><loc>${pageUrl(`/blog/${post.slug}`)}</loc><lastmod>${post.date}</lastmod></url>`,
    ),
  ]

  const sitemap = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
