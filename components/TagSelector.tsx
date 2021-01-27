import { useRef } from 'react'
import Link from 'next/link'
import classNames from 'classnames/bind'
import { useLayoutEffect } from 'lib/useLayoutEffect'
import { Tag } from 'lib/api'
import { Grad, getColors } from 'components/Grad'

const TagItem = ({ name, slug, focused }: { name: string, slug: string, focused: boolean }) => {
  const itemRef = useRef<HTMLLIElement>(null)
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const onMouseEnter = () => {
    itemRef.current?.classList.add('focused')
    const node = anchorRef.current!
    const [colorA, colorB] = getColors()
    const grad = `linear-gradient(to right, ${colorA}, ${colorB})`
    node.style.borderImage = `${grad} 1`
    node.style.backgroundImage = grad
  }
  const onMouseLeave = () => {
    itemRef.current?.classList.remove('focused')
    const node = anchorRef.current!
    node.style.borderImage = ''
    node.style.backgroundImage = ''
  }
  useLayoutEffect(() => {
    const node = anchorRef.current!
    if (focused) {
      const [colorA, colorB] = getColors()
      const grad = `linear-gradient(to right, ${colorA}, ${colorB})`
      node.style.borderImage = `${grad} 1`
      node.style.backgroundImage = grad
      node.style.pointerEvents = 'none'
    } else {
      node.style.borderImage = ''
      node.style.backgroundImage = ''
      node.addEventListener('mouseenter', onMouseEnter)
      node.addEventListener('mouseleave', onMouseLeave)
    }
    return () => {
      node.style.pointerEvents = ''
      node.removeEventListener('mouseenter', onMouseEnter)
      node.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [focused])
  return (
    <>
      <li ref={itemRef} className={classNames('tag-item', { focused })}>
        <Grad>
          <Link href={`/work/category/${slug}`} passHref>
            <a ref={anchorRef} className="inner"><span className="text">{name}</span></a>
          </Link>
        </Grad>
      </li>
      <style jsx>{`
        @import 'lib/vw.styl'
        .tag-item
          display inline-block
          padding 0
          margin 0
          margin-right 10px
          margin-bottom 10px
          list-style-type none
          text-align center
          vertical-align middle
          font-size 0
          user-select none
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
        .focused
          .inner
            padding 0 49px
            border-width 2px
            border-color green
            background-clip text
            -webkit-background-clip text
            -webkit-text-fill-color transparent
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
    `}</style>
  </>
)
