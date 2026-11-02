import { useEffect, useRef } from 'react'
import { currentTheme } from '../lib/theme'

const GISCUS_ORIGIN = 'https://giscus.app'

function giscusScript(term: string) {
  const script = document.createElement('script')
  script.src = `${GISCUS_ORIGIN}/client.js`
  script.async = true
  script.crossOrigin = 'anonymous'
  Object.entries({
    repo: 'MattParkerDev/MattParkerDev.Blog',
    repoId: 'R_kgDOJMzPsQ',
    category: 'Announcements',
    categoryId: 'DIC_kwDOJMzPsc4CjV-M',
    mapping: 'specific',
    term,
    strict: '1',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'bottom',
    theme: currentTheme(),
    lang: 'en',
    loading: 'lazy',
  }).forEach(([key, value]) => {
    script.dataset[key] = value
  })
  return script
}

export function Comments({ term }: { term: string }) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = container.current
    if (!element) return

    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        loader.disconnect()
        element.append(giscusScript(term))
      },
      { rootMargin: '400px' },
    )
    loader.observe(element)

    const themeSync = new MutationObserver(() => {
      element.querySelector<HTMLIFrameElement>('iframe.giscus-frame')?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: currentTheme() } } },
        GISCUS_ORIGIN,
      )
    })
    themeSync.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      loader.disconnect()
      themeSync.disconnect()
      element.replaceChildren()
    }
  }, [term])

  return <div ref={container} className="comments" />
}
