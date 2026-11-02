import { useEffect } from 'react'
import { GA_MEASUREMENT_ID } from '../lib/site'

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

const SCRIPT_ID = 'google-analytics'

// gtag.js expects the Arguments object in the data layer, not an array.
const gtag: (...args: unknown[]) => void = function () {
  window.dataLayer.push(arguments)
}

export function Analytics() {
  useEffect(() => {
    if (!import.meta.env.PROD || document.getElementById(SCRIPT_ID)) return

    window.dataLayer = window.dataLayer || []
    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID)

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.append(script)
  }, [])

  return null
}
