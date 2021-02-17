import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import classnames from 'classnames'
import { Tag, Entry, Credit, Person, getPostDetails } from 'lib/api'
import { langStyle } from 'lib/i18n'
import { getOptimized } from 'lib/image'
import Layout from 'components/Layout'
import EntryBody from 'components/EntryBody'
import { Grad, GradImg, GradLink, GradLinkedTextBox } from 'components/Grad'
import WorkTag from 'components/WorkTag'
import { Desktop, Mobile } from 'components/Responsive'
import { NextPrevButtons } from 'components/NextPrevButtons'
import { OGPInfo } from 'components/OGPInfo'

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
      <div className="image" style={{ height: `calc((100vw - 80px) * ${723 / (1366 - 80)} - ${scrollY}px)` }}><GradImg><img src={getOptimized(src)} alt="" /></GradImg></div>
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
      <div className="image" style={{ height: `calc(100vw - ${scrollY}px)` }}><GradImg><img src={getOptimized(src, 1200)} alt="" /></GradImg></div>
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
      <div className={langStyle('header')}>
        <Desktop><HeaderImageDesktop src={work.hero_image!} /></Desktop>
        <Mobile><HeaderImageMobile src={work.hero_image_mobile!} /></Mobile>
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
          .en.header
            .inner
              :global(.title)
                margin-top 1.7rem
              :global(.tags)
                margin-top 1.6rem
      `}</style>
    </>
  )
}

const Excerpt = ({ title, description, image }: { title: string, description: string, image: string }) => (
  <>
    <div className={langStyle('excerpt')}>
      <div className="text">
        <div><Grad className="title" inline><div dangerouslySetInnerHTML={{ __html: title }} /></Grad></div>
        <div><Grad className="desc" inline><GradLinkedTextBox html={description} /></Grad></div>
      </div>
      <div className="image">
        <GradImg><img src={getOptimized(image, 1200)} alt="" /></GradImg>
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
      .en.excerpt
        .text
          :global(.title)
            font-size vwpx(36)
            line-height (54 / 36)
            margin-top vwpx(-7)
          :global(.desc)
            font-size var(--font-size-en)
            font-weight 200
            line-height (30 / 17)
            margin-top vwpx(-10)
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .excerpt
          margin 6.9rem vwpx(30) 0 0
          display block
          .text
            :global(.title)
              font-size 1.7rem
              line-height 1.8
            :global(.desc)
              font-size 1.3rem
              line-height (52 / 26)
              margin-top 0.55rem
          .image
            margin 7.2rem -30px 0 -50px
            img
              width vwpx(375)
              height vwpx(375 / 16 * 9)
        .en.excerpt
          margin-top 7.7rem
          .text
            :global(.title)
              font-size 2.0rem
              line-height (54 / 40)
            :global(.desc)
              font-size 1.4rem
              line-height (50 / 28)
              margin-top 0.55rem
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
      <div className={langStyle('member')}>
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
        .en.member
          :global(.name)
            font-size var(--font-size-en)
            font-weight 200
            line-height (20 / 17)
            margin-top 0.5rem
        @media (--mobile)
          .member
            margin-bottom 2.7rem
            :global(.role)
              font-size 1.1rem
              line-height (28 / 22)
            :global(.name)
              font-size 1.3rem
              line-height (42 / 26)
              margin-top 0.45rem
          .en.member
            :global(.role)
              font-size 1.1rem
              line-height (28 / 22)
            :global(.name)
              font-size 1.4rem
              line-height (42 / 28)
              margin-top 0.4rem
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
      {credit.members.map((member, index) => <CreditMember key={index} member={member} />)}
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
            margin-top 3.7rem
            margin-bottom 2.85rem
            &.spacer
              margin-top 0.9rem
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
        font-size 0
        :global(.credits-title)
          font-size 2.4rem
          font-weight bold
          margin-bottom 77px
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .credits
          width auto
          margin 7.4rem 30px 6.0rem 20px
          :global(.credits-title)
            font-size 1.8rem
            margin-bottom 4.4rem
    `}</style>
  </>
)

const Footer = ({ work }: { work: Entry }) => (
  <>
    <div className="footer">
      <NextPrevButtons
        leftSub="Previous Project"
        leftTitle={work.next?.title}
        leftLink={`/work/${work.next?.slug}`}
        rightSub="Next Project"
        rightTitle={work.prev?.title}
        rightLink={`/work/${work.prev?.slug}`} />
    </div>
    <style jsx>{`
      .footer
        margin-top 150px
    `}</style>
  </>
)

const WorkDetail = ({ work, locale }: { work: Entry, locale: string }) => (
  <>
    <OGPInfo title={work.title} url={''} image={work.hero_image!} desc={[work.subtitle, work.overview, work.content].join(' ')} locale={locale} />
    <Layout key={work.slug} title={work.title} side="Work" backto="/work/category/all" footer={<Footer work={work} />}>
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

export const getStaticPaths: GetStaticPaths = async () => {
  // const works = await getAllWorks(5)
  // const paths = (locales || []).map(locale => works.map((w: any) => ({params: { slug: w.slug }, locale }))).flat()
  // console.log(paths)
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const work = await getPostDetails(params?.slug as string, locale)
  return {
    props: { work, locale },
    revalidate: 60 * 10,
  }
}
