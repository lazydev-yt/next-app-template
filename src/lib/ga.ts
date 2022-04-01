// log the pageview with their URL
export const pageview = url => {
  const gtag = (window as any).gtag
  if (gtag) {
    gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
  }
}

// log specific events happening.
export const event = ({ action, params }) => {
  const gtag = (window as any).gtag
  if (gtag) {
    gtag('event', action, params)
  }
}
