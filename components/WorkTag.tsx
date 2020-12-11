import Link from 'next/link'
import { Tag } from '../lib/api'

const Inner = ({ name }: { name: string }) => (
  <span>
    {name}
    <style jsx>{`
      span
        display inline-block
        border 1px solid black
        font-size 12px
        font-weight light
        letter-spacing 0.03em
        padding 9px 10px 7px
        margin-right 10px
        pointer-events none
    `}</style>
  </span>
)

const WorkTag = ({ tag, link = false }: { tag: Tag, link?: boolean }) => (
  link
    ? <Link href={`/work/category/${tag.slug}`}><a><Inner name={tag.name} /></a></Link>
    : <Inner name={tag ? tag.name : '???'} />
)

export default WorkTag
