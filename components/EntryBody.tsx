import { useRef } from 'react'
import { useLayoutEffect } from 'lib/useLayoutEffect'
import { langStyle } from 'lib/i18n'
import { setup, setupImage, setupLink } from 'components/Grad'

const EntryBody = ({ content }: { content: string }) => {
  const body = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const cleanups: (() => void)[] = []
    body.current?.querySelectorAll('p').forEach(p => {
      const nodeName = p.firstChild?.nodeName.toLocaleLowerCase()
      switch (nodeName) {
        case 'img':
        case 'iframe': {
          const node = p.firstChild!
          const base = document.createElement('div')
          base.classList.add('img')
          if (nodeName == 'iframe') {
            base.classList.add('aspect-ratio')
          }
          p.parentNode?.insertBefore(base, p)
          base.appendChild(node)
          p.parentNode?.removeChild(p)
          cleanups.push(setupImage(base))
          break
        }
        default: {
          const base = document.createElement('div')
          base.classList.add('p')
          p.parentNode?.insertBefore(base, p)
          base.appendChild(p)
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
    body.current?.querySelectorAll('a').forEach(a => {
      a.target = '_blank'
      cleanups.push(setupLink(a))
    })
    return () => { cleanups.forEach(c => c()) }
  }, [])
  return (
    <>
      <div ref={body} className={langStyle('entry-body')} dangerouslySetInnerHTML={{ __html: content || '' }} />
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
