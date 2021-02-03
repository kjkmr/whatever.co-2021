import { useState } from 'react'
import Link from 'next/link'
import { Entry, Tag } from 'lib/api'
import WorkTag from 'components/WorkTag'
import { Grad, GradImg } from 'components/Grad'
import { langStyle } from 'lib/i18n'


const LargeWork = ({ work }: { work: Entry }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <div className="large-work">
        <Link href={`/work/${work.slug}`}>
          <a onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
            <div className="image">
              <GradImg mouseEntered={entered}><img src={work.hero_image} /></GradImg>
            </div>
            <div className="text">
              <div><Grad className="date" inline>{work.date}</Grad></div>
              <div><Grad className="title" inline><span dangerouslySetInnerHTML={{ __html: work.title }}></span></Grad></div>
              {work.subtitle ? (<div><Grad className="subtitle" inline>{work.subtitle}</Grad></div>) : null}
              <div><Grad className="tags" inline>
                {work.tags?.filter(tag => tag.slug != 'featured').map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}
              </Grad></div>
            </div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .large-work
          grid-column span 2
          grid-row span 2
          padding-bottom vwpx(77)
          font-size 0
          a
            display block
            border none
            padding 0
          .image img
            width vwpx(832)
            height vwpx(467)
            object-fit cover
          .text
            margin-top vwpx(29)
            margin-right vwpx(20)
            :global(.date)
              font-size 1.4rem
            :global(.title)
              font-size 3.6rem
              font-weight 700
              margin-top 2.2rem
            :global(.subtitle)
              margin-top 1.0rem
              font-size 2.0rem
              font-weight 500
            :global(.tags)
              margin-top 2.0rem
      `}</style>
    </>
  )
}

const SmallWork = ({ work }: { work: Entry }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <div className={langStyle('small-work')}>
        <Link href={`/work/${work.slug}`}>
          <a onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
            <div className="image">
              <GradImg mouseEntered={entered}><img src={work.hero_image} /></GradImg>
            </div>
            <div className="text">
              <div><Grad className="date" inline>{work.date}</Grad></div>
              <div><Grad className="title" inline><span dangerouslySetInnerHTML={{ __html: work.title }}></span></Grad></div>
              {work.subtitle ? (<div><Grad className="subtitle" inline>{work.subtitle}</Grad></div>) : null}
              <div><Grad className="tags" inline>
                {work.tags?.filter(tag => tag.slug != 'featured').map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}
              </Grad></div>
            </div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .small-work
          position relative
          padding-bottom vwpx(78)
          font-size 0
          a
            display block
            border none
            padding 0
          .image img
            width vwpx(377)
            height vwpx(212)
            object-fit cover
          .text
            position relative
            margin-top 2.0rem
            margin-right vwpx(20)
            font-size 0
            :global(.date)
              font-size 1.2rem
            :global(.title)
              font-size 2.0rem
              font-weight 700
              line-height 1.4
              margin-top 0.8rem
            :global(.subtitle)
              font-size var(--font-size-ja)
              font-weight 300
              line-height 1.4
              margin-top 0.5rem
            :global(.tags)
              margin-top 1.5rem
        .en.small-work
            .text
              :global(.subtitle)
                font-size var(--font-size-en)
                font-weight 200
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .small-work
            padding 0
            .image img
              width vwpx(150)
              height vwpx(84)
            .text
              margin 1.4rem 0 0 0
              :global(.date)
                font-size 1.0rem
              :global(.title)
                font-size 1.4rem
                line-height 1.3
                margin-top 0.5rem
              :global(.subtitle)
                font-size 1.0rem
                line-height 1.6
                margin-top 0.25rem
              :global(.tags)
                margin-top 1.0rem
      `}</style>
    </>
  )
}


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
            return <LargeWork key={Math.random()} work={w} />
          } else {
            return <SmallWork key={Math.random()} work={w} />
          }
        } else {
          return <SmallWork key={Math.random()} work={w} />
        }
      })}
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .works
        display grid
        grid-template-columns repeat(3, 1fr)
        column-gap vwpx(77)
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .works
          grid-template-columns repeat(2, 1fr)
          grid-gap vwpx(40) vwpx(25)
    `}</style>
  </>
)


const Single = ({ work }: { work: Entry }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <div className={langStyle('single-work')}>
        <Link href={`/work/${work.slug}`}>
          <a onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
            <div className="image">
              <GradImg mouseEntered={entered}><img src={work.hero_image} /></GradImg>
            </div>
            <div className="text">
              <div><Grad className="date" inline>{work.date}</Grad></div>
              <div><Grad className="title" inline><span dangerouslySetInnerHTML={{ __html: work.title }}></span></Grad></div>
              {work.subtitle ? (<div><Grad className="subtitle" inline>{work.subtitle}</Grad></div>) : null}
              <div><Grad className="tags" inline>
                {work.tags?.filter(tag => tag.slug != 'featured').map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} />)}
              </Grad></div>
            </div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        @import 'lib/vw-mobile.styl'
        .single-work
          position relative
          margin-bottom 6.0rem
          font-size 0
          &:last-child
            margin-bottom 8.0rem
          a
            display block
            border none
            padding 0
          .image
            margin-left -50px
            img
              width vwpx(375)
              height vwpx(211)
              object-fit cover
          .text
            position relative
            margin 2.5rem vwpx(30) 0 0
            font-size 0
            :global(.date)
              font-size 1.0rem
            :global(.title)
              font-size 2.4rem
              font-weight 700
              line-height 1.4
              margin-top 0.85rem
            :global(.subtitle)
              font-size 1.2rem
              font-weight 300
              line-height 1.4
              margin-top 0.4rem
            :global(.tags)
              margin-top 2.1rem
        .en.single-work
          .text
            :global(.subtitle)
              font-size 1.4rem
              font-weight 500
              line-height calc(42 / 28)
              margin-top 0.05rem
            :global(.tags)
              margin-top 1.8rem
      `}</style>
    </>
  )
}

export const WorkListSingleCulumn = ({ works }: { works: Entry[] }) => (
  <>
    <div className="works">
      {works?.map(w => <Single key={Math.random()} work={w} />)}
    </div>
    <style jsx>{`
      @import 'lib/vw-mobile.styl'
      .works
        margin 4.0rem 0 0 0
    `}</style>
  </>
)
