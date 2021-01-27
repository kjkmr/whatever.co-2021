import { useRef, useLayoutEffect } from 'react'
import { setup, setupImage } from 'components/Grad'

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
      img.parentNode?.insertBefore(base, img)
      base.appendChild(img)
      cleanups.push(setupImage(base))
    })
    return () => { cleanups.forEach(c => c()) }
  }, [])
  return (
    <>
      <div ref={body} className="entry-body" dangerouslySetInnerHTML={{ __html: content || '' }} />
      <style jsx>{`
        .entry-body
          max-width 900px
          padding 0
          margin 0 auto 0
      `}</style>
      <style jsx global>{`
        @import 'lib/vw.styl'
        .entry-body
          img
            width 100%
            height auto
          .img
            font-size 0
            position relative
            overflow hidden
            margin 3.0rem 0
          p, table
            margin 0
            font-size 1.5rem
            line-height 3.0rem
            word-wrap break-word
          .p
            margin 3.0rem 0
          .aspect-ratio
            position relative
            width 100%
            height 0
            padding-bottom 56.25%
          .aspect-ratio iframe
            position absolute
            width 100%
            height 100%
            left 0
            top 0
          .block-images
            width vwpx(1206)
            margin-top vwpx(143)
            margin-left calc(((100vw - 80px - 900px) / 2 - ((100vw - 80px) * (80 / (1366 - 80)))) * -1)
            margin-bottom vwpx(144)
            grid-template-columns 1fr 1fr
            gap: vwpx(82) vwpx(78)
            font-size 0
            img
              &.block-image-small
                  width vwpx(564)
                  height vwpx(317)
                  object-fit cover
              &.block-image-medium
                  width vwpx(844)
                  height vwpx(475)
                  object-fit cover
              &.block-image-large
                  width vwpx(1206)
                  height vwpx(678)
                  object-fit cover
          .block-2-images >:first-child
            margin-bottom 82px
          .block-3-images-a
            display grid
            >:nth-child(1)
              grid-column span 2
              object-fit cover
          .block-3-images-b
            display grid
            >:nth-child(3)
              grid-column span 2
              width vwpx(844)
              height vwpx(474)
              object-fit cover
          .block-4-images-a
            display grid
          .block-4-images-a
            >:first-child, >:last-child
              grid-column span 2
          .block-4-images-b
            display grid
            >:first-child
              grid-column span 2
              margin-right 0
              margin-left auto
            >:last-child
              grid-column span 2
        `}</style>
    </>
  )
}

export default EntryBody
