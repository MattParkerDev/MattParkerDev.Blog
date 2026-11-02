export type PostSummary = {
  slug: string
  title: string
  description: string
  date: string
  displayDate: string
  keywords: string[]
  image?: string
  readingMinutes: number
}

export type Post = PostSummary & {
  html: string
}
