import { useRef } from 'react'
import Link from 'next/link'
import classnames from 'classnames'
import { Tag } from 'lib/api'
import { useLayoutEffect } from 'lib/useLayoutEffect'
import { Grad, getColors } from 'components/Grad'

const TagItem = ({ name, slug, focused }: { name: string, slug: string, focused: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!ref.current) return
    const [colorA, colorB] = getColors()
    ref.current.style.backgroundImage = `linear-gradient(to right, ${colorA}, ${colorB})`
  })
  return (
    <>
      <li className={classnames('tag-item', { focused })}>
        <Grad>
          <Link href={`/work/category/${slug}`} passHref>
            <a className="inner"><span className="text">{name}</span></a>
          </Link>
        </Grad>
        <div ref={ref} className="overlay"></div>
      </li>
      <style jsx>{`
        @import 'lib/vw.styl'
        .tag-item
          position relative
          display inline-block
          padding 0
          margin 0
          margin-right 10px
          margin-bottom 10px
          background-color white
          list-style-type none
          text-align center
          vertical-align middle
          font-size 0
          user-select none
          &:hover
            .inner
              padding 0 49px
              border-width 2px
              border-color black
            .overlay
              display block
        .inner
          display flex
          justify-content center
          align-items center
          box-sizing border-box
          border 1px solid #B4B4B4
          height 44px
          padding 0 50px
        .text
          display inline-block
          letter-spacing 0.02em
          overflow hidden
          margin-top 2px
          font-size 1.4rem
          font-weight 300
        .overlay
          display none
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          mix-blend-mode lighten
          pointer-events none
        .focused
          pointer-events none
          .inner
            padding 0 49px
            border-width 2px
            border-color black
          .overlay
            display block
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .tag-item
            margin-bottom 0.9rem
            &:hover
              .inner
                padding 0 calc(0.6rem - 1px)
                border-width 2px
                border-color black
          .inner
            height 2.4rem
            padding 0 0.6rem
          .text
            font-size 1.0rem
          .focused
            .inner
              padding 0 calc(0.6rem - 1px)
              border-width 2px
              border-color black
      `}</style>
    </>
  )
}

export const TagSelector = ({ tags, active }: { tags?: Tag[], active: string }) => (
  <>
    <nav className="tag-selector">
      <ol>
        <TagItem name="All" slug='all' focused={active == "all"} />
        {tags?.map(tag => <TagItem key={tag.slug} name={tag.name} slug={tag.slug} focused={tag.slug == active} />)}
      </ol>
    </nav>
    <style jsx>{`
      .tag-selector
        max-width calc(1366px - 80px * 3)
        padding 0
        margin 47px auto 97px
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .tag-selector
          max-width auto
          margin vwpx(22) vwpx(25) 0
          ol
            padding 0
            margin 0
    `}</style>
  </>
)
