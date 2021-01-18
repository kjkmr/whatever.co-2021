import Link from 'next/link'
import classNames from 'classnames/bind'
import { Tag } from 'lib/api'
import { Grad } from './Grad'

const TagItem = ({ name, slug, focused }: { name: string, slug: string, focused: boolean }) => (
  <li className={classNames('tag-item', { focused })}>
    <Link href={`/work/category/${slug}`} passHref>
      <a><Grad><span className="inner">{name}</span></Grad></a>
    </Link>
    <style jsx>{`
      @import 'lib/vw.styl'
      .tag-item
        position relative
        z-index 0
        display inline-block
        padding 0 50px
        margin 0
        margin-right 10px
        margin-bottom 10px
        list-style-type none
        border 1px solid #B4B4B4
        height 42px
        text-align center
        vertical-align middle
      a
        display flex
        justify-content center
        align-items center
        width 100%
        height 100%
        border none
      .focused
        border-color red
        border-width 2px
        padding 0 49px
        height 40px
        z-index 100
        a
          color red
      .inner
        display inline-block
        letter-spacing 0.02em
        overflow hidden
        margin-top 4px
        font-size 1.4rem
    `}</style>
  </li>
)

export const TagSelector = ({ tags, active }: { tags?: Tag[], active: string }) => (
  <ol className="tag-selector">
    <TagItem name="All" slug='all' focused={active == "all"} />
    {tags?.map(tag => <TagItem key={tag.slug} name={tag.name} slug={tag.slug} focused={tag.slug == active} />)}
    <style jsx>{`
      @import 'lib/vw.styl'
      .tag-selector
        padding 0
        margin 47px 80px vwpx(97)
    `}</style>
  </ol>
)
