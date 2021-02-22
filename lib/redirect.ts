type RedirectInfo = {
  source: string
  destination: string
}
const data: RedirectInfo[] = require('redirects.json').filter((p: RedirectInfo) => p.source.startsWith('/post/'))

export function findRedirectDest(key: string): string | null {
  const prevPath = `/post/${key}/`
  const redirectInfo = data.find(p => p.source == prevPath)
  return redirectInfo ? redirectInfo.destination : null
}
