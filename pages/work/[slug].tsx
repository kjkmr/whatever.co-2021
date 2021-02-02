import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import classnames from 'classnames'
import { Tag, Entry, Credit, Person, getAllWorks, getPostDetails } from 'lib/api'
import Layout from 'components/Layout'
import EntryBody from 'components/EntryBody'
import { Grad, GradImg, GradLink } from 'components/Grad'
import WorkTag from 'components/WorkTag'
import { Desktop, Mobile } from 'components/Responsive'

const HeaderImageDesktop = ({ src }: { src: string }) => {
  const [scrollY, setScrollY] = useState(0)
  const onScroll = () => setScrollY(window.pageYOffset)
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  })
  return (
    <>
      <div className="image" style={{ height: `calc((100vw - 80px) * ${723 / (1366 - 80)} - ${scrollY}px)` }}><GradImg><img src={src} alt="" /></GradImg></div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .image
          position fixed
          top 80px
          left 80px
          overflow hidden
          img
            width vwpx(1286)
            height vwpx(1286 / 16 * 9)
            object-fit cover
      `}</style>
    </>
  )
}

const HeaderImageMobile = ({ src }: { src: string }) => {
  const [scrollY, setScrollY] = useState(0)
  const onScroll = () => setScrollY(window.pageYOffset)
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  })
  return (
    <>
      <div className="image" style={{ height: `calc(100vw - ${scrollY}px)` }}><GradImg><img src={src} alt="" /></GradImg></div>
      <style jsx>{`
        @import 'lib/vw-mobile.styl'
        .image
          position fixed
          top 50px
          left 0
          overflow hidden
          z-index -1
          {/* opacity 0.5 */}
          img
            width vwpx(375)
            height vwpx(375)
            object-fit cover
      `}</style>
    </>
  )
}

const Header = ({ work }: { work: Entry }) => {
  return (
    <>
      <div className="header">
        <Desktop><HeaderImageDesktop src={work.hero_image!} /></Desktop>
        <Mobile><HeaderImageMobile src={work.hero_image!} /></Mobile>
        <div className="info">
          <div className="inner">
            <div><Grad className="date" inline>{work.date}</Grad></div>
            <div><Grad className="title" inline><div dangerouslySetInnerHTML={{ __html: work.title }} /></Grad></div>
            <div><Grad className="tags" inline>
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
            line-height 1.2
            margin-top vwpx(29)
            margin-left vwpx(-6)
          :global(.tags)
            margin-top vwpx(31)
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .header
            margin 0
          .info
            margin vwpx(325) vwpx(30) 0 -50px
          .inner
            padding 5.0rem 3.0rem 0 50px
            :global(.date)
              font-size 1.0rem
            :global(.title)
              font-size 3.0rem
              line-height 1.2
              margin-top 1.4rem
            :global(.tags)
              margin-top 2.1rem
      `}</style>
    </>
  )
}

const Excerpt = ({ title, description, image }: { title: string, description: string, image: string }) => (
  <>
    <div className="excerpt">
      <div className="text">
        <div><Grad className="title" inline><div dangerouslySetInnerHTML={{ __html: title }} /></Grad></div>
        <div><Grad className="desc" inline><div dangerouslySetInnerHTML={{ __html: description }}></div></Grad></div>
      </div>
      <div className="image">
        <GradImg><img src={image} alt="" /></GradImg>
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .excerpt
        margin-left vwpx(80)
        margin-bottom vwpx(152)
        display grid
        grid-template-columns auto vwpx(562)
        grid-gap vwpx(80)
        font-size 0
      .text
        :global(.title)
          font-size vwpx(30)
          font-weight 700
          line-height 1.8
          margin-top vwpx(-8)
          margin-bottom vwpx(42)
        :global(.desc)
          font-size var(--font-size-ja)
          line-height 2.0
      .image img
        width vwpx(562)
        height vwpx(562 / 16 * 9)
        object-fit cover
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .excerpt
          margin 7.3rem vwpx(30) 0 0
          display block
        .text
          :global(.title)
            font-size 1.7rem
            line-height 1.8
          :global(.desc)
            font-size 1.2rem
            line-height 2.1
            margin-top 0.55rem
        .image
          margin 7.2rem -30px 0 -50px
          img
            width vwpx(375)
            height vwpx(375 / 16 * 9)
    `}</style>
  </>
)

const CreditMember = ({ member }: { member: Person }) => {
  let name = <>{member.name}</>
  if (!member.company) {
    if (member.url?.match(/^[a-z\-]+$/)) {
      name = <Link href={`/team/${member.url}`} passHref><GradLink>{member.name}</GradLink></Link>
    } else if (member.url) {
      name = <GradLink href={member.url}>{member.name}</GradLink>
    }
  }
  return (
    <>
      <div className="member">
        <div><Grad className="role" inline>{member.role}</Grad></div>
        <div><Grad className="name" inline>
          {name}
          {member.company ? <span className="company"> {member.url ? <GradLink href={member.url} target="_blank" rel="noopener noreferrer">({member.company})</GradLink> : `(${member.company})`}</span> : null}
        </Grad></div>
      </div>
      <style jsx>{`
        .member
          margin-bottom 37px
          font-size 0
          font-weight 300
          :global(.role)
            font-size 1.2rem
            line-height 1.2
          :global(.name)
            font-size var(--font-size-ja)
            line-height 1.8
            margin-top 3px
        @media (--mobile)
          .member
            margin-bottom 2.9rem
            :global(.role)
              font-size 1.1rem
            :global(.name)
              font-size 1.2rem
              margin-top 0.7rem
      `}</style>
    </>
  )
}

const CreditGroup = ({ credit }: { credit: Credit }) => (
  <>
    <div className="credit-group">
      {credit.name
        ? <div className={classnames('name', { spacer: credit.name == '-' })}><Grad className="credit-group-name" inline>{credit.name != '-' ? credit.name : null}</Grad></div>
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
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .credit-group
          grid-template-columns repeat(2, 1fr)
          grid-column-gap 20px
          .name
            grid-column span 2
            &.spacer
              margin-top 0.2rem
    `}</style>
  </>
)

const Credits = ({ credit }: { credit: Credit[] }) => (
  <>
    <div className="credits">
      <div><Grad className="credits-title" inline>Credit</Grad></div>
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
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .credits
          width auto
          margin 0 30px 6.0rem 20px
          :global(.credits-title)
            font-size 1.8rem
            margin-bottom 4.5rem
    `}</style>
  </>
)

const WorkDetail = ({ work }: { work: Entry }) => (
  <>
    <Layout title={work.title} side="Work" backto="/work/category/all">
      <Header work={work} />
      {work.subtitle ? <Excerpt title={work.subtitle || '(Subtitle)'} description={work.overview || '(Overview)'} image={work.side_image || ''} /> : null}
      <div className="body"><EntryBody content={work.content!} /></div>
      <Credits credit={work.credit || []} />
    </Layout >
    <style jsx>{`
      .body
        margin-bottom 15.5rem
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .body
          margin 7.0rem vwpx(30) 0 0
    `}</style>
  </>
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
