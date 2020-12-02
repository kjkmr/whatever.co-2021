import Link from 'next/link'
import { Entry, Tag } from '../lib/api'
import WorkTag from '../components/WorkTag'
import { Grad, GradImg } from '../components/Grad'


const LargeWork = ({ work }: { work: Entry }) => (
  <div className="container">
    <Link href={`/work/${work.slug}`}>
      <a>
        <div className="image">
          <GradImg><img src={work.image} width="832" height="467" /></GradImg>
        </div>
      </a>
    </Link>
    <div className="text">
      <Grad><div className="date">{work.date}</div></Grad>
      <Grad><div className="title"><Link href={`/work/${work.slug}`}><a dangerouslySetInnerHTML={{ __html: work.title }}></a></Link></div></Grad>
      <Grad><div className="head">{'???'}</div></Grad>
      <Grad><div className="tags">
        {work.tags?.map((tag: Tag) => <WorkTag key={tag.slug}>{tag.name}</WorkTag>)}
      </div></Grad>
    </div>
    <style jsx>{`
      .container
        grid-column span 2
        grid-row span 2
      .image
        font-size 0
        img
          object-fit cover
      .text
        margin-top 25px
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size 12px
        letter-spacing -0.01em
      .title
        display inline-block
        overflow hidden
        font-size 48px
        font-weight bold
        margin-top 18px
        letter-spacing 0.0001em
      .tags
        display inline-block
        overflow hidden
        margin-top 20px
      .head
        display inline-block
        overflow hidden
        margin-top 13px
        font-size 24px
        font-weight bold
        letter-spacing 0.001em
    `}</style>
  </div>
)

const SmallWork = ({ work }: { work: Entry }) => (
  <div className="container">
    <Link href={`/work/${work.slug}`}>
      <a>
        <div className="image">
          <GradImg><img src={work.image} width="377" height="212" /></GradImg>
        </div>
      </a>
    </Link>
    <div className="text">
      <Grad><div className="date">{work.date}</div></Grad>
      <Grad><div className="title"><Link href={`/work/${work.slug}`}><a dangerouslySetInnerHTML={{ __html: work.title }}></a></Link></div></Grad>
      <Grad><div className="tags">
        {work.tags?.map((tag: Tag) => <WorkTag key={tag.slug}>{tag.name}</WorkTag>)}
      </div></Grad>
    </div>
    <style jsx>{`
      .container
        position relative
      .image
        font-size 0
        img
          object-fit cover
      .text
        position relative
        margin-top 20px
        font-size 0
      .date
        display inline-block
        overflow hidden
        font-size 12px
        letter-spacing -0.01em
      .title
        display inline-block
        overflow hidden
        font-size 24px
        font-weight bold
        margin-top 10px
      .tags
        display inline-block
        overflow hidden
        margin-top 14px
    `}</style>
  </div>
)


type WorkListProps = {
  filter?: string,
  works: Entry[],
}

export const WorkList = ({ filter, works }: WorkListProps) => {
  return (
    <div className="works">
      {works.map(w => {
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
        .works
          display grid
          grid-template-columns repeat(3, 1fr)
          column-gap 77px
          grid-auto-rows 400px
          margin-top 72px
          margin-bottom 100px
      `}</style>
    </div>
  )
}
