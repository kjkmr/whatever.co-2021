import Link from 'next/link'
import classNames from 'classnames/bind'
import { Tag } from 'lib/api'
import { Grad } from './Grad'

const TagItem = ({ name, slug, focused }: { name: string, slug: string, focused: boolean }) => (
  <li className={classNames('tag-item', { focused })}>
    <Link href={`/work/category/${slug}`} passHref prefetch={false}>
      <a><Grad><span className="inner">{name}</span></Grad></a>
    </Link>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .tag-item
        position relative
        z-index 0
        display inline-block
        padding 0
        margin 0
        margin-right -1px
        margin-bottom vwpx(28)
        list-style-type none
        border 1px solid transparent
        border-left 1px solid black
        border-right 1px solid black
        width vwpx(240)
        height vwpx(39)
        text-align center
        vertical-align middle
      a
        display flex
        justify-content center
        align-items center
        width 100%
        height 100%
        padding-top 1px
        border none
      .focused
        border 1px solid red
        z-index 100
      .inner
        display inline-block
        font-size vwpx(14)
        letter-spacing 0.02em
        overflow hidden
    `}</style>
  </li>
)

export const TagSelector = ({ tags, active }: { tags?: Tag[], active: string }) => (
  <ol className="tag-selector">
    <TagItem name="All" slug='all' focused={active == "all"} />
    {tags?.map(tag => <TagItem key={tag.slug} name={tag.name} slug={tag.slug} focused={tag.slug == active} />)}
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .tag-selector
        padding 0
        margin 0
        margin-top 40px
        margin-bottom vwpx(42)
    `}</style>
  </ol>
)
