import { useEffect, useRef, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import classnames from 'classnames'
import { Tag, Entry, Credit, Person, getAllWorks, getPostDetails } from 'lib/api'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'
import WorkTag from 'components/WorkTag'


const Header = ({ work }: { work: Entry }) => {
  const [scrollY, setScrollY] = useState(0)
  const onScroll = () => setScrollY(window.pageYOffset)
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  })
  return (
    <>
      <div className="header">
        <div className="image" style={{ height: `calc((100vw - 80px) * ${723 / (1366 - 80)} - ${scrollY}px)` }}><GradImg><img src={work.hero_image} alt="" /></GradImg></div>
        <div className="info">
          <div className="inner">
            <div><Grad className="date">{work.date}</Grad></div>
            <div><Grad className="title"><div dangerouslySetInnerHTML={{ __html: work.title }} /></Grad></div>
            <div><Grad className="tags">
              {work.tags?.filter(tag => tag.slug != 'featured').map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} link={true} />)}
            </Grad></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .header
          position relative
          font-size 0
          margin-bottom vwpx(60)
        .image
          position fixed
          top 80px
          left 80px
          overflow hidden
          img
            width vwpx(1286)
            height vwpx(723)
            object-fit cover
        .info
          display inline-block
          position relative
          margin-top vwpx(610)
          margin-right 80px
        .inner
          background-color white
          padding-top vwpx(58)
          padding-left vwpx(80)
          padding-right vwpx(100)
          padding-bottom vwpx(60)
          :global(.date)
            font-size vwpx(16)
          :global(.title)
            font-size vwpx(60)
            font-weight bold
            line-height 1.2em
            margin-top vwpx(29)
            margin-left vwpx(-6)
          :global(.tags)
            margin-top vwpx(31)
      `}</style>
    </>
  )
}

const Excerpt = ({ title, description, image }: { title: string, description: string, image: string }) => (
  <>
    <div className="excerpt">
      <div className="text">
        <div><Grad className="title"><div dangerouslySetInnerHTML={{ __html: title }} /></Grad></div>
        <div><Grad className="desc"><div dangerouslySetInnerHTML={{ __html: description }}></div></Grad></div>
      </div>
      <div className="image">
        <GradImg><img src={image} alt="" /></GradImg>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .excerpt
        margin-left vwpx(80)
        margin-bottom vwpx(150)
        display grid
        grid-template-columns auto vwpx(562)
        grid-gap vwpx(80)
        font-size 0
      .text
        :global(.title)
          font-size vwpx(30)
          font-weight bold
          line-height vwpx(54)
          margin-top vwpx(-8)
          margin-bottom vwpx(42)
        :global(.desc)
          font-size var(--font-size-ja)
          line-height 3.0rem
      .image img
        width vwpx(562)
        height vwpx(318)
        object-fit cover
    `}</style>
  </>
)

const Body = ({ content }: any) => {
  const body = useRef<HTMLDivElement>(null)
  useEffect(() => {
    body.current?.querySelectorAll('iframe').forEach(iframe => {
      const wrapper = document.createElement('div')
      wrapper.classList.add('aspect-ratio')
      iframe.parentNode?.insertBefore(wrapper, iframe)
      wrapper.appendChild(iframe)
    })
  })
  return (
    <>
      <div ref={body} className="body" dangerouslySetInnerHTML={{ __html: content || '' }} />
      <style jsx>{`
        .body
          max-width 900px
          padding 0
          margin 0 auto 130px
      `}</style>
      <style jsx global>{`
        @import 'lib/vw.styl'
        .body
          img
            width 100%
            height auto
          p, table
            margin 30px 0
            font-size 1.5rem
            line-height 3.0rem
            word-wrap break-word
          .aspect-ratio
            position relative
            width 100%
            height 0
            padding-bottom 56.25%
          .aspect-ratio iframe
            position absolute
            width 100%
            height 100%
            left 0
            top 0
          .block-images
            width vwpx(1206)
            margin-top vwpx(143)
            margin-left calc(((100vw - 80px - 900px) / 2 - ((100vw - 80px) * (80 / (1366 - 80)))) * -1)
            margin-bottom vwpx(144)
            grid-template-columns 1fr 1fr
            gap: vwpx(82) vwpx(78)
            font-size 0
            img
              &.block-image-small
                  width vwpx(564)
                  height vwpx(317)
                  object-fit cover
              &.block-image-medium
                  width vwpx(844)
                  height vwpx(475)
                  object-fit cover
              &.block-image-large
                  width vwpx(1206)
                  height vwpx(678)
                  object-fit cover
          .block-2-images >:first-child
            margin-bottom 82px
          .block-3-images-a
            display grid
            >:nth-child(1)
              grid-column span 2
              object-fit cover
          .block-3-images-b
            display grid
            >:nth-child(3)
              grid-column span 2
              width vwpx(844)
              height vwpx(474)
              object-fit cover
          .block-4-images-a
            display grid
          .block-4-images-a
            >:first-child, >:last-child
              grid-column span 2
          .block-4-images-b
            display grid
            >:first-child
              grid-column span 2
              margin-right 0
              margin-left auto
            >:last-child
              grid-column span 2
        `}</style>
    </>
  )
}

