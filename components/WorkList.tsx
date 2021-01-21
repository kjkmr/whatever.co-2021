import Link from 'next/link'
import { Entry, Tag } from 'lib/api'
import WorkTag from 'components/WorkTag'
import { Grad, GradImg } from 'components/Grad'


const LargeWork = ({ work }: { work: Entry }) => (
  <div className="large-work">
    <Link href={`/work/${work.slug}`}>
      <a>
        <div className="image">
          <GradImg><img src={work.hero_image} /></GradImg>
        </div>
      </a>
    </Link>
    <div className="text">
      <Grad><div className="date">{work.date}</div></Grad>
      <Grad><div className="title"><Link href={`/work/${work.slug}`}><a dangerouslySetInnerHTML={{ __html: work.title }}></a></Link></div></Grad>
      {work.subtitle ? (<Grad><div className="head">{work.subtitle}</div></Grad>) : null}
      <Grad><div className="tags">
        {work.tags?.filter(tag => tag.slug != 'featured').map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}
      </div></Grad>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .large-work
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
        margin-top vwpx(30)
        margin-right vwpx(20)
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size 1.4rem
      .title
        display inline-block
        overflow hidden
        font-size 3.6rem
        font-weight bold
        margin-top 2.5rem
        letter-spacing 0.0001em
      .head
        display inline-block
        overflow hidden
        margin-top 1.5rem
        font-size 2.0rem
        font-weight bold
        letter-spacing 0.001em
      .tags
        display inline-block
        overflow hidden
        margin-top 2.5rem
    `}</style>
  </div>
)

const SmallWork = ({ work }: { work: Entry }) => (
  <div className="small-work">
    <Link href={`/work/${work.slug}`}>
      <a>
        <div className="image">
          <GradImg><img src={work.hero_image} /></GradImg>
        </div>
        <div className="text">
          <Grad><div className="date">{work.date}</div></Grad>
          <Grad><div className="title" dangerouslySetInnerHTML={{ __html: work.title }} /></Grad>
          {work.subtitle ? (<Grad><div className="head">{work.subtitle}</div></Grad>) : null}
          <Grad><div className="tags">
            {work.tags?.filter(tag => tag.slug != 'featured').map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}
          </div></Grad>
        </div>
      </a>
    </Link>
    <style jsx>{`
      vwpx(px)
        'calc((100vw - 80px) * %s)' % (px / (1366 - 80))
      .small-work
        position relative
        padding-bottom vwpx(78)
      .image
        font-size 0
        img
          width vwpx(377)
          height vwpx(212)
          object-fit cover
      .text
        position relative
        margin-top 2.0rem
        margin-right vwpx(20)
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size 1.2rem
      .title
        display inline-block
        overflow hidden
        font-size 2.0rem
        font-weight bold
        line-height 3.2rem
        margin-top 0.6rem
      .head
        font-size 1.5rem
        font-weight bold
        margin-top 0.2rem
      .tags
        display inline-block
        overflow hidden
        margin-top 1.7rem
    `}</style>
  </div>
)


type WorkListProps = {
  filter?: string,
  works?: Entry[],
}

export const WorkList = ({ filter, works }: WorkListProps) => (
  <>
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
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .works
        display grid
        grid-template-columns repeat(3, 1fr)
        column-gap vwpx(77)
    `}</style>
  </>
)
