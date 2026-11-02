import rehypeShiki from '@shikijs/rehype'
import type { Root } from 'hast'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

function rehypeLazyImages() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        node.properties.loading = 'lazy'
        node.properties.decoding = 'async'
      }
    })
  }
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
  .use(rehypeLazyImages)
  .use(rehypeShiki, {
    themes: { light: 'github-light', dark: 'github-dark' },
    langs: ['csharp', 'html'],
  })
  .use(rehypeStringify)

export async function renderMarkdown(markdown: string) {
  return String(await processor.process(markdown))
}
