import { Link } from 'react-router'
import type { PostSummary } from '../lib/post'

export function PostList({ posts }: { posts: PostSummary[] }) {
  return (
    <ol className="rows">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link className="row" to={`/blog/${post.slug}`} prefetch="intent">
            <span className="row-body">
              <span className="row-title">{post.title}</span>
              <span className="row-description">{post.description}</span>
            </span>
            <time className="row-meta" dateTime={post.date}>
              {post.displayDate}
            </time>
          </Link>
        </li>
      ))}
    </ol>
  )
}
