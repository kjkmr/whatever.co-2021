import Link from 'next/link'
import classNames from 'classnames/bind'
import { Tag } from '../lib/api'
import { Grad } from './Grad'

const TagItem = ({ name, slug, focused }: any) => {
  return (
    <li className={classNames('container', { focused })}>
      <button>
        <Grad><div className="inner"><Link href={`/work/category/${slug}`}><a>{name}</a></Link></div></Grad>
      </button>
      <style jsx>{`
        .container
          position relative
          z-index 0
          display inline-block
          padding 0
          margin 0
          margin-right -1px
          margin-bottom 28px
          list-style-type none
          border 1px solid transparent
          border-left 1px solid black
          border-right 1px solid black
          width 240px
          height 39px
          text-align center
          vertical-align middle
        button
          margin 0
          padding 0
          padding-bottom 3px
          padding-left 2px
          border none
          background-color transparent
          width 100%
          height calc(100%)
        .focused
          border 1px solid red
          z-index 100
        .inner
          display inline-block
          font-size 14px
          letter-spacing 0.02em
      `}</style>
    </li>
  )
}

type TagSelectorProp = {
  tags: Tag[],
  active: string,
}

export const TagSelector = ({ tags, active }: TagSelectorProp) => (
  <ol className="container">
    <TagItem name="All" slug='all' focused={active == "all"} />
    {tags.map(tag => <TagItem key={tag.slug} name={tag.name} slug={tag.slug} focused={tag.slug == active} />)}
    <style jsx>{`
      .container
        padding 0
        margin 0
        margin-top 40px
    `}</style>
  </ol>
)
