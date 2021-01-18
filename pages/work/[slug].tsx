import { useEffect, useRef, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { Tag, Entry, Credit, Person, getAllWorks, getPostDetails } from 'lib/api'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'
import WorkTag from 'components/WorkTag'


const Header = ({ work }: { work: Entry }) => {
  const [scrollY, setScrollY] = useState(0)
  const onScroll = () => setScrollY(window.pageYOffset)
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  })
  return (
    <div className="header">
      <div className="image" style={{ height: `calc((100vw - 80px) * ${688 / (1366 - 80)} - ${scrollY}px)` }}><GradImg><img src={work.hero_image} alt="" /></GradImg></div>
      <div className="info">
        <div className="inner">
          <Grad><div className="date">{work.date}</div></Grad>
          <Grad><div className="title" dangerouslySetInnerHTML={{ __html: work.title }}></div></Grad>
          <Grad><div className="tags">
            {work.tags?.map((tag: Tag) => <WorkTag key={tag.slug} tag={tag} link={true} />)}
          </div></Grad>
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
            height vwpx(688)
            object-fit cover
        .info
          position relative
          padding-top vwpx(459)
          padding-right vwpx(486)
        .inner
          background-color white
          padding-top vwpx(52)
          padding-bottom vwpx(60)
          padding-left vwpx(80)
        .date
          display inline-block
          font-size vwpx(16)
        .title
          display inline-block
          font-size vwpx(84)
          font-weight bold
          line-height 1.2em
          margin-top vwpx(29)
          margin-left vwpx(-6)
        .tags
          display inline-block
          margin-top vwpx(33)
      `}</style>
    </div>
  )
}

const Excerpt = ({ title, description, image }: { title: string, description: string, image: string }) => (
  <div className="excerpt">
    <div className="text">
      <div className="title" dangerouslySetInnerHTML={{ __html: title }}></div>
      <div className="desc" dangerouslySetInnerHTML={{ __html: description }}></div>
    </div>
    <div className="image">
      <img src={image} alt="" />
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .excerpt
        margin-left vwpx(80)
        margin-bottom vwpx(141)
        display grid
        grid-template-columns auto vwpx(573)
        grid-gap vwpx(70)
      .title
        font-size vwpx(30)
        font-weight bold
        line-height vwpx(54)
        margin-top vwpx(-8)
        margin-bottom vwpx(42)
      .desc
        line-height 3.0rem
      .image img
        width vwpx(573)
        height vwpx(324)
        object-fit cover
    `}</style>
  </div>
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
    <div>
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
    </div>
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
    <div className="member">
      <Grad><div className="role">{member.role}</div></Grad>
      <Grad><div className="name">
        {name}
        {member.company ? <span className="company">&nbsp;{member.url ? <a href={member.url} target="_blank" rel="noopener noreferrer">({member.company})</a> : `(${member.company})`}</span> : null}
      </div></Grad>
      <style jsx>{`
        .member
          margin-bottom 37px
          font-size 0
          font-weight 300
        .role
          display inline-block
          font-size 1.2rem
          line-height 1.2rem
        .name
          display inline-block
          font-size 1.5rem
          line-height 2.1rem
          margin-top 3px
        .company
          display inline-block
        a, :global(.credit-name-link)
          display inline-block
          padding-bottom 1px
          border-bottom 1px solid red
      `}</style>
    </div>
  )
}

const CreditGroup = ({ credit }: { credit: Credit }) => (
  <div className="credit-group">
    {credit.members.map(member => <CreditMember key={member.name} member={member} />)}
    <style jsx>{`
      .credit-group
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-column-gap 60px
    `}</style>
  </div>
)

const Credits = ({ credit }: { credit: Credit[] }) => (
  <div className="credits">
    <Grad><h2>Credit</h2></Grad>
    {credit.map((credit, index) => <CreditGroup key={index} credit={credit} />)}
    <style jsx>{`
      .credits
        width 900px
        margin auto
        margin-top -16px
        margin-bottom 135px
        font-size 0
      h2
        display inline-block
        font-size 24px
        font-weight bold
        margin-bottom 77px
    `}</style>
  </div>
)

const WorkDetail = ({ work }: { work: Entry }) => (
  <Layout title={work.title} side="Work" backto="/work/category/all">
    <Header work={work} />
    <Excerpt title={work.subtitle || '(Subtitle)'} description={work.overview || '(Overview)'} image={work.side_image || ''} />
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
