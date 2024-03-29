import { useRef } from 'react'
import { useLayoutEffect } from 'lib/useLayoutEffect'
import { langStyle } from 'lib/i18n'
import { setup, setupImage, setupLink } from 'components/Grad'
import { getOptimized } from 'lib/image'
import { isMobile } from 'lib/isMobile'
import { replaceInsiteLink } from 'lib/redirect'
import { useRouter } from 'next/router'

const replaceImgOptimized = (html: string): string => {
  return html.replace(/(<img .+?src=")([^"]+?)"/gm, (_, img, src) => img + getOptimized(src) + '"')
}

const addYouTubeEmbedParams = (html: string): string => {
  return html.replace(/(<iframe .+?src=")(https:\/\/www\.youtube\.com\/[^"]+?)"/g, '$1$2;rel=0"')
}

const EntryBody = ({ content }: { content: string }) => {
  const body = useRef<HTMLDivElement>(null)
  const mobile = isMobile()
  const router = useRouter()
  useLayoutEffect(() => {
    const cleanups: (() => void)[] = []
    body.current?.querySelectorAll('p').forEach(el => {
      const nodeName = el.firstChild?.nodeName.toLocaleLowerCase()
      switch (nodeName) {
        case 'img':
        case 'iframe': {
          const node = el.firstChild!
          const base = document.createElement('div')
          base.classList.add('img')
          if (nodeName == 'iframe') {
            base.classList.add('aspect-ratio')
          }
          el.parentNode?.insertBefore(base, el)
          base.appendChild(node)
          el.parentNode?.removeChild(el)
          cleanups.push(setupImage(base))
          break
        }
        default: {
          const base = document.createElement('div')
          base.classList.add('p')
          el.parentNode?.insertBefore(base, el)
          base.appendChild(el)
          cleanups.push(setup(base, false, false))
        }
      }
    })
    body.current?.querySelectorAll('.block-images > img').forEach(img => {
      const base = document.createElement('div')
      base.classList.add('img')
      img.parentNode?.insertBefore(base, img)
      base.appendChild(img)
      cleanups.push(setupImage(base))
    })
    body.current?.querySelectorAll('figure.wp-block-embed').forEach(el => {
      cleanups.push(setupImage(el as HTMLElement))
    })
    body.current?.querySelectorAll('a').forEach(a => {
      replaceInsiteLink(a, router)
      cleanups.push(setupLink(a, true, mobile))
    })
    return () => { cleanups.forEach(c => c()) }
  })
  return (
    <>
      <div ref={body} className={langStyle('entry-body')} dangerouslySetInnerHTML={{ __html: addYouTubeEmbedParams(replaceImgOptimized(content || '')) }} />
      <style jsx>{`
        .entry-body
          max-width 900px
          padding 0
          margin 0 auto 0
      `}</style>
    </>
  )
}

export default EntryBody
