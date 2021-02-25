import { NextRouter } from "next/router"

type RedirectInfo = {
  source: string
  destination: string
}
const renamedPosts: RedirectInfo[] = require('redirects.json').filter((p: RedirectInfo) => p.source.startsWith('/post/'))
const postCategory: { slug: string, category: 'work' | 'news' | 'member' }[] = require('post-category.json')

export function findRedirectDest(key: string): string | null {
  const prevPath = `/post/${key}/`
  const redirectInfo = renamedPosts.find(p => p.source == prevPath)
  if (redirectInfo) {
    return redirectInfo.destination
  }
  const post = postCategory.find(row => row.slug === key)
  return post ? `/${post.category}/${post.slug}` : null
}

export function replaceInsiteLink(a: HTMLAnchorElement, router: NextRouter): boolean {
  const locale = router.locale || router.defaultLocale!
  const re = new RegExp(`^(https://whatever\.co|${window.location.origin})?(/(en|ja|zh|zh-hant))?(?<path>/.+?)$`)
  const match = a.href.match(re)
  if (match) {
    const paths = match.groups!.path.split('/')
    let dest: string | null = null
    switch (paths[1]) {
      case 'post':
        dest = findRedirectDest(match[2]) || `/work/${paths[2]}/`
        break;
      case 'work':
      case 'team':
      case 'news':
        dest = match.groups!.path
        break;
    }
    if (dest) {
      a.href = `/${locale}${dest}`
      a.target = '_self'
      a.onclick = (e) => {
        e.preventDefault()
        router.push(dest!)
      }
      return true
    }
  }
  a.target = '_blank'
  a.rel = 'noopener noreferrer'
  return false
}
