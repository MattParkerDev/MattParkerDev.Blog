import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('blog', 'routes/blog.tsx'),
  route('blog/:slug', 'routes/post.tsx'),
  route('portfolio', 'routes/portfolio.tsx'),
  route('about', 'routes/about.tsx'),
  route('feed.xml', 'routes/feed.ts'),
  route('sitemap.xml', 'routes/sitemap.ts'),
] satisfies RouteConfig
