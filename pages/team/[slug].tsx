import { useState, useRef } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { useLayoutEffect } from 'lib/useLayoutEffect'
import { Member, Entry, getAllMembers, getMemberDetail, getWorksByTag, getNewsByTag } from 'lib/api'
import Layout from 'components/Layout'
import { Grad, GradImg, GradLink, setupLink } from 'components/Grad'
import { WorkList } from 'components/WorkList'


const MemberInfo = ({ member }: { member: Member }) => {
  const [scrollY, setScrollY] = useState(0)
  const onScroll = () => setScrollY(window.pageYOffset)
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()
    const cleanups = [() => window.removeEventListener('scroll', onScroll)]
    ref.current?.querySelectorAll('a').forEach(a => {
      a.target = '_blank'
      cleanups.push(setupLink(a))
    })
    return () => { cleanups.forEach(c => c()) }
  })
  return (
    <>
      <div className="member-info">
        <div className="image"><GradImg><img src={member.image} alt="" /></GradImg></div>
        <div className="info">
          <div className="inner">
            <div><Grad className="region" inline>{member.region.join(' / ')}</Grad></div>
            <div><Grad className="title" inline>{member.title}</Grad></div>
            <div><Grad className="name" inline>{member.name}</Grad></div>
            <div><Grad className="description"><div ref={ref} className="desc-inner" dangerouslySetInnerHTML={{ __html: member.content || '' }}></div></Grad></div>
            <div className="links">
              {member.links.filter((l: any) => l.url).map((link: any) => <div key={link.url}><Grad className="link-item" inline>- <GradLink href={link.url} target="_blank" rel="noopener noreferrer" inlineBlock={true}>{link.name}</GradLink></Grad></div>)}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .image img
          height calc((100vw - 80px) * ${688 / (1366 - 80)} - ${scrollY}px)
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .image img
            height vwpx(325)
      `}</style>
      <style jsx>{`
        @import 'lib/vw.styl'
        .member-info
          position relative
          margin 0
          margin-bottom vwpx(30)
          font-size 0
        .image
          position fixed
          top 80px
          left 80px
          overflow hidden
          img
            width vwpx(643)
            object-fit cover
        .info
          position relative
          padding-top vwpx(156)
          padding-left vwpx(563)
        .inner
          background-color white
          padding vwpx(80)
          font-size 0
          min-height vwpx(500)
          :global(.region)
            font-size 1.2rem
          :global(.title)
            font-size 1.8rem
            font-weight 500
            margin-top 2.7rem
          :global(.name)
            font-size vwpx_min(42)
            font-weight bold
            margin-top vwpx_min(12)
            margin-bottom 0.4rem
          :global(.description)
            margin-top 3.0rem
            margin-bottom 3.0rem
          .desc-inner
            :global(p)
              margin 0
              font-size var(--font-size-ja)
              line-height 2.0
            :global(p + p)
              margin-top 2.0rem
        .links
          :global(.link-item)
            font-size var(--font-size-ja)
            margin-bottom 1.1rem
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .member-info
            margin 0
          .image
            position absolute
            top 0
            left 0
            opacity 0.5
            img
              width vwpx(325)
              height vwpx(325)
          .info
            padding vwpx(295) 0 0 0
          .inner
            {/* background-color rgba(128,255,128,0.3) */}
            padding 3.0rem 0 0 0
            margin-right vwpx(30)
            :global(.title)
              font-size 1.2rem
              font-weight 300
              margin-top 1.3rem
            :global(.name)
              font-size 2.7rem
              margin 0.4rem 0 0 0
            :global(.description)
              margin 0 0 0 0
            .desc-inner
              margin 2.0rem 0 3.1rem 0
              :global(p)
                line-height 2.1
            .links
              :global(.link-item)
                font-size var(--font-size-ja)
                font-weight 700
                margin-bottom 0.9rem
      `}</style>
    </>
  )
}


const RelatedWork = ({ works }: { works: Entry[] }) => (
  <>
    <div className="related-work">
      <div><Grad className="related-work-title" inline>Related Work</Grad></div>
      <WorkList works={works} />
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .related-work
        margin-bottom vwpx(73)
        font-size 0
        :global(.related-work-title)
          font-size vwpx_min(24)
          font-weight 700
          margin 0
          margin-bottom vwpx(50)
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .related-work
          margin 8.5rem 0 0 -0.1rem
          :global(.related-work-title)
            font-size 1.8rem
            margin 0 0 3.6rem 0
    `}</style>
  </>
)


