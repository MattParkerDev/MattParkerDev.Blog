import type { Route } from './+types/blog'
import { PostList } from '../components/PostList'
import { getPostSummaries } from '../lib/posts.server'
import { pageMeta } from '../lib/seo'
import { SITE_NAME } from '../lib/site'

export function loader() {
  return { posts: getPostSummaries() }
}

export function meta() {
  return pageMeta({
    title: `Blog | ${SITE_NAME}`,
    description: 'Posts by Matt Parker about .NET, Azure and all things software.',
    path: '/blog',
  })
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <div className="wrap page">
      <h1 className="page-title">Blog</h1>
      <p className="page-intro">Notes on .NET, Azure and all things software.</p>
      <PostList posts={loaderData.posts} />
    </div>
  )
}
