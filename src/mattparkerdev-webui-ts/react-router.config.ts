import { copyFileSync, readdirSync } from 'node:fs'
import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src',
  ssr: false,
  prerender({ getStaticPaths }) {
    const posts = readdirSync('content/posts')
      .filter((file) => file.endsWith('.md'))
      .map((file) => `/blog/${file.replace(/\.md$/, '')}`)
    return [...getStaticPaths(), ...posts]
  },
  // Without a 404.html, Cloudflare Pages serves index.html with a 200 for unknown URLs
  buildEnd() {
    copyFileSync('build/client/__spa-fallback.html', 'build/client/404.html')
  },
} satisfies Config
