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
        padding 0
        margin 0
        margin-right 10px
        margin-bottom 10px
        list-style-type none
        text-align center
        vertical-align middle
      a
        display flex
        justify-content center
        align-items center
        box-sizing border-box
        border 1px solid #B4B4B4
        height 44px
        padding 0 50px
      .focused
        z-index 100
        a
          padding 0 49px
          border-width 2px
          border-color red
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
      .tag-selector
        max-width calc(1366px - 80px * 3)
        padding 0
        margin 47px auto 97px
    `}</style>
  </ol>
)
