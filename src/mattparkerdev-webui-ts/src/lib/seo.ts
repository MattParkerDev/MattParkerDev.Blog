import type { MetaDescriptor } from 'react-router'
import { AUTHOR, pageUrl, SITE_NAME, SITE_URL } from './site'

type PageMeta = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  keywords?: string[]
}

export function pageMeta({
  title,
  description,
  path,
  image,
  type = 'website',
  keywords = [],
}: PageMeta): MetaDescriptor[] {
  const url = pageUrl(path)
  const imageMeta: MetaDescriptor[] = image
    ? [
        { property: 'og:image', content: `${SITE_URL}${image}` },
        { name: 'twitter:image', content: `${SITE_URL}${image}` },
      ]
    : []

  return [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: [...keywords, AUTHOR, SITE_NAME].join(', ') },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    ...imageMeta,
  ]
}
