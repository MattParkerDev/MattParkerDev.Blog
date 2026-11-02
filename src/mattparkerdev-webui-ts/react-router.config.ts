import { readdirSync } from 'node:fs'
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
} satisfies Config
