import { Link } from 'react-router'
import type { Route } from './+types/post'
import { Comments } from '../components/Comments'
import { getPost } from '../lib/posts.server'
import { pageMeta } from '../lib/seo'
import { AUTHOR, SITE_NAME, SITE_URL } from '../lib/site'

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPost(params.slug)
  if (!post) throw new Response('Post not found', { status: 404 })
  return { post }
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return []
  const { post } = loaderData
  const path = `/blog/${post.slug}`

  return [
    ...pageMeta({
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      path,
      image: post.image,
      type: 'article',
      keywords: post.keywords,
    }),
    { property: 'article:published_time', content: post.date },
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: `${SITE_URL}${path}`,
        author: { '@type': 'Person', name: AUTHOR, url: SITE_URL },
        ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
      },
    },
  ]
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData

  return (
    <article className="wrap post">
      <header className="post-header">
        <Link className="text-link back-link" to="/blog" prefetch="intent">
          All posts
        </Link>
        <h1>{post.title}</h1>
        <p className="eyebrow">
          <time dateTime={post.date}>{post.displayDate}</time> &middot; {post.readingMinutes} min read
        </p>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      <section className="post-comments" aria-label="Comments">
        <Comments term={`blog/${post.slug}`} />
      </section>
    </article>
  )
}
