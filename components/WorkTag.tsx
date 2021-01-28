import Link from 'next/link'
import { Tag } from '../lib/api'

const Inner = ({ name }: { name: string }) => (
  <>
    <span>{name}</span>
    <style jsx>{`
      span
        display inline-block
        border 1px solid #B4B4B4
        font-size 1.2rem
        font-weight 300
        letter-spacing 0.03em
        padding 0.9rem 1.0rem 0.7rem
        margin-right 1.0rem
        &:last-child
          margin-right 0
      @media (--mobile)
        span
          font-size 1.0rem
          padding 0.4rem 0.5rem 0.3rem
          margin-right 0.6rem
    `}</style>
  </>
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
        margin-right 1.0rem
        &:last-child
          margin-right 0
      @media (--mobile)
        a
          margin-right 0.6rem
    `}</style>
  </>
)

export default WorkTag
