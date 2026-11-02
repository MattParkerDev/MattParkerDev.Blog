import { getPostSummaries } from '../lib/posts.server'
import { AUTHOR, pageUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function loader() {
  const posts = getPostSummaries()
  const items = posts.map((post) => {
    const path = `/blog/${post.slug}`
    // The guid stays slash-free so feed readers don't show existing posts as new
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${pageUrl(path)}</link>
      <guid>${SITE_URL}${path}</guid>
      <description>${escapeXml(post.description)}</description>
      <author>${escapeXml(AUTHOR)}</author>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
  })

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}'s Blog</title>
    <link>${pageUrl('/blog')}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
${items.join('\n')}
  </channel>
</rss>
`

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
