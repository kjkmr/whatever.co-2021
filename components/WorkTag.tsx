import Link from 'next/link'
import { Tag } from '../lib/api'

const Inner = ({ name }: { name: string }) => (
  <span>
    {name}
    <style jsx>{`
      span
        display inline-block
        border 1px solid #B4B4B4
        font-size 12px
        font-weight 300
        letter-spacing 0.03em
        padding 9px 10px 7px
        margin-right 10px
        &:last-child
          margin-right 0
    `}</style>
  </span>
)

const WorkTag = ({ tag, link = false }: { tag: Tag, link?: boolean }) => (
  <>
    {link
      ? <Link href={`/work/category/${tag.slug}`}><a><Inner name={tag.name} /></a></Link>
      : <Inner name={tag ? tag.name : '???'} />}
    <style jsx>{`
      a
        display inline-block
        border none
        padding 0
    `}</style>
  </>
)

export default WorkTag