const RelatedLinkItem = ({ entry }: { entry: Entry }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <Link href={`/news/${entry.slug}`}>
        <a className="related-link-item" onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
          <GradImg mouseEntered={entered}><img src={entry.hero_image} alt="" /></GradImg>
          <div><Grad className="item-date" inline>{entry.date}</Grad></div>
          <div><Grad className="item-title" inline><div dangerouslySetInnerHTML={{ __html: entry.title }} /></Grad></div>
        </a>
      </Link>
      <style jsx>{`
        @import 'lib/vw.styl'
        .related-link-item
          display block
          border none
          padding 0
          font-size 0
          img
            width vwpx2(256, 160)
            height vwpx2(144, 160)
            object-fit cover
          :global(.item-date)
            font-size 1.2rem
            font-weight 300
            margin-top 2.2rem
          :global(.item-title)
            font-size 1.5rem
            font-weight 500
            line-height 1.6
            margin-top 1.2rem
        @media (--mobile)
          @import 'lib/vw-mobile.styl'
          .related-link-item
            img
              width vwpx(150)
              height vwpx(84)
            :global(.item-date)
              font-size 1.0rem
              margin-top 1.45rem
            :global(.item-title)
              font-size 1.2rem
              line-height 1.7
              margin 0.5rem vwpx(10) 0 0
      `}</style>
    </>
  )
}


const RelatedLinks = ({ news }: { news: Entry[] }) => (
  <>
    <div className="related-links">
      <div><Grad className="title" inline>Related News</Grad></div>
      <div className="list">
        {news.map(entry => (<RelatedLinkItem key={entry.slug} entry={entry} />))}
      </div>
    </div>
    <style jsx>{`
      @import 'lib/vw.styl'
      .related-links
        margin-right 80px
        margin-bottom vwpx(175)
        font-size 0
        :global(.title)
          font-size vwpx_min(24)
          font-weight 700
          margin 0
          margin-bottom vwpx(50)
      .list
        margin-right vwpx(90)
        display grid
        grid-template-columns repeat(4, 1fr)
        grid-gap vwpx(60)
        align-items start
      @media (--mobile)
        @import 'lib/vw-mobile.styl'
        .related-links
          margin 7.4rem 0 6.8rem -0.1rem
          :global(.title)
            font-size 1.8rem
            margin 0 0 3.6rem 0
        .list
          margin 0
          grid-template-columns repeat(2, 1fr)
          grid-gap vwpx(35) vwpx(25)
    `}</style>
  </>
)


const MemberDetail = ({ member, works, news }: { member: Member, works: Entry[], news: Entry[] }) => (
  <Layout title={member.name} side="Team" backto="/team">
    <MemberInfo member={member} />
    {works.length ? <RelatedWork works={works} /> : null}
    {news.length ? <RelatedLinks news={news} /> : null}
  </Layout >
)

export default MemberDetail

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const members = await getAllMembers()
  const paths = (locales || ['ja']).map(locale => members.map((m) => ({ params: { slug: m.slug }, locale }))).flat()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug: string = params?.slug as string
  const member = await getMemberDetail(slug, locale)
  const works = await getWorksByTag(slug, 100, locale)
  const news = await getNewsByTag(slug, 100, locale)
  return { props: { member, works, news } }
}
