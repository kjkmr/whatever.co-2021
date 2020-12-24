import Link from 'next/link'
import { Entry, Tag } from 'lib/api'
import WorkTag from 'components/WorkTag'
import { Grad, GradImg } from 'components/Grad'


const LargeWork = ({ work }: { work: Entry }) => (
  <div className="container">
    <Link href={`/work/${work.slug}`} prefetch={false}>
      <a>
        <div className="image">
          <GradImg><img src={work.image} /></GradImg>
        </div>
      </a>
    </Link>
    <div className="text">
      <Grad><div className="date">{work.date}</div></Grad>
      <Grad><div className="title"><Link href={`/work/${work.slug}`} prefetch={false}><a dangerouslySetInnerHTML={{ __html: work.title }}></a></Link></div></Grad>
      <Grad><div className="head">{'NY発の未来の日用品店'}</div></Grad>
      <Grad><div className="tags">
        {work.tags?.map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}
      </div></Grad>
    </div>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .container
        grid-column span 2
        grid-row span 2
        padding-bottom vwpx(77)
      .image
        font-size 0
        img
          width vwpx(832)
          height vwpx(467)
          object-fit cover
      .text
        margin-top vwpx(23)
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size vwpx(14)
      .title
        display inline-block
        overflow hidden
        font-size vwpx(48)
        font-weight bold
        margin-top vwpx(8)
        letter-spacing 0.0001em
      .head
        display inline-block
        overflow hidden
        margin-top vwpx(16)
        font-size vwpx(22)
        font-weight bold
        letter-spacing 0.001em
      .tags
        display inline-block
        overflow hidden
        margin-top vwpx(26)
    `}</style>
  </div>
)

const SmallWork = ({ work }: { work: Entry }) => (
  <div className="container">
    <Link href={`/work/${work.slug}`} prefetch={false}>
      <a>
        <div className="image">
          <GradImg><img src={work.image} /></GradImg>
        </div>
        <div className="text">
          <Grad><div className="date">{work.date}</div></Grad>
          <Grad><div className="title" dangerouslySetInnerHTML={{ __html: work.title }} /></Grad>
          <Grad><div className="head">{'未来のリモート観戦席'}</div></Grad>
          <Grad><div className="tags">
            {work.tags?.map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}
          </div></Grad>
        </div>
      </a>
    </Link>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .container
        position relative
        padding-bottom vwpx(77)
      .image
        font-size 0
        img
          width vwpx(377)
          height vwpx(212)
          object-fit cover
      .text
        position relative
        margin-top vwpx(19)
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size vwpx(14)
      .title
        display inline-block
        overflow hidden
        font-size vwpx(24)
        font-weight bold
        line-height vwpx(32)
        margin-top vwpx(6)
      .head
        font-size vwpx(15)
        font-weight bold
        margin-top vwpx(2)
      .tags
        display inline-block
        overflow hidden
        margin-top vwpx(17)
    `}</style>
  </div>
)


type WorkListProps = {
  filter?: string,
  works?: Entry[],
}

export const WorkList = ({ filter, works }: WorkListProps) => (
  <div className="works">
    {works?.map(w => {
      const tags = w.tags?.map(t => t.slug)
      if (filter == "all") {
        if (tags?.includes('featured')) {
          return <LargeWork key={w.slug} work={w} />
        } else {
          return <SmallWork key={w.slug} work={w} />
        }
      } else {
        return <SmallWork key={w.slug} work={w} />
      }
    })}

    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .works
        display grid
        grid-template-columns repeat(3, 1fr)
        column-gap vwpx(77)
        {/* grid-auto-rows vwpx(430) */}
        margin-bottom 100px
    `}</style>
  </div>
)