const CreditMember = ({ member }: { member: Person }) => {
  let name = <>{member.name}</>
  if (!member.company) {
    if (member.url?.match(/^[a-z\-]+$/)) {
      name = <Link href={`/team/${member.url}`}><a className="credit-name-link">{member.name}</a></Link>
    } else if (member.url) {
      name = <a href={member.url} className="credit-name-link">{member.name}</a>
    }
  }
  return (
    <>
      <div className="member">
        <div><Grad className="role">{member.role}</Grad></div>
        <div><Grad className="name">
          {name}
          {member.company ? <span className="company"> {member.url ? <a href={member.url} target="_blank" rel="noopener noreferrer">({member.company})</a> : `(${member.company})`}</span> : null}
        </Grad></div>
      </div>
      <style jsx>{`
        .member
          margin-bottom 37px
          font-size 0
          font-weight 300
          :global(.role)
            font-size 1.2rem
            line-height 1.2rem
          :global(.name)
            font-size var(--font-size-ja)
            line-height 2.3rem
            margin-top 3px
      `}</style>
    </>
  )
}

const CreditGroup = ({ credit }: { credit: Credit }) => (
  <>
    <div className="credit-group">
      {credit.name
        ? <div className={classnames('name', { spacer: credit.name == '-' })}><Grad className="credit-group-name">{credit.name != '-' ? credit.name : null}</Grad></div>
        : null}
      {credit.members.map(member => <CreditMember key={member.name} member={member} />)}
    </div>
    <style jsx>{`
      .credit-group
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-column-gap 60px
        .name
          grid-column span 4
          margin-top 5.0rem
          margin-bottom 3.8rem
          &.spacer
            margin-top 2.0rem
        :global(.credit-group-name)
          font-size var(--font-size-ja)
          font-weight 700
    `}</style>
  </>
)

const Credits = ({ credit }: { credit: Credit[] }) => (
  <>
    <div className="credits">
      <div><Grad className="credits-title">Credit</Grad></div>
      {credit.map((credit, index) => <CreditGroup key={index} credit={credit} />)}
    </div>
    <style jsx>{`
      .credits
        width 900px
        margin auto
        margin-top -16px
        margin-bottom 135px
        font-size 0
        :global(.credits-title)
          font-size 2.4rem
          font-weight bold
          margin-bottom 77px
    `}</style>
  </>
)

const WorkDetail = ({ work }: { work: Entry }) => (
  <Layout title={work.title} side="Work" backto="/work/category/all">
    <Header work={work} />
    {work.subtitle ? <Excerpt title={work.subtitle || '(Subtitle)'} description={work.overview || '(Overview)'} image={work.side_image || ''} /> : null}
    <Body content={work.content} />
    <Credits credit={work.credit || []} />
  </Layout >
)


export default WorkDetail

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const works = await getAllWorks()
  const paths = (locales || []).map(locale => works.map((w: any) => ({ params: { slug: w.slug }, locale }))).flat()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const work = await getPostDetails(params?.slug as string, locale)
  return { props: { work } }
}
