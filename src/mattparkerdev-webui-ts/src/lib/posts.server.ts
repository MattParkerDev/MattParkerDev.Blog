import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { renderMarkdown } from './markdown.server'
import type { Post, PostSummary } from './post'

const POSTS_DIR = join(process.cwd(), 'content/posts')
const WORDS_PER_MINUTE = 220

const dateFormat = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Australia/Brisbane',
})

function readPost(slug: string) {
  const { data, content } = matter(readFileSync(join(POSTS_DIR, `${slug}.md`), 'utf8'))
  const summary: PostSummary = {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    displayDate: dateFormat.format(new Date(data.date)),
    keywords: data.keywords ?? [],
    image: data.image,
    readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / WORDS_PER_MINUTE)),
  }
  return { summary, content }
}

export function getPostSummaries(): PostSummary[] {
  return readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => readPost(file.replace(/\.md$/, '')).summary)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!getPostSummaries().some((post) => post.slug === slug)) return null

  const { summary, content } = readPost(slug)
  return { ...summary, html: await renderMarkdown(content) }
}
